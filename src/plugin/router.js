import VueRouter from 'vue-router';
import KeyboardDemo from '@/view/KeyboardDemo';
import TransitionDemo from '../view/TransitionDemo';
import ConnectorDemo from '../view/ConnectorDemo';
import Order from '../POSView/order/Order';
import Payment from '../POSView/order/Payment';
import Login from '../POSView/login/Login';
import Article from '../POSView/article/Article';
import FunctionButton from '../POSView/button/FunctionButton';
const routes = [
  { path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  { path: '/transition-demo', name: 'Transition', component: TransitionDemo},
  { path: '/connector-demo', name: 'Connector', component: ConnectorDemo},
  { path: '/order', name: 'Order', component: Order},
  { path: '/payment', name: 'Payment', component: Payment},
  { path: '/login', name: 'Login', component: Login },
  { path: '/order', name: 'Order', component: Order },
  { path: '/article', name: 'Article', component: Article },
  { path: '/function-button', name: 'Function Button', component: FunctionButton },

];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
