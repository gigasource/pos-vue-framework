<template>
  <g-grid-layout :layout="layout" style="height: 100%;">
    <div area="category-title" class="title" style="padding: 23px 5px 17px 17px"><p>Category </p></div>
    <div area="category-content" style="padding: 23px 8px 17px 5px">
      <p style="font-size: 14px; font-weight: bold; line-height: 18px;">{{productCategory}}</p>
    </div>
    <div area="product-title" class="title" style="padding: 17px 5px 17px 17px"><p>Product </p></div>
    <div area="product-content-left" class="pa-2" style="padding: 17px 28px 45px 5px">
      <div>
        <p style="font-size: 15px; line-height: 19px">{{productName}}</p>
        <p class="product-info">{{productId}}</p>
      </div>
      <div style="display: block;">
        <p class="sub-title">Unit </p>
        <p class="product-info">{{productUnit}}</p>
      </div>
      <div>
        <p class="sub-title">Price </p>
        <p class="product-info">{{productPriceUnit}} {{productPrice}}</p>
      </div>
    </div>
    <div area="product-content-right" style="padding: 17px 28px 45px 17px">
      <div>
        <p class="sub-title">Barcode: </p>
        <p class="product-info">{{productBarcode}}</p>
      </div>
      <div>
        <span class="sub-title">Attribute:</span>
        <div class="product-info" :key="index" v-for="(attribute, index) in productAttributes">
          <span class="product-info">{{attribute.attribute}}: </span>
          <span class="product-info">{{attribute.attributeDetail}}</span>
        </div>
      </div>
    </div>
    <div area="color-title" style="padding: 10px 8px 15px 17px" class="title"><p>Color</p></div>
    <div area="color-content" style="padding: 0 5px 5px 5px;">
      <g-grid-select :grid="false" :items="buttonColors" v-model="selectedColor">
        <template #default="{toggleSelect, item, index}">
          <g-btn :background-color="item.value" :key="index" :ripple="false" @click="toggleSelect(item)" style="margin-right: 17px; box-shadow: none; border-radius: 50%; width: 38px; min-width: 38px;height: 38px; border: 1px solid #D2D2D2;"></g-btn>
        </template>
        <template #selected="{toggleSelect, item, index}">
          <g-badge overlay style="margin-right: 17px;" :badge-size="12">
            <template v-slot:badge>
              <g-icon>done</g-icon>
            </template>
            <g-btn :background-color="item.value" :class="activeClass" @click="toggleSelect(item)" style="box-shadow: none; border-radius: 50%; width: 38px; min-width: 38px; height: 38px;">
              {{item.optionTitle}}
            </g-btn>
          </g-badge>
        </template>
      </g-grid-select>
    </div>
    <div area="sorting-title" class="title" style="padding: 5px 5px 5px 17px"><p>Sorting</p></div>
    <div area="sorting-content" style="padding: 5px; display: flex;">
      <div style="position: relative; left: 70px; display: grid; grid-template-columns: 53px 62px 53px; grid-template-rows: 35px 46px 35px; grid-gap: 17px; width: 202px; height: 150px;">
        <div style="grid-column: 2 / 3; grid-row: 1 / 2; width: 62px; height: 35px;">
          <g-btn height="35" outlined style="color: #979797" width="62">
            <g-icon size="34">mdi-menu-up</g-icon>
          </g-btn>
        </div>
        <div style="grid-column: 2 / 3; grid-row: 3 / 4;">
          <g-btn height="35" outlined style="color: #979797" width="62">
            <g-icon size="34">mdi-menu-down</g-icon>
          </g-btn>
        </div>
        <div style="grid-column: 2 / 3; grid-row: 2 / 3; display: flex; justify-content: center; align-items: center;">
          <g-btn :height="46" :width="62" elevation="0" style="background-color: #EEEEEE; border: 3px solid #1271FF">5</g-btn>
        </div>
        <div style="grid-column: 1 / 2; grid-row: 2 / 3;">
          <g-btn height="46" outlined style="color: #979797; min-width: 53px;" width="53">
            <g-icon size="34">mdi-menu-left</g-icon>
          </g-btn>
        </div>
        <div style="grid-column: 3 / 4; grid-row: 2 / 3;">
          <g-btn height="46" style="color: #979797;  min-width: 53px;" width="53" outlined>
            <g-icon size="34">mdi-menu-right</g-icon>
          </g-btn>
        </div>
        <div></div>
      </div>
    </div>
    <div area="button-control" style="background-color: #EEEEEE; padding: 12px; position: relative; bottom: 0;">
      <g-btn background-color="white" class="mr-2">
        <router-link to="/order">
          <g-icon class="mr-2" svg>icon-back</g-icon>
          <span style="color: rgba(0, 0, 0, 0.87)">Back</span>
        </router-link>
      </g-btn>
    </div>

    <div area="menu">
      <g-btn :key="i" background-color="#fff" elevation="0" height="100%"
             text-color="#1d1d26" v-for="(item, i) in menu" :style="item.style ? item.style : ''">
        {{item.title}}
      </g-btn>
    </div>

    <div area="main">
      <g-scroll-window :show-arrows="false" area="window" v-model="window">
        <g-scroll-window-item :key="i" v-for="(items, i) in listItems">
          <g-btn :background-color="item.color" :key="i" :style="item.style ? item.style : ''" flat height="100%" v-for="(item, i) in items">{{item.title}}
          </g-btn>
        </g-scroll-window-item>
      </g-scroll-window>

      <g-item-group :items="listItems" :return-object="false" area="delimiter" mandatory v-model="window">
        <template v-slot:default="{ toggle, active }">
          <template v-for="(item, index) in listItems">
            <g-item :is-active="active(item)" :key="index">
              <g-btn @click="toggle(item)"></g-btn>
            </g-item>
          </template>
        </template>
      </g-item-group>
    </div>

    <g-number-keyboard :items="numpad_1" @submit="dialogProductSearch = true" area="keyboard" v-model="number">
      <template v-slot:screen>
        <div class="number-key-show ba-thin bg-grey-lighten-3" style="height: calc(16.6667% - 4px)">
          <input class="number-key-text col-12 self-center bg-transparent fs-large-2 fw-700 pl-2" id="number_key_output" style="border: none; outline: none">
        </div>
      </template>
    </g-number-keyboard>

    <div area="buttons__overlay" class="menu-disabled" style="background-color: rgba(255, 255, 255, 0.54); z-index: 99;">

    </div>

    <div area="buttons">
      <g-btn height="100%" outlined>F1</g-btn>
      <g-btn @click="dialogChangePrice = true" height="100%" outlined>Change Price</g-btn>
      <g-btn height="100%" outlined>Note</g-btn>
      <g-btn @click="dialogProductLookup = true" height="100%" outlined>Product Lookup</g-btn>
      <g-btn disabled height="100%" outlined>Disabled Button</g-btn>
      <g-btn height="100%" outlined>Discount</g-btn>
      <g-btn height="100%" outlined></g-btn>
      <g-btn height="100%" outlined>Plastic Refund</g-btn>
      <g-btn area="btn-big" background-color="green lighten 1" height="100%" text text-color="white">
        Quick Cash
      </g-btn>
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
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';
  import articleLayout from './articleLayout'
  import GIcon from '../../components/GIcon/GIcon';
  import GBtn from '../../components/GBtn/GBtn';
  import GAvatar from '../../components/GAvatar/GAvatar';
  import GGridSelect from '../../components/GGridSelect/GGridSelect';
  import GBadge from '../../components/GBadge/GBadge';
  import GItemGroup from '../../components/GItemGroup/GItemGroup';
  import GItem from '../../components/GItemGroup/GItem';
  import GNumberKeyboard from '../../components/GKeyboard/GNumberKeyboard';
  import GScrollWindow from '../../components/GWindow/GScrollWindow';
  import GScrollWindowItem from '../../components/GWindow/GScrollWindowItem';

  export default {
    name: 'Article',
    components: { GScrollWindowItem, GScrollWindow, GNumberKeyboard, GItem, GItemGroup, GBadge, GGridSelect, GAvatar, GBtn, GIcon, GGridLayout },
    data: () => ({
      layout: articleLayout,
      number: 0,
      productCategory: 'Vor- & Nachspeisen',
      productName: 'Product Name 01',
      productId: '#037187408',
      productUnit: 'Box',
      productPrice: '321',
      productPriceUnit: '€',
      productBarcode: '89748173401744339',
      productAttributes: [
        { attribute: 'Color', attributeDetail: 'Black, White' },
        { attribute: 'Age', attributeDetail: '1-2yers, 0-6mths' }
      ],
      selectedColor: null,
      activeClass: 'color-select-active',
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
          text: 'brown',
          value: 'brown'
        },
      ],
      productColor: '',
      sortKey: '',
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
        { content: ['&crarr;'], classes: 'key-number white', type: 'enter', action: () => null, style: 'grid-area: Enter; border: 1px solid #979797;' }
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
          { title: 'Tiramisu', color: 'white', style: 'border: 3px solid #1271FF; ' },
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
        { title: 'Favorite', style: 'background-color: #2979FF; color: #ffffff' },
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

  .title {
    font-size: 13px;
    font-weight: normal;
    line-height: 16px;
    color: #1D1D26;
  }

  .product-info {
    font-size: 14px;
    line-height: 18px;
  }

  .app {
    ::v-deep .layout__right {
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

      .controller {
        padding: 8px;
      }

      .main {
        padding: 6px 6px 0 6px;
        overflow: hidden;

        .g-window {
          box-shadow: none;
          width: 100%;

          .g-window__container {
            height: 100%;
          }

          .g-window-item,
          .g-scroll-window-item {
            height: 100%;
            display: grid;
            grid-template-rows: repeat(7, 1fr);
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 6px;
          }
        }

        .g-item-group {
          align-items: center;
          justify-content: center;

          .g-btn {
            width: 8px !important;
            height: 8px !important;
            border-radius: 50%;
            min-width: 0 !important;
            padding: 0 !important;
            margin: 0 6px;
            box-shadow: none;
            background-color: #E0E0E0 !important;
          }

          .g-item__active .g-btn {
            background-color: #2196F3 !important;
          }
        }
      }
    }
  }

  .controller {
    padding: 8px;
  }

  .sub-title {
    font-size: 13px;
    opacity: 0.5;
  }

  .color-select-active {
    border: 2px solid #1271FF;
  }

  .left-title {
    font-size: 13px;
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
