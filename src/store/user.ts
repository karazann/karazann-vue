// tslint:disable: no-shadowed-variable
import jwtDecode from 'jwt-decode'
import { MutationTree, ActionTree } from 'vuex/types/index'
import { ISignInUserRequest, ICurrentUser, IUser } from '@bit/szkabaroli.karazann-shared.interfaces'
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
    user: IUser
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
        const { data } = await this.$api.signInInternal(req)
        localStorage.setItem('jwt_token', data.token)

        const setUser: ISetCurrentUserPayload = {
            user: {
                ...jwtDecode(data.token),
                hasAvatar: data.hasAvatar,
                hasCover: data.hasCover
            }
        }

        commit('SET_CURRENT_USER', setUser)
        this.$router.push({ path: `/profile/@${setUser.user.username}/feed` })
    },
    logout({ commit }) {
        commit('LOGOUT_CURRENT_USER')
        this.$router.push({ path: '/' })
    }
}
