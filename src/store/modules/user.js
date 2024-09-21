import { loginAPI, registerAPI } from '../../api/user/user'
import { setToken, removeToken } from '../../utils/auth'

const user = {
  state: {
    loginState: false,
    userInfo: {} /* UserInfo */
  },
  mutations: {
    set_loginState(state) {
      state.loginState = true
    },
    set_userInfo(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登入
    login: async ({ commit }, loginParam /* UserParam */) => {
      const loginForm = {
        name: loginParam.username1,
        password: loginParam.password
      }
      const res = await loginAPI(loginForm)
      console.log("login6666666666666")
        console.log(res)
      if (res && res.data && res.data.success) {
        const userInfo = res.data.content
        console.log("userInfo88888888888")
        console.log(userInfo)
        commit('set_userInfo', userInfo)
        commit('set_loginState', true)
        setToken(userInfo.id)
        return true
      } else {
        return false
      }
    },
    // 注册
    register: async (_, registerParam /* UserParam */) => {
      const registerForm = {
        name: registerParam.newUser,
        password: registerParam.newPW
      }
      const res = await registerAPI(registerForm)
      console.log(res)
      return res.data.success
    },
    // 登出
    logoutAct: ({ commit }) => {
      commit('set_userInfo', {})
      commit('set_loginState', false)
      removeToken()
      return true
    }
  }
}

export default user
