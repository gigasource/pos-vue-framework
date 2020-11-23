import { watch } from 'vue';

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
      if (child.isDependent) {
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
      if (getClickableDependentElements) result.push(...getClickableDependentElements(openDependents[index]))
    }

    return result
  }

  function getClickableDependentElements(vm) {
    const result = [vm.$el]
    if (vm.$refs.content) result.push(vm.$refs.content)
    if (vm.overlay) result.push(vm.overlay.$el)
    if (vm.getOpenDependentElements) result.push(...vm.getOpenDependentElements())

    return result
  }

  return getOpenDependentElements
}
