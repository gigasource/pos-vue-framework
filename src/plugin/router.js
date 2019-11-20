import Vue from 'vue';
import VueRouter from 'vue-router';
import KeyboardDemo from '@/view/KeyboardDemo';
import TransitionDemo from '../view/TransitionDemo';
import ConnectorDemo from '../view/ConnectorDemo';
import ListDemo from '../view/ListDemo';
import List2Demo from "../view/List2Demo";
import DndDialogDemo from '../view/DndDialogDemo';
import GChipGroupDemo from '../view/GChipGroupDemo';
import DatePicker from '../view/DatePickerDemo';
import ExpansionPanelDemo from '../view/ExpansionPanelDemo';
import Textarea from "../view/TextareaDemo";
import Setting from '../POSView/setting/Setting';
import UserSetting from '../POSView/setting/view/viewUser';
import ArticleSetting from '../POSView/setting/view/viewArticle';
import CompanySetting from '../POSView/setting/view/viewCompany';
import GeneralSetting from '../POSView/setting/view/viewGeneral';
import PaymentSetting from '../POSView/setting/view/viewPayment';

const routes = [
  { path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  { path: '/transition-demo', name: 'Transition', component: TransitionDemo},
  { path: '/chip-group', name: 'Chip Group', component: GChipGroupDemo},
  { path: '/list-demo', name: 'List', component: List2Demo},
  { path: '/dnd-dialog-demo', name: 'Dnd Dialog Demo', component: DndDialogDemo},
  { path: '/date-picker-demo', name: 'Date Picker', component: DatePicker},
  { path: '/expansion-panel-demo', name: 'Expansion Panel', component: ExpansionPanelDemo},
  {path: '/textarea', name: 'Textarea', component: Textarea},
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
