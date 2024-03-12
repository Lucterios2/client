import LabelForm from './LabelForm.vue'
import LinkLabel from './LinkLabel.vue'
import ImageComp from './ImageComp.vue'
import GridComp from './GridComp.vue'
import ButtonComp from './ButtonComp.vue'
import EditComp from './EditComp.vue'
/*import FloatComp from './FloatComp.vue'
import MemoComp from './MemoComp.vue'*/

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
    case 'BUTTON':
      current_comp = ButtonComp
      break
    case 'EDIT':
      current_comp = EditComp
      break
    /*case 'FLOAT':
      current_comp = FloatComp
      break
    case 'MEMO':
      current_comp = MemoComp
      break*/
    default:
      current_comp = 'span'
  }
  return current_comp
}
