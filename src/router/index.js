import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import {
  PositionManage,
  StaffManage,
  OrganizationManage,
  RoleManage,
  ManagersManage
} from './menu'
const Home = () => import('../components/Home');
const FirstPage = () => import('../components/pages/FirstPage');
const Login = () => import('../components/pages/login/Login');
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
let routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: FirstPage,
      },
      {
        path: '/staffManage',
        component: StaffManage,
      },
      {
        path: '/organizationManage',
        component: OrganizationManage,
      },
      {
        path: '/positionManage',
        component: PositionManage,
      },
      {
        path: '/roleManage',
        component: RoleManage,
      },
      {
        path: '/managersManage',
        component: ManagersManage,
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }

];
let router = new VueRouter({
  routes: routes,
  mode: 'history',
});
export default router;