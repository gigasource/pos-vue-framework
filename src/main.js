/*import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api';
import router from './plugin/router';
import VueRouter from 'vue-router';
import PortalVue from 'portal-vue';

require('./style/main.scss')
require('./plugin/waves');

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(VueRouter);
Vue.use(PortalVue);*/

/*new Vue({
  router,
  render: h => h(App),
}).$mount('#app')*/


//import {GAvatar} from './components/index';
import { createApp } from 'vue';
import App from '@/App';
import router from '@/plugin/router';
require('./style/main.scss')
require('./plugin/waves');
require('./components/index')

const app = createApp(App)
app.use(router)
app.mount('#app')
