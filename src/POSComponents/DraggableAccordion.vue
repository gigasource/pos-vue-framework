<template>
	<div class="wrapper">
		<g-sections-draggable v-model="activeItem" :order="itemsOrder">
			<g-sections-header v-for="(item, index) in items" :key="'header_' + index">
				<div class="header-item">{{item.title}}</div>
				<div class="header-item-2">
					<g-icon svg size="20">icon-ellipsis</g-icon>
				</div>
			</g-sections-header>
			<g-sections-item v-for="(item, index) in items" :key="'content_' + index">
				<div class="input-group">Menu 1<input v-model="item.value[0]"/></div>
				<div class="input-group">Menu 2<input v-model="item.value[1]"/></div>
				<div class="input-group">Menu 3<input v-model="item.value[2]"/></div>
			</g-sections-item>
		</g-sections-draggable>
	</div>
</template>

<script>
  import GSections from "../components/GExpansion/GSections";
  import GSectionsDraggable from "../components/GExpansion/GSectionsDraggable";
  import GSectionsHeader from "../components/GExpansion/GSectionsHeader";
  import GSectionsItem from "../components/GExpansion/GSectionsItem";
  import GTextField from "../components/GInput/GTextField";
  import PosTextField from "./POSInput/POSTextField";
  import GIcon from "../components/GIcon/GIcon";
  import {ref} from "@vue/composition-api";

  export default {
    name: "DraggableAccordion",
    components: {GTextField, GSectionsItem, GSectionsHeader, GSections, GSectionsDraggable, PosTextField, GIcon},
    setup() {
      const activeItem = ref(null)
      const items = ref([
        {title: 'Accordion Label 1', value: ['', '', '']},
        {title: 'Accordion Label 2', value: ['', '', '']},
        {title: 'Accordion Label 3', value: ['', '', '']},
      ])
      const itemsOrder = ref([0, 1, 2])
      return {
        items,
        itemsOrder,
        activeItem,
      }
    },
  }
</script>

<style scoped lang="scss">
	$transition: () !default;

	.g-sections::v-deep {
		background-color: #FFFFFF;
		padding: 12px 0;

		.g-sections-element {
			position: relative;
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			margin: 2px;
			padding: 1px;
			background-color: #FFFFFF;
		}

		.g-sections-element__active {
			margin-top: 12px;
			transition: 0.3s;
		}

		.g-sections-item-content-wrapper {
			padding: 0 8px 8px 12.5px;
			margin-top: 16px;
		}

		.g-sections-header {
			border-top: none;
			padding: 0 12px;

			font-weight: 600;
			font-size: 11px;
			line-height: 20px;
			color: #757575;

			transition: 0.3s;
			transform-origin: bottom;
			z-index: 10000;

			.header-item {
				padding: 0 8px 0 4px;
			}
		}
	}

	.g-sections-header__active {
		position: absolute;
		transform: translateY(-12px);
		min-height: 0;
		transition: 0.3s;

		.header-item, .header-item-2 {
			background-color: #FFFFFF;
		}
	}

	.wrapper {
		max-width: 240px;
		padding: 10px;
		border: 1px solid lightcoral;
		border-radius: 4px;
	}

	.input-group {
		margin: 2px 0;

		font-size: 10px;
		line-height: 13px;
		color: #212121;

		input {
			height: 24px;
			max-width: 100%;
			width: 75%;
			border: 1px solid #E0E0E0;
			box-sizing: border-box;
			border-radius: 2px;
			margin-left: 8px;
		}
	}

</style>