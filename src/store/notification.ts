// tslint:disable: no-shadowed-variable

import { MutationTree, ActionTree } from 'vuex/types/index'
import { RootState } from '.'

interface Notification {
    type: 'error' | 'warn' | 'info' | 'success'
    message: string
    showed: boolean
    timer: any | undefined
}

export interface NotificationState {
    notifications: {
        [key: string]: Notification
    }
}

export const state = (): NotificationState => ({
    notifications: {
        loginSuccess: {
            message: 'You have successfully logged in.',
            type: 'success',
            showed: false,
            timer: undefined
        },
        networkError: {
            message: 'Our services not available!',
            type: 'error',
            showed: false,
            timer: undefined
        },
        apiError: {
            message: 'Unhandled api error!',
            type: 'error',
            showed: false,
            timer: undefined
        }
    }
})

interface NotifyPayload {
    key: string
    overrideMsg?: string
    duration?: number
}

export const mutations: MutationTree<NotificationState> = {
    SHOW_NOTIFICATION(state: NotificationState, payload: NotifyPayload) {
        state.notifications[payload.key].showed = true
        if (payload.overrideMsg) state.notifications[payload.key].message = payload.overrideMsg
    },

    HIDE_NOTIFICATION(state: NotificationState, payload: { key: string }) {
        state.notifications[payload.key].showed = false
    }
}

async function wait(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

export const actions: ActionTree<NotificationState, RootState> = {
    async notify({ commit }, payload: NotifyPayload) {
        commit('SHOW_NOTIFICATION', payload)
        await wait(payload.duration || 5000)
        commit('HIDE_NOTIFICATION', payload)
    }
}
