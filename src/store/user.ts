// tslint:disable: no-shadowed-variable
import jwtDecode from 'jwt-decode'
import { MutationTree, ActionTree } from 'vuex/types/index'
import { ISignInUserRequest, ICurrentUser, IAuthResponse, IUser } from '@bit/szkabaroli.karazann-shared.interfaces'
import { RootState } from '.'

export interface UserState {
    currentUser: ICurrentUser | undefined
    loggedIn: boolean
}

export const state = (): UserState => ({
    currentUser: undefined,
    loggedIn: false
})

interface ISetCurrentUserPayload { 
    user: ICurrentUser
}

export const mutations: MutationTree<UserState> = {
    SET_CURRENT_USER(state, payload: ISetCurrentUserPayload) {
        state.currentUser = payload.user
        state.loggedIn = true
    },
    LOGOUT_CURRENT_USER(state) {
        state.currentUser = undefined
        state.loggedIn = false
    }
}

export const actions: ActionTree<UserState, RootState> = {
    async signInInternal({ commit }, req: ISignInUserRequest) {
        const { payload } = await this.$axios.$post<any>('/user/signin', req)
        localStorage.setItem('jwt_token', payload.token)
        
        const setUser: ISetCurrentUserPayload = {
            user: jwtDecode(payload.token)
        }
        commit('SET_CURRENT_USER', setUser)

        this.$router.push({ path: `/profile/@${setUser.user.username}/feed` })
    },
    logout({ commit }) { 
        commit('LOGOUT_CURRENT_USER')
        this.$router.push({ path: '/' })
    }
}