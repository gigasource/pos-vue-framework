<template>
	<div class="container">
		<div class="wrapper">
			<p>Different sizes / draggable default chips</p>
			<hr/>
			<g-chip x-small draggable close filter>X Small</g-chip>
			<g-chip small draggable filter filter-icon="check_circle">Small</g-chip>
			<g-chip draggable filter filter-icon="check_circle">Default</g-chip>
			<g-chip large draggable close filter filter-icon="check_circle">Large</g-chip>
			<g-chip x-large draggable close filter filter-icon="check_circle">X Large</g-chip>
		</div>
		<div class="wrapper">
			<p>Different sizes label/colors chips</p>
			<hr/>
			<g-chip x-small draggable label close filter>
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				X Small
			</g-chip>
			<g-chip small draggable filter label color="bg-blue" text-color="white">
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Small
			</g-chip>
			<g-chip draggable filter label color="bg-green" text-color="white">
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Default
			</g-chip>
			<g-chip large draggable close label filter color="bg-red" text-color="white">
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Large
			</g-chip>
			<g-chip x-large draggable close label filter color="bg-brown" text-color="white">
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				X Large
			</g-chip>
		</div>

		<div class="wrapper">
			<p>Disabled chips</p>
			<hr/>
			<g-chip disabled>Disable</g-chip>
			<g-chip disabled small color="bg-blue">Blue</g-chip>
			<g-chip disabled color="bg-green">Green</g-chip>
			<g-chip disabled large color="bg-red">Red</g-chip>
			<g-chip disabled large color="bg-brown">Brown</g-chip>
		</div>
		<div class="wrapper">
			<p>Label chips: Border radius of g-cards</p>
			<hr/>
			<g-chip x-small label close ripple color="bg-light-blue" text-color="white">Label</g-chip>
			<g-chip small label close ripple color="bg-red" text-color="white">Label</g-chip>
			<g-chip label close ripple color="bg-light-green" text-color="white">Label</g-chip>
			<g-chip large label close ripple color="bg-brown" text-color="white">Label</g-chip>
			<g-chip x-large label close ripple color="bg-pink" text-color="white">Label</g-chip>
		</div>


		<div class="wrapper">
			<p>Outlined chips: Border is outlined</p>
			<hr/>
			<g-chip x-small outlined label close color="green" filter>Outlined</g-chip>
			<g-chip small outlined label close color="red" filter>Outlined</g-chip>
			<g-chip label outlined close color="maroon" filter>Outlined</g-chip>
			<g-chip large outlined label close color="brown" filter>Outlined</g-chip>
			<g-chip x-large outlined label close color="blue" filter>Outlined</g-chip>
		</div>
		<div class="wrapper">
			<g-chip x-small outlined close color="green" filter>Outlined</g-chip>
			<g-chip small outlined close color="red" filter>Outlined</g-chip>
			<g-chip outlined close color="maroon" filter>Outlined</g-chip>
			<g-chip large outlined close color="brown" filter>Outlined</g-chip>
			<g-chip x-large outlined close color="blue" filter>Outlined</g-chip>
		</div>

		<div class="wrapper">
			<p>Avatar & Icons</p>
			<hr/>
			<g-chip filter>
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Avatar
			</g-chip>
			<g-chip large ripple filter>
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Avatar
			</g-chip>
			<g-chip x-large ripple filter>
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Avatar
			</g-chip>
		</div>

		<div class="wrapper">
			<p>Pill</p>
			<hr/>
			<g-chip pill filter>
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Pill
			</g-chip>
			<g-chip pill filter>
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Pill
			</g-chip>
			<g-chip large pill filter>
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Pill
			</g-chip>
			<g-chip x-large ripple pill filter>
				<template v-slot:prependItem>
					<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				</template>
				Pill
			</g-chip>
		</div>

		<div class="wrapper">
			<p>Icons</p>
			<hr/>
			<g-chip color="bg-blue" text-color="white" filter>
				<template v-slot:prependItem>
					<i class="material-icons g-icon">account_circle</i>
				</template>
				Ranee
			</g-chip>
			<g-chip color="bg-green" text-color="white" filter>
				Premium
				<span class="g-icon g-icon__right">
					<i class="material-icons g-icon">star</i>
				</span>
			</g-chip>
			<g-chip color="bg-brown" text-color="white" filter>
				1 Year
				<span class="g-icon g-icon__right">
					<i class="material-icons g-icon">cake</i>
				</span>
			</g-chip>
			<g-chip color="bg-light-blue" text-color="white" filter>
				<template v-slot:prependItem>
					<i class="material-icons g-icon">check_circle</i>
				</template>
				Confirmed
			</g-chip>
			<g-chip close close-icon="delete" text-color="white" color="bg-red" filter>
				<template v-slot:prependItem>
					<i class="material-icons g-icon">check_circle</i>
				</template>
				Confirmed
			</g-chip>
		</div>

	</div>
</template>

<script>
  import GChip from '../components/GChip/GChip';
  import GMenu from '../components/GMenu/GMenu';
  import GBtn from '../components/GBtn/GBtn';
  import GList from '../components/GList/GList';
  import GListItem from '../components/GList/GListItem';

  export default {
    name: 'ChipDemo',
    components: { GListItem, GList, GBtn, GMenu, GChip }
  }
</script>

<style scoped>
	.avatar-image {
		border-radius: 50%;
	}

	.wrapper {
		display: block;
		flex-wrap: wrap;
	}

	.container {
		display: block;
	}

	.wrapper > * {
		margin: 10px 0 10px 10px;
	}
</style>
