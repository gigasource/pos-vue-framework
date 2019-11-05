<script>
  import routable from '../../mixins/routable';
  import GBreadrcumbsItemUtil from './logic/GBreadrcumbsItemUtil';


  export default {
    name: 'GBreadcrumbsItem',
    props: {
      activeClass: { type: String, default: 'g-breadcrumbs-item__disabled' },
      ripple: Boolean,
    },
    watch: {
      $route: 'onRouteChange',
    },
    mixins: [routable],
    computed: {
      classes() {
        return {
          'g-breadcrumbs-item': true,
          [this.activeClass]: this.disabled,
        }
      },
    },
    render(h) {
      const { tag, data } = this.generateRouteLink();

      return h('li', [h(tag, {
        ...data,
        attrs: {
          ...data.attrs,
          'aria-current': this.isActive && this.isLink ? 'page' : undefined,
        },
      }, this.$slots.default)])
    }
  }
</script>

<style lang="scss" scoped>
  .g-breadcrumbs-item {
    color: #1976d2;
    align-items: center;
    display: inline-flex;
    text-decoration: none;
    transition: 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);

  &__disabled {
     pointer-events: none;
     color: rgba(0, 0, 0, 0.38);

   }
  }
</style>
