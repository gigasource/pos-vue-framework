<template>
	<g-grid-layout class="wrapper" :layout="Layout" :displayPreviewColor="false">
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
				<g-side-bar-tree-view :data="sidebarData.data" v-model="sidebarData.value"/>
				<g-spacer/>
				<div class="sidebar-footer waves-effect">
          <g-icon svg>icon-logout</g-icon>
					<span>Log Out</span>
				</div>
			</g-sidebar>
		</div>
		<div area="header" class="header">
					<div>2:28 PM</div>
					<div>14/11/2019</div>
		</div>
		<div area="content">
			<div area="welcome"><span class="welcome">Welcome !</span></div>
			<div area="buttons">
				<div area="line"><g-divider/></div>
				<div v-for="btn in btnData" :area="btn.area">
					<g-btn height="100%" width="100%" backgroundColor="#FFFFFF">
						<div>
							<g-icon size="60" svg>{{btn.icon}}</g-icon>
							<div class="btn-text">{{btn.text}}</div>
						</div>
					</g-btn>
				</div>
			</div>
		</div>
	</g-grid-layout>
</template>

<script>
    import {reactive} from "@vue/composition-api"
    import GGridLayout from "../../components/GGridGenerator/GGridLayout";
    import Layout from "./layout";
    import GSidebar from '../../components/GSidebar/GSidebar';
    import GSideBarTreeView from "../../components/GSidebar/GSideBarTreeView";
    import GAvatar from "../../components/GAvatar/GAvatar";
    import GImg from "../../components/GImg/GImg";
    import GBtn from "../../components/GBtn/GBtn";
    import GIcon from "../../components/GIcon/GIcon";
    import GSpacer from "../../components/GLayout/GSpacer";
    import GDivider from "../../components/GLayout/GDivider";

    export default {
        name: "DashboardTemplate",
        components: {GGridLayout, GSidebar, GSideBarTreeView, GAvatar, GImg, GBtn, GIcon, GSpacer, GDivider},
        setup() {
            const sidebarData = reactive({
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
                {area: 'btn1', icon:'icon-code' , router: '/dashboard/cash-register', text: 'Cash Register'},
                {area: 'btn2', icon:'icon-history' , router: '/dashboard/order-history', text: 'Order History'},
                {area: 'btn3', icon:'icon-report' , router: '/dashboard/staff-report', text: 'Staff Report'},
                {area: 'btn4', icon:'icon-gear' , router: '/dashboard/setting', text: 'Setting'},
                {area: 'btn5', icon:'icon-dashboard' , router: '/dashboard/admin-dashboard', text: 'Admin Dashboard'},
                {area: 'btn6', icon:'icon-calendar' , router: '/dashboard/end-of-day', text: 'End of Day'},
                {area: 'btn7', icon:'icon-info' , router: '/dashboard/support', text: 'Support'}
            ]

            return {
                Layout,
                sidebarData,
                btnData,
            }
        },
    }
</script>

<style scoped lang="scss">
	@import "_DashBoard";
</style>