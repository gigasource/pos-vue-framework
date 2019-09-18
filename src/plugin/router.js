import Vue from 'vue';
import VueRouter from 'vue-router';
import KeyboardDemo from '@/view/KeyboardDemo';
import OrderDefault from '@/view/OrderDefault';
import Groupable from '@/view/Groupable';
import Payment from '@/view/Payment';
import MenuDemo from '@/view/MenuDemo';
import Dialog from '@/view/DialogDemo';

const routes = [
  { path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  { path: '/order-default', name: 'OrderDefault', component: OrderDefault},
  { path: '/groupable', name: 'Groupable', component: Groupable},
  { path: '/payment', name: 'Payment', component: Payment},
  { path: '/dialog', name: 'Dialog', component: Dialog},
  { path: '/menu-demo', name: 'Menu', component: MenuDemo}
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router