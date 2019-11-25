<template>
	<div class="container">
		<div class="header">Transform</div>

		<div class="item" v-for="i in position.length">
			<p-o-s-text-field :placeholder="position[i-1].placeholder" :prefix="position.prefix">
				<template v-slot:prepend>{{position[i-1].prefix}}</template>
			</p-o-s-text-field>
		</div>
		<div class="item" v-for="i in size.length">
			<p-o-s-text-field :placeholder="size[i-1].placeholder" :prefix="size.prefix">
				<template v-slot:prepend>{{size[i-1].prefix}}</template>
			</p-o-s-text-field>
		</div>


	</div>


</template>
<script>
  import POSTextField from '../../POSComponents/POSInput/POSTextField';

  export default {
    name: 'TransformForm',
    components: { POSTextField},
    data() {
      return {
        position: [{ prefix: 'X', placeholder: '41' }, { prefix: 'Y', placeholder: '711' }],
        size: [{ prefix: 'W', placeholder: '9' }, { prefix: 'H', placeholder: '11' }]
      }
    },
    props: {},
    setup: function (props, context) {

      return {}
    }
  }
</script>
<style lang="scss" scoped>
	.container {
		position: absolute;
		width: 131px;
		height: 146px;
		left: 333px;
		top: 244px;

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
	.item{
		.bs-tf-wrapper::v-deep{
			margin: 0;
			width: 100%;
			.bs-tf-input-group{
				margin-left: 8px;
			}
			.bs-tf-inner-input-group{
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
				&:hover{
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
				::placeholder{color:#424242 }
			}
		}
	}





</style>
