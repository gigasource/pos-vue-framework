<script>
  import { genHeaderFactory, getExpansionModel } from './GExpansionFactory';
  import { provide } from '@vue/composition-api';

  export default {
    name: 'GSections',
    props: {
      mandatory: Boolean,
      multiple: Boolean,
      value: null,

      itemHeader: {
        default: 'header',
        type: [String, Function]
      },
    },
    setup(props, context) {
      const { model, toggleItem, isActiveItem } = getExpansionModel(props, context)

			provide ('toggleItem', toggleItem)
			provide ('isActiveItem', isActiveItem)


      function genSections() {
        return <div class='g-sections'>
          {context.slots.default ? context.slots.default() : undefined}
        </div>
      }

      return {
        genSections
      }
    },
    render() {
      return this.genSections()
    }
  }
</script>

<style lang="scss" scoped>
	.g-sections {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		list-style-type: none;
		padding: 0;
		z-index: 1;

		> * {
			cursor: auto;
		}

		> *:last-child {
			border-bottom: 1px solid #E0E0E0;
		}
	}
</style>
