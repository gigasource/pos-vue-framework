import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api';
import router from './plugin/router';
import VueRouter from 'vue-router';
import notificationCenter from './plugin/notificationCenter.js'

require('./plugin/waves');

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(VueRouter);
Vue.use(notificationCenter, {position: 'top-center', width: '40%'});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
