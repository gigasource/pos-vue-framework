<template>
  <g-grid-layout :layout="layout" style="height: 100%">
    <div area="button-name" style="padding: 12px 10px 12px 13px;">
      <p-o-s-text-field label="Button Name" placeholder="Fill your text" v-model="buttonName">
        <template v-slot:append>
          <g-icon color="red">mdi-keyboard</g-icon>
        </template>
      </p-o-s-text-field>

    </div>
    <div area="button-action">
      <g-btn :disabled="buttonName === ''" background-color="white" elevation="0" style="position: relative; top: 50px; left: 10px;" text-color="red">
        <g-icon class="g-icon__left" size="16">mdi-minus-circle</g-icon>
        Remove button
      </g-btn>
    </div>
    <div area="function" style="padding: 9px 12px 8px 13px">
      <p class="title">Functions</p>
      <p-o-s-select :items="items"
                    clearable
                    item-Text="text"
                    placeholder="Select"
                    v-model="selectedButton"
      >
      </p-o-s-select>
    </div>

    <div area="function-action">
      <p-o-s-text-field label="Value" placeholder="Fill your value"></p-o-s-text-field>
    </div>

    <div area="color" style="padding: 8px 8px 8px 13px">
      <p class="title">Color</p>
      <g-grid-select :grid="false" :items="buttonColors" v-model="selectedColor">
        <template #default="{toggleSelect, item, index}">
          <g-btn :background-color="item.value" :key="index" :ripple="false" @click="toggleSelect(item)" style="margin-right: 17px; box-shadow: none; border-radius: 50%; width: 38px; min-width: 38px;height: 38px; border: 1px solid #D2D2D2;"></g-btn>
        </template>
        <template #selected="{toggleSelect, item, index}">
          <g-badge :badge-size="12" overlay style="margin-right: 17px;">
            <template v-slot:badge>
              <g-icon>done</g-icon>
            </template>
            <g-btn :background-color="item.value" :class="activeClass" :ripple="false" @click="toggleSelect(item)" style="box-shadow: none; border-radius: 50%; width: 38px; min-width: 38px; height: 38px;">
              {{item.optionTitle}}
            </g-btn>
          </g-badge>
        </template>
      </g-grid-select>
    </div>

    <div area="button-chooser" class="pa-2">
      <g-grid-select :grid="true" :items="buttonGroupItems" multiple v-model="selectedButtons">
        <template #default="{ toggleSelect, item, index }">
          <g-btn :ripple="false" @click="toggleSelect(item)" style="width: 100%; height: 50px;  border: 1px solid #979797; box-shadow: none">
            {{item.text}}
          </g-btn>
        </template>
        <template #selected="{ toggleSelect, item, index }">
          <g-btn :ripple="false" @click="toggleSelect(item)" style="width: 100%; height: 50px;  border: 2px solid #1271FF; box-shadow: none">{{item.text}}
          </g-btn>
        </template>
      </g-grid-select>

    </div>
    <div area="button-control" style="background-color: #EEEEEE; padding: 12px; position: relative; bottom: 0; display: flex;">
      <g-btn background-color="white" class="mr-2">
        <router-link to="/order">
          <g-icon class="mr-2" svg>icon-back</g-icon>
          <span style="color: rgba(0, 0, 0, 0.87)">Back</span>
        </router-link>
      </g-btn>

      <g-btn background-color="white" class="mr-2">
        <router-link to="/order">
          <g-icon class="mr-2" svg>icon-folder</g-icon>
          <span style="color: rgba(0, 0, 0, 0.87)">Merge/Split</span>
        </router-link>
      </g-btn>

      <g-spacer/>

      <g-btn background-color="#2979FF" class="mr-2" text-color="white" v-if="selectedButtons.length === 2" width="114">
        Merge
      </g-btn>

      <g-btn background-color="#2979FF" class="mr-2" text-color="white" v-if="quickCashClicked === true" width="114">
        Split
      </g-btn>
    </div>
    <div area="menu">
      <g-btn :key="i" :style="item.style ? item.style : ''" background-color="#fff" elevation="0"
             height="100%" text-color="#1d1d26" v-for="(item, i) in menu">
        {{item.title}}
      </g-btn>
    </div>

    <div area="menu__overlay" class="menu-disabled" style="background-color: rgba(255, 255, 255, 0.54); z-index: 99;">

    </div>
    <div area="main">
      <g-scroll-window :show-arrows="false" area="window" v-model="window">
        <g-scroll-window-item :key="i" v-for="(items, i) in listItems">
          <g-btn :background-color="item.color" :key="i" flat height="100%" v-for="(item, i) in items">{{item.title}}</g-btn>
        </g-scroll-window-item>
      </g-scroll-window>

      <g-item-group :items="listItems" :return-object="false" area="delimeter" mandatory v-model="window">
        <template v-slot:default="{ toggle, active }">
          <template v-for="(item, index) in listItems">
            <g-item :is-active="active(item)" :key="index">
              <g-btn @click="toggle(item)"></g-btn>
            </g-item>
          </template>
        </template>
      </g-item-group>
    </div>

    <div area="main__overlay" class="menu-disabled" style="background-color: rgba(255, 255, 255, 0.54); z-index: 99;"></div>

    <div area="function-overlay" style="background-color: rgba(255, 255, 255, 0.54); z-index: 99;" v-if="selectedButtons.length === 2"></div>
    <div area="keyboard__overlay" style="background-color: rgba(255, 255, 255, 0.54); z-index: 99;"></div>

    <g-number-keyboard :items="numpad_1" @submit="dialogProductSearch = true" area="keyboard" v-model="number">
      <template v-slot:screen>
        <div class="number-key-show ba-thin bg-grey-lighten-3" style="height: calc(16.6667% - 4px)">
          <input class="number-key-text col-12 self-center bg-transparent fs-large-2 fw-700 pl-2" id="number_key_output" style="border: none; outline: none" v-model="number">
        </div>
      </template>
    </g-number-keyboard>

    <div area="buttons">
      <g-btn height="100%" outlined>F1</g-btn>
      <g-btn @click="dialogChangePrice = true" height="100%" outlined>Change Price</g-btn>
      <g-btn height="100%" outlined>Note</g-btn>
      <g-btn @click="dialogProductLookup = true" height="100%" outlined>Product Lookup</g-btn>
      <g-btn disabled height="100%" outlined>Disabled Button</g-btn>
      <g-btn height="100%" outlined>Discount</g-btn>
      <g-btn height="100%" outlined></g-btn>
      <g-btn height="100%" outlined>Plastic Refund</g-btn>
      <div area="btn__big">
        <g-btn :active="quickCashClicked" :active-class="quickCashActive" @click="quickCashClicked = !quickCashClicked" background-color="green lighten 1" height="100%" text text-color="#ffffff" width="100%">
          Quick Cash
        </g-btn>
      </div>
      <g-btn background-color="orange lighten 1" height="100%" text text-color="white">
        Save
      </g-btn>
      <g-btn background-color="blue darken 2" height="100%" text>
        <router-link to="/payment">
          <span class="text-white">Pay</span>
        </router-link>
      </g-btn>
    </div>


  </g-grid-layout>
