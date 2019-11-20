<script>
  import { convertToUnit } from '../../utils/helpers';
  import { genHeaderFactory, genContentFactory, getExpansionModel } from './GExpansionFactory';
  import { ref, computed, provide } from '@vue/composition-api';
  import GIcon from '../GIcon/GIcon';

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

      width: {
        type: [Number, String]
			},
      height: {
        type: [Number, String]
      }
    },
    setup(props, context) {
      const { model, toggleItem, isActiveItem } = getExpansionModel(props, context)

      const genHeaderText = genHeaderFactory(props.itemHeader);

      provide ('genHeaderText', genHeaderText)
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
