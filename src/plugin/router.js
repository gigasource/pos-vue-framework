import Vue from 'vue';
import VueRouter from 'vue-router';
import KeyboardDemo from '@/view/KeyboardDemo';
import Groupable from '@/view/Groupable';
import MenuDemo from '@/view/MenuDemo';
import SliderDemo from '../view/SliderDemo';
import OverlayDemo from "../view/OverlayDemo";
import SelectIonControl from '../view/SelectIonControl';
import DialogDemo from '../view/DialogDemo';
import PulseDemo from '../view/PulseDemo';
import ToolTipDemo from '../view/ToolTipDemo';
import InputDemo from "../view/InputDemo";
import TransitionDemo from '../view/TransitionDemo';
import ListDemo from '../view/ListDemo';
import List2Demo from "../view/List2Demo";
import DndDialogDemo from '../view/DndDialogDemo';
import GChipGroupDemo from '../view/GChipGroupDemo';
import DatePicker from '../view/DatePickerDemo';
import ExpansionPanelDemo from '../view/ExpansionPanelDemo';
import Textarea from "../view/TextareaDemo";
import LoginView from '../view/LoginView';

const routes = [
  {path: '/login', name: 'Login', component: LoginView},
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
