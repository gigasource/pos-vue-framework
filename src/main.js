import Vue from 'vue'
import App from './App.vue'
import Demo from './view/Demo.vue'
import VueCompositionApi from '@vue/composition-api';
import router from './router';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
