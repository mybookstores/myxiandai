import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import customer from './modules/customer'
import paper from './modules/paper'
import user from './modules/user'
import router, {resetRouter} from "@/router";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        currentPathName: ''
    },
    mutations: {
        setPath (state) {
            state.currentPathName = localStorage.getItem("currentPathName")
        },
        logout() {
            // 清空缓存
            localStorage.removeItem("user")
            localStorage.removeItem("menus")
            router.push("/login")

            // 重置路由
            resetRouter()
        }
    },
    actions: {

    },
    modules: {
        customer,
        paper,
        user
    },
    getters
})

export default store
