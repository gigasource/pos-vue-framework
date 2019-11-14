<script>
  import { GExpandTransition } from '../components/transition/transition';
  import { genHeaderFactory, genContentFactory, getExpansionModel } from '../components/GExpansion/GExpansionFactory';
  import { computed } from '@vue/composition-api';
  import GIcon from '../components/GIcon/GIcon';
  import GBtn from '../components/GBtn/GBtn';

  export default {
    name: 'GExpansion',
    components: {
      GBtn,
      GIcon,
			GExpandTransition
    },
    props: {
      items: Array,
      mandatory: Boolean,
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
      const { model, toggleItem, isActiveItem } = getExpansionModel(props, context)

      const genHeader = function (item) {
				const promotion = item['promotion'] && <p class="promotion">{item['promotion']}</p>
				const oldPrice = item['oldPrice'] && <p class="promotion-price">{item['oldPrice']}</p>
				const oldTotal = item['oldPrice'] && <p class="promotion-price">{item['quantity'] * item['oldPrice']}</p>
        return <div
          class={['g-expansion-header', { 'g-expansion-header__active': isActiveItem(item) }]}
          vOn:click={() => toggleItem(item)}>
          <div class="flex-grow-1 pa-2" style="font-size: 15px">
						<p>{ item['name'] }</p>
						{ promotion }
          </div>
          <span class="w-10 pa-2 ta-center">
            { item['unit'] }
          </span>
          <span class="w-10 pa-2 ta-right">
            { item['quantity'] }
          </span>
          <div class="w-12 pa-2 ta-right">
						<p>{ item['price'] }</p>
						{ oldPrice }
          </div>
          <div class="w-12 pa-2 ta-right fw-700">
            <p>{ item['quantity'] * item['price'] }</p>
						{ oldTotal }
          </div>
        </div>
      }

      const genContent = function (item) {
        return <g-expand-transition>
          <div
            class={['g-expansion-content', { 'g-expansion-content__active': isActiveItem(item) }]}
            vShow={isActiveItem(item)}>
						<div class="col-4 row-flex">
							<div class="col-4 row-flex align-items-center justify-center">
								<g-btn icon small text-color="#1d1d26" style="margin: 8px 0">
									<g-icon>remove_circle_outline</g-icon>
								</g-btn>
							</div>
							<div class="col-4 row-flex align-items-center justify-center fs-large">
								<div class="h-70 w-80 row-flex align-items-center justify-center b-blue-accent-3 text-blue-accent-1 bg-white ba-thin">
                  { item['quantity'] }
								</div>
							</div>
							<div class="col-4 row-flex align-items-center justify-center">
                <g-btn icon small text-color="#1d1d26" style="margin: 8px 0">
                  <g-icon>add_circle_outline</g-icon>
                </g-btn>
							</div>
						</div>
            <div style="flex-grow: 1"></div>
            <g-btn text small text-color="#f44336" style="margin: 12px 0; letter-spacing: 0; font-size 14px">
              <g-icon small class="mr-2">remove_circle</g-icon>Remove item
            </g-btn>
          </div>
        </g-expand-transition>
      }


      function genExpansionGroup() {
        return <div class={['g-expansion-group']}>
          {
            props.items.map(item =>
              <tr
                class={['g-expansion', { 'g-expansion__active': isActiveItem(item) }]}>
								<td>
									{genHeader(item)}
                  {genContent(item)}
								</td>
              </tr>)
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
	.g-expansion-group {
		display: table-row-group;
	}

	.g-expansion-header {
		display: flex;
		color: #1c1c1c;
		line-height: 1.75;

		&__active {
			background-color: #2979FF;
			color: white
		}

		.promotion {
			color: #979797;
			margin-left: 8px;
			line-height: 1;

			&-price {
				color: #979797;
				text-decoration: line-through;
				margin-top: 4px;
				line-height: 1;
			}
		}
	}

	.g-expansion-content {
		display: flex;
		background-color: #BBDEFB;
	}
</style>
