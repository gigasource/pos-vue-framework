import { watch, getCurrentInstance, ref, onBeforeUnmount } from 'vue';
import _ from 'lodash'

// provide/inject only available in setup()
// addDependency(), removeDependency() are injected methods
export default function dependent(isActive, addDependency, removeDependency) {
  const dependents = ref([])
  const instance = getCurrentInstance()

  watch(isActive, (val) => {
    if (val) return

    dependents.value.forEach(instance => {
      typeof instance.ctx.toggleValue === 'function' && instance.ctx.toggleValue();
    })
  })

  function getOpenDependentElements() {
    const result = []
    const openDependents = dependents.value

    for (let index = 0; index < openDependents.length; index++) {
      if (getClickableDependentElements) result.push(...getClickableDependentElements(openDependents[index]))
    }

    return result
  }

  function getClickableDependentElements(vm) {
    const result = [vm.ctx.$el]
    if (vm.ctx.content) result.push(vm.ctx.content)
    if (vm.ctx.overlay) result.push(vm.ctx.overlay.$el)
    if (vm.ctx.getOpenDependentElements) {
      const openDependentElements = vm.ctx.getOpenDependentElements();
      result.push(...openDependentElements)
    }

    return result
  }

  function addDependentInstance(vm, children) {
    const instances = [vm, ...children, ...dependents.value]
    dependents.value = _.uniqBy(instances, 'uid')
    addDependency && addDependency(instance, dependents.value)
  }

  function removeDependentInstance(vms) {
    dependents.value = dependents.value.filter(i => {
      const uids = vms.map(vm => vm.uid);
      return !uids.includes(i.uid)
    })
  }

  onBeforeUnmount(() => {
    if (removeDependency) {
      removeDependency([instance, ...dependents.value]);
    }
  })

  return { getOpenDependentElements, addDependentInstance, removeDependentInstance, dependents }
}
