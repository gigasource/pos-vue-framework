<template>
	<div class="row-flex row-12">
		<g-sidebar fixed>
			<template v-slot:header>
				<div class="row-flex align-items-center pa-3 bbw-thin b-grey-lighten-1">
					<g-avatar :size="40">
						<g-img src="https://loremflickr.com/320/240"/>
					</g-avatar>
					<p class="pa-2 fs-small fw-600">Admin</p>
				</div>
			</template>
			<g-side-bar-tree-view :data="data" v-model="nav"/>
		</g-sidebar>
		<router-view class="flex-grow-1"></router-view>
	</div>
</template>

<script>
  import GSideBarTreeView from '../../components/GSidebar/GSideBarTreeView';
  import GSidebar from '../../components/GSidebar/GSidebar';
  import GAvatar from '../../components/GAvatar/GAvatar';
  import GImg from '../../components/GImg/GImg';
  import packet from '../../assets/config/liefer_packet.svg';
  import chart from '../../assets/config/bar_chart.svg';
  import cog from '../../assets/config/cog.svg';
  import switchMulti from '../../assets/config/switch.svg';
  import GBtn from '../../components/GBtn/GBtn';

  export default {
    name: 'Setting',
    components: { GBtn, GImg, GAvatar, GSidebar, GSideBarTreeView },
		data() {
      return {
        nav: null,
        data: [
					{
					  title: 'Product', icon: packet,
						items: [
              { title: 'Articles', icon: 'radio_button_unchecked', iconType: 'small', href: '/setting/article'},
              { title: 'Category', icon: 'radio_button_unchecked', iconType: 'small'},
              { title: 'Layout', icon: 'radio_button_unchecked', iconType: 'small'},
						]
					},
          { title: 'Reporring', icon: chart },
          { title: 'User', icon: 'person', href: '/setting/user' },
          {
            title: 'Settings', icon: cog,
            items: [
              { title: 'General', icon: 'radio_button_unchecked', iconType: 'small', href: '/setting/general'},
              { title: 'Order Screen', icon: 'radio_button_unchecked', iconType: 'small'},
              { title: 'Print Template', icon: 'radio_button_unchecked', iconType: 'small'},
            ]
          },
          {
            title: 'Advance settings', icon: switchMulti,
            items: [
              { title: 'Company Info', icon: 'radio_button_unchecked', iconType: 'small', href: '/setting/company' },
              { title: 'Payment', icon: 'radio_button_unchecked', iconType: 'small', href: '/setting/payment' },
              { title: 'License', icon: 'radio_button_unchecked', iconType: 'small' },
            ]
          },
				],
			}
		},
		methods: {
		}
  }
</script>

<style scoped>
 .g-treeview-wrapper ::v-deep .g-treeview__active {
	 background: linear-gradient(9.61deg, #6200EA 0%, #1976D2 100%) !important;
 }
</style>