<script>
  import { GExpandTransition } from '../transition/transition';
  import groupable from '../../mixins/groupable';
  import { computed } from '@vue/composition-api';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GExpansionPanel4',
		components: {
      GIcon
		},
    props: {
      items: Array,
      multiple: Boolean,
      value: null,
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

      const itemHeader = computed(() => {
        if (typeof props.itemHeader === 'string') {
          return (item) => item[props.itemHeader];
        }
        return itemHeader;
      })

      const itemContent = computed(() => {
        if (typeof props.itemContent === 'string') {
          return (item) => item[props.itemContent];
        }
        return itemContent;
      })

      const genHeader = function (item) {
        return <div
					class={['g-expansion-panel4-header', { 'g-expansion-panel4-header__active': isActiveItem(item) }]}
					vOn:click={() => toggleItem(item)}>
						<div class="g-expansion-panel4-header-prepend">
              <g-icon small>fas fa-caret-right</g-icon>
						</div>
						{itemHeader.value(item)}
          </div>
      }

			const genContent = function(item) {
				return <div
					class={['g-expansion-panel4-content', { 'g-expansion-panel4-content__active': isActiveItem(item) }]}
					vShow={isActiveItem(item)}>
						<div class="g-expansion-panel4-content-wrapper">
							{itemContent.value(item)}
						</div>
				</div>
			}

      const genGroup = function () {
        return <div class="g-expansion-panel4-group">
          {
            props.items.map(item => <div class="g-expansion-panel4">
							{genHeader(item)}
							{genContent(item)}
						</div>)
          }
        </div>
      }
      return {
        genGroup
      }
    },
    render() {
      return this.genGroup()
    }
  }
</script>
<style lang="scss">
	@import "variable";

	.g-expansion-panel4 {
		flex: 1 0 100%;
		max-width: 100%;
		position: relative;
		background-color: #FFFFFF;
		margin-top: 10px;
		//transition: .3s map-get($transition, 'swing');

		&::before {
			 border-radius: inherit;
			 bottom: 0;
			 content: '';
			 left: 0;
			 position: absolute;
			 right: 0;
			 top: 0;
			 z-index: -1;

		 //@include elevation(2)
	  }

		&:not(:first-child)::after {
		 //border-top: thin solid rgb(216, 216, 216);
			 content: '';
			 left: 0;
			 position: absolute;
			 right: 0;
			 top: 0;
			 transition: .2s border-color map-get($transition, 'fast-out-slow-in'), .2s opacity map-get($transition, 'fast-out-slow-in')
		 }

		&__active {
			&:not(:first-child), + .g-expansion-panel3 {
		 		//margin-top: $expansion-panel-active-margin;

				&::after {
					 opacity: 0
				}
			}
		}


		&-group {
		 	//border-radius: $expansion-panel-border-radius;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			list-style-type: none;
			padding: 0;
		 	//width: 100%;
		 	//margin: 15px;
			 z-index: 1;

			> * {
				cursor: auto;
			}

			> *:first-child {
				border-top-left-radius: inherit;
				border-top-right-radius: inherit;
			}

			> *:last-child {
				border-bottom-left-radius: inherit;
				border-bottom-right-radius: inherit;
			}

			> .g-expansion-panel3 {
				&__active {
					//border-radius: $expansion-panel-border-radius;


					+ .g-expansion-panel3 {
						//border-top-left-radius: $expansion-panel-border-radius;
						//border-top-right-radius: $expansion-panel-border-radius;
					}
				}
			}
		}

		&-header {
			align-items: center;
			border-top-left-radius: inherit;
			border-top-right-radius: inherit;
			display: flex;
			font-size: 14px;
			line-height: 1;
			min-height: $expansion-panel-header-min-height;
			outline: none;
			padding: $expansion-panel-header-padding;
			position: relative;
			text-align: left;
			width: 100%;
		 	//transition: .3s min-height map-get($transition, 'swing');

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
				border-bottom: thin solid rgb(216, 216, 216);
				margin-bottom: 10px;

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
				padding: $expansion-panel-content-padding;
				flex: 1 1 auto;
				max-width: 100%;
			}
		}

	}
</style>