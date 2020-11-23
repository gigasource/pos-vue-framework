<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
  import {computed} from 'vue'

  export default {
    name: 'GSubheader',
    props: {
      inset: Boolean,
    },
    setup(props) {
      const classes = computed(() => ({
        'g-subheader': true,
        'g-subheader__inset': props.inset
      }))

      const styles = computed(() => ({

      }));

      return {
        classes,
        styles
      }
    }
  }
</script>

<style scoped lang="scss">
  .g-subheader {
    display: flex;
    flex: 1 1 100%;
    align-items: center;
    height: 48px;
    font-size: 0.875rem;
    font-weight: 400;
    padding: 0 16px 0 16px;

    &__inset {
      padding-left: 72px;
    }
  }
</style>
