import {computed} from 'vue'
import {convertToUnit} from '../utils/helpers';

export default function (props) {
  return computed(() => {
    const styles = {}

    const height = convertToUnit(props.height)
    const minHeight = convertToUnit(props.minHeight)
    const minWidth = convertToUnit(props.minWidth)
    const maxHeight = convertToUnit(props.maxHeight)
    const maxWidth = convertToUnit(props.maxWidth)
    const width = convertToUnit(props.width)

    if (height) styles.height = height
    if (minHeight) styles.minHeight = minHeight
    if (minWidth) styles.minWidth = minWidth
    if (maxHeight) styles.maxHeight = maxHeight
    if (maxWidth) styles.maxWidth = maxWidth
    if (width) styles.width = width

    return styles
  })
}
