<script>
  import { ref, reactive, computed, watch, set, onMounted } from '@vue/composition-api';
  import _ from 'lodash'
  import GDialog from '../GDialog/GDialog';
  import GCard from '../GCard/GCard';
  import GCardTitle from '../GCard/GCardTitle';
  import { GCardText, GCardActions } from '../GCard/GCardFunctionalComponent';
  import GBtn from '../GBtn/GBtn';
  import {getInternalValue} from '../../mixins/getVModel';

  export default {
    name: "GCssCustomizerStylePreview",
    components: { GDialog, GCard, GCardTitle, GCardText, GCardActions, GBtn },
    props: {
      value: Boolean,
      cssData: Object,
    },
    setup (props, context) {
      const isActive = getInternalValue(props, context)

      const cssDisplayData = computed(() => {
        return _.map(props.cssData, (val, key) => {
          return {
            selector: key,
            data: _.compact(_.map(val.data, (val, key) => {
              let temp = ''
              if (val) temp = _.trim(val.replace(/\(|\)/g, match => ` ${match} `))
              temp = temp.split(' ')
              if (val !== undefined && val !== '') return {
                property: _.kebabCase(key),
                value: _.map(temp, (val, index, arr) => {
                  let type
                  if (val) {
                    if (val.search(/\d+/) > -1) type = 'number'
                    else if (arr[index + 1] === '(') type = 'function'
                    else if (val === '(' || val === ')') type = 'bracket'
                    else type = 'string'
                    return {
                      type: type,
                      string: val
                    }
                  }
                })
              }
            }))
          }
        })
      })

      const genText = (val, index, item) => {
        return <span class={`g-css-customizer-style-preview-${val.type}`}>
          {val.type === 'bracket' || (item[index - 1] && item[index - 1].string === '(') ? val.string : ' ' + val.string}
        </span>
      }

      const genProperty = (item) => {
        return <p class="g-css-customizer-style-preview-property">
          <span>{item.property + ':'}</span>
          {item.value.map((val, index) => genText(val, index, item.value))};
        </p>
      }

      const genSelector = (item) => {
        return <div class="g-css-customizer-style-preview">
          <p>
            <span class="g-css-customizer-style-preview-selector">{item.selector}</span>
            <span>{' {'}</span>
          </p>
          {item.data.map(item => genProperty(item))}
          <p>
            <span>{'}'}</span>
          </p>
        </div>
      }

      const genStylePreview = () => {
        return <g-dialog eager vModel={isActive.value} width={600}>
          <g-card width="100%">
            <g-card-title class="bg-grey-lighten-2">All Styles</g-card-title>
            <g-card-text>
              {cssDisplayData.value.map(selectorData => selectorData.data.length > 0 && genSelector(selectorData))}
            </g-card-text>
            <g-card-actions>
              <g-btn text vOn:click={() => isActive.value = false} textColor="blue">Close</g-btn>
            </g-card-actions>
          </g-card>
        </g-dialog>
      }

      return {
        genStylePreview,
        cssDisplayData
      }
    },
    render () {
      return this.genStylePreview()
    }
  }
</script>

<style scoped lang="scss">
  .g-css-customizer-style-preview {
    font-size: 14px;
    color: #444444;

    &-property {
      margin-left: 16px;
    }

    &-selector {
      color: #C93756;
    }

    &-number {
       color: #F16B16;
    }

    &-string {
       color: #20A471;
    }

    &-function {
      color: #725EE1;
    }

    &-quote {
      color: #212121;
    }
  }

</style>