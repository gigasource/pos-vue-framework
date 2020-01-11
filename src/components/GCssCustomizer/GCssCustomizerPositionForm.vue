<!--<template>-->
<!--	<div :style="styles" class="g-transform container">-->
<!--		<div class="item" v-for="i in position">-->
<!--			<component :is="dynamicTag(i)" :prefix="i.prefix">-->

<!--			</component>-->
<!--&lt;!&ndash;			<g-css-customizer-input :placeholder="position[i-1].placeholder" :prefix="position.prefix" v-model="internalValue.position[i-1]">&ndash;&gt;-->

<!--&lt;!&ndash;			</g-css-customizer-input>&ndash;&gt;-->
<!--&lt;!&ndash;		</div>&ndash;&gt;-->
<!--&lt;!&ndash;		<div class="item" v-for="i in size.length">&ndash;&gt;-->
<!--&lt;!&ndash;			<g-css-customizer-input :placeholder="size[i-1].placeholder" :prefix="size.prefix" v-model="internalValue.size[i-1]">&ndash;&gt;-->

<!--&lt;!&ndash;			</g-css-customizer-input>&ndash;&gt;-->
<!--		</div>-->
<!--	</div>-->
<!--</template>-->
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
  import { computed } from '@vue/composition-api';
  import GRow from '../GLayout/GRow';
  import { Fragment } from 'vue-fragment';
  import GIcon from '../GIcon/GIcon';
  import GBtn from '../GBtn/GBtn';
  import GSelect from '../GSelect/GSelect';
  import GCssCustomizerSelect from './GCssCustomizerSelect';

  export default {
    name: 'GCssCustomizerPositionForm',
    components: { GCssCustomizerInput, GRow, Fragment, GIcon, GBtn, GSelect, GCssCustomizerSelect },
    props: {
      top: { type: String, default: '' },
      left: { type: String, default: '' },
      width: String,
      height: String,
      category: Number,
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

      const eventHandlers = (item, index, i) => {
        if (item.value) return {
          input: (e) => {
            item.value = e
            context.emit('input', [props.list1, props.list2, props.list3])
          }
        }
        return {
          click: ''
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
