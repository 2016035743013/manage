import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        routes: [],//路由
        activePath: '/',//被选中的路由下标
        userInfo:  '' ,//用户信息
    },
    getters: {
        getActivePath(state) {
            return state.activePath;
        },
        getRoutes(state) {
            return state.routes;
        },
        getUserInfo(state) {
            return state.userInfo;
        }
    },
    mutations: {
        // 添加路由选项卡
        addToRoutes(state, obj) {
            for (let i = 0; i < state.routes.length; i++) {
                if (state.routes[i].path == obj.path) {
                    store.commit('setActivePath', obj.path);
                    return;
                }
            }
            state.routes.push(obj);
            store.commit('setActivePath', obj.path);
            window.sessionStorage.setItem('routes', JSON.stringify(state.routes));
        },
        // 关闭路由
        delRoutesItem(state, obj) {
            let temp;
            if (obj.flag == 'one') {
                if (obj.path == state.activePath) {
                    for (let i = 0; i < state.routes.length; i++) {
                        if (state.routes[i].path == obj.path) {
                            ++i;
                            let index = i <= state.routes.length - 1 ? i : i = i - 2;
                            if (index <= 0) {
                                index = 0;
                            }
                            store.commit('setActivePath', state.routes[index].path);
                            break;
                        }
                    }
                }
                temp = state.routes.filter((val, index) => {
                    return val.path != obj.path;
                });
            } else {
                temp = state.routes.filter((val, index) => {
                    return val.path == obj.path;
                });
            }
            state.routes = temp;
            window.sessionStorage.setItem('routes', JSON.stringify(state.routes));
        },
        setRoutes(state, val) {
            state.routes = val;
        },
        // 设置被选中的路由路径
        setActivePath(state, val) {
            state.activePath = val;
            window.sessionStorage.setItem('activePath', val);
        },
        // 设置用户信息
        setUserInfo(state, obj) {
            state.userInfo = obj;
        }
    },
})
export { store }