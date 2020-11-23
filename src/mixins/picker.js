import GPicker from '../components/GPicker/GPicker'
import { h } from 'vue'

export default (props, context, { genPickerTitle, genPickerBody }) => {
  function genPickerActionsSlot() {
    return context.slots.default && context.slots.default()
    // TODO: save/cancel
    /*return context.slots.default ? context.slots.default({
      save: (this as any).save,
      cancel: (this as any).cancel,
    }) : context.slots.default()*/
  }

  function genPicker(staticClass/*: string*/) {
    const children/*: VNode[]*/ = []

    if (!props.noTitle) {
      const title = genPickerTitle()
      title && children.push(title)
    }

    const body = genPickerBody()
    body && children.push(body)

    children.push(
       <template {...{slot: 'actions'}}>{genPickerActionsSlot()}</template>
    )

    return (<GPicker {...{
      staticClass,
      props: {
        color: props.headerColor || props.color,
        // dark: this.dark, // TODO: Themeable
        fullWidth: props.fullWidth,
        landscape: props.landscape,
        // light: this.light, // TODO: Themeable
        width: props.width,
        noTitle: props.noTitle,
      },
    }}>{ children }</GPicker>)
  }

  return {
    genPicker
  }
}
