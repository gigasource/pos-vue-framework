<template>
  <g-icon>mdi-domain-remove</g-icon>
</template>

<script>
  import {getIconSources} from './logic/Utils'
  import { reactive } from '@vue/composition-api'
  import GIcon from '../GIcon/GIcon';

  export default {
    name: 'GIconChooser',
    components: { GIcon },
    props: {},
    setup(props, context) {
      const iconSources = getIconSources()
      console.log(iconSources)
      return {

      }
    }
  }
</script>
<style scoped lang="scss">
</style>
