<script>
  // TODO:
  //  - Consider to change props value to modelValue

  import GIcon from '../GIcon/GIcon';
  import Ripple from '../../directives/ripple/ripple';
  import GBtn from '../GBtn/GBtn';
  import GChipUtils from './logic/GChipUtils';
  import { onMounted, ref } from 'vue';
  import { getScopeIdRender } from '../../utils/helpers';

  export default {
    name: 'GChip',
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
      ripple: Boolean,
      textColor: String,
      backgroundColor: String,
      gradient: String,
      gradientAngle: String,
      activeClass: {
        type: String,
        default: 'g-chip__active'
      }
    },
    directives: {
      Ripple
    },
    emits: ['click', 'close'],
    setup(props, context) {
      const { getSizeClass, classes, styles } = GChipUtils(props, context);
      const hasAvatarIcon = ref(false);

      function hasAvatarOrIcon() {
        if (!context.slots.default) return false
        let nodes = context.slots.default();
        return nodes[0] && nodes[0].type && (nodes[0].type.name === 'GAvatar' || nodes[0].type.name === 'GIcon');
      }

      onMounted(() => {
        hasAvatarIcon.value = hasAvatarOrIcon();
      });

      function genPrepend() {
        if (props.filter && !hasAvatarIcon.value) {
          return <g-icon class={'g-icon__left'} size="18px">{props.filterIcon}</g-icon>
        }

        if (props.filter && hasAvatarIcon.value && !props.pill) {
          return <div class="g-chip-overlay">
            <g-icon class={'g-icon__left'} size="18px">{props.filterIcon}</g-icon>
          </div>
        }

        if (props.filter && hasAvatarIcon.value && props.pill) {
          return <div class="g-chip-pill-overlay">
            <g-icon class={'g-icon__left'} size="18px">{props.filterIcon}</g-icon>
          </div>
        }
      }

      function genAppend() {
        if (props.close) {
          return <g-icon onClick={(e) => {
            e.stopPropagation();
            context.emit('close', props.value);
          }} class={'g-icon__right'} size="18px">{props.closeIcon}</g-icon>
        }
      }

      function genContent() {
        return <span class={'g-chip__content'}>
          {genPrepend()}
          {context.slots.default && context.slots.default()}
          {genAppend()}
        </span>
      }

      function genChip() {
        if (props.ripple) {
          return <span v-ripple draggable={props.draggable} style={styles.value} onClick={() => context.emit('click', props.value)} class={['g-chip', classes.value, getSizeClass()]}>
            {genContent()}
          </span>
        }
        return <span draggable={props.draggable} style={styles.value} onClick={() => context.emit('click', props.value)} class={['g-chip', classes.value, getSizeClass()]}>
          {genContent()}
        </span>
      }

      return {
        genChip
      }
    },
    render() {
      return getScopeIdRender()(this.genChip)();
    }
  }
</script>

<style scoped lang="scss">
	@import "GChip";
</style>
