export function getPropsNameAZPrimitiveFirst(obj) {
  // the higher the index, the higher priority
  const typePriority = ['function', 'object', 'array', 'string', 'number', 'boolean']

  let objKeys = Object.keys(obj)
  let objKeysValueType = {}

  objKeys.forEach(key => objKeysValueType[key] = typeof obj[key])

  const sortResult = objKeys.sort((key1, key2) => {
    let typePriority1 = typePriority.indexOf(objKeysValueType[key1])
    let typePriority2 = typePriority.indexOf(objKeysValueType[key2])
    // the same type, compare key name
    if (typePriority1 === typePriority2) {
      return key1 > key2 ? 1 : -1
    } else // different type, order by type
    {
      return typePriority2 - typePriority1
    }
  })

  return sortResult
}
