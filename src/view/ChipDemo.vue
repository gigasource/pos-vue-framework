<template>
	<div class="container">
		<div class="wrapper">
			<p>Different sizes / default chips</p>
			<hr/>
			<g-chip x-small draggable close active filter>X Small</g-chip>
			<g-chip small draggable filter filter-icon="check_circle">Small</g-chip>
			<g-chip draggable filter filter-icon="check_circle">Default</g-chip>
			<g-chip large draggable close filter filter-icon="check_circle">Large</g-chip>
			<g-chip x-large draggable close filter filter-icon="check_circle">X Large</g-chip>
		</div>
		<div class="wrapper">
			<p>Disabled chips</p>
			<hr/>
			<g-chip disabled>Disable</g-chip>
			<g-chip disabled small color="blue">Blue</g-chip>
			<g-chip disabled color="green">Green</g-chip>
			<g-chip disabled large color="red">Red</g-chip>
			<g-chip disabled large color="brown">Brown</g-chip>
		</div>
		<div class="wrapper">
			<p>Label chips: Border radius of g-cards</p>
			<hr/>
			<g-chip x-small label close active ripple color="light-blue">Label</g-chip>
			<g-chip small label close ripple>Label</g-chip>
			<g-chip label close ripple>Label</g-chip>
			<g-chip large label close ripple>Label</g-chip>
			<g-chip x-large label close ripple>Label</g-chip>
		</div>


		<div class="wrapper">
			<p>Outlined chips:Border is outlined</p>
			<hr/>
			<g-chip x-small outlined label close active color="green">Outlined</g-chip>
			<g-chip small outlined label close>Outlined</g-chip>
			<g-chip label outlined close>Outlined</g-chip>
			<g-chip large outlined label close>Outlined</g-chip>
			<g-chip x-large outlined label close>Outlined</g-chip>
		</div>

		<div class="wrapper">
			<p>Avatar & Icons</p>
			<hr/>
			<!--			<g-chip>-->
			<!--				<template v-slot:default>-->
			<!--					<g-menu v-model="showMenu2" lazy open-on-hover open-delay="500" close-delay="500">-->
			<!--						<template v-slot:activator="{toggleContent}">-->
			<!--							<g-btn @click="toggleContent">Activator</g-btn>-->
			<!--						</template>-->
			<!--						<g-list>-->
			<!--							<g-list-item> v-for="i in 5" :key="i">-->
			<!--								<g-btn> {{i}}</g-btn>-->
			<!--							</g-list-item>-->
			<!--						</g-list>-->
			<!--					</g-menu>-->
			<!--				</template>-->
			<!--				Close-->
			<!--			</g-chip>-->
			<g-chip>
				<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				Avatar
			</g-chip>
			<g-chip large ripple>
				<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				Avatar
			</g-chip>
			<g-chip x-large ripple>
				<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				Avatar
			</g-chip>
		</div>
		<div class="wrapper">
			<p>Pill</p>
			<hr/>
			<g-chip pill>
				<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				Pill
			</g-chip>
			<g-chip pill>
				<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				Pill
			</g-chip>
			<g-chip large pill>
				<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				Pill
			</g-chip>
			<g-chip x-large ripple pill>
				<img class="g-avatar g-avatar__left avatar-image" src="https://loremflickr.com/320/240" alt="Avatar">
				Pill
			</g-chip>
		</div>

		<div class="wrapper">
			<p>Icons</p>
			<hr/>
			<g-chip>
				<span class="g-icon g-icon__left">
					<i class="material-icons g-icon">account_circle</i>
				</span>
				Ranee
			</g-chip>
			<g-chip>
				Premium
				<span class="g-icon g-icon__right">
					<i class="material-icons g-icon">star</i>
				</span>
			</g-chip>
			<g-chip>
				1 Year
				<span class="g-icon g-icon__right">
					<i class="material-icons g-icon">cake</i>
				</span>
			</g-chip>
			<g-chip>
				<span class="g-icon g-icon__left">
				<i class="material-icons g-icon">check_circle</i>
				</span>
				Confirmed
			</g-chip>
			<g-chip close close-icon="delete">
				<span class="g-icon g-icon__left">
					<i class="material-icons g-icon">check_circle</i>
				</span>
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
