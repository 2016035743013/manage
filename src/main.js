import 'babel-polyfill'
import Vue from 'vue'

// 按需导入图标
import VeLine from 'v-charts/lib/line.common'
import histogram from 'v-charts/lib/histogram.common'
Vue.component(VeLine.name, VeLine);
Vue.component(histogram.name, histogram);

import App from './App'

// 按需导入element-ui
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Form,
  FormItem,
  Button,
  Input,
  Alert,
  Table,
  TableColumn,
  Container,
  Header,
  Aside,
  Main,
  Message,
  MessageBox,
  Tabs,
  TabPane,
  Radio,
  Select,
  pagination,
  Option,
  Loading,
} from 'element-ui';
Vue.use(Menu);
Vue.use(Select);
Vue.use(pagination);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Tooltip);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
Vue.use(Alert);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Radio);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

// 导入jQuery
import $ from 'jquery'
Vue.prototype.$ = $;

// 导入路由
import router from './router/index'

// 导入滚动条插件
import vuescroll from 'vuescroll';
Vue.component('vuescroll', vuescroll);

// 导入vuex
import { store } from './store/index'
Vue.config.productionTip = false

// 定义时间的全局过滤器
Vue.filter('updateTime', function(val) {
  // console.log(new Date(val).toLocaleString());
  return new Date(val).toLocaleString();
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
