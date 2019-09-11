import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App';
import Demo from '@/view/Demo';
import OrderDefault from '@/view/OrderDefault';
import Groupable from '@/view/Groupable';

const routes = [
  { path: '/demo', name: 'Demo', component: Demo},
  { path: '/order-default', name: 'OrderDefault', component: OrderDefault},
  { path: '/groupable', name: 'Groupable', component: Groupable},
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router