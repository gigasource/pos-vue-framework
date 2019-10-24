<template>
	<div>

		<fieldset>
			<g-text-field prefix="Prefix" label="label"></g-text-field>
			<g-text-field label="Mask" v-model="text2" v-mask="mask" ></g-text-field>
			<g-text-field label="Has prefix"
															 filled
															 clearable
															 counter="25"
															 prefix="prefix"
															 suffix="@gmail.com"
															 hint="This is persistent hint"
															 v-model="text1"
															 :rules="[rules.required, rules.counter]"

			>
				<template v-slot:prepend-inner>
					<img src="../assets/delivery/avatar.svg" alt="avatar">
				</template>
				<template v-slot:prepend-outer>
					<img src="../assets/delivery/avatar.svg" alt="avatar">
				</template>
				<template v-slot:append-inner>
					<img src="../assets/delivery/avatar.svg" alt="avatar">
				</template>
				<template v-slot:append-outer>
					<img src="../assets/delivery/avatar.svg" alt="avatar">
				</template>
			</g-text-field>
			<g-text-field-bs
					label="test Label"
					placeholder="demo placeholder"
					readOnly
					hint="test hint"
					:rules="[rules.required, rules.counter]"
					>
				<template #prependContent>
					Prepend
				</template>
				<template v-slot:prepend="{onClick}">
					<div class="bs-tf-input-prepend" @click="onClick">
						<span class="bs-tf-input-text">
							Prepend 2
						</span>
					</div>
				</template>

				<template #appendContent>
					Append
				</template>
				<template v-slot:append="{onClick}">
					<div class="bs-tf-input-prepend" @click="onClick">
						<span class="bs-tf-input-text">
							Append 2
						</span>
					</div>
				</template>

			</g-text-field-bs>
		</fieldset>
	</div>
</template>

<script>
  import GTextFieldBs from '../components/GInput/GTextFieldBs';
	import {mask} from 'vue-the-mask'

  function GTextField() {

  }

  export default {
    name: 'InputDemo',
    components: { GTextField, GTextFieldBs },
		directives: {mask},
    data() {
      return {
        text1: '',
				text2:'asbchdjk',
        rules: {
          required: value => !!value || 'Required',
          counter: value => value.length > 4 || 'Min 5 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail'
          }
        },
				mask: 'XXXX-XXXX',
      }
    }
  }

</script>

<style scoped>

</style>
