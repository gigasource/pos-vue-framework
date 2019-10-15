import { configure, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCompositionAPI from '@vue/composition-api';
//import 'github-markdown-css';
import '../src/style/main.scss'
//import 'prismjs/themes/prism-tomorrow.css';
//import './style.css';

addParameters({
  options: {
    theme: themes.light,
    panelPosition: 'right',
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  },
});

Vue.use(VueRouter);
Vue.use(VueCompositionAPI);

import {storiesOf, specs, describe, it,
  after, before, beforeEach, afterEach} from "./facade";

import expect from "expect";

global.storiesOf = storiesOf;
global.specs = specs;
global.describe = () => {};
global.it = it;
global.after = after;
global.before = before;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.expect = expect;

//for jest
import VueTest from 'vue/dist/vue.common.js'
import VueCompositionApi from '@vue/composition-api'
// init plugin first
VueTest.use(VueCompositionApi)

configure(require.context('../stories', true, /\.stories\.js$/), module);

