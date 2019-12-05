<script>
  import { inject } from '@vue/composition-api';
  import { GExpandTransition } from '../transition/transition';
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GSectionsItem',
    components: {
      GIcon, GExpandTransition
    },
    props: {
      item: null,

			header: String,
		},
    setup (props, context) {
			const isActiveItem = inject('isActiveItem')

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