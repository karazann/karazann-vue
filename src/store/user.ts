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
        commit('SET_USER', data)
    }
}
