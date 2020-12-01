import { watch } from 'vue';

// fixme: $children removed in vue 3
// TODO solutions: provide/inject, instance.parent
export default function dependent(vm, dependents, isActive) {
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
      console.log('openDependentElements', openDependentElements)
      result.push(...openDependentElements)
    }

    return result
  }

  return getOpenDependentElements
}
