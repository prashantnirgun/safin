import { QSelect, QInput } from 'quasar'
/*
import { setQuasarComponentDefaultPropValues } from "src/utils/quasar.utils";

setQuasarComponentDefaultPropValues(QSelect, {
  outlined: true,
  dense: true,
  bottomSlots: true,
});

setQuasarComponentDefaultPropValues(QInput, {
  outlined: true,
  dense: true,
});
*/

QInput.props.outlined = {
  type: QInput.props.outlined,
  default: true,
}
QInput.props.dense = {
  type: QInput.props.dense,
  default: true,
}
QInput.props.stackLabel = {
  type: QInput.props.stackLabel,
  default: true,
}
QInput.props.hideBottomSpace = {
  type: QInput.props.hideBottomSpace,
  default: true,
}
