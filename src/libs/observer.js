import * as Vue from 'vue'
import LoginBox from '@/observers/LoginBox.vue'
import MainMenu from '@/observers/MainMenu.vue'
import AcknowledgeReturn from '@/observers/AcknowledgeReturn.vue'
import DialogBox from '@/observers/DialogBox.vue'
import CustomBox from '@/observers/CustomBox.vue'
import ExceptionBox from '@/observers/ExceptionBox.vue'
import PrintReturn from '@/observers/PrintReturn.vue'
import { LucteriosException, GRAVE } from '@/libs/error'
import { CLOSE_YES } from '@/libs/utils'

var current_app = null

const component_created = new Map()
const ident_linked = new Map()

function convert_props(props, emits) {
  const new_emits = {}
  Object.keys(emits).forEach((key) => {
    const new_key = 'on' + key[0].toUpperCase() + key.substring(1)
    new_emits[new_key] = emits[key]
  })
  return Object.assign({}, props, new_emits)
}

export function createCompnent(el, component, props, children, emits) {
  let new_comp = Vue.h(component, convert_props(props, emits), () => children)
  new_comp.appContext = current_app._context
  if (el !== null) {
    Vue.render(new_comp, el)
  }
  return new_comp
}

export function clearComponent() {
  component_created.forEach((value) => {
    value.close()
  })
  component_created.clear()
}

export function initialObserver(ext_app) {
  current_app = ext_app ? ext_app : Vue.getCurrentInstance().appContext.app
}

function clean_components() {
  component_created.forEach((comp) => {
    if (!comp.el) {
      component_created.delete(comp.id)
    } else {
      comp.ownerid = getOwnerId(comp.id)
    }
  })
}

function getOwnerId(ident) {
  var owenerid = ident_linked.get(ident)
  if (owenerid && !component_created.get(owenerid)) {
    owenerid = getOwnerId(owenerid)
  }
  return owenerid
}

export var CompIdDefault = null
export function setCompIdDefault(newCompIdDefault) {
  CompIdDefault = newCompIdDefault
}

function getCompId() {
  if (CompIdDefault == null) {
    return new Date().valueOf().toString()
  } else {
    return CompIdDefault
  }
}

class CompManager {
  constructor(ownerid, click_action) {
    this.ownerid = ownerid
    this.id = getCompId()
    this.el = document.createElement('div')
    this.el.id = this.id
    this.click_action = click_action
    document.getElementById('comp').appendChild(this.el)
  }

  mount(component, props) {
    let self = this
    let emits = {
      clickaction: async function (action, no_owner, action_close) {
        if (action_close) {
          await self.click_action(action_close, null)
        }
        var act_ret = action != null
        const source = no_owner ? null : self.el ? self.el.id : null
        if (act_ret && Number(action.close) === CLOSE_YES) {
          self.close(action.id == '')
        }
        if (act_ret && action.id != '') {
          act_ret = await self.click_action(action, source)
        }
      }
    }
    if (props.id === undefined) {
      props.id = this.id
    }
    this.comp = createCompnent(this.el, component, props, [], emits)
    component_created.set(this.id, this)
    ident_linked.set(this.id, this.ownerid)
    this.ownerid = getOwnerId(this.id)
  }

  close(refresh_parent) {
    if (this.el) {
      if (this.ownerid && refresh_parent) {
        let old_comp = component_created.get(this.ownerid)
        if (old_comp) {
          old_comp.refresh()
        }
      }
      component_created.forEach((comp) => {
        if (comp.owner && this.id === comp.ownerid) {
          comp.ownerid = this.ownerid
        }
      })
      const root_comp = document.getElementById('comp')
      if (root_comp) {
        root_comp.removeChild(this.el)
      }
      Vue.render(null, this.el)
      if (this.comp) {
        this.comp.component.ctx.clean_observer()
      }
      component_created.delete(this.id)
    }
    this.el = null
    clean_components()
    return true
  }

  update(props) {
    if (this.comp.props.meta) {
      props.meta = Object.assign({}, props.meta, { ismodal: this.comp.props.meta.ismodal })
    }
    this.comp.component.props = Object.assign({}, this.comp.props, props)
    this.comp.component.ctx.updateObserver()
  }

  refresh() {
    clean_components()
    this.comp.component.ctx.refreshObserver()
  }
}

export async function factory(result, click_action, source, refresh) {
  if (result.meta.observer === 'core.exception') {
    refresh = false
  }
  if (source === undefined || source === null || refresh !== true) {
    var current_comp
    switch (result.meta.observer) {
      case 'core.auth':
        current_comp = LoginBox
        break
      case 'core.menu':
        clearComponent()
        current_comp = MainMenu
        break
      case 'core.acknowledge':
        current_comp = AcknowledgeReturn
        break
      case 'core.exception':
        current_comp = ExceptionBox
        break
      case 'core.print':
        current_comp = PrintReturn
        break
      case 'core.dialogbox':
        current_comp = DialogBox
        break
      case 'core.custom':
        current_comp = CustomBox
        break
      default:
        current_comp = null
    }
    if (current_comp !== null) {
      let new_comp = new CompManager(source, click_action)
      new_comp.mount(current_comp, result)
      return new_comp
    } else {
      throw new LucteriosException(GRAVE, 'NO COMPONENT', '', JSON.stringify(result))
    }
  } else {
    let old_comp = component_created.get(source)
    if (old_comp) {
      old_comp.update(result)
      return old_comp
    } else {
      throw new LucteriosException(GRAVE, 'OLD NOT FOUND', '', JSON.stringify(result))
    }
  }
}
