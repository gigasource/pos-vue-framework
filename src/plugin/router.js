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
import TransitionDemo from '../view/TransitionDemo';
import ImageDemo from "../view/ImageDemo";
import IconDemo from "../view/IconDemo";

const routes = [
  {path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  {path: '/order-default', name: 'OrderDefault', component: OrderDefault},
  {path: '/groupable', name: 'Groupable', component: Groupable},
  {path: '/payment', name: 'Payment', component: Payment},
  {path: '/slider', name: 'Slider', component: SliderDemo},
  {path: '/menu-demo', name: 'Menu', component: MenuDemo},
  {path: '/overlay-demo', name: 'Overlay', component: OverlayDemo},
  {path: '/dialog-demo', name: 'Dialog Demo', component: DialogDemo},
  {path: '/card-demo', name: 'Card demo', component: CardDemo},
  {path: '/card', name: 'Card', component: CardDemo},
  {path: '/button', name: 'Button', component: ButtonDemo},
  {path: '/pulse-demo', name: 'Pulse', component: PulseDemo},
  {path: '/tool-tip-demo', name: 'ToolTip', component: ToolTipDemo},
  {path: '/transition-demo', name: 'Transition', component: TransitionDemo},
  {path: '/image-demo', name: 'Image', component: ImageDemo},
  {path: '/icon-demo', name: 'Icon', component: IconDemo}
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
