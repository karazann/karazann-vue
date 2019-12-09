import axios from 'axios'
import * as Api from '~/api'
import { ActionContext } from 'vuex/types/index'

interface UserState {
    currentUser: {}
}

export const state = (): UserState => ({
    currentUser: {}
})

export const mutations = {
    SIGNIN_REQUEST(s: UserState) {
        alert('send')
    },
    SET_USER(s: UserState, d: any) {
        console.info(d)
    },
}

export const actions = {
    async signInInternal({ commit }: ActionContext<UserState, any>, req: { identifier: string; password: string }) {
        const { data } = await Api.signInInternal(req.identifier, req.password)
        localStorage.setItem('jwt_token', data.token)
        axios.defaults.headers.common = {'Authorization': `Bearer ${data.token}`}
        commit('SET_CURRENT_USER', data)
    }
}
