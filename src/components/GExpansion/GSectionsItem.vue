<script>
  import { computed, inject } from '@vue/composition-api';
  import { GExpandTransition } from '../transition/transition';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GSectionsItem',
    components: {
      GIcon, GExpandTransition
    },
    props: {
      item: null
		},
    setup (props, context) {
      const genHeaderText = inject('genHeaderText')
			const toggleItem = inject('toggleItem')
			const isActiveItem = inject('isActiveItem')

      const genHeader = function () {
        return <div
          class={['g-sections-item-header', { 'g-sections-item-header__active': isActiveItem(props.item) }]}
          vOn:click={() => toggleItem(props.item)}>
          {genHeaderText.value(props.item)}
          <div class="g-sections-item-header-append">
            <g-icon small svg>icon-arrow-right</g-icon>
          </div>
        </div>
      }

      const genContent = function () {
        return <g-expand-transition>
          <div
            class={['g-sections-item-content', { 'g-sections-item-content__active': isActiveItem(props.item) }]}
            vShow={isActiveItem(props.item)}>
            <div class="g-sections-item-content-wrapper">
              {context.slots.default ? context.slots.default() : undefined}
            </div>
          </div>
        </g-expand-transition>
      }

      const genSectionsItem = function () {
				return <div class="g-sections-item">
					{genHeader()}
					{genContent()}
				</div>
			}

			return {
        genSectionsItem
			}
		},
		render() {
      return this.genSectionsItem()
		}
  }
</script>
<style scoped lang="scss">
	@import './variable';

	.g-sections-item {
		flex: 1 0 100%;
		max-width: 100%;
		position: relative;
		background-color: #FFFFFF;
		transition: .3s map-get($transition, 'swing');

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

				.g-sections-header-prepend > ::v-deep.g-icon {
					transform: rotate(90deg)
				}

				.g-sections-header-append > ::v-deep.g-icon {
					transform: rotate(90deg)
				}
			}

			::v-deep.g-icon {
				transition: .4s map-get($transition, 'ease-in-out');
			}
		}

		&-content {
			display: flex;
			font-size: 12px;

			&-wrapper {
				//border-top: 1px solid #E0E0E0;
				padding: 0 16px 16px 16px;
				flex: 1 1 auto;
				max-width: 100%;
				//background-color: rgb(242, 244, 248);
			}
		}
	}
</style>