<template>
	<div>
		<g-grid-layout :layout="layout" style="margin-left: 256px; height: calc(100% - 64px)">
			<div area="list">
				<g-list :items="items" elevation="0" divider selectable prepend-type="avatar" active-class="item__active">
					<template v-slot:append>
						<div></div>
					</template>
				</g-list>
				<div class="row-flex align-items-center pa-2 pl-3">
					<g-avatar size="40">
						<g-img :src="require('../../../assets/config/add_user.svg')"/>
					</g-avatar>
					<p class="ml-3 text-red fs-small">Add User</p>
				</div>
			</div>
			<div area="edit">
				<div area="title" class="row-flex align-items-center pl-4 fw-700">
					Edit User
				</div>
				<div class="edit__item">
					<p-o-s-text-field label="Name">
						<template v-slot:append>
							<g-icon svg>icon-keyboard</g-icon>
						</template>
					</p-o-s-text-field>
				</div>
				<div class="edit__item">
					<pos-switch label="Cancel Invoice" v-model="val"/>
				</div>
				<div class="edit__item">
					<pos-switch label="View Own Report" v-model="val"/>
				</div>
				<div class="edit__item">
					<pos-switch label="View Others Reports"/>
				</div>
				<div class="edit__item">
					<pos-switch label="Edit Article, Edit Table Layout" v-model="val"/>
				</div>
				<div class="edit__item">
					<pos-switch label="Access Z-Report"/>
				</div>
				<div class="edit__item">
					<pos-switch label="Item Cancellation"/>
				</div>
				<div class="edit__item">
					<pos-switch label="Allow Table Takeover"/>
				</div>
				<div class="edit__item">
					<p class="mt-3 ml-1">Employee iButton Key</p>
					<p class="mt-2 ml-1">
						<span class="fs-small text-green-accent-4">Registered!</span>
						<g-icon class="ml-1" size="20" svg>icon-redo</g-icon>
					</p>
				</div>
				<div class="edit__item">
					<pos-switch style="max-width: 200px" dense label="Allow Item Cancellation after reactivate paid Table" v-model="val"/>
				</div>
				<div class="edit__item">
					<p-o-s-text-field label="Postcode">
						<template v-slot:append>
							<g-icon svg>icon-keyboard</g-icon>
						</template>
					</p-o-s-text-field>
				</div>
				<div class="edit__item">
					<pos-switch label="Allow Move Item" v-model="val"/>
				</div>
				<div class="edit__item">
					<pos-switch label="Reactivate paid Table" v-model="val"/>
				</div>
				<div class="edit__item">
					<pos-switch label="Allow Table Switch" v-model="val"/>
				</div>
				<div class="edit__item">
					<pos-switch label="Open Cash Drawer Manually" v-model="val"/>
				</div>
				<div class="edit__item">
					<pos-switch label="Discount" v-model="val"/>
				</div>
				<div class="edit__item"></div>
			</div>
		</g-grid-layout>
		<g-toolbar absolute bottom color="grey lighten 3">
			<g-btn background-color="white" text-color="#1d1d26">
				<g-icon class="mr-2" svg>
					icon-back
				</g-icon>
				Back
			</g-btn>
			<g-spacer/>
			<g-btn background-color="white" text-color="#1d1d26">
				<g-icon class="mr-2" svg>
					icon-trash
				</g-icon>
				Delete
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
  import GSpacer from '../../../components/GLayout/GSpacer';
  import layout from './layoutUserView';
  import GGridLayout from '../../../components/GGridGenerator/GGridLayout';
  import GTextField from '../../../components/GInput/GTextField';
  import keyboard from '../../../assets/config/keyboard.svg';
  import POSTextField from '../../../POSComponents/POSInput/POSTextField';

  export default {
    name: 'StaffPermission',
    components: { POSTextField, GTextField, GGridLayout, GSpacer, GImg, GAvatar, GListItem, GList, PosSwitch, GIcon, GBtn, GToolbar },
    data() {
      return {
        layout: layout,
				keyboardIcon: keyboard,
        items: [
          { title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
          { title: 'Jason Oner', prepend: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Cindy Baker', prepend: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Ali Connors', prepend: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        ],
				val: true,
      }
    }
  }
</script>

<style scoped lang="scss">
	.list {
		overflow-y: auto;
		border-right: 1px solid rgba(0, 0, 0, 0.12);

		.g-list {
			border-bottom: 1px solid rgba(0, 0, 0, 0.12);

			::v-deep .g-list-item-text {
				font-size: 13px;
				line-height: 16px;
				color: #4D4D4E;
			}

			.item__active {
				border-right: 5px solid #1271ff;
				color: #1271ff;
			}
		}
	}

	.edit__item {
		padding: 0 16px;
		font-size: 13px;
		line-height: 16px;

		&:nth-child(even) {
			border-right: 1px solid rgba(0, 0, 0, 0.12);
		}
	}

</style>