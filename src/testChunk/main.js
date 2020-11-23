import Vue from 'vue'
import App from './App'

require('../style/main.scss')
require('../plugin/waves');

Vue.config.productionTip = false;

new Vue({ render: h => h(App) }).$mount('#app')
