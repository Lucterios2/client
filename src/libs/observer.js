import * as Vue from 'vue'
import LoginBox from '@/observers/LoginBox.vue'
import MainMenu from '@/observers/MainMenu.vue'
import AcknowledgeReturn from '@/observers/AcknowledgeReturn.vue'
import DialogBox from '@/observers/DialogBox.vue'
import CustomBox from '@/observers/CustomBox.vue'
import ExceptionBox from '@/observers/ExceptionBox.vue'
import PrintReturn from '@/observers/PrintReturn.vue'

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
    const { destroy } = value
    destroy()
  })
  component_created.clear()
}

export function initialObserver(ext_app) {
  current_app = ext_app ? ext_app : Vue.getCurrentInstance().appContext.app
}

/*class CompManager {
  constructor(component, props, emits, owner) {
    this.owner = owner
    this.el = document.createElement('div')
    document.getElementById('comp').appendChild(this.el)
    emits.close = this.close
    this.comp = createCompnent(this.el, component, props, [], emits)
    component_created.set(this.el, this)
  }

  close() {
    if (this.el) {
      const root_comp = document.getElementById('comp')
      if (root_comp) {
        root_comp.removeChild(this.el)
      }
      Vue.render(null, this.el)
      component_created.delete(this.el)
    }
    this.el = null
    return true
  }

  refresh(props, emits) {}
}*/

function mountComponent(component, props, click_action, owner) {
  const internal_click_action = (action) => {
    click_action(action, el)
  }
  const destroy = () => {
    if (el) {
      const root_comp = document.getElementById('comp')
      if (root_comp) {
        root_comp.removeChild(el)
      }
      Vue.render(null, el)
      component_created.delete(el)
    }
    el = null
    return true
  }
  const refresh = (props) => {
    new_comp.component.props = Object.assign({}, new_comp.props, props)
    new_comp.component.ctx.refreshObserver()
  }
  let el = document.createElement('div')
  let emits = {
    clickaction: internal_click_action
  }
  document.getElementById('comp').appendChild(el)
  emits.close = destroy
  let new_comp = createCompnent(el, component, props, [], emits)
  const struct_comp = {
    new_comp,
    destroy,
    el,
    owner,
    refresh
  }
  component_created.set(el, struct_comp)
  return struct_comp
}

export async function factory(result, click_action, source, refresh) {
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
      return mountComponent(current_comp, result, click_action, source)
    } else {
      console.log('NO COMPONENT', result)
    }
  } else {
    let old_comp = component_created.get(source)
    if (old_comp) {
      old_comp.refresh(result)
      return old_comp
    } else {
      console.log('OLD NOT FOUND', source, result)
    }
  }
}
