<script>
  import GWindowItem from '../GWindow/GWindowItem';
  import GImg from '../GImg/GImg';
  import {getScopeIdRender} from "../../utils/helpers";

  export default {
    name: 'GCarouselItem',
    components: { GImg, GWindowItem },
    props: {},
    setup(props, context) {
      function genCarouselItem() {
        return <g-window-item>
          <div class="g-carousel__item">
            {context.slots.default && context.slots.default()}
          </div>
        </g-window-item>
      }

      return {
        genCarouselItem
      }
    },
    render() {
      const genScopeId = getScopeIdRender()
      return genScopeId(this.genCarouselItem)()
    }
  }
</script>

<style lang="scss" scoped>
  .g-carousel__item {
    .g-icon {
      opacity: .5;
    }

    &__active {
      .g-icon {
        opacity: 1;
        vertical-align: middle;
      }
    }

    &:hover {
      background: none;
    }

    .g-icon {
      opacity: .8;
    }
  }
</style>
