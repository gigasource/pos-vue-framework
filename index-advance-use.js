const GComponents = require('./src/components/advance-use');

const GigaComponents = {
  install(Vue, args) {
    Object.keys(GComponents).forEach(key => {
      if (typeof GComponents[key] === 'function' && !GComponents[key].cid) return;
      Vue.component(key, GComponents[key])
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) window.Vue.use(GigaComponents);

export default GigaComponents;
export * from './src/components';
