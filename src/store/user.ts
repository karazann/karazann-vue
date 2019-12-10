import axios from 'axios'
import * as Api from '~/api'
import { ActionContext, MutationTree } from 'vuex/types/index'
import { APIErrorResponse, APIError, ISignInUserRequest, ICurrentUser } from '@bit/szkabaroli.karazann-shared.interfaces'

interface UserState {
    currentUser: {}
}

export const state = (): UserState => ({
    currentUser: {}
})

export const mutations: MutationTree<UserState> = {
    SET_CURRENT_USER(sstate: UserState) {
        return
    }
}

export const actions = {
    async signInInternal(context: ActionContext<UserState, any>, req: ISignInUserRequest) {
        try {
            const data = await Api.postJSON<ICurrentUser>('/user/signin', req)
            localStorage.setItem('jwt_token', data.token)
            axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` }
            context.commit('SET_CURRENT_USER', data)
        } catch (e) {
            if (!e.response) context.dispatch('notification/notify', { key: 'networkError' })

            const apiError = e as APIErrorResponse
            apiError.errors.forEach((error: APIError) => {
                if (error.name !== 'ValidationError') {
                    context.dispatch('notification/notify', { key: 'apiError', overrideMsg: error.message })
                }
            })

            throw e
        }
    }
}
