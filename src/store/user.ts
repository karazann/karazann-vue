// tslint:disable: no-shadowed-variable
import jwtDecode from 'jwt-decode'
import { ActionContext, MutationTree } from 'vuex/types/index'
import { ISignInUserRequest, ICurrentUser } from '@bit/szkabaroli.karazann-shared.interfaces'

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
    LOGOUT_USER(state: UserState) {
        state.currentUser = undefined
        state.loggedIn = false
    }
}

export const actions = {
    async signInInternal({ commit }: ActionContext<UserState, any>, req: ISignInUserRequest) {
        const { data } = await this.$axios.post<ICurrentUser>('/user/signin', req)
        localStorage.setItem('jwt_token', data.token)
        this.$router.push({ path: '/profile/me' })
        commit('SET_CURRENT_USER', jwtDecode(data.token))
    }
}