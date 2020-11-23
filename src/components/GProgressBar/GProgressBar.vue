<script>
  import { computed } from 'vue';
	import { setBackgroundColor, setTextColor } from '../../mixins/colorable';
  import { getInternalValue } from '../../mixins/getVModel';
  import { convertToUnit } from '../../utils/helpers';

  export default {
    name: 'GProgressBar',
    props: {
      active: {
        type: Boolean,
        default: true,
      },
      backgroundColor: {
        type: String,
        default: null,
      },
      backgroundOpacity: {
        type: [Number, String],
        default: null,
      },
      bufferValue: {
        type: [Number, String],
        default: 100,
      },
      color: {
        type: String,
        default: 'green',
      },
      height: {
        type: [Number, String],
        default: 4,
      },
      indeterminate: Boolean,
      query: Boolean,
      rounded: Boolean,
      stream: Boolean,
      striped: Boolean,
      value: {
        type: [Number, String],
        default: 0,
      },

			// Position
      absolute: Boolean,
      fixed: Boolean,
      bottom: Boolean,
      top: Boolean,
		},
    setup (props, context) {
			const internalValue = getInternalValue(props, context)

			const normalizedValue = computed(() => normalize(parseFloat(internalValue.value)))

			const normalizedBuffer = computed(() => normalize(parseFloat(props.bufferValue)))

			const normalize = (val) => {
        if (val < 0) return 0
        if (val > 100) return 100
        return val
			}

			const bgColor = computed(() => setBackgroundColor(props.backgroundColor || props.color))
      const textColor = computed(() => setTextColor(props.color))
			const color = computed(() => setBackgroundColor(props.color))

			const backgroundStyles = computed(() => ({
				opacity: props.backgroundOpacity === null ? (props.backgroundColor ? 1 : 0.3) : parseFloat(props.backgroundOpacity),
				left: convertToUnit(normalizedValue.value, '%'),
				width: convertToUnit(normalizedBuffer.value - normalizedValue.value, '%')
			}))

			const classes = computed(() => ({
        'g-progress-bar__absolute': props.absolute,
        'g-progress-bar__fixed': props.fixed,
        'g-progress-bar__query': props.query,
        // 'g-progress-bar__reactive': props.reactive,
        'g-progress-bar__rounded': props.rounded,
        'g-progress-bar__striped': props.striped,
			}))

			const bufferStyles = computed(() => ({
        width: !props.indeterminate && normalizedBuffer.value !== 100 ? convertToUnit(normalizedBuffer.value, '%') : undefined,
        height: props.active ? 0 : undefined
			}))

			const styles = computed(() => ({
        bottom: props.bottom ? 0 : undefined,
        height: props.active ? convertToUnit(props.height) : 0,
        top: props.top ? 0 : undefined,
			}))

			// Render functions
			const genCachedBackground = () => {
			  const styles = {
			    ...bgColor.value.style,
					...backgroundStyles.value
				}

			  return <div class={['g-progress-bar-background', bgColor.value.class]} style={styles}/>
			}

			const genCachedBuffer = () => {
			  return <div class="g-progress-bar-buffer" style={bufferStyles.value}/>
			}

			const genCachedIndeterminate = () => {
				return <div class={['g-progress-bar-indeterminate', {'g-progress-bar-indeterminate__active': props.active}]}>
					{genIndeterminate('long')}
          {genIndeterminate('short')}
				</div>
			}

			const genCachedBar = () => {
			  return <transition name={props.indeterminate ? 'fade-transition' : 'slide-x-transition'}>
					{props.indeterminate ? genCachedIndeterminate() : genCachedDeterminate()}
				</transition>
			}

			const genIndeterminate = (name) => {
			  return <div class={['g-progress-bar-indeterminate', {...color.value.class, [name]: true}]} style={color.value.style}/>
			}

			const genCachedDeterminate = () => {
			  const styles = {
			    ...color.value.style,
					width: convertToUnit(normalizedValue.value, '%')
				}

			  return <div class={['g-progress-bar-determinate', color.value.class]} style={styles}/>
			}

			const genCachedStream = () => {
        const styles = {
          ...textColor.value.style,
          width: convertToUnit(100 - normalizedBuffer.value, '%')
        }

				return <div class={['g-progress-bar-stream', textColor.value.class]} style={styles}/>
			}

			const genContent = () => {
				return <div class="g-progress-bar-content">
          {context.slots.default ? context.slots.default() : undefined}
				</div>
			}

			const genProgressBar = () => {
				return <div class={['g-progress-bar', classes.value]}
										role="progressbar"
										aria-valuemin={0}
										aria-valuemax={normalizedBuffer.value}
										aria-valuenow={props.indeterminate ? undefined : normalizedValue.value}
										style={styles.value}>
					{props.stream && genCachedStream()}
					{genCachedBackground()}
					{genCachedBuffer()}
					{genCachedBar()}
					{genContent()}
				</div>
			}

			return {
			  genProgressBar,
				styles
			}
		},
		render() {
      return this.genProgressBar()
		}
  }
