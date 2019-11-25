<template>
	<div class="select-form">
		<g-simple-table dense width="100%">
			<tr>
				<th>Type</th>
				<th>SlotScope</th>
				<th>Local</th>
				<th></th>
			</tr>
			<template v-for="i in type.length">
				<tr>
					<td>
						<p-o-s-select v-model="selectedType[i-1][type[i-1].text]" :placeholder="type[i-1].text" :items="type[i-1].items" itemText="text" item-value="" append-svg append-icon="icon-arrow-down">
							<template v-slot:itemInList="{item, isSelected}" class="listItem">
								<g-list-item :value="item">
									<g-list-item-content>
										{{item.text}}
									</g-list-item-content>
									<g-list-item-action>
										<g-icon v-show="isSelected">check</g-icon>
									</g-list-item-action>
								</g-list-item>
							</template>
						</p-o-s-select>
					</td>
					<td>
						<p-o-s-select v-model="selectedScopedSlot[i-1][scopedSlots[i-1].text]" :placeholder="scopedSlots[i-1].text" :items="scopedSlots[i-1].items" itemText="text" item-value="" append-svg append-icon="icon-arrow-down">
							<template v-slot:itemInList="{item, isSelected}" class="listItem">
								<g-list-item :value="item">
									<g-list-item-content>
										{{item.text}}
									</g-list-item-content>
									<g-list-item-action>
										<g-icon v-show="isSelected">check</g-icon>
									</g-list-item-action>
								</g-list-item>
							</template>
						</p-o-s-select>
					</td>
					<td>
						<p-o-s-select v-model="selectedLocal[i-1][local[i-1].text]" :placeholder="local[i-1].text" :items="local[i-1].items" itemText="text" item-value=""append-svg append-icon="icon-arrow-down">
							<template v-slot:itemInList="{item, isSelected}" class="listItem">
								<g-list-item :value="item">
									<g-list-item-content>
										{{item.text}}
									</g-list-item-content>
									<g-list-item-action>
										<g-icon v-show="isSelected">check</g-icon>
									</g-list-item-action>
								</g-list-item>
							</template>
						</p-o-s-select>
					</td>
					<td>
						<g-icon x-small svg @click="deleteSelection(i, selectedType, selectedLocal, selectedScopedSlot)">icon-trash2</g-icon>
					</td>
				</tr>
			</template>
		</g-simple-table>
	</div>

</template>
<script>
  import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
  import _ from 'lodash'
  import POSSelect from '../../POSComponents/POSInput/POSSelect';
  import GIcon from '../../components/GIcon/GIcon';
  import GListItem from '../../components/GList/GListItem';
  import { GListItemContent, GListItemText, GListItemAction } from '../../components/GList/GListFunctionalComponent';

  export default {
    name: 'SelectForm',
    components: { GListItem, POSSelect, GSimpleTable, GIcon, GListItemContent, GListItemText, GListItemAction },
    props: {},
    data() {
      return {

        type: [
          { text: 'prop', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
          { text: 'emit', items: [{ text: 'click' }, { text: 'block' }, { text: 'inline' }], },
          { text: 'emit2', items: [{ text: 'input' }, { text: 'block' }, { text: 'inline' }] }],
        scopedSlots: [
          { text: 'Computed File', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
          { text: 'abc', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
          { text: 'remove', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], }],
        local: [
          { text: 'Home', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
          { text: 'Park', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
          { text: 'River', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], }],

        selectedType: [{ prop: null }, { emit1: null }, { emit2: null }],
        selectedScopedSlot: [{ File: null }, { abc: null }, { remove: null }],
        selectedLocal: [{ Home: null }, { Park: null }, { River: null }]
      }

    },
    setup: function (props, context) {
      const deleteSelection = (i, list1, list2, list3) => {
        list1[i - 1][Object.keys(list1[i - 1])[0]] = null
        list2[i - 1][Object.keys(list2[i - 1])[0]] = null
        list3[i - 1][Object.keys(list3[i - 1])[0]] = null
      }
      return {
        deleteSelection
      }
    }
  }
</script>
<style lang="scss" scoped>

	.select-form {

		position: absolute;
		width: 308px;
		height: 146px;
		left: 25px;
		top: 48px;

		background: #FFFFFF;
		/* Grey/grey lighten-2 */

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
			&:last-of-type{
				padding-right: 3px;
				padding-bottom: 8px
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
				.selections{
					div {width: max-content;}
				}

				background-color: transparent;

				&:hover {
					padding: 1px;
					border: 1px solid #E0E0E0;
				}

				&-append__inner {
					float: right;
					.g-icon{
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

</style>
