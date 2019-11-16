<template>
  <g-dialog v-model="dialogProductSearch">
    <g-card style="height: 650px">
      <g-card-title>
        {{searchedResult.length}} {{searchedResult.length > 1 ? 'results' : 'result'}} for product id "{{this.searchQuery}}"
        <g-spacer></g-spacer>
        <g-btn @click="dialogProductSearch = false" icon>
          <g-icon>close</g-icon>
        </g-btn>
      </g-card-title>
      <g-simple-table fixed-header height="600px" striped>
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
                      <g-badge overlay style="margin: 12px" v-model="active">
                        <template v-slot:badge>
                          <g-icon x-small>done</g-icon>
                        </template>
                        <g-btn @click="toggle(item)" outlined style="margin-left: 5px" :active="active" :class="[active ? activeClass : {}]"> {{item.optionTitle}}</g-btn>
                      </g-badge>
                    </template>
                  </g-item-group>
                </div>
              </div>
            </td>
            <td>
              <div class="result-item result-item-attribute">
                <div class="result-item-attribute-row">
                  <div class="attribute-title">
                    <span>
                      Color
                    </span>
                  </div>
                  <g-item-group :items="item.attributeOptions[0].attributeColor" v-model="item.selectedColor">
                    <template v-slot:item="{item, toggle, active}">
                      <g-badge overlay style="margin: 12px" v-model="active">
                        <template v-slot:badge>
                          <g-icon x-small>done</g-icon>
                        </template>
                        <g-btn @click="toggle(item)" outlined style="margin-left: 5px" :active="active" :class="[active ? activeClass : {}]"> {{item.optionTitle}}</g-btn>
                      </g-badge>
                    </template>
                  </g-item-group>
                </div>
                <div class="result-item-attribute-row">
                  <div class="attribute-title">
                    <span>
                      Age
                    </span>
                  </div>
                  <g-item-group :items="item.attributeOptions[1].attributeAge" v-model="item.selectedAge">
                    <template v-slot:item="{item, toggle, active}">
                      <g-badge overlay style="margin: 12px" v-model="active">
                        <template v-slot:badge>
                          <g-icon x-small>done</g-icon>
                        </template>
                        <g-btn @click="toggle(item)" outlined style="margin-left: 5px" :active="active" :class="[active ? activeClass : {}]"> {{item.optionTitle}}</g-btn>
                      </g-badge>
                    </template>
                  </g-item-group>
                </div>
              </div>
            </td>
            <td>
              <div class="result-item result-item-action" style="display: flex; justify-content: center; align-items: center;">
                <g-btn :disabled="!item.selectedColor || !item.selectedUnit || !item.selectedAge" background-color="red" text-color="white">
                  <g-icon style="margin-right: 8px">{{require('../../assets/home/ico-back.svg')}}</g-icon>
                  Create new order
                </g-btn>
              </div>
            </td>
          </tr>
          </tbody>
        </template>
      </g-simple-table>
    </g-card>
  </g-dialog>
</template>

<script>
  import GCard from '../../components/GCard/GCard';
  import GCardTitle from '../../components/GCard/GCardTitle';
  import GSimpleTable from '../../components/GSimpleTable/GSimpleTable';
  import GBtn from '../../components/GBtn/GBtn';
  import GIcon from '../../components/GIcon/GIcon';
  import GItemGroup from '../../components/GItemGroup/GItemGroup';
  import GSpacer from '../../components/GLayout/GSpacer';
  import GDialog from '../../components/GDialog/GDialog';
  import GBadge from '../../components/GBadge/GBadge';

  export default {
    name: 'dialogProductSearchResult',
    components: { GBadge, GDialog, GSpacer, GItemGroup, GIcon, GBtn, GSimpleTable, GCardTitle, GCard },
    props: {
      value: null
    },
    computed: {
      dialogProductSearch: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    },
    data: () => ({
      activeClass: 'active-attribute',
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
        },
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
    display: flex;
    padding: 5px;
  }

  .active-attribute {
    background-color: #E0E0E0 !important;
  }

  .attribute-title {
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .g-card-title {
    font-size: 16px !important;
    line-height: 20px !important;
  }

  ::v-deep .g-badge-wrapper {
    margin: 12px 12px 0 0 !important;
  }

  .g-item-group {
    display: inline-flex;
  }

  .g-card {
    overflow-y: hidden !important;
  }

  th {
    background-color: #E0E0E0;
    font-size: 14px !important;
    color: #000000 !important;
    font-weight: normal;
    line-height: 18px;
  }

  ::v-deep .g-btn__disabled {

  }
</style>