</script>
<style lang="scss">
	@import 'variables';

	.g-progress-bar {
		background: transparent;
		overflow: hidden;
		position: relative;
		transition: .2s cubic-bezier(0.25, 0.8, 0.25, 1); //fast-in-slow-out
		width: 100%;

		&-buffer {
			height: inherit;
			left: 0;
			position: absolute;
			top: 0;
			transition: inherit;
			width: 100%;
			z-index: 1;
		}

		&-background {
			bottom: 0;
			left: 0;
			position: absolute;
			top: 0;
			transition: inherit;
		}

		&-content {
			align-items: center;
			display: flex;
			height: 100%;
			left: 0;
			justify-content: center;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: 2;
		}

		&-determinate {
			height: inherit;
			transition: inherit;
		}

		&-indeterminate {
			.long, .short {
				background-color: inherit;
				bottom: 0;
				height: inherit;
				left: 0;
				position: absolute;
				top: 0;
				width: auto;
				will-change: left, right;
			}

			&__active {
				.long {
					animation: indeterminate;
					animation-duration: 2.2s;
					animation-iteration-count: infinite;
				}

				.short {
					animation: indeterminate-short;
					animation-duration: 2.2s;
					animation-iteration-count: infinite;
				}
			}
		}

		&-stream {
			animation: stream .25s infinite linear;
			border-color: currentColor;
			border-top: 4px dotted;
			bottom: 0;
			opacity: .3;
			pointer-events: none;
			position: absolute;
			right: -8px;
			top: calc(50% - 2px);
			transition: inherit;
		}

		&-wrapper {
			overflow: hidden;
			position: relative;
			transition: inherit;
		}

		&__absolute, &__fixed {
			left: 0;
			z-index: 1;
		}

		&__absolute {
			position: absolute;
		}

		&__fixed {
			position: fixed;
		}

		&__reactive {
			.g-progress-bar-content {
				pointer-events: none;
			}
		}

		&__rounded {
			border-radius: $progress-linear-border-radius
		}

		&__striped {
			.g-progress-bar-determinate {
				background-image: $progress-linear-stripe-gradient;
				background-size: $progress-linear-stripe-background-size;
				background-repeat: repeat-x;
			}
		}

		&__query {
			.g-progress-bar-indeterminate {
				&__active {
					.long {
						animation: query;
						animation-duration: 2s;
						animation-iteration-count: infinite;
					}

					.short {
						animation: query-short;
						animation-duration: 2s;
						animation-iteration-count: infinite;
					}
				}
			}
		}
	}

	@keyframes indeterminate {
		0% {
			left: -90%;
			right: 100%;
		}

		60% {
			left: -90%;
			right: 100%;
		}

		100% {
			left: 100%;
			right: -35%;
		}
	}

	@keyframes indeterminate-short {
		0% {
			left: -200%;
			right: 100%;
		}

		60% {
			left: 107%;
			right: -8%;
		}

		100% {
			left: 107%;
			right: -8%;
		}
	}

	@keyframes query {
		0% {
			right: -90%;
			left: 100%;
		}

		60% {
			right: -90%;
			left: 100%;
		}

		100% {
			right: 100%;
			left: -35%;
		}
	}

	@keyframes query-short {
		0% {
			right: -200%;
			left: 100%;
		}

		60% {
			right: 107%;
			left: -8%;
		}

		100% {
			right: 107%;
			left: -8%;
		}
	}

	@keyframes stream {
		to {
			transform: translateX(-8px)
		}
	}
</style>
