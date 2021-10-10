<template>

</template>

<script>
import {getCurrentInstance, onBeforeUnmount, ref} from "vue";
import GSectionsHeader from "./GSectionsHeader";
import GSectionsItem from "./GSectionsItem";
import GSections from "./GSections";
import _ from 'lodash';

const map = {};

export default {
  name: "GSection",
  components: {GSectionsHeader, GSectionsItem, GSections},
  props: {
    header: String,
    getParentUid: Function,
    multiple: Boolean
  },
  setup(props, {slots}) {
    //region prepare
    const instance = getCurrentInstance();
    let parentUid = instance.parent.uid;
    if (props.getParentUid) {
      parentUid = props.getParentUid(instance);
    }

    const ev = `register:${parentUid}`;
    const isFirstElement = !map[ev];
    const renderFn = () => <g-sections-item header={props.header}>{slots.default && slots.default()}</g-sections-item>;
    //endregion

    if (isFirstElement) {
      map[ev] = ref([renderFn]);
      onBeforeUnmount(() => delete map[ev])
    } else {
      map[ev].value.push(renderFn);
    }

    return () => {
      if (isFirstElement) {
        return <g-sections multiple={props.multiple}>{map[ev].value.map(r => r())}</g-sections>;
      }
    };
  }
}
</script>
