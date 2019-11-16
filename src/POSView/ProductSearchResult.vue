<template>
  <g-card>
    <g-card-title>
      {{searchedResult.length}} {{searchedResult.length > 1 ? 'results' : 'result'}} for product id "{{this.searchQuery}}"
      <g-spacer></g-spacer>
      <g-btn icon>
        <g-icon>close</g-icon>
      </g-btn>
    </g-card-title>
    <g-simple-table striped>
      <template>
        <thead>
        <tr class="search-table-row">
          <th class="text-left">Product</th>
          <th class="text-left">Unit</th>
          <th class="text-left">Attribute</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr :key="index" v-for="(item, index) in searchedResult">
          <td>
            <div class="result-item result-item-product" style="display: flex;">
              <div style="display: flex; justify-content: center; align-items: center;">
                <p>{{item.productIndex}}</p>
              </div>
              <div style="display: flex; justify-content: center; align-items: center;">
                <div style="padding: 20px;">
                  <div><p>{{item.productID}}</p></div>
                  <div><p><b>{{item.productName}}</b></p></div>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="result-item result-item-unit" style="display: flex;">
              <div style="display: flex; justify-content: center; align-items: center;">
                <g-item-group :items="item.unitOptions" v-model="item.selectedUnit">
                  <template v-slot:item="{item, toggle, active}">
                    <g-btn outlined style="margin-left: 5px"> {{item.optionTitle}}</g-btn>
                  </template>
                </g-item-group>
              </div>
            </div>
          </td>
          <td>
            <div class="result-item result-item-attribute">
              <div class="result-item-attribute-row">
                <span class="attribute-title" style="vertical-align: middle">
                  Color
                </span>
                <g-item-group :items="item.attributeOptions[0].attributeColor" v-model="item.selectedColor">
                  <template v-slot:item="{item, toggle, active}">
                    <g-btn outlined style="margin-left: 5px"> {{item.optionTitle}}</g-btn>
                  </template>
                </g-item-group>
              </div>
              <div class="result-item-attribute-row">
                <span class="attribute-title" style="vertical-align: middle">
                  Age
                </span>
                <g-item-group :items="item.attributeOptions[1].attributeAge" v-model="item.selectedAge">
                  <template v-slot:item="{item, toggle, active}">
                    <g-btn outlined style="margin-left: 5px"> {{item.optionTitle}}</g-btn>
                  </template>
                </g-item-group>
              </div>
            </div>
          </td>
          <td>
            <div class="result-item result-item-action" style="display: flex; justify-content: center; align-items: center;">
              <g-btn background-color="red" text-color="white" :disabled="!item.selectedColor || item.selectedUnit || !item.selectedAge">
                <g-icon style="margin-right: 8px">{{require('../assets/home/ico-back.svg')}}</g-icon>
                Create new order
              </g-btn>
            </div>
          </td>
        </tr>
        </tbody>
      </template>
    </g-simple-table>
  </g-card>
</template>

<script>
  import GCard from '../components/GCard/GCard';
  import GCardTitle from '../components/GCard/GCardTitle';
  import GSimpleTable from '../components/GSimpleTable/GSimpleTable';
  import GBtn from '../components/GBtn/GBtn';
  import GIcon from '../components/GIcon/GIcon';
  import GItemGroup from '../components/GItemGroup/GItemGroup';
  import GSpacer from '../components/GLayout/GSpacer';

  export default {
    name: 'ProductSearchResult',
    components: { GSpacer, GItemGroup, GIcon, GBtn, GSimpleTable, GCardTitle, GCard },
    props: {},
    data: () => ({
      searchedResult: [
        {
          productName: 'Pepsi',
          productIndex: 1,
          productID: '#32847837673',
          unitOptions: [
            { optionTitle: 'Box' },
            { optionTitle: 'Pack' },
          ],
          selectedUnit: null,
          attributeOptions: [
            { attributeColor: [{ optionTitle: 'Black' }, { optionTitle: 'White' }] },
            { attributeAge: [{ optionTitle: '1-2yrs' }, { optionTitle: '0-6mths' }] },
          ],
          selectedAge: null,
          selectedColor: null
        },
        {
          productName: 'Coca Cola',
          productIndex: 2,
          productID: '#3284783744374',
          unitOptions: [
            { optionTitle: 'Box' },
            { optionTitle: 'Pack' },
          ],
          selectedUnit: null,
          attributeOptions: [
            { attributeColor: [{ optionTitle: 'Black' }, { optionTitle: 'White' }] },
            { attributeAge: [{ optionTitle: '1-2yrs' }, { optionTitle: '0-6mths' }] },
          ],
          selectedAge: null,
          selectedColor: null
        },
        {
          productName: 'Blackbox',
          productIndex: 3,
          productID: '#3284783748372',
          unitOptions: [
            { optionTitle: 'Box' },
            { optionTitle: 'Pack' },
          ],
          selectedUnit: null,
          attributeOptions: [
            { attributeColor: [{ optionTitle: 'Black' }, { optionTitle: 'White' }] },
            { attributeAge: [{ optionTitle: '1-2yrs' }, { optionTitle: '0-6mths' }] },
          ],
          selectedAge: null,
          selectedColor: null
        },
        {
          productName: 'Samsung S99',
          productIndex: 4,
          productID: '#3284783748374',
          unitOptions: [
            { optionTitle: 'Box' },
            { optionTitle: 'Pack' },
          ],
          selectedUnit: null,
          attributeOptions: [
            { attributeColor: [{ optionTitle: 'Black' }, { optionTitle: 'White' }] },
            { attributeAge: [{ optionTitle: '1-2yrs' }, { optionTitle: '0-6mths' }] },
          ],
          selectedAge: null,
          selectedColor: null
        }
      ],
      searchQuery: 'abc'
    })
  }
</script>

<style scoped>
  .result-item-attribute-row {
    padding: 5px;
  }

  .g-item-group {
    display: inline-flex;
  }

  th {
    background-color: #E0E0E0;
    font-size: 14px;
    font-weight: normal;
    line-height: 18px;
  }

  ::v-deep .g-btn__disabled {

  }
</style>
