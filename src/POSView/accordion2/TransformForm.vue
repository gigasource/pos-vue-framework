<template>
	<div :style="styles" class="container">
		<div class="header">Transform</div>

		<div class="item" v-for="i in position.length">
			<p-o-s-text-field :placeholder="position[i-1].placeholder" :prefix="position.prefix" v-model="internalValue.position[i-1]">
				<template v-slot:prepend>{{position[i-1].prefix}}</template>
			</p-o-s-text-field>
		</div>
		<div class="item" v-for="i in size.length">
			<p-o-s-text-field :placeholder="size[i-1].placeholder" :prefix="size.prefix" v-model="internalValue.size[i-1]">
				<template v-slot:prepend>{{size[i-1].prefix}}</template>
			</p-o-s-text-field>
		</div>
	</div>
</template>
<script>
  import POSTextField from '../../POSComponents/POSInput/POSTextField';
  import { computed, set } from '@vue/composition-api';
  import { getInternalValue } from '../../utils/helpers';

  export default {
    name: 'TransformForm',
    components: { POSTextField },
    props: {
      top: { type: String, default: '224px' },
      left: { type: String, default: '333px' },
      width: String,
      height: String,
      position: {
        type: Array,
        default: () => {
          return []
        }
      },
      size: {
        type: Array,
        default: () => {
          return []
        }
      },
      value: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    setup: function (props, context) {
      const styles = computed(() => ({
        ...props.height && { 'height': props.height },
        ...props.width && { 'width': props.width },
        ...props.top && { 'top': props.top },
        ...props.left && { 'left': props.left }
      }));
      const internalValue = getInternalValue(props, context)
      set(internalValue.value, 'position', props.position.map(item => ''))
      set(internalValue.value, 'size', props.size.map(item => ''))
      return {
        styles,
        internalValue
      }
    }
  }
</script>
<style lang="scss" scoped>
	.container {
		position: absolute;
		width: 131px;
		height: 146px;

		background: #FFFFFF;
		/* Grey/grey lighten-2 */

		border: 1px solid #E0E0E0;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: [firstCol] 50% [secondCol] 50%;
		grid-template-rows: [firstRow] 25% [secondRow] 17% [thirdRow] 17%;
		grid-template-areas: "header header";
		grid-row-gap: 7px;
	}

	.header {
		grid-area: header;
		font-family: Roboto;
		font-style: normal;
		font-weight: bold;
		font-size: 12px;
		line-height: 22px;
		/* identical to box height, or 183% */

		display: flex;
		align-items: center;
		text-transform: capitalize;

		/* Grey/grey darken-3 */

		color: #424242;
		padding-left: 16px;
	}

	.item {
		.bs-tf-wrapper::v-deep {
			margin: 0;
			width: 100%;

			.bs-tf-input-group {
				margin-left: 8px;
			}

			.bs-tf-inner-input-group {
				margin-left: 0;
				background-color: white;
				border: 1px solid white !important;
				box-sizing: border-box;
				border-radius: 2px;
				font-family: Roboto;
				font-style: normal;
				font-weight: normal;
				font-size: 12px;
				line-height: 22px;
				color: #BDBDBD;
				max-width: 50px;

				&:hover {
					border: 1px solid #E0E0E0 !important;
				}

				input {
					background-color: white;
					padding: 0 0 0 8px;

					font-family: Roboto;
					font-style: normal;
					font-weight: normal;
					font-size: 12px;
					line-height: 22px;
					color: #424242;
				}

				::placeholder {
					color: #424242
				}
			}
		}
	}


</style>
