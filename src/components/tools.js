import ImageComp from '@/components/ImageComp.vue'
import LabelForm from '@/components/LabelForm.vue'
import EditComp from '@/components/EditComp.vue'
import FloatComp from '@/components/FloatComp.vue'
import MemoComp from '@/components/MemoComp.vue'
import XMLComp from '@/components/XMLComp.vue'
import CheckComp from '@/components/CheckComp.vue'
import GridComp from '@/components/GridComp.vue'
import LinkLabel from '@/components/LinkLabel.vue'
import SelectComp from '@/components/SelectComp.vue'
import CheckListComp from '@/components/CheckListComp.vue'
import ButtonComp from '@/components/ButtonComp.vue'
import DateComp from '@/components/DateComp.vue'
import TimeComp from '@/components/TimeComp.vue'
import DateTimeComp from '@/components/DateTimeComp.vue'
import PasswordComp from '@/components/PasswordComp.vue'
import UploadComp from '@/components/UploadComp.vue'
import DownloadComp from '@/components/DownloadComp.vue'
import CaptchaComp from '@/components/CaptchaComp.vue'

export function factory_components(componentname) {
  var current_comp
  switch (componentname) {
    case 'IMAGE':
      current_comp = ImageComp
      break
    case 'LABELFORM':
      current_comp = LabelForm
      break
    case 'EDIT':
      current_comp = EditComp
      break
    case 'FLOAT':
      current_comp = FloatComp
      break
    case 'MEMO':
      current_comp = MemoComp
      break
    case 'XML':
      current_comp = XMLComp
      break
    case 'CHECK':
      current_comp = CheckComp
      break
    case 'GRID':
      current_comp = GridComp
      break
    case 'LINK':
      current_comp = LinkLabel
      break
    case 'SELECT':
      current_comp = SelectComp
      break
    case 'CHECKLIST':
      current_comp = CheckListComp
      break
    case 'BUTTON':
      current_comp = ButtonComp
      break
    case 'DATE':
      current_comp = DateComp
      break
    case 'TIME':
      current_comp = TimeComp
      break
    case 'DATETIME':
      current_comp = DateTimeComp
      break
    case 'PASSWD':
      current_comp = PasswordComp
      break
    case 'UPLOAD':
      current_comp = UploadComp
      break
    case 'DOWNLOAD':
      current_comp = DownloadComp
      break
    case 'CAPTCHA':
      current_comp = CaptchaComp
      break
    default:
      current_comp = 'span'
  }
  return current_comp
}
