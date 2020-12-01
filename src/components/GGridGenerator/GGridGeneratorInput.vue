<template>
  <div>
    <g-btn @click="() => showDialog()">{{ displayText }}</g-btn>
    <g-dialog v-model="show" fullscreen>
      <div class="editor-dialog">
        <component
            :is="GGridGenerator"
            :layout="layout"
            @json="updateModel"
            @close="hideDialog"/>
      </div>
    </g-dialog>
  </div>
</template>
<script>
  import { defineAsyncComponent } from 'vue'
  const GDialog = defineAsyncComponent(() => import('../GDialog/GDialog'))
  const GBtn = defineAsyncComponent(() => import('../GBtn/GBtn'))
  // Don't add lazy load component to components prop
  const GGridGeneratorLazyLoad = defineAsyncComponent(() => import('./components/GGridGenerator'))

  export default {
    name: 'GGridGeneratorInput',
    components: { GDialog, GBtn },
    props: {
      model: Object,
      field: Object,
    },
    data() {
      return {
        show: false,
      }
    },
    computed: {
      GGridGenerator() {
        if (this.show) return GGridGeneratorLazyLoad
      },
      displayText() {
        return this.model[this.field.key] != null ? 'Edit grid' : 'Add grid'
      },
      layout() {
        return this.model[this.field.key]
      }
    },
    methods: {
      showDialog() {
        this.show = true;
      },
      hideDialog() {
        this.show = false
      },
      updateModel(json) {
        this.model[this.field.key] = json
      }
    }
  }
</script>
<style scoped lang="scss">
  .editor-dialog {
    width: calc(100%);
    height: 100vh;
    background-color: white;
    border: 1px solid #666;
  }
</style>
