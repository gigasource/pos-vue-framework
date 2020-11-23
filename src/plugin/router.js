import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import KeyboardDemo from '@/view/KeyboardDemo';
import TransitionDemo from '../view/TransitionDemo';
import ConnectorDemo from '../view/ConnectorDemo';

const routes = [
  { path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  { path: '/transition-demo', name: 'Transition', component: TransitionDemo},
  { path: '/connector-demo', name: 'Connector', component: ConnectorDemo}
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router
