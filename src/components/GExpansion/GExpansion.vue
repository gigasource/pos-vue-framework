<script>
  import { GExpandTransition } from '../transition/transition';
  import { genHeaderFactory, genContentFactory, getExpansionModel } from './GExpansionFactory';
  import { computed } from 'vue';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GExpansion',
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
      const { model, toggleItem, isActiveItem } = getExpansionModel(props, context)

      const genHeaderText = genHeaderFactory(props.itemHeader);
      const genContentText = genContentFactory(props.itemContent);

      const genHeader = function (item) {
        return <div
          class={['g-expansion-header', { 'g-expansion-header__active': isActiveItem(item) }]}
          vOn:click={() => toggleItem(item)}>
          <div class="g-expansion-header-prepend">
            <g-icon small>fas fa-caret-right</g-icon>
          </div>
          {genHeaderText.value(item)}
        </div>
      }

      const genContent = function (item) {
        return <g-expand-transition>
          <div
            class={['g-expansion-content', { 'g-expansion-content__active': isActiveItem(item) }]}
            vShow={isActiveItem(item)}>
            <div class="g-expansion-content-wrapper">
              {genContentText.value(item)}
            </div>
          </div>
        </g-expand-transition>
      }

      const expansionGroupClasses = computed(() => ({
        'g-expansion-group__accordion': props.accordion,
        'g-expansion-group__popout': props.popout,
        'g-expansion-group__inset': props.inset
      }))

      function genExpansionGroup() {
        return <div class={['g-expansion-group', expansionGroupClasses.value]}>
          {
            props.items.map(item =>
              <div
                class={['g-expansion', { 'g-expansion__active': isActiveItem(item) }]}>
                {genHeader(item)}
                {genContent(item)}
              </div>)
          }
        </div>
      }

      return {
        genExpansionGroup
      }
    },
    render() {
      return this.genExpansionGroup()
    }
  }
</script>

<style lang="scss" scoped>
	@import "variable";
	@import "../../style/elevation";

	.g-expansion {
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

				> .g-expansion {
					margin-top: 0;

					> .g-expansion-header {
						border-top: thin solid rgb(216, 216, 216);
						border-left: thin solid rgb(216, 216, 216);
						border-right: thin solid rgb(216, 216, 216);
					}

					> .g-expansion-content {
						background-color: rgb(242, 244, 248);
						border-left: thin solid rgb(216, 216, 216);
						border-right: thin solid rgb(216, 216, 216);
					}
				}
			}

			&__popout {
				.g-expansion {
					max-width: $expansion-panel-popout-max-width;

					&__active {
						max-width: $expansion-panel-popout-active-max-width;
					}
				}
			}

			&__inset {
				.g-expansion {
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

				.g-expansion-header-prepend > ::v-deep.g-icon {
					transform: rotate(90deg)
				}

				.g-expansion-header-append > ::v-deep.g-icon {
					transform: rotate(-180deg)
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
