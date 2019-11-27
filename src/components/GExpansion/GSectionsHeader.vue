<script>
    import {computed, inject} from '@vue/composition-api';
    import {convertToUnit} from '../../utils/helpers';
    import {addOnceEventListener} from "../../utils/helpers";
    import GIcon from '../GIcon/GIcon';

    export default {
        name: 'GSectionsHeader',
        components: {GIcon},
        props: {
            height: Number,
            item: null,
            headerText: String
        },
        setup(props, context) {
            const toggleItem = inject('toggleItem')
            const isActiveItem = inject('isActiveItem')

            const headerStyles = computed(() => ({
                height: convertToUnit(props.height)
            }))

            const genDefaultHeader = function () {
                return [
                    props.headerText,
                    <div class="g-sections-item-header-append">
                        <g-icon small svg>icon-arrow-right</g-icon>
                    </div>
                ]
            }

            const genHeader = function () {
                return <div
                    class={['g-sections-header', {'g-sections-header__active': isActiveItem(props.item)}]}
                    vOn:click={() => toggleItem(props.item)}
                    vOn:mousedown={onMouseDown}
                    vOn:mouseup={onMouseUp}
                    style={headerStyles.value}>
                    {context.slots.default ? context.slots.default() : genDefaultHeader()}
                </div>
            }

            return {
                genHeader
            }
        },
        render() {
            return this.genHeader()
        }
    }

    function onMouseDown(e) {
        e.target.parentNode.setAttribute('draggable', true)
    }

    function onMouseUp(e) {
        e.target.parentNode.setAttribute("draggable", false)
    }

</script>
<style scoped lang="scss">
	@import './variable';

	.dragging {
		border: 1px solid red !important;
	}

	.g-sections {
		&-header {
			align-items: center;
			display: flex;
			justify-content: space-between;
			line-height: 1;
			outline: none;
			position: relative;
			text-align: left;
			font-size: 12px;
			color: #BDBDBD;
			width: 100%;
			min-height: 32px;
			border-top: 1px solid #E0E0E0;
			padding: 0 16px 0 16px;

			&:before {
				background-color: currentColor;
				border-radius: inherit;
				bottom: 0;
				content: '';
				left: 0;
				opacity: 0;
				pointer-events: none;
				position: absolute;
				right: 0;
				top: 0;
			}

			&-prepend {
				width: 24px;
			}

			&__active {

				.g-sections-item-header-prepend > ::v-deep.g-icon {
					transform: rotate(90deg)
				}

				.g-sections-item-header-append > ::v-deep.g-icon {
					transform: rotate(90deg)
				}
			}

			::v-deep.g-icon {
				transition: .4s map-get($transition, 'ease-in-out');
			}
		}
	}
</style>
