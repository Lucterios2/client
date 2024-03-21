import * as Vue from 'vue'
import LoginBox from '@/observers/LoginBox.vue'
import MainMenu from '@/observers/MainMenu.vue'
import AcknowledgeReturn from '@/observers/AcknowledgeReturn.vue'
import DialogBox from '@/observers/DialogBox.vue'
import CustomBox from '@/observers/CustomBox.vue'
import ExceptionBox from '@/observers/ExceptionBox.vue'
import PrintReturn from '@/observers/PrintReturn.vue'
import { LucteriosException, GRAVE } from '@/libs/error'

var current_app = null

const component_created = new Map()

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
  if (el != null) {
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

class CompManager {
  constructor(owner, click_action) {
    this.owner = owner
    this.el = document.createElement('div')
    this.click_action = click_action
    document.getElementById('comp').appendChild(this.el)
  }

  mount(component, props) {
    let self = this
    let emits = {
      clickaction: function (action) {
        return self.click_action(action, self.el)
      },
      close: function () {
        return self.close()
      }
    }
    this.comp = createCompnent(this.el, component, props, [], emits)
    component_created.set(this.el, this)
  }

  close() {
    if (this.el) {
      component_created.forEach((comp) => {
        if (comp.owner == this.el) {
          comp.owner = this.owner
        }
      })
      const root_comp = document.getElementById('comp')
      if (root_comp) {
        root_comp.removeChild(this.el)
      }
      Vue.render(null, this.el)
      component_created.delete(this.el)
      if (this.owner) {
        let old_comp = component_created.get(this.owner)
        if (old_comp) {
          old_comp.refresh()
        }
      }
    }
    this.el = null
    return true
  }

  update(props) {
    this.comp.component.props = Object.assign({}, this.comp.props, props)
    this.comp.component.ctx.updateObserver()
  }

  refresh() {
    this.comp.component.ctx.refreshObserver()
  }
}

export async function factory(result, click_action, source, refresh) {
  if (result.meta.observer == 'core.exception') {
    refresh = false
  }
  if (source == undefined || source == null || refresh != true) {
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
      throw new LucteriosException(GRAVE, 'NO COMPONENT', result)
    }
  } else {
    let old_comp = component_created.get(source)
    if (old_comp) {
      old_comp.update(result)
      return old_comp
    } else {
      throw new LucteriosException(GRAVE, 'OLD NOT FOUND', source, result)
    }
  }
}
