<script>
  import { computed, inject } from 'vue'
  import { isEqual } from 'lodash'
  import { colors } from '../../utils/colors';
  import { isCssColor } from '../../mixins/colorable';
  import {getScopeIdRender} from '../../utils/helpers';

  export default {
    name: 'GTab',
    props: {
      disabled: Boolean,
      value: {
        required: false
      },
      item: null,
      activeClass: {
        type: String,
        default: 'g-tab__active'
      },
      activeTextColor: String,
      ripple: {
        type: Boolean,
        default: true
      }
    },
    setup(props, context) {
      const model = inject('model', null);
      const isActive = computed(() => (model && isEqual(model.value, props.item)));

      const classes = computed(() => ({
        'g-tab': true,
        'waves-effect': props.ripple,
        [props.activeClass]: isActive.value,
        'g-tab__disabled': props.disabled || (props.item && props.item.disabled)
      }));

      const slideStyles = inject('slider-styles');

      const activeTextColor = computed(() => props.activeTextColor
          ? isCssColor(props.activeTextColor)
              ? props.activeTextColor
              : colors[props.activeTextColor.trim().split(' ').join('-')]
          : slideStyles['background-color'])

      const styles = computed(() => ({
        ... isActive.value && { color: activeTextColor.value}
      }))

      function toggle() {
        if (props.disabled) return;
        model.value = props.item;
      }

      const listeners = {
        onClick: toggle
      }

      const genTab = () =>
        <div class={classes.value} {...listeners} style={styles.value}>
          {context.slots.default()}
        </div>
      return {
        genTab
      }
    },
    render() {
      const scopeIdRender = getScopeIdRender();
      return scopeIdRender(this.genTab)();
    }
  }
</script>

<style scoped lang="scss">
	@import "../../style/variables";

	.g-tab {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 0 1 auto;
		align-items: center;
		font-size: 14px;
		font-weight: 400;
		justify-content: center;
		line-height: normal;
		min-width: 90px;
		max-width: 360px;
		outline: none;
		padding: 0 16px;
		text-align: center;
		text-decoration: none;
		text-transform: uppercase;
		transition: none;
		user-select: none;
		cursor: pointer;

		&:before {
			position: absolute;
			content: '';
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			opacity: 0;
			background-color: currentColor;
			pointer-events: none;
			transition: $primary-transition;
		}

		&:hover:before {
			opacity: 0.24;
		}

		&__disabled {
			opacity: 0.42;
			cursor: none;
			pointer-events: none;
		}

		&:not(.g-tab__active):not(.g-tab__disabled) {
			opacity: 0.7;
		}

		> i,
		> :deep .g-icon {
			order: 0;
			margin-bottom: 6px;
		}

		> *:not(i):not(.g-icon) {
			order: 1;
		}
	}
</style>
