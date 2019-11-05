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
    setup(props, context) {
      const { breadcrumbsItemClasses } = GBreadrcumbsItemUtil(props, context);

      return {
        breadcrumbsItemClasses
      }
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

<style scoped>

</style>