</template>

<script>
  import functionButtonLayout from './functionButtonLayout'
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';
  import GBtn from '../../components/GBtn/GBtn';
  import GIcon from '../../components/GIcon/GIcon';
  import GTextField from '../../components/GInput/GTextField';
  import GSelect from '../../components/GSelect/GSelect';
  import GGridSelect from '../../components/GGridSelect/GGridSelect';
  import GBadge from '../../components/GBadge/GBadge';
  import GSpacer from '../../components/GLayout/GSpacer';
  import GScrollWindow from '../../components/GWindow/GScrollWindow';
  import GItemGroup from '../../components/GItemGroup/GItemGroup';
  import GNumberKeyboard from '../../components/GKeyboard/GNumberKeyboard';
  import GScrollWindowItem from '../../components/GWindow/GScrollWindowItem';
  import GItem from '../../components/GItemGroup/GItem';
  import POSTextField from '../../POSComponents/POSInput/POSTextField';
  import POSSelect from '../../POSComponents/POSInput/POSSelect';

  export default {
    name: 'FunctionButton',
    components: { POSSelect, POSTextField, GItem, GScrollWindowItem, GNumberKeyboard, GItemGroup, GScrollWindow, GSpacer, GBadge, GGridSelect, GSelect, GTextField, GIcon, GBtn, GGridLayout },
    data: () => ({
      layout: functionButtonLayout,
      activeClass: 'color-select-active',
      quickCashClicked: false,
      quickCashActive: 'quick-cash-active',
      selectedButton: null,
      buttonName: '',
      number: 0,
      selectedColor: null,
      buttonGroupItems: [
        { area: 'btn-1', disabled: true, text: 'Note', value: 'Note' },
        { area: 'btn-2', disabled: false, text: 'F5', value: 'F5' },
        { area: 'btn-3', disabled: true, text: '', value: '1' },
        { area: 'btn-4', disabled: true, text: '', value: '2' },
        { area: 'btn-5', disabled: false, text: 'F1', value: 'F1' },
        { area: 'btn-6', disabled: false, text: 'F2', value: 'F2' },
        { area: 'btn-7', disabled: false, text: 'F3', value: 'F3' },
        { area: 'btn-8', disabled: false, text: 'F4', value: 'F4' },
      ],
      selectedButtons: [],
      items: [
        { text: 'Jason Oner', subtitle: 'Jason the ant', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Ranee Carlson', value: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { text: 'Cindy Baker', value: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { text: 'Ali Connors', value: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      buttonColors: [
        {
          id: 1,
          text: 'black',
          value: 'black'
        },
        {
          id: 2,
          text: 'purple',
          value: 'purple'
        },
        {
          id: 3,
          text: 'green',
          value: 'green'
        },
        {
          id: 4,
          text: 'blue',
          value: 'blue'
        },
        {
          id: 5,
          text: 'violet',
          value: 'violet'
        },
        {
          id: 6,
          text: 'red',
          value: 'red'
        },
        {
          id: 7,
          text: 'orange',
          value: 'orange'
        },
      ],
      numpad_1: [
        { content: ['7'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key7; border: 1px solid #979797' },
        { content: ['8'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key8; border: 1px solid #979797' },
        { content: ['9'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key9; border: 1px solid #979797' },
        { content: ['4'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key4; border: 1px solid #979797' },
        { content: ['5'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key5; border: 1px solid #979797' },
        { content: ['6'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key6; border: 1px solid #979797' },
        { content: ['1'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key1; border: 1px solid #979797' },
        { content: ['2'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key2; border: 1px solid #979797' },
        { content: ['3'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key3; border: 1px solid #979797' },
        { content: ['0'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key0; border: 1px solid #979797' },
        { content: ['00'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value, append) => (value + append), style: 'grid-area: key00; border: 1px solid #979797' },
        { content: ['x'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: (value) => value.substring(0, value.length - 1), style: 'grid-area: keyX; border: 1px solid #979797' },
        { content: ['C'], classes: 'key-number bg-white ba-blue-9 ba-thin', action: () => '0', style: 'grid-area: keyC; border: 1px solid #979797' },
        { content: ['&crarr;'], classes: 'key-number white', type: 'enter', action: () => null, style: 'grid-area: Enter; border: 1px solid #979797; background-color: #eeeeee' }
      ],
      listItems: [
        [
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
        ],
        [
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'red accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'green accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
        ],
        [
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'green accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'brown lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
          { title: 'Tiramisu', color: 'pink lighten 4' },
          { title: 'Tiramisu', color: 'teal accent 1' },
          { title: 'Tiramisu', color: 'blue lighten 3' },
          { title: 'Tiramisu', color: 'yellow accent 1' },
        ],
      ],
      menuSelected: null,
      menu: [
        { title: 'Favorite' },
        { title: 'Drink' },
        { title: 'Sport' },
        { title: 'Material' },
        { title: 'Wine' },
        { title: 'Electronic' },
        { title: 'Other 1' },
        { title: 'Other 2' },
      ],
    }),
    created() {
      this.menuSelected = this.menu[0];
      this.window = 0;
      this.delimiters = [...this.listItems.keys()];
    }
  }
</script>

<style lang="scss" scoped>
  .button-name {
    ::v-deep .bs-tf-wrapper {
      margin-left: 0;
    }
  }


  .button-name {
    ::v-deep .bs-tf-wrapper .bs-tf-input-group .bs-tf-inner-input-group {
      width: 100%;
    }
  }

  .title {
    font-size: 13px;
    line-height: 16px;
  }

  .button-chooser {
    ::v-deep .g-row .g-col {
      padding: 2.5px !important;
    }
  }

  .color {
    ::v-deep .g-row {
      margin-top: 20px;
    }
  }

  .function {
    ::v-deep .g-select .g-menu--activator .g-tf {
      border: 1px solid #ced4da !important;
    }
  }

  .quick-cash-active {
    border: 3px solid #1271FF !important;
    background-color: #EFEFEF !important;
    color: #000000 !important;
  }

  ::v-deep .g-badge {
    background-color: #1271FF !important;
    width: 12px;
    min-width: 12px;
    left: 20px;
    top: 5px;

    .g-icon {
      font-size: 10px !important;
      font-weight: bold;
    }
  }

  .function-action {
    .bs-tf-wrapper {
      padding-right: 23px;
    }
  }

  .color-select-active {
    border: 2px solid #1271FF;
  }

  .button-group-item {
    border: 1px solid #979797;
    height: 80% !important;
    box-shadow: none;
    margin: 5px;
  }


  .menu {
    background-color: #90CAF9;
    overflow-x: auto;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-auto-columns: 31.25%;
    grid-gap: 6px;
    grid-auto-flow: column;
    padding: 6px;

    &::-webkit-scrollbar {
      display: none;
    }

    &__active {
      background-color: #2979FF !important;
      color: white !important;
    }

    &:after {
      content: '';
      width: 1px;
      height: 100%;
    }
  }

  .function {
    ::v-deep .g-select .g-tf-wrapper {
      margin: 8px 0 24px 0;
    }
  }

  .g-btn {
    &.g-btn__outlined {
      border: 1px solid #979797;
      background-color: #fafafa;
    }

    &.g-btn__disabled {
      background-color: #DFDFDF;
    }

    &.g-btn__text {
      border: 0;
    }
  }
</style>
