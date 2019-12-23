import { watch } from '@vue/composition-api';

export default function dependent(vm) {
  watch(() => vm.isActive, (val) => {
    if (val) return

    const openDependents = getOpenDependents()
    for (let index = 0; index < openDependents.length; index++) {
      openDependents[index].isActive = false
    }
  })

  function searchChildren(children) {
    const results = []
    for (let index = 0; index < children.length; index++) {
      const child = children[index]
      if (child.isActive && child.isDependent) {
        results.push(child)
      } else {
        results.push(...searchChildren(child.$children))
      }
    }

    return results
  }

  function getOpenDependents() {
    if (vm.closeDependents) return searchChildren(vm.$children)

    return []
  }

  function getOpenDependentElements() {
    const result = []
    const openDependents = getOpenDependents()

    for (let index = 0; index < openDependents.length; index++) {
      result.push(...getClickableDependentElements(openDependents[index]))
    }

    return result
  }

  function getClickableDependentElements(vm) {
    const result = [vm.$el]
    if (vm.$refs.content) result.push(vm.$refs.content)
    if (vm.overlay) result.push(vm.overlay.$el)
    result.push(...vm.getOpenDependentElements())

    return result
  }

  return getOpenDependentElements
}
