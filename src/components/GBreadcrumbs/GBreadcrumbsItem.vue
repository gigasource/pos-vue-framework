<script>
  import routable from '../../mixins/routable';
  import { createElement as h, computed, onMounted, watch } from '@vue/composition-api';

  export default {
    name: 'GBreadcrumbsItem',
    props: {
      activeClass: { type: String, default: 'g-breadcrumbs-item__disabled' },
      append: Boolean,
      disabled: Boolean,
      exact: {
        type: Boolean,
        default: undefined,
      },
      exactActiveClass: String,
      link: Boolean,
      href: [String, Object],
      to: [String, Object],
      replace: Boolean,
      ripple: {
        type: [Boolean, Object],
        default: null,
      },
      tag: String,
      target: String,
    },
    setup(props, context) {

      const { tag, scopedData, data } = routable(props, context, classes, styles, data);

      onMounted(function () {
        data.route = this.$route;
      });

      const classes = computed(() => {
        let _classes = {};

        if (props.to) {
          return _classes;
        }

        _classes[data.proxyClass] = data.isActive;
        _classes['g-breadcrumbs-item'] = true;
        _classes[props.activeClass] = props.disabled;

        return _classes
      });

      const isLink = computed(() => {
        return props.to || props.href || props.link
      });

      scopedData['class'] = classes.value;

      function renderItem() {
        let nodeData = {
          ...scopedData,
          attrs: {
            ...scopedData.attrs,
            'aria-current': data.isActive && isLink.value ? 'page' : undefined,
          }
        };

        return h(tag, { ...nodeData }, context.slots.default());
      }

      function genBreadcrumbsItem() {
        return <li>{renderItem()}</li>
      }

      return {
        genBreadcrumbsItem
      }
    },
    render() {
      return this.genBreadcrumbsItem();
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
