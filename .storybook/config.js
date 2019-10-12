import { configure, addParameters } from '@storybook/vue';
import { themes } from '@storybook/theming';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCompositionAPI from '@vue/composition-api';
import 'github-markdown-css';
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

configure(require.context('../stories', true, /\.stories\.js$/), module);
