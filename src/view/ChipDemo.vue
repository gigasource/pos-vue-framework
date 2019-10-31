<template>
  <div class="container">
    <div class="wrapper">
      <g-chip-new close draggable ripple text-color="red" x-large filter>
        <g-avatar class="g-avatar__left">
          <g-img src="https://image.cnbcfm.com/api/v1/image/105778430-1551897565882microsoftfounderbillgatesspeaking.jpg?v=1571848897&w=1400&h=950"></g-img>
        </g-avatar>
        Default chip
      </g-chip-new>

			<g-chip-new close draggable ripple text-color="red" outlined pill filter>
				<g-avatar class="g-avatar__left">
					<g-img src="https://image.cnbcfm.com/api/v1/image/105778430-1551897565882microsoftfounderbillgatesspeaking.jpg?v=1571848897&w=1400&h=950"></g-img>
				</g-avatar>
				Pill chip
			</g-chip-new>

			<g-chip-new close draggable ripple text-color="red" pill filter>
				<g-avatar class="g-avatar__left" background-color="bg-red">
					P
				</g-avatar>
				Pill chip
			</g-chip-new>

			<g-chip-new close draggable ripple text-color="red" outlined x-large filter>
        <g-icon class="g-icon__left">mdi-account-circle</g-icon>
        Default chip
      </g-chip-new>
    </div>
  </div>
</template>

<script>
  import GChip from '../components/GChip/GChip';
  import GMenu from '../components/GMenu/GMenu';
  import GBtn from '../components/GBtn/GBtn';
  import GList from '../components/GList/GList';
  import GListItem from '../components/GList/GListItem';
  import GChipNew from '../components/GChip/GChipNew';
  import GIcon from '../components/GIcon/GIcon';
  import GAvatar from '../components/GAvatar/GAvatar';
  import GImg from '../components/GImg/GImg';

  export default {
    name: 'ChipDemo',
    components: { GImg, GAvatar, GIcon, GChipNew, GListItem, GList, GBtn, GMenu, GChip }
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
