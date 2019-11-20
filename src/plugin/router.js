import Vue from 'vue';
import VueRouter from 'vue-router';
import KeyboardDemo from '@/view/KeyboardDemo';
import TransitionDemo from '../view/TransitionDemo';
import ConnectorDemo from '../view/ConnectorDemo';
import Setting from '../POSView/setting/Setting';
import UserSetting from '../POSView/setting/view/viewUser';
import ArticleSetting from '../POSView/setting/view/viewArticle';
import CompanySetting from '../POSView/setting/view/viewCompany';
import GeneralSetting from '../POSView/setting/view/viewGeneral';
import PaymentSetting from '../POSView/setting/view/viewPayment';

const routes = [
  { path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  { path: '/transition-demo', name: 'Transition', component: TransitionDemo},
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    children: [
      { path: 'user', component: UserSetting},
      { path: 'article', component: ArticleSetting},
      { path: 'company', component: CompanySetting},
      { path: 'general', component: GeneralSetting},
      { path: 'payment', component: PaymentSetting},
    ]
  },
  { path: '/connector-demo', name: 'Connector', component: ConnectorDemo},
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
