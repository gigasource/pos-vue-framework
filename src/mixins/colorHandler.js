export default function colorHandler(color) {

  function getColorType() {
    if (color && (color.indexOf('rgb') === 0 || color.indexOf('hsl') === 0 || color.indexOf('#') === 0) || color === 'transparent') {
      return 'style';
    } else if (color) {
      return 'class';
    }
  }


  function convertColorClass(option) {
    if (color) {
      if (option === 'background') {
        color = 'bg ' + color;
      }
      return color.split(' ').join('-');
    }
  }

  return {
    getColorType,
    convertColorClass
  }
};

