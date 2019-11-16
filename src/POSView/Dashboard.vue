<template>
  <g-grid-layout style="height:100%" :layout="DashboardLayout">
    <div area="header">
      <g-toolbar class="header" gradient="indigo, blue">
        <g-avatar size="37">
          <g-img src="https://carlisletheacarlisletheatre.org/images/person-icon-flat-7.png"/>
        </g-avatar>
        <h6 class="user">Admin</h6>
        <g-spacer/>
        <div class="time">
          <p>2:28 PM</p>
          <p>14/11/2019</p>
        </div>
      </g-toolbar>
    </div>
    <div area="sidebar">
      <g-sidebar class="sidebar">
        <g-side-bar-tree-view :data="state.data" v-model="state.value"/>
        <g-spacer/>
        <div class="footer">
          <g-icon style="margin: 16px 12px 13px 21px">{{LogOut}}</g-icon>
          <span>Log Out</span>
        </div>
      </g-sidebar>
    </div>
    <div area="content">
      <div area="welcome"><p class="welcome">Welcome !</p></div>
      <div area="line">
        <div class="line"/>
      </div>
      <div v-for="btn in btnData" :area="btn.area">
        <router-link :to="btn.router">
          <g-btn class="btn" backgroundColor="#FFFFFF" height="100%">
            <div>
              <g-icon>{{btn.icon}}</g-icon>
              <div class="btn-text">{{btn.text}}</div>
            </div>
          </g-btn>
        </router-link>
      </div>
    </div>
  </g-grid-layout>
</template>

<script>
    import {reactive} from "@vue/composition-api"
    //import component
    import GGridLayout from "../components/GGridGenerator/GGridLayout";
    import DashboardLayout from "./layout";
    import GToolbar from "../components/GToolbar/GToolbar";
    import GSidebar from '../components/GSidebar/GSidebar';
    import GSideBarTreeView from "../components/GSidebar/GSideBarTreeView";
    import GAvatar from "../components/GAvatar/GAvatar";
    import GIcon from "../components/GIcon/GIcon";
    import GImg from "../components/GImg/GImg";
    import GBtn from "../components/GBtn/GBtn";
    import GSpacer from "../components/GLayout/GSpacer";
    //import icon
    import CashRegister from "../assets/dashboard/code.svg"
    import OrderHistory from "../assets/dashboard/history.svg"
    import StaffReport from "../assets/dashboard/report.svg"
    import Setting from "../assets/dashboard/gear.svg"
    import AdminDashboard from "../assets/dashboard/dashboard.svg"
    import EndOfDayIcon from "../assets/dashboard/calendar.svg"
    import Support from "../assets/dashboard/info.svg"
    import LogOut from "../assets/dashboard/LogOut.svg"

    export default {
        name: "DashboardTemplate",
        components: {GGridLayout, GToolbar, GSidebar, GSideBarTreeView, GAvatar, GIcon, GBtn, GImg, GSpacer},
        setup() {
            const state = reactive({
                data: [{
                    title: 'Dashboard', icon: 'mdi-cart-outline',
                    items: [
                        {title: 'Retail', icon: 'radio_button_unchecked', iconType: 'small'},
                        {title: 'Retail', icon: 'radio_button_unchecked', iconType: 'small'},
                        {title: 'Retail', icon: 'radio_button_unchecked', iconType: 'small'},
                    ]
                }, {
                    title: 'Inventory', icon: 'mdi-cart-outline',
                },],
                value: null,
            })

            const btnData = [
                {area: 'btn1', router:'/dashboard/cash-register', text: 'Cash Register', icon: CashRegister,},
                {area: 'btn2', router:'/dashboard/order-history', text: 'Order History', icon: OrderHistory,},
                {area: 'btn3', router:'/dashboard/staff-report', text: 'Staff Report', icon: StaffReport,},
                {area: 'btn4', router:'/dashboard/setting', text: 'Setting', icon: Setting,},
                {area: 'btn5', router:'/dashboard/admin-dashboard', text: 'Admin Dashboard', icon: AdminDashboard,},
                {area: 'btn6', router:'/dashboard/end-of-day', text: 'End of Day', icon: EndOfDayIcon,},
                {area: 'btn7', router:'/dashboard/support', text: 'Support', icon: Support,}
            ]

            return {
                DashboardLayout,
                //data
                state,
                btnData,
            }
        },
    }
</script>

<style scoped lang="scss">
  @import "DashBoard";
</style>