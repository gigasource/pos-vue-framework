<template>
	<div>
		<g-row v-for="i in 3" :key="i" class="g-transform container">
			<component class="item" v-for="(item, index) in list(i)" :is="dynamicTag(item)" v-bind="attrs(item)" :key="index" v-on="eventHandlers(item, index, i)">
				<g-icon size="15" svg v-if="item.icon">{{item.icon}}</g-icon>
			</component>
		</g-row>
	</div>


</template>
<script>
  import GCssCustomizerInput from './GCssCustomizerInput';
  import { computed, ref, reactive } from '@vue/composition-api';
  import GRow from '../GLayout/GRow';
  import { Fragment } from 'vue-fragment';
  import GIcon from '../GIcon/GIcon';
  import GBtn from '../GBtn/GBtn';
  import GSelect from '../GSelect/GSelect';
  import GCssCustomizerSelect from './GCssCustomizerSelect';

  export default {
    name: 'GCssCustomizerInputForm',
    components: { GCssCustomizerInput, GRow, Fragment, GIcon, GBtn, GSelect, GCssCustomizerSelect },
    props: {
      top: { type: String, default: '' },
      left: { type: String, default: '' },
      width: String,
      height: String,
      list1: {
        type: Array,
        default: () => {
          return []
        }
      },
      list2: {
        type: Array,
        default: () => {
          return []
        }
      },
      list3: {
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
      const list = (i) => {
        switch (i) {
          case 1:
            return props.list1
          case 2:
            return props.list2
          case 3:
            return props.list3


        }
      }
      const attrs = (item) => {
        return {
          prefix: item.prefix,
          prependInnerIcon: item.prepend,
          value: item.value,
          svg: item.value && true,
          flat: item.icon && true,
          ripple: item.icon && false,
          items: item.type === 'select' && item.list,
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
          case 'button':
            return 'g-btn'
          case 'select':
            return 'g-css-customizer-select'
          case undefined:
            return 'span'


        }
      }

      return {
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
		&:first-child {
			padding-top: 24px;
		}

		&:last-child {
			border-bottom: 1px solid gray;
			padding-bottom: 10px;
		}

		&.g-row {
			justify-content: start;

		}

		.g-tf-wrapper.item ::v-deep {
			width: 33%;
		}

		.g-select::v-deep {
			width: 33%;

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
			width: 33%;
		}

	}


</style>
