<template>
	<g-grid-layout class="wrapper" :layout="DashboardLayout">
		<div area="sidebar">
			<g-sidebar>
        <template slot="header">
          <div class="sidebar-header">
            <g-avatar size="40px">
              <g-img src="https://carlisletheacarlisletheatre.org/images/person-icon-flat-7.png"/>
            </g-avatar>
            <span>Admin</span>
          </div>
        </template>
				<g-side-bar-tree-view :data="state.data" v-model="state.value"/>
				<g-spacer/>
				<div class="sidebar-footer waves-effect">
          <g-icon>mdi-file</g-icon>
					<span>Log Out</span>
				</div>
			</g-sidebar>
		</div>
		<div area="header" class="header">
				<div class="time">
					<p>2:28 PM</p>
					<p>14/11/2019</p>
				</div>
		</div>
		<div area="content">
			<div area="welcome"><p class="welcome">Welcome !</p></div>
			<div area="line">
				<div class="line"/>
			</div>
			<div v-for="btn in btnData" :area="btn.area">
				<g-btn class="btn" backgroundColor="#FFFFFF" height="100%">
					<div>
						<div class="btn-text">{{btn.text}}</div>
					</div>
				</g-btn>
			</div>
		</div>
	</g-grid-layout>
</template>

<script>
    import {reactive} from "@vue/composition-api"
    //import component
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import DashboardLayout from "./layout";
    import GToolbar from "../../components/GToolbar/GToolbar";
    import GSidebar from '../../components/GSidebar/GSidebar';
    import GSideBarTreeView from "../../components/GSidebar/GSideBarTreeView";
    import GAvatar from "../../components/GAvatar/GAvatar";
    import GIcon from "../../components/GIcon/GIcon";
    import GImg from "../../components/GImg/GImg";
    import GBtn from "../../components/GBtn/GBtn";
    import GSpacer from "../../components/GLayout/GSpacer";


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
                },],
                value: null,
            })

            const btnData = [
                {area: 'btn1', router: '/dashboard/cash-register', text: 'Cash Register'},
                {area: 'btn2', router: '/dashboard/order-history', text: 'Order History'},
                {area: 'btn3', router: '/dashboard/staff-report', text: 'Staff Report'},
                {area: 'btn4', router: '/dashboard/setting', text: 'Setting'},
                {area: 'btn5', router: '/dashboard/admin-dashboard', text: 'Admin Dashboard'},
                {area: 'btn6', router: '/dashboard/end-of-day', text: 'End of Day'},
                {area: 'btn7', router: '/dashboard/support', text: 'Support'}
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
	@import "_DashBoard";
</style>