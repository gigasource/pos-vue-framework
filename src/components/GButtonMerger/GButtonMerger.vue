<template>
  <div style="height: 100%">
    <slot :onMerge="mergeButtons" :onSplit="splitButtons" name="controller"></slot>

    <g-grid-item-selector :cols="cols" :items="internalNewItems" :rows="rows" multiple return-object v-model="selectedButtons">
      <template #default="{toggleSelect, item, index}">
        <g-btn :style="{gridRow: item.row[0] + '/' + item.row[1], gridColumn: item.col[0] + '/' + item.col[1], display: mergedButtons.indexOf(item) >= 0 ? 'none' : '', backgroundColor: item.style.backgroundColor, textColor: item.style.textColor}" @click="toggleSelect(item)" height="100%" width="100%">
          {{item.text}}
        </g-btn>
      </template>
      <template #selected="{toggleSelect, item, index}">
        <g-btn :style="{gridRow: item.row[0] + '/' + item.row[1], gridColumn: item.col[0] + '/' + item.col[1], display: mergedButtons.indexOf(item) >= 0 ? 'none' : '', backgroundColor: item.style.backgroundColor, textColor: item.style.textColor, opacity: 0.54}" @click="toggleSelect(item)" height="100%" width="100%">
          {{item.text}}
        </g-btn>
      </template>
    </g-grid-item-selector>

  </div>
</template>

<script>
  import GGridItemSelector from './GGridItemSelector';
  import GBtn from '../GBtn/GBtn';
  import _ from 'lodash'

  export default {
    name: 'ButtonMergerNew',
    components: { GBtn, GGridItemSelector },
    props: {
      items: {
        type: Array,
        default: () => []
      },
      cols: {
        type: [String, Number],
        default: '1fr 1fr 1fr 1fr'
      },
      rows: {
        type: [String, Number],
        default: '1fr 1fr'
      }
    },
    data: function () {
      return {
        selectedButtons: [],
        mergedButtons: [],
        mergeMap: {},
        internalItems: this.items,
        internalNewItems: []
      }
    },
    mounted() {
      this.internalNewItems = _.cloneDeep(this.internalItems);
    },
    methods: {
      isIncreasingSequence(numArr) {
        //let numArr = Array.prototype.slice.call(arguments);
        for (let num = 0; num < numArr.length - 1; num++) {
          if (!(numArr[num] < numArr[num + 1])) {
            return false;
          }
        }

        return true;
      },
      getGreatestMergeBoundary(mergeArray) {
        let boundary = {
          minValue: -1,
          maxValue: -1
        };
        //Add to array
        let arrayValues = [];
        for (let item of mergeArray) {
          arrayValues = arrayValues.concat(item);
        }
        //reduce to unique and sort increasing
        let distinctValue = [...new Set(arrayValues)].sort((a, b) => a - b);
        if (!this.isIncreasingSequence(distinctValue)) {
          return new Error('Invalid merge!');
        }
        boundary.minValue = distinctValue[0];
        boundary.maxValue = distinctValue[distinctValue.length - 1];

        return boundary;
      },
      mergeButtons() {
        if (this.selectedButtons.length <= 0) {
          return;
        }

        let itemMergeRows = [];
        let itemMergeCols = [];
        let itemMergeRowsRaw = [];
        let itemMergeColsRaw = [];
        let mergedButtons = []
        for (let i of this.selectedButtons) {
          let itemRow = i.row[0] + '-' + i.row[1];
          itemMergeRows.push(itemRow);
          itemMergeRowsRaw.push(i.row);
          let itemCol = i.col[0] + '-' + i.col[1];
          itemMergeCols.push(itemCol);
          itemMergeColsRaw.push(i.col);
          if (this.selectedButtons.indexOf(i) !== 0) {
            mergedButtons.push(i);
          }
        }

        //add merged buttons contained in big button
        if (mergedButtons.length > 0) {
          //for split buttons
          //if current mergeMap has the selected button then concat to its children
          if (this.mergeMap.hasOwnProperty(this.selectedButtons[0].value)) {
            this.mergeMap[this.selectedButtons[0].value] = this.mergeMap[this.selectedButtons[0].value].concat(mergedButtons);
            for (let item of mergedButtons) {
              if (this.mergeMap.hasOwnProperty(item.value)) {
                this.mergeMap[this.selectedButtons[0].value] = this.mergeMap[this.selectedButtons[0].value].concat(this.mergeMap[item.value]);
                delete this.mergeMap[item.value]
              }
            }
          } else {    //else its a new container button, add it as a new property //then remove merge map key:value that is in mergedButtons
            this.mergeMap = { ...this.mergeMap, ...{ [this.selectedButtons[0].value]: mergedButtons } };
            //If the button is the children & in mergeMap too, remove it
            for (let item of mergedButtons) {
              if (this.mergeMap.hasOwnProperty(item.value)) {
                this.mergeMap[this.selectedButtons[0].value] = this.mergeMap[this.selectedButtons[0].value].concat(this.mergeMap[item.value]);
                delete this.mergeMap[item.value]
              }
            }
          }
          this.selectedButtons[0] = { ...this.selectedButtons[0] }
        }
        this.mergedButtons = Object.assign(this.mergedButtons, this.mergedButtons.concat(mergedButtons));
        //set new grid-row
        let newRowsBoundary = this.getGreatestMergeBoundary(itemMergeRowsRaw);
        this.selectedButtons[0].row[0] = newRowsBoundary.minValue;
        this.selectedButtons[0].row[1] = newRowsBoundary.maxValue;

        //set new grid-col
        let newColsBoundary = this.getGreatestMergeBoundary(itemMergeColsRaw);
        this.selectedButtons[0].col[0] = newColsBoundary.minValue;
        this.selectedButtons[0].col[1] = newColsBoundary.maxValue;

        this.selectedButtons = [];
      },
      splitButtons() {
        let button = this.selectedButtons[0];
        if (!button) {
          return
        }
        for (let item of this.items) {
          if (item.value === this.selectedButtons[0].value) {
            this.selectedButtons[0].col[0] = item.col[0];
            this.selectedButtons[0].col[1] = item.col[1];
            this.selectedButtons[0].row[0] = item.row[0];
            this.selectedButtons[0].row[1] = item.row[1];
          }
        }
        let childrenButtons = this.mergeMap[button.value];
        //Reset styles for contained inside buttons
        for (let child of childrenButtons) {
          //reset its value in newItems by value in item
          let valueOfChild = child.value;
          let originalItem = this.items.find(x => x.value === valueOfChild);
          let newItem = this.internalNewItems.find(x => x.value === valueOfChild);
          newItem.col[0] = originalItem.col[0];
          newItem.col[1] = originalItem.col[1];
          newItem.row[0] = originalItem.row[0];
          newItem.row[1] = originalItem.row[1];

          delete this.mergeMap[button.value]
        }

        this.mergedButtons = this.mergedButtons.filter(x => !childrenButtons.includes(x))
        this.selectedButtons = [];
      }
    }
  }
</script>

<style scoped>

</style>
