export default (onColorSelected) => {
  function createColorModel(name, value) {
    return { name: name, value: value, select: () => onColorSelected(value) }
  }

  return {
    category: [{
      name: 'red',
      pallet: [
        createColorModel('red'          , '#F44336'),
        createColorModel('red lighten-5', '#FFEBEE'),
        createColorModel('red lighten-4', '#FFCDD2'),
        createColorModel('red lighten-3', '#EF9A9A'),
        createColorModel('red lighten-2', '#E57373'),
        createColorModel('red lighten-1', '#EF5350'),
        createColorModel('red darken-1' , '#E53935'),
        createColorModel('red darken-2' , '#D32F2F'),
        createColorModel('red darken-3' , '#C62828'),
        createColorModel('red darken-4' , '#B71C1C'),
        createColorModel('red accent-1' , '#FF8A80'),
        createColorModel('red accent-2' , '#FF5252'),
        createColorModel('red accent-3' , '#FF1744'),
        createColorModel('red accent-4' , '#D50000'),
      ]
    }, {

    }]
  }
}
