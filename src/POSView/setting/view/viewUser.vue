<template>
	<div>
		<div class="main">
			<div class="list">
				<g-list :items="items" elevation="0" divider selectable prepend-type="avatar">
					<template v-slot:append>
						<div></div>
					</template>
				</g-list>
				<div class="add-user">
					<g-avatar size="40">
						<g-img :src="[require('../../../assets/config/add_user.svg')]"/>
					</g-avatar>
					<p>Add User</p>
				</div>
			</div>
		</div>
		<g-toolbar absolute bottom color="grey lighten 3">
			<g-btn background-color="white" text-color="#1d1d26" class="ma-2">
				<g-icon class="mr-2">
					{{require('../../../assets/order/back.svg')}}
				</g-icon>
				Back
			</g-btn>
		</g-toolbar>
	</div>
</template>

<script>
  import GToolbar from '../../../components/GToolbar/GToolbar';
  import GBtn from '../../../components/GBtn/GBtn';
  import GIcon from '../../../components/GIcon/GIcon';
  import PosSwitch from '../../../POSComponents/PosSwitch';
  import GList from '../../../components/GList/GList';
  import GListItem from '../../../components/GList/GListItem';
  import GAvatar from '../../../components/GAvatar/GAvatar';
  import GImg from '../../../components/GImg/GImg';
  export default {
    name: 'StaffPermission',
    components: { GImg, GAvatar, GListItem, GList, PosSwitch, GIcon, GBtn, GToolbar },
		data () {
      return {
        items: [
          { title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Ranee Carlson', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        ]
			}
		}
  }
</script>

<style scoped lang="scss">
 .main {
	 height: calc(100% - 64px);
	 display: grid;
	 grid-template-areas: "list edit";
	 grid-template-rows: 100%;
	 grid-template-columns: 200px 1fr;
	 padding-left: 256px;
 }

	.list {
		grid-area: list;
		overflow-y: auto;
		border-right: 1px solid rgba(0, 0, 0, 0.12);

		.g-list {
			border-bottom: 1px solid rgba(0, 0, 0, 0.12);

			::v-deep .g-list-item-text {
				font-size: 13px;
				line-height: 16px;
				color: #4D4D4E;
			}
		}

		.add-user {
			display: flex;
			padding: 8px;
		}
	}

	.edit {
		grid-area: edit;
		display: grid;
		grid-template-rows: 56px repeat(8, 1fr);
		grid-template-columns: 1fr 1fr;
	}
</style>