import Vue from 'vue';
import VueRouter from 'vue-router';
import KeyboardDemo from '@/view/KeyboardDemo';
import OrderDefault from '@/view/OrderDefault';
import Groupable from '@/view/Groupable';
import Payment from '@/view/Payment';
import MenuDemo from '@/view/MenuDemo';
import SliderDemo from '../view/SliderDemo';
import CardDemo from '../view/CardDemo';
import ButtonDemo from '../view/ButtonDemo';
import OverlayDemo from "../view/OverlayDemo";
import DialogDemo from '../view/DialogDemo';
import PulseDemo from '../view/PulseDemo';
import ToolTipDemo from '../view/ToolTipDemo';
import InputDemo from "../view/InputDemo";
import TransitionDemo from '../view/TransitionDemo';
import ListDemo from '../view/ListDemo';
import List2Demo from "../view/List2Demo";
import DatePicker from '../view/DatePickerDemo';

const routes = [
  { path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  { path: '/order-default', name: 'OrderDefault', component: OrderDefault},
  { path: '/groupable', name: 'Groupable', component: Groupable},
  { path: '/payment', name: 'Payment', component: Payment},
  { path: '/slider', name: 'Slider', component: SliderDemo},
  { path: '/menu-demo', name: 'Menu', component: MenuDemo},
  { path: '/overlay-demo', name: 'Overlay', component: OverlayDemo},
  { path: '/dialog-demo', name: 'Dialog Demo', component: DialogDemo},
  { path: '/card-demo', name: 'Card demo', component: CardDemo},
  { path: '/card', name: 'Card', component: CardDemo},
  { path: '/button', name: 'Button', component: ButtonDemo},
  { path: '/pulse-demo', name: 'Pulse', component: PulseDemo},
  { path: '/tool-tip-demo', name: 'ToolTip', component: ToolTipDemo},
  { path: '/input', name: 'Input', component: InputDemo},
  { path: '/transition-demo', name: 'Transition', component: TransitionDemo},
  { path: '/list-demo', name: 'List', component: List2Demo},
  { path: '/date-picker-demo', name: 'Date Picker', component: DatePicker}
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
