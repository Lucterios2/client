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

export function createCompnent(el, component, props, children, emits) {
  const new_emits = {}
  Object.keys(emits).forEach((key) => {
    const new_key = 'on' + key[0].toUpperCase() + key.substring(1)
    new_emits[new_key] = emits[key]
  })
  const new_props = Object.assign({}, props, new_emits)
  let new_comp = Vue.h(component, new_props, () => children)
  new_comp.appContext = current_app._context
  if (el != null) {
    Vue.render(new_comp, el)
  }
  return new_comp
}

export function mountComponent(component, props, emits) {
  let el = document.createElement('div')

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
  document.getElementById('comp').appendChild(el)
  emits.close = destroy
  let new_comp = createCompnent(el, component, props, [], emits)

  const struct_comp = {
    new_comp,
    destroy,
    el
  }
  component_created.set(el, struct_comp)
  return struct_comp
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

export async function factory(result, click_action) {
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
    mountComponent(current_comp, result, {
      clickaction: click_action
    })
  } else {
    console.log('NO COMPONENT', result)
  }
}
