import Vue from 'vue';
import VueRouter from 'vue-router';
import KeyboardDemo from '@/view/KeyboardDemo';
import TransitionDemo from '../view/TransitionDemo';
import ConnectorDemo from '../view/ConnectorDemo';
import Dashboard from "../POSView/Dashboard/Dashboard";

const routes = [
  { path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  { path: '/transition-demo', name: 'Transition', component: TransitionDemo},
  { path: '/connector-demo', name: 'Connector', component: ConnectorDemo},
  { path: '/dashboard', name: 'Dashboard', component: Dashboard},
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
