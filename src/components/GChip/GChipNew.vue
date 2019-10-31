<script>
  import GIcon from '../GIcon/GIcon';
  import Ripple from '../../directives/ripple/ripple';
  import GBtn from '../GBtn/GBtn';
  import GChipUtils from './logic/GChipUtils';

  export default {
    name: 'GChipNew',
    components: { GBtn, GIcon },
    props: {
      //classes
      active: Boolean,
      append: Boolean,
      close: Boolean,
      closeIcon: { type: String, default: `mdi-close-circle` },
      disabled: Boolean,
      filter: Boolean,
      filterIcon: { type: String, default: `mdi-check` },
      outlined: Boolean,
      pill: Boolean,
      value: null,
      label: Boolean,
      small: Boolean,
      large: Boolean,
      xSmall: Boolean,
      xLarge: Boolean,
      draggable: Boolean,
      //style
      color: String,
      ripple: Boolean,
      textColor: String,
      backgroundColor: String,
      gradient: String,
      activeClass: {
        type: String,
        default: 'g-chip__active'
      }
    }, directives: {
      Ripple
    }, setup(props, context) {

      let {getSizeClass, classes, styles} = GChipUtils(props, context);

      function genPrepend() {
        if (props.filter) {
          return <g-icon class={'g-icon__left'} size="18px">{props.filterIcon}</g-icon>
        }
      }

      function genAppend() {
        if (props.close) {
          return <g-icon vOn:click={(e) => {
            e.stopPropagation();
            context.emit('close', e);
          }} class={'g-icon__right'} size="18px">{props.closeIcon}</g-icon>
        }
      }

      function genContent() {
        return <span class={'g-chip__content'}>
          {genPrepend()}
          {context.slots.default()}
          {genAppend()}
        </span>
      }

      function genChip() {
        if (props.ripple) {
          return <span v-ripple draggable={props.draggable} style={styles} vOn:click={() => context.emit('click', props.value)} class={['g-chip',  classes.value, getSizeClass()]}>
            {genContent()}
          </span>
        }
        return <span draggable={props.draggable} style={styles} vOn:click={() => context.emit('click', props.value)} class={['g-chip', classes.value, getSizeClass()]}>
          {genContent()}
        </span>
      }

      return {
        genChip
      }
    }, render(createElement, context) {
      return this.genChip();
    }
  }
</script>

<style scoped>

</style>
