<template>
	<div class="wrapper">
		<g-sections-draggable v-model="activeItem">
			<g-sections-header v-for="(item, index) in items" :key="-(index+1)">
				<div style="background-color: #FFFFFF; padding: 0 4px">{{item.title}}</div>
				<div style="background-color: #FFFFFF">
					<g-icon svg>icon-ellipsis</g-icon>
				</div>
			</g-sections-header>
			<g-sections-item v-for="(item, index) in items" :key="index">
				<div class="input-group">Menu {{index+1}}<input/></div>
				<div class="input-group">Menu {{index+1}}<input/></div>
				<div class="input-group">Menu {{index+1}}<input/></div>
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
    import {ref, onUpdated} from "@vue/composition-api";

    export default {
        name: "DraggableAccordion",
        components: {GTextField, GSectionsItem, GSectionsHeader, GSections, GSectionsDraggable, PosTextField, GIcon},
        props: {},
        setup() {
            const activeItem = ref(null)
            const items = ref([
                {title: 'Accordion Label 1', value: ['strong1', '', '']},
                {title: 'Accordion Label 2', value: ['strong2', '', '']},
                {title: 'Accordion Label 3', value: ['strong3', '', '']},
            ])
						//todo keep input value after dragging

						onUpdated(()=>{
						    // console.log(items.value[0].value)
                // console.log(items.value[1].value)
                // console.log(items.value[2].value)
						})
            return {
                items,
                activeItem,
            }
        },
    }
</script>

<style scoped lang="scss">
	$transition: () !default;

	.g-sections::v-deep {

		.g-sections-element {
			border: 1px solid #E0E0E0;
			border-radius: 4px;
			margin: 2px;
			padding: 1px;
		}

		.g-sections-header {
			border-top: none;

			font-weight: 600;
			font-size: 11px;
			line-height: 14px;
			color: #757575;
		}

		.g-sections-element__active {
			position: relative;
			margin-top: 12px;
			padding-top: 16px;
		}

		/*.g-sections-header__active.g-sections-item {*/
		/*	padding-top: 20px;*/
		/*}*/
	}

	.g-sections-header__active {
		position: absolute;
		top: -12px;
		min-height: 0;
		transform-origin: top;
		transition: 0.5s;
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