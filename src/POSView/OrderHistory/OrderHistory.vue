<template>
  <g-grid-layout style="height: 100%" :layout="Layout" :displayPreviewColor="true">
    <div area="list-order">
      <div area="toolbar">
        <g-toolbar>
          <code-look-up text="Order No."/>
          <dialog-picker/>
          <code-look-up text="Barcode"/>
            <g-btn flat text-color="#1271FF">
              <p>Amount</p>
              <g-icon>{{filter}}</g-icon>
            </g-btn>
            <code-look-up text="Staff"/>
            <g-btn flat text-color="#1271FF">
              <p>Info</p>
              <g-icon>{{filter}}</g-icon>
            </g-btn>
        </g-toolbar>
      </div>
      <div area="list">
        <g-list style="height: 100%" :items="data.items"></g-list>
      </div>
    </div>
    <div area="order">

    </div>
    <div area="footer" class="footer">
      <div area="back">
        <router-link to="/dashboard">
          <g-btn style="width: 100%" height="100%">
            <g-icon>{{back}}</g-icon>
            <p style="margin-left: 10px">Back</p>
          </g-btn>
        </router-link>
      </div>
      <div area="delete">
        <g-btn style="width: 100%" height="100%">
          <g-icon>{{remove}}</g-icon>
          <p style="margin-left: 10px">Delete Order</p>
        </g-btn>
      </div>
      <div area="print">
        <g-btn style="width: 100%" height="100%" background-color="#2979FF" text-color="#FFFFFF">
          <g-icon>{{printer}}</g-icon>
          <p style="margin-left: 10px">Print</p>
        </g-btn>
      </div>
    </div>
  </g-grid-layout>
</template>

<script>
    import {reactive} from "@vue/composition-api";
    //import components
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import Layout from "./order.json"
    import GToolbar from "../../components/GToolbar/GToolbar";
    import GSidebar from "../../components/GSidebar/GSidebar";
    import GList from "../../components/GList/GList";
    import GDialog from "../../components/GDialog/GDialog";
    import GRangeSlider from "../../components/GRangeSlider/GRangeSlider.vue";
    import GDatePicker from "../../components/GDatePicker/GDatePicker";
    import GCard from "../../components/GCard/GCard";
    import GCardTitle from "../../components/GCard/GCardTitle";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";
    //import other components
    import DialogPicker from "./DialogPicker";
    import CodeLookUp from "./CodeLookUp";
    //import icon
    import back from "./back.svg"
    import remove from "./remove.svg"
    import printer from "./printer.svg"
    import look from "./lookup.svg"
    import filter from "./filter.svg"
    import GSpacer from "../../components/GLayout/GSpacer";

    export default {
        name: "OrderHistory",
        components: {
            DialogPicker, CodeLookUp,
            GSpacer, GGridLayout, GSidebar, GToolbar, GList, GDialog, GRangeSlider, GDatePicker,
            GCard, GCardTitle, GBtn, GIcon
        },
        setup() {

            const data = {
                items: [
                    {title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
                    {title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'},
                    {title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'},
                    {title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'},
                ]
            }

            const dialog = reactive({
                datePicker: false,
            })

            return {
                Layout,
                data,
                dialog,
                //icon
                back,
                remove,
                printer,
                look,
                filter
            }
        }
    }
</script>

<style scoped lang="scss">
  * {
    box-shadow: none;
  }

  .footer {
    background: #EEEEEE;
  }
</style>