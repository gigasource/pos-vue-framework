<template>
  <div class="g-icon-chooser-input-model">
    <g-text-field placeholder="select icon" prependIcon="search" :label="label" :appendInnerIcon="model[field.key]" :value="model[field.key]" @click="openDialog"/>
    <g-dnd-dialog :value="showDialog" @input="closeDialog" min-height="710" height="710" min-width="630" width="630" lazy>
      <template #title>Icon Picker</template>
      <component :is="GIconChooser" :value="model[field.key]" @input="newValue => model[field.key] = newValue" ref="iconChooser"/>
    </g-dnd-dialog>
  </div>
</template>
<script>
  const GTextField = () => import('../GInput/GTextField');
  const GIconChooserComponent = () => import('./GIconChooser');
  const GDndDialog = () => import('../GDndDialog/GDndDialog');

  let comp;
  export default {
    name: 'GIconChooserInputModel',
    components: { GTextField, GDndDialog },
    props: {
      label: String,
      model: Object,
      field: Object
    },
    data: function () {
      return {
        showDialog: false
      }
    },
    computed: {
      GIconChooser() {
        if (this.showDialog) return GIconChooserComponent;
      }
    },
    methods: {
      openDialog() {
        this.showDialog = true
        if (this.$refs.iconChooser) {
          this.$refs.iconChooser.initIconPickerDialogState()
        }
      },
      closeDialog() {
        this.showDialog = false
      }
    }
  }
</script>
<style scoped lang="scss">
  .g-icon-chooser-input-model {
    &__activator {
      height: 40px;
      display: inline-flex;
      border: 1px solid #0003;
      border-radius: 5px;
      padding-left: 5px;

      &:hover {
        cursor: pointer;
        border-color: #0006;
      }

      &__input {
        padding: 5px;
        border: none;
        outline: none;
        text-overflow: ellipsis;
        border-right: 1px solid #0003;
      }

      &__preview {
        padding: 0 5px;
        min-width: 30px;
        max-width: 30px;

        &:hover {
          background-color: #aaa;
        }
      }
    }
  }
</style>
