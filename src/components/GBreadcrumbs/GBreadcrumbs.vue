<script>
  import { GBreadcrumbsDivider } from './GBreadcrumbsFunctionalComponent';
  import GBreadcrumbsItem from './GBreadcrumbsItem';
  import GBreadcrumbItemUtil from './logic/GBreadrcumbsItemUtil';


  export default {
    name: 'GBreadcrumbs',
    components: { GBreadcrumbsItem, GBreadcrumbsDivider },
    props: {
      divider: {
        type: String,
        default: '/',
      },
      items: {
        type: Array,
        default: [],
      },
      large: Boolean,
    },
    setup(props, context) {

      const { breadcrumbClasses } = GBreadcrumbItemUtil(props, context);

      function genDivider() {
        return <g-breadcrumbs-divider> {(context.slots.divider && context.slots.divider()) || props.divider} </g-breadcrumbs-divider>
      }

      function genItems() {
        const items = [];
        const keys = [];

        for (const item of props.items) {
          keys.push(item.text);
          if (!!context.slots.item) {
            items.push(context.slots.item({ item }))
          } else {
            const nodeData = {
              key: keys.join('.'),
              props: item,
            };

            items.push(<g-breadcrumbs-item {...nodeData}>{item.text}</g-breadcrumbs-item>)
          }
        }
        return items
      }


      function genBreadcrumbs() {
        return <ul class={breadcrumbClasses.value}>
          {(context.slots.default && context.slots.default()) || genItems().map((item, index) => ([
            item,
            index !== props.items.length - 1 && genDivider()
          ]))}
        </ul>
      }

      return {
        genBreadcrumbs
      }
    }, render(createElement, context) {
      return this.genBreadcrumbs()
    }
  }
</script>

<style lang="scss" scoped>
  @import './_variables';

  // Block
  .g-breadcrumbs {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex: $breadcrumbs-flex;
    list-style-type: none;
    margin: $breadcrumbs-margin;
    padding: $breadcrumbs-padding;

    li {
      align-items: center;
      display: inline-flex;
      font-size: $breadcrumbs-item-font-size;

      .g-icon {
        font-size: $breadcrumbs-item-large-font-size;
      }

      &:nth-child(even) {
        padding: $breadcrumbs-even-child-padding
      }
    }
  }

  // Element
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

  ::v-deep.g-breadcrumbs-divider {
    color: rgba(0, 0, 0, 0.38);
  }

  // Modifier
  .g-breadcrumbs__large {
    li {
      font-size: $breadcrumbs-item-large-font-size;
    }

    .g-icon {
      font-size: $breadcrumbs-item-large-font-size;
    }
  }

</style>
