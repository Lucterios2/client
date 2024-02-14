import LabelForm from './LabelForm.vue'
import LinkLabel from './LinkLabel.vue'
import ImageComp from './ImageComp.vue'
import GridComp from './GridComp.vue'

export function factory_components(componentname) {
  var current_comp
  switch (componentname) {
    case 'LABELFORM':
      current_comp = LabelForm
      break
    case 'LINK':
      current_comp = LinkLabel
      break
    case 'IMAGE':
      current_comp = ImageComp
      break
    case 'GRID':
      current_comp = GridComp
      break
    default:
      current_comp = 'span'
  }
  return current_comp
}
