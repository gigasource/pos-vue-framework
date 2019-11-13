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
import Dashboard from "../POSView/Dashboard";

const routes = [
  {path: '/keyboard-demo', name: 'KeyboardDemo', component: KeyboardDemo},
  {path: '/groupable', name: 'Groupable', component: Groupable},
  {path: '/slider', name: 'Slider', component: SliderDemo},
  {path: '/menu-demo', name: 'Menu', component: MenuDemo},
  {path: '/overlay-demo', name: 'Overlay', component: OverlayDemo},
  {path: '/dialog-demo', name: 'Dialog', component: DialogDemo},
  {path: '/selection-control', name: 'SelectIon Control', component: SelectIonControl},
  {path: '/pulse-demo', name: 'Pulse', component: PulseDemo},
  {path: '/tool-tip-demo', name: 'ToolTip', component: ToolTipDemo},
  {path: '/input', name: 'Input', component: InputDemo},
  {path: '/transition-demo', name: 'Transition', component: TransitionDemo},
  {path: '/chip-group', name: 'Chip Group', component: GChipGroupDemo},
  {path: '/list-demo', name: 'List', component: List2Demo},
  {path: '/dnd-dialog-demo', name: 'Dnd Dialog Demo', component: DndDialogDemo},
  {path: '/date-picker-demo', name: 'Date Picker', component: DatePicker},
  {path: '/expansion-panel-demo', name: 'Expansion Panel', component: ExpansionPanelDemo},
  {path: '/textarea', name: 'Textarea', component: Textarea},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
