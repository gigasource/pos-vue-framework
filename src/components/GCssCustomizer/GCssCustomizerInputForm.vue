<template>
	<div>
		<g-row nowrap :style="styles" v-for="i in lineBreak" :key="i" class="g-transform container">
			<component class="item" v-for="(item, index) in list(i)" :is="dynamicTag(item)" v-bind="attrs(item)" :key="index" v-on="eventHandlers(item, index, i)">
				<template v-slot:itemPrepend="{isSelected, item}">
					<div v-if="isSelected" class="g-list-item-icon">
						<g-icon size="12px">{{item.prependIcon}}</g-icon>
					</div>
				</template>

			</component>
		</g-row>
	</div>


</template>
<script>
  import GCssCustomizerInput from './GCssCustomizerInput';
  import { computed, ref } from '@vue/composition-api';
  import GRow from '../GLayout/GRow';
  import { Fragment } from 'vue-fragment';
  import GIcon from '../GIcon/GIcon';
  import GBtn from '../GBtn/GBtn';
  import GSelect from '../GSelect/GSelect';
  import GCssCustomizerSelect from './GCssCustomizerSelect';
  import GCssCustomizerCombobox from './GCssCustomizerCombobox';

  export default {
    name: 'GCssCustomizerInputForm',
    components: { GCssCustomizerInput, GRow, Fragment, GIcon, GBtn, GSelect, GCssCustomizerSelect, GCssCustomizerCombobox },
    props: {
      top: { type: String, default: '' },
      left: { type: String, default: '' },
      width: String,
      height: String,
      componentList: {
        type: Array,
        default: () => {
          return []
        }
      },

      value: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    setup: function (props, context) {
      const lineBreak = ref(1)
      const endFlag = computed(() => {
          let endFlagIndex = []
          props.componentList.map((item, index) => {
            if (item.type === 'endLine') {
              lineBreak.value++
              endFlagIndex.push(index)
            }
          })
          return endFlagIndex
        }
      )

      const list = (i) => {
        let _i = i - 1
        if (_i === 0) return props.componentList.slice(0, endFlag.value[0])
        if (_i === endFlag.length) return props.componentList.slice(endFlag.value[_i], props.componentList.length)
        return props.componentList.slice(endFlag.value[_i - 1], endFlag.value[_i])

      }
      const attrs = (item) => {
        return {
          prefix: item.prefix,
          prependInnerIcon: item.prepend,
          value: item.value,
          svg: true,
          flat: item.icon && true,
          ripple: item.icon && false,
          items: item.type !== 'input' && item.list,
          disabled: item.disabled,
          itemText: 'text',
          itemValue: 'text',
          suffix: item.suffix,
        }
      }
      //todo: get internalValue
      //options: truyen value, sinh component tu value, v-model value
      //truyen list, computed value, emit value
      const internalValue = ref(props.value)

      const eventHandlers = (item, index, i) => {
        if (item.value) return {
          input: (e) => {
            if (item.type === 'input') return
            item.value = e
            internalValue.value[item.name] = parseInt(e) || e
            context.emit('change', internalValue.value)
          },
          enter: (e) => {
            item.value = e
            internalValue.value[item.name] = parseInt(e) || e
            context.emit('change', internalValue.value)
          },
          change: (e) => {
            item.value = e
            internalValue.value[item.name] = parseInt(e) || e
            context.emit('change', internalValue.value)
          },
        }
      }
      const styles = computed(() => ({
        ...props.height && { 'height': props.height },
        ...props.width && { 'width': props.width },
        ...props.top && { 'top': props.top },
        ...props.left && { 'left': props.left }
      }));
      const dynamicTag = (i) => {
        switch (i.type) {
          case 'input':
            return 'g-css-customizer-input'
          case 'select':
            return 'g-css-customizer-select'
          case 'combobox':
            return 'g-css-customizer-combobox'
          case undefined:
            return 'span'


        }
      }

      return {
        endFlag,
        lineBreak,
        attrs,
        list,
        styles,
        dynamicTag,
        eventHandlers,
        internalValue
      }
    }
  }
</script>
<style scoped lang="scss">


	.g-transform {
		.item {
			margin: 2px;
		}

		.g-select ~ .g-tf-wrapper {
			max-width: 22%;
		}

		&:first-child {
			padding-top: 24px;
		}


		&.g-row {
			justify-content: start;

		}


		.g-select::v-deep {

			.input {
				padding: 0 0 0 6px;

			}

			.g-tf-input {
				padding: 0;
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				line-height: 22px;
				color: rgba(0, 0, 0, 0.54);
			}
		}

		span {
		}

	}


</style>
