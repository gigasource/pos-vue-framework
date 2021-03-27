import { configure, addParameters } from '@andoshin11/storybook-vue3';
import { themes } from '@storybook/theming';
import VueRouter, {createRouter, createWebHistory} from 'vue-router';
import PortalVue from 'portal-vue';
//import 'github-markdown-css';
import '../src/style/main.scss'
//import 'prismjs/themes/prism-tomorrow.css';
//import './style.css';
import '../src/plugin/waves'
import '../src/plugin/darken'
import '@fortawesome/fontawesome-free/css/all.css'

import GigaComponents from "../index";

const vueRouter = createRouter({
  history: createWebHistory(),
  routes: [],
});

addParameters({
  options: {
    theme: themes.light,
    panelPosition: 'right',
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  },
});

global.root.use(vueRouter);
// global.root.use(PortalVue);

global.root.use(GigaComponents);
global.root.use(PortalVue)

import {
  storiesOf, specs, describe, it,
  after, before, beforeEach, afterEach
} from './facade';

import expect from 'expect';

global.storiesOf = storiesOf;
global.specs = specs;
global.describe = () => {
};
global.it = it;
global.after = after;
global.before = before;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.expect = expect;

//for jest
/*import VueTest from 'vue/dist/vue.common.js'
import VueCompositionApi from '@vue/composition-api'
// init plugin first
VueTest.use(VueCompositionApi)*/

configure(require.context('../src', true, /\.stories\.js$/), module);

