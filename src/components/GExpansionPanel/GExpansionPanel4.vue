<script>
  import { GExpandTransition } from '../transition/transition';
  import { genHeaderFactory, genContentFactory } from './GExpansionPanelFactory';
  import groupable from '../../mixins/groupable';
  import { computed } from '@vue/composition-api';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GExpansionPanel4',
		components: {
      GIcon, GExpandTransition
		},
    props: {
      items: Array,
			mandatory: Boolean,
      multiple: Boolean,
      value: null,

      accordion: Boolean,
			popout: Boolean,
			inset: Boolean,

      itemHeader: {
        default: 'header',
        type: [String, Function]
      },
      itemContent: {
        default: 'content',
				type: [String, Function]
			}
    },
    setup(props, context) {
			const { model, toggleItem, isActiveItem } = getExpansionPanelModel(props, context)

			const genHeaderText = genHeaderFactory(props.itemHeader);
			const genContentText = genContentFactory(props.itemContent);

      const genHeader = function (item) {
        return <div
					class={['g-expansion-panel4-header', { 'g-expansion-panel4-header__active': isActiveItem(item) }]}
					vOn:click={() => toggleItem(item)}>
						<div class="g-expansion-panel4-header-prepend">
              <g-icon small>fas fa-caret-right</g-icon>
						</div>
						{genHeaderText.value(item)}
          </div>
      }

			const genContent = function(item) {
				return <g-expand-transition>
					<div
						class={['g-expansion-panel4-content', { 'g-expansion-panel4-content__active': isActiveItem(item) }]}
						vShow={isActiveItem(item)}>
							<div class="g-expansion-panel4-content-wrapper">
								{genContentText.value(item)}
							</div>
					</div>
        </g-expand-transition>
			}

			const expansionPanelGroupClasses = computed(() => ({
				'g-expansion-panel4-group__accordion': props.accordion,
        'g-expansion-panel4-group__popout': props.popout,
        'g-expansion-panel4-group__inset': props.inset
			}))

      function genExpansionPanelGroup() {
        return <div class={['g-expansion-panel4-group', expansionPanelGroupClasses.value]}>
          {
            props.items.map(item => <div
							class={['g-expansion-panel4', { 'g-expansion-panel4__active': isActiveItem(item)}]}>
								{genHeader(item)}
              	{genContent(item)}
            </div>)
          }
        </div>
      }

      return {
        genExpansionPanelGroup
      }
    },
    render() {
      return this.genExpansionPanelGroup()
    }
  }

  const getExpansionPanelModel = function (props, context) {
    const model = computed({
      get: () => {
        if (props.value) {
          if (props.multiple && !Array.isArray(props.value)) {
            props.value = [props.value];
          }
          return props.value;
        }
        return props.multiple ? [] : null;
      },
      set: (value) => {
        context.emit('input', value);
      }
    });

    const { toggleItem, isActiveItem } = groupable({ mandatory: props.mandatory, multiple: props.multiple }, model);

    return {
      model,
			toggleItem,
			isActiveItem
		}
  }
</script>

<style lang="scss">
	@import "variable";
	@import "../../style/elevation";

	.g-expansion-panel4 {
		flex: 1 0 100%;
		max-width: 100%;
		position: relative;
		background-color: #FFFFFF;
		margin-top: 10px;
		transition: .3s map-get($transition, 'swing');

		&-group {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			list-style-type: none;
			padding: 0;
			z-index: 1;

			> * {
				cursor: auto;
			}

			&__accordion {
				margin: 10px;
				@include elevation(4);

				> *:last-child {
					border-bottom: thin solid rgb(216, 216, 216);
				}

				> .g-expansion-panel4 {
					margin-top: 0;

					> .g-expansion-panel4-header {
						border-top: thin solid rgb(216, 216, 216);
						border-left: thin solid rgb(216, 216, 216);
						border-right: thin solid rgb(216, 216, 216);
					}

					> .g-expansion-panel4-content {
						background-color: rgb(242, 244, 248);
						border-left: thin solid rgb(216, 216, 216);
						border-right: thin solid rgb(216, 216, 216);
					}
				}
			}

			&__popout {
				.g-expansion-panel4 {
					max-width: $expansion-panel-popout-max-width;

					&__active {
						max-width: $expansion-panel-popout-active-max-width;
					}
				}
			}

			&__inset {
				.g-expansion-panel4 {
					max-width: $expansion-panel-inset-max-width;

					&__active {
						max-width: $expansion-panel-inset-active-max-width;
					}
				}
			}
		}

		&-header {
			align-items: center;
			display: flex;
			font-size: 14px;
			line-height: 1;
			min-height: $expansion-panel-header-min-height;
			outline: none;
			padding: $expansion-panel-header-padding;
			position: relative;
			text-align: left;
			width: 100%;

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

				.g-expansion-panel4-header-prepend > .g-icon {
					transform : rotate(90deg)
				}

				.g-expansion-panel4-header-append > .g-icon {
					transform : rotate(-180deg)
				}
			}
		}

		&-content {
			display: flex;

			&-wrapper {
				border-top: thin solid rgb(216, 216, 216);
				padding: 16px 24px;
				flex: 1 1 auto;
				max-width: 100%;
				//background-color: rgb(242, 244, 248);
			}
		}

	}
</style>