<script>
  import routable from '../../mixins/routable';
  import { createElement as h, computed, reactive, onMounted, watch } from '@vue/composition-api';
  import { getObjectValueByPath } from '../../utils/helpers';

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

      let data = reactive({
        isActive: false,
        proxyClass: '',
        route: null
      });

      onMounted(function () {
        data.route = this.$route;
      });

      watch(() => data.route, () => onRouteChange());

      const classes = computed(() => {
        let _classes = {};

        if (props.to) {
          return _classes;
        }
        if (props.activeClass) {
          _classes[props.activeClass] = data.isActive;
        }
        if (data.proxyClass) {
          _classes[data.proxyClass] = data.isActive;
        }
        _classes['g-breadcrumbs-item'] = true;
        _classes[props.activeClass] = props.disabled;

        return _classes
      });

      const styles = computed(()=> {

      });

      function onRouteChange() {
        if (!props.to || !context.refs.link || !data.route) {
          return;
        }
        const activeClass = `${props.activeClass} ${data.proxyClass || ''}`.trim();

        const path = `_vnode.data.class.${activeClass}`;

        context.root.$nextTick(() => {
          /* istanbul ignore else */
          if (getObjectValueByPath(context.refs.link, path)) {
            toggle()
          }
        })
      }

      let toggle = () => {

      };

      const { tag, scopedData } = routable(props, context, classes, styles, data);

      const isLink = computed(() => {
        return props.to || props.href || props.link
      });

      scopedData['class'] = classes.value;
      scopedData['style'] = styles.value;

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
    }, render() {
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
