<template>
  <div :class="tableClasses">
    <div class="g-table__wrapper"  @scroll="scroll">
      <table>
				<slot>
          <thead>
          <tr style="border: 1px solid blue">
            <th v-for="header in headers" :style="getHeaderStyles(header)" @click.stop="headerClick(header)">{{header.title}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in items" :key="i" :class="getActiveRow(item)">
            <td v-for="header in headers" :style="getCellStyles(header)" @click.stop="itemClick(item)">{{item[header.value]}}</td>
          </tr>
          </tbody>
        </slot>
      </table>
    </div>
  </div>
</template>

<script>
  import {computed, reactive} from 'vue';
  import {getCssColor} from "../../utils/colors";

	export default {
    name: 'GTable',
    props: {
      dense: Boolean,
      fixedHeader: Boolean,
      bordered: Boolean,
      hover: Boolean,
      striped: Boolean,
			elevation: [Number, String],
			selectable: Boolean,
			activeClass: {
      	type: String,
				default: 'g-table-row__active'
			},
      headers: Array,
      items: Array,
    },
    emits: ['scrolledToBottom'],
    setup(props, context) {
    	const state = reactive({
				activeItem: null,
			})

      let tableClasses = computed(() => {
        return {
          'g-table': true,
          'g-table__dense': props.dense,
          'g-table__fixed-header': props.fixedHeader,
          'g-table__striped': props.striped,
          'g-table__bordered': props.bordered,
          'g-table__hover': props.hover,
					['elevation-' + props.elevation]: props.elevation,
					'g-table__selectable': props.selectable,
        }
      });

      const getHeaderStyles = header => {
      	return {
      		... header.align && {'text-align': header.align},
					... header.backgroundColor && {'background-color': getCssColor(header.backgroundColor)},
					... header.borderColor && {'border-color': getCssColor(header.borderColor)},
					... header.color && {'color': getCssColor(header.color)}
				}
			}

      const getCellStyles = header => {
        return {
          ...header.align && {'text-align': header.align}
        }
      }

      const getActiveRow = item => {
      	if(props.selectable) {
					if(item && state.activeItem &&  item === state.activeItem)
						return props.activeClass
				}
      	return ''
			}

      const headerClick = header => {
      	context.emit('click:header', header)
			}

			const itemClick = item => {
      	if(props.selectable) {
      		state.activeItem = item
				}
      	context.emit('click:item', item)
			}

			function scroll(e) {
        var element = e.target;
        if (element.scrollHeight - element.scrollTop <= element.clientHeight + 4) {
          context.emit('scrolledToBottom')
        }
      }
      return {
        tableClasses,
				getHeaderStyles,
        getCellStyles,
				getActiveRow,
				headerClick,
				itemClick,
        scroll
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "GTable";
</style>
