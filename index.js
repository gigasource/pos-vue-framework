const GComponents = require('./src/components');

const GigaComponents = {
  install(Vue, args) {
   Object.keys(GComponents).forEach(key => Vue.component(key, GComponents[key]));
  }
};

if (typeof window !== 'undefined' && window.Vue) window.Vue.use(GigaComponents);

export default GigaComponents;
