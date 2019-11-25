<template>
	<div :style="styles" class="select-form">
		<g-simple-table dense width="100%">
			<tr>
				<th>Type</th>
				<th>SlotScope</th>
				<th>Local</th>
				<th></th>
			</tr>
			<template v-for="i in Math.max(type.length, scopedSlot.length, local.length)">
				<tr>
					<td>
						<p-o-s-select :items="type[i-1].items" :placeholder="type[i-1].text" append-icon="icon-arrow-down" append-svg item-value="text" itemText="text" v-if="i<=type.length" v-model="internalValue.type[i-1]">
							<template class="listItem" v-slot:itemInList="{item, isSelected}">
								<g-list-item :value="item">
									<g-list-item-content>
										{{item.text}}
									</g-list-item-content>
									<g-list-item-action>
										<g-icon size="8" v-show="isSelected">check</g-icon>
									</g-list-item-action>
								</g-list-item>
							</template>
						</p-o-s-select>
					</td>
					<td>
						<p-o-s-select :items="scopedSlot[i-1].items" :placeholder="scopedSlot[i-1].text" append-icon="icon-arrow-down" append-svg item-value="text" itemText="text" v-if="i<=scopedSlot.length" v-model="internalValue.scopedSlot[i-1]">
							<template class="listItem" v-slot:itemInList="{item, isSelected}">
								<g-list-item :value="item">
									<g-list-item-content>
										{{item.text}}
									</g-list-item-content>
									<g-list-item-action>
										<g-icon size="8" v-show="isSelected">check</g-icon>
									</g-list-item-action>
								</g-list-item>
							</template>
						</p-o-s-select>
					</td>
					<td>
						<p-o-s-select :items="local[i-1].items" :placeholder="local[i-1].text" append-icon="icon-arrow-down" append-svg item-value="text" itemText="text" v-if="i<=local.length" v-model="internalValue.local[i-1]">
							<template class="listItem" v-slot:itemInList="{item, isSelected}">
								<g-list-item :value="item">
									<g-list-item-content>
										{{item.text}}
									</g-list-item-content>
									<g-list-item-action>
										<g-icon size="8" v-show="isSelected">check</g-icon>
									</g-list-item-action>
								</g-list-item>
							</template>
						</p-o-s-select>
					</td>
					<td>
						<g-icon @click="deleteSelection(i)" svg x-small>icon-trash2</g-icon>
					</td>
				</tr>
			</template>
		</g-simple-table>
	</div>


</template>
<script>
  import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
  import POSSelect from '../../POSComponents/POSInput/POSSelect';
  import GIcon from '../../components/GIcon/GIcon';
  import GListItem from '../../components/GList/GListItem';
  import { GListItemAction, GListItemContent, GListItemText } from '../../components/GList/GListFunctionalComponent';
  import { computed, set } from '@vue/composition-api';
  import { getInternalValue } from '../../utils/helpers';

  export default {
    name: 'SelectForm',
    components: { GListItem, POSSelect, GSimpleTable, GIcon, GListItemContent, GListItemText, GListItemAction },
    props: {
      top: { type: String, default: '400px' },
      left: { type: String, default: '25px' },
      width: { type: String, default: '308px' },
      height: { type: String, default: '146px' },
      type: {
        type: Array, default: () => {
          return []
        }
      },
      scopedSlot: {
        type: Array, default: () => {
          return []
        }
      },
      local: {
        type: Array, default: () => {
          return []
        }
      },
      typeValue: {
        type: Array, default: () => {
          return []
        }
      },
      scopedSlotValue: {
        type: Array, default: () => {
          return []
        }
      },
      localValue: {
        type: Array, default: () => {
          return []
        }
      },
      value: Object,

    },
    setup: function (props, context) {
      const styles = computed(() => ({
        ...props.height && { 'height': props.height },
        ...props.width && { 'width': props.width },
        ...props.top && { 'top': props.top },
        ...props.left && { 'left': props.left }
      }));
      const deleteSelection = (i) => {
        for (let key of _.keys(internalValue.value)) {
          internalValue.value[key][i - 1] && internalValue.value[key].splice(i - 1, 0, '')
        }
      }
      const internalValue = getInternalValue(props, context)
      set(internalValue.value, 'type', props.type.map(obj => ''));
      set(internalValue.value, 'scopedSlot', props.scopedSlot.map(obj => ''));
      set(internalValue.value, 'local', props.local.map(obj => ''));


      return {
        styles,
        deleteSelection,
        internalValue,
      }
    }
  }
</script>
<style lang="scss" scoped>

	.select-form {

		position: absolute;
		background: #FFFFFF;
		border: 1px solid #E0E0E0;
		box-sizing: border-box;
	}

	.g-table::v-deep {
		height: 100%;
		position: absolute;
		padding-top: 16px;
		padding-left: 16px;
		background: #FFFFFF;
		border: 1px solid #E0E0E0;
		box-sizing: border-box;

		td {
			padding: 0;
			height: 22px;

			&:last-of-type {
				padding-right: 3px;
				padding-left: 3px;
			}
		}

		th {
			padding: 0 0 0 6px;
			height: 22px;
			font-family: Roboto;
			font-style: normal;
			font-weight: bold;
			font-size: 12px;
			line-height: 22px;
			text-align: left;
			text-transform: capitalize;
			color: #424242;
		}

	}

	.g-select::v-deep {
		.g-list {
			color: #00b0ff;
		}

		.g-menu--activator {
			margin-bottom: 8px;

			.g-tf-wrapper {
				width: 100%;

				fieldset {
					min-inline-size: fit-content;
				}

				margin: 0;

			}

			.g-tf {
				padding: 2px;
				height: 24px;

				.input {
					padding: 0 0 0 6px;
					height: 22px;
					width: min-content;
				}

				&-input {
					font-size: 12px;
					line-height: 22px;
					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					align-self: center;
					color: #424242 !important;
				}

				.selections {
					div {
						width: max-content;
					}
				}

				background-color: transparent;

				&:hover {
					padding: 1px;
					border: 1px solid #E0E0E0;
				}

				&-append__inner {
					float: right;

					.g-icon {
						margin: 0;
						float: right;
						width: 6px !important;
						height: 6px !important;
					}

				}

				&-append__outer {
					margin: 0;
				}
			}
		}

	}

	.g-select__active::v-deep {
		.g-menu--activator {
			.g-tf {
				padding: 1px;
				background-color: transparent;
				border: 1px solid #1080EC;

				&:hover {
					border: 1px solid #1080EC;
				}
			}
		}
	}

	.g-list-item {
		padding: 0;
		min-height: auto;
		display: flex;
		align-items: center;

		font-weight: normal;
		font-size: 12px;
		line-height: 22px;

		&-content {
			margin-left: 8px !important;
		}

		&-action {
			margin: 0 8px 0 0;
		}

		::before {
			display: none;
		}
	}

	.g-list-item::before {
		display: none;
	}
</style>
