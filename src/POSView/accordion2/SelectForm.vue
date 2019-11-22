<template>
	<g-simple-table dense width="308px" height="146px">
		<thead>
		<tr>
			<th>Type</th>
			<th>SlotScope</th>
			<th>Local</th>
			<th></th>
		</tr>
		<template v-for="i in type.length">
			<tr>
				<td>
					<p-o-s-select  v-model="selectedType[i-1][type[i-1].text]" :placeholder="type[i-1].text" :items="type[i-1].items" itemText="text" item-value="">
					</p-o-s-select>
				</td>
				<td>
					<p-o-s-select  v-model="selectedScopedSlot[i-1][scopedSlots[i-1].text]" :placeholder="scopedSlots[i-1].text" :items="scopedSlots[i-1].items" itemText="text" item-value="" >
					</p-o-s-select>
				</td>
				<td>
					<p-o-s-select v-model="selectedLocal[i-1][local[i-1].text]" :placeholder="local[i-1].text" :items="local[i-1].items" itemText="text" item-value="">
					</p-o-s-select>
				</td>
				<td>
					<g-icon @click="deleteSelection(i, selectedType, selectedLocal, selectedScopedSlot)" svg>icon-trash</g-icon>
				</td>
			</tr>
		</template>
		</thead>
	</g-simple-table>
</template>
<script>
  import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
  import _ from 'lodash'
  import POSSelect from '../../POSComponents/POSInput/POSSelect';
  import GIcon from '../../components/GIcon/GIcon';

  export default {
    name: 'SelectForm',
    components: { POSSelect, GSimpleTable, GIcon },
    props: {},
    data() {
      return {

        type: [
          { text: 'prop', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
					{ text: 'emit', items:[{ text: 'click' }, { text: 'block' }, { text: 'inline' }], },
					{ text: 'emit2', items:[{ text: 'input' }, { text: 'block' }, { text: 'inline' }] }],
        scopedSlots: [
          { text: 'File', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
					{ text: 'abc', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
					{ text: 'remove', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], }],
        local: [
          { text: 'Home', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
					{ text: 'Park', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], },
					{ text: 'River', items: [{ text: 'flex' }, { text: 'block' }, { text: 'inline' }], }],

        selectedType: [{prop: null}, {emit1: null}, {emit2: null}],
        selectedScopedSlot: [{File: null}, {abc: null}, {remove: null}],
        selectedLocal: [{Home: null}, {Park: null}, {River: null}]
      }

    },
    setup: function (props, context) {
      const deleteSelection = (i, list1, list2, list3 ) => {
        list1[i-1][Object.keys(list1[i-1])[0]] = null
        list2[i-1][Object.keys(list2[i-1])[0]] = null
        list3[i-1][Object.keys(list3[i-1])[0]] = null
			}
      return {
        deleteSelection
      }
    }
  }
</script>
<style lang="scss" scoped>
	.g-table::v-deep{
		td{
			padding: 0;
			height: 22px
		}
		th{
			height: 22px;
			padding-top: 16px;
			padding-left: 16px;
			font-family: Roboto;
			font-style: normal;
			font-weight: bold;
			font-size: 12px;
			line-height: 22px;
		}
	}
.g-select::v-deep{
	.g-menu--activator{
		.g-tf-wrapper{
			margin: 0;

		}
		.g-tf{
			.input{
				padding: 0 0 0 16px;
			}
			&-input {
				font-size: 12px;
				line-height: 22px;
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				align-self: center;

			}
			background-color: transparent;
			box-sizing: border-box;
			&:hover{
				border: 1px solid #1d1d1d;
			}
		}
	}

}
.g-select__active::v-deep{
	.g-menu--activator{
		.g-tf{
			background-color: transparent;
			box-sizing: border-box;
			border: 2px solid #0e5bad;
			&:hover{
				border: 2px solid #0e5bad;
			}
		}
	}

}
</style>
