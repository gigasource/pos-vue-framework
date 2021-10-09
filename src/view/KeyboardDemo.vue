<template>
	<div>
		<div class="w-80">
			<g-text-field v-model="text" :rules="rule" :error-message="`Invalid!`">
				<template v-slot:after="{isValidInput}">
					<img v-if="isValidInput && text.length > 0" src="../assets/order/checked2.svg">
				</template>
			</g-text-field>
		</div>

		<g-keyboard v-model="text" class="bg-lgray-7"></g-keyboard>
	</div>
</template>

<script>
  import GContainer from '../components/GLayout/GContainer';
  import GLayout from '../components/GLayout/GLayout';
  import GBtn from '../components/GBtn/GBtn';
  import GKeyboard from '../components/GKeyboard/GKeyboard';
  import GTextField from '../components/GInput/GTextField';

  export default {
    name: 'Demo',
    components: { GTextField, GKeyboard, GBtn, GLayout, GContainer },
    data() {
      return {
        text: 'asdads',
				rule: value => !isNaN(value)
      }
    },
  }
</script>
