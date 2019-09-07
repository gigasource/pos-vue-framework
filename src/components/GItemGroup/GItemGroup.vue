<template>
	<div>
		<slot>
			<template v-for="(item, index) in items">
				<g-item :item="item" :active-class="activeClass" :is-active="isActiveItem(item)" @toggle="toggleItem">
					<slot name="item" :item="item" :index="index" :toggle="toggleItem"></slot>
				</g-item>
			</template>
		</slot>
	</div>
</template>

<script>
  //todo: root element
  import GItem from '@/components/GItemGroup/GItem';
  import _ from 'lodash';

  export default {
    name: 'GItemGroup',
    components: { GItem },
    props: {
      activeClass: {
        type: String,
        default: 'item--active' //todo: change to correct css class
      },
      //todo: disabledClass ?
      mandatory: Boolean,
      multiple: Boolean,
      //todo: return item/index
      returnItem: Boolean,
      value: null,
      items: Array
    },
    data() {
      return {
        //internalValue: this.value !== undefined ? this.value : this.multiple ? [] : null
      }
    },
    computed: {
      //todo: internal value for usage without v-model
      internalValue: {
        get() {
        },
        set() {
        }
      },
      computedValue: {
        get() {
          if (this.value) {
            if (this.multiple && !Array.isArray(this.value)) {
              this.value = [this.value];
            }
            return this.value;
          }
          return this.multiple ? [] : null;
        },
        set(value) {
          this.$emit('input', value);
        }
      }
    },
    methods: {
      toggleItem(item) {
        if (this.multiple) {
          this.updateMultiple(item);
        } else {
          this.updateSingle(item);
        }
      },
      updateSingle(item) {
        const isSame = item === this.computedValue;
        if (isSame && this.mandatory) {
          return;
        }
        this.computedValue = isSame ? null : item;
      },
      updateMultiple(item) {
        const clonedValue = _.clone(this.computedValue);
        const itemIndex = clonedValue.findIndex((i) => i === item);
        //item exists + mandatory
        if (itemIndex > -1 && this.mandatory && clonedValue.length - 1 < 1) {
          return;
        }

        if (itemIndex > -1) {
          clonedValue.splice(itemIndex, 1);
        } else {
          clonedValue.push(item);
        }
        this.computedValue = clonedValue;
      },
      isActiveItem(item) {
        return this.multiple ? this.computedValue.includes(item) : this.computedValue === item;
      }
    }
  }
</script>

<style scoped>

</style>