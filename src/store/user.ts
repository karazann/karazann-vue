// tslint:disable: no-shadowed-variable

import axios from 'axios'
import * as Api from '~/api'
import { ActionContext, MutationTree } from 'vuex/types/index'
import { APIErrorResponse, APIError, ISignInUserRequest, ICurrentUser } from '@bit/szkabaroli.karazann-shared.interfaces'

interface UserState {
    currentUser: ICurrentUser | undefined
    loggedIn: boolean
}

// TODO: Get logged in from local
export const state = (): UserState => ({
    currentUser: undefined,
    loggedIn: false
})

export const mutations: MutationTree<UserState> = {
    SET_CURRENT_USER(state: UserState, user: ICurrentUser) {
        state.loggedIn = true
        state.currentUser = user
    },
    REMOVE_CURRENT_USER(state: UserState) {
        state.currentUser = undefined
        state.loggedIn = false
    }
}

export const actions = {
    async signInInternal({ dispatch, commit }: ActionContext<UserState, any>, req: ISignInUserRequest) {
        try {
            const data = await Api.postJSON<ICurrentUser>('/user/signin', req)
            localStorage.setItem('jwt_token', data.token)
            axios.defaults.headers.common = { Authorization: `Bearer ${data.token}` }
            commit('SET_CURRENT_USER', data)
        } catch (e) {
            if (!e.response) dispatch('notification/notify', { key: 'networkError' }, { root: true })
            else {
                const apiError = e.response.data as APIErrorResponse
                apiError.errors.forEach((error: APIError) => {
                    if (error.name !== 'ValidationError') {
                        dispatch('notification/notify', { key: 'apiError', overrideMsg: error.message }, { root: true })
                    }
                })

                throw e
            }
        }
    }
}
