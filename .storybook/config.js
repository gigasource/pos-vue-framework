import { configure, addParameters, app } from '@storybook/vue3';
import { themes } from '@storybook/theming';
import VueRouter from 'vue-router';
import PortalVue from 'portal-vue';
//import 'github-markdown-css';
import '../src/style/main.scss'
//import 'prismjs/themes/prism-tomorrow.css';
//import './style.css';
import '../src/plugin/waves'
import '../src/plugin/darken'
import '@fortawesome/fontawesome-free/css/all.css'

import GigaComponents from "../index";

addParameters({
  options: {
    theme: themes.light,
    panelPosition: 'right',
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
  },
});

// global.root.use(PortalVue);

app.use(GigaComponents);
app.use(PortalVue)

//for jest
/*import VueTest from 'vue/dist/vue.common.js'
import VueCompositionApi from '@vue/composition-api'
// init plugin first
VueTest.use(VueCompositionApi)*/

configure(require.context('../src', true, /\.stories\.js$/), module);

