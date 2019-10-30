export default (onColorSelected) => {
  function createColorModel(name, value) {
    return { name: name, value: value, select: () => onColorSelected(value) }
  }

  return {
    category: {
      name: 'red',
      pallet: [
        createColorModel('red', '#F44336'),
        createColorModel('red lighten-5', '#FFEBEE'),
      ]
    }
  }
}
