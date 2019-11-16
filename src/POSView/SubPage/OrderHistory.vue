<template>
  <g-grid-layout style="height: 100%" :layout="Layout" :displayPreviewColor="true">
    <div area="list-order">
      <div area="toolbar"><g-toolbar></g-toolbar></div>
      <div area="list"><g-list style="height: 100%" :items="data.items"></g-list></div>
    </div>
    <div area="order">
    </div>
    <div area="footer" class="footer">
      <div area="back">
        <g-btn style="width: 100%" height="100%">
          <g-icon>{{back}}</g-icon>
          <p style="margin-left: 10px">Back</p>
        </g-btn>
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
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import Layout from "./order.json"
    import GToolbar from "../../components/GToolbar/GToolbar";
    import GSidebar from "../../components/GSidebar/GSidebar";
    import GList from "../../components/GList/GList";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";
    //import icon
    import back from "./back.svg"
    import remove from "./remove.svg"
    import printer from "./printer.svg"

    export default {
        name: "OrderHistory",
        components: {GGridLayout, GSidebar, GToolbar, GList, GBtn, GIcon},
        setup(props, context) {
            const data = {
                items: [
                    { title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
                    { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
                    { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
                    { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
                ]
            }
            return {
                Layout,
                data,
                //icon
                back,
                remove,
                printer,
            }
        }
    }
</script>

<style scoped lang="scss">
  .footer {
    background: #EEEEEE;
    box-shadow: 0px -1px 8px rgba(0, 0, 0, 0.122432);
  }
  ::v-deep .g-sidebar {
    position: relative;
    max-width: 100%;
  }
</style>