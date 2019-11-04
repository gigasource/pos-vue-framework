<script>
  import GIcon from '../GIcon/GIcon';
  import Ripple from '../../directives/ripple/ripple';
  import GBtn from '../GBtn/GBtn';
  import GChipUtils from './logic/GChipUtils';
  import { onMounted, ref } from '@vue/composition-api';

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
      color: String,
      ripple: Boolean,
      textColor: String,
      backgroundColor: String,
      gradient: String,
      activeClass: {
        type: String,
        default: 'g-chip__active'
      }
    },
    directives: {
      Ripple
    },
    setup(props, context) {
      const { getSizeClass, classes, styles } = GChipUtils(props, context);
      const hasAvatarIcon = ref(false);

      function hasAvatarOrIcon() {
        let nodes = context.slots.default();
        return nodes[0] && nodes[0].componentInstance && (nodes[0].componentInstance.$options.name === 'GAvatar' || nodes[0].componentInstance.$options.name === 'GIcon');
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
          return <g-icon vOn:click={(e) => {
            e.stopPropagation();
            context.emit('close', props.value);
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
          return <span v-ripple draggable={props.draggable} style={styles} vOn:click={() => context.emit('click', props.value)} class={['g-chip', classes.value, getSizeClass()]}>
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
    },
    render() {
      return this.genChip();
    }
  }
</script>

<style scoped>

</style>
