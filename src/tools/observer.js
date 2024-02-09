import * as Vue from 'vue'
import LoginBox from '@/components/LoginBox.vue'
import MainMenu from '@/components/MainMenu.vue'
import DialogBox from '@/components/DialogBox.vue'
import ExceptionBox from '@/components/ExceptionBox.vue'

var current_app = null

const component_created = new Map()

export function mountComponent(component, props, emits) {
  let el = document.createElement('div')

  const destroy = () => {
    if (el) {
      document.getElementById('comp').removeChild(el)
      Vue.render(null, el)
      component_created.delete(el)
    }
    el = null
  }

  document.getElementById('comp').appendChild(el)
  let new_comp = Vue.h(component, props)
  new_comp.appContext = current_app._context
  Vue.render(new_comp, el)
  emits.close = destroy
  new_comp.component.emitsOptions = emits

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

export function initialObserver() {
  current_app = Vue.getCurrentInstance().appContext.app
}

export async function factory(result, click_action) {
  var current_comp = null
  switch (result.meta.observer) {
    case 'core.auth':
      current_comp = LoginBox
      break
    case 'core.menu':
      clearComponent()
      current_comp = MainMenu
      break
    case 'core.exception':
      current_comp = ExceptionBox
      break
    case 'core.dialogbox':
      current_comp = DialogBox
      break
    default:
      current_comp = null
  }
  if (current_comp !== null) {
    mountComponent(current_comp, result, {
      clickaction: click_action
    })
  } else {
    console.log('no component', result)
  }
}
