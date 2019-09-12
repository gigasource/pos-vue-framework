import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App';
import Demo from '@/view/KeyboardDemo';
import OrderDefault from '@/view/OrderDefault';
import Groupable from '@/view/Groupable';
import Payment from '@/view/Payment';

const routes = [
  { path: '/demo', name: 'Demo', component: Demo},
  { path: '/order-default', name: 'OrderDefault', component: OrderDefault},
  { path: '/groupable', name: 'Groupable', component: Groupable},
  { path: '/payment', name: 'Payment', component: Payment},
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router