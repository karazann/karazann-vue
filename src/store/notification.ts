// tslint:disable: no-shadowed-variable

import { ActionContext } from 'vuex/types/index'

interface Notification {
    key: string
    type: 'error' | 'warn' | 'info' | 'success'
    message: string
    showed: boolean
}

interface NoticicationState {
    notifications: Notification[]
}

export const state = (): NoticicationState => ({
    notifications: [
        {
            key: 'loginSuccess',
            message: 'You have successfully logged in.',
            type: 'success',
            showed: false
        },
        {
            key: 'loginError',
            message: 'Please try again.',
            type: 'error',
            showed: false
        },
        {
            key: 'logoutSuccess',
            message: 'You have logged out successfully.',
            type: 'success',
            showed: false
        },
        {
            key: 'logoutError',
            message: 'Something Went Wrong!',
            type: 'error',
            showed: false
        },
        {
            key: 'networkError',
            message: 'Network error!',
            type: 'error',
            showed: false
        },
        {
            key: 'apiError',
            message: 'Api error!',
            type: 'error',
            showed: false
        }
    ]
})

interface NotifyPayload {
    key: string,
    overrideMsg?: string
    duration?: number
}

export const mutations = {
    SHOW_NOTIFICATION(state: NoticicationState, payload: NotifyPayload) {
        state.notifications.forEach(n => {
            if (n.key === payload.key) n.showed = true
            if (payload.overrideMsg) n.message = payload.overrideMsg
        })
    },

    HIDE_NOTIFICATION(state: NoticicationState, payload: { key: string }) {
        state.notifications.forEach(n => {
            if (n.key === payload.key) {
                n.showed = false
            }
        })
    }
}

export const actions = {
    notify(c: ActionContext<NoticicationState, any>, payload: NotifyPayload) {
        c.commit('SHOW_NOTIFICATION', payload)
        setTimeout(() => {
            c.commit('HIDE_NOTIFICATION', payload)
        }, payload.duration || 5000)
    }
}
