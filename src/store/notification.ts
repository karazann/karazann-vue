// tslint:disable: no-shadowed-variable

import { ActionContext } from 'vuex/types/index'

interface Notification {
    type: 'error' | 'warn' | 'info' | 'success'
    message: string
    showed: boolean
    timer: any | undefined
}

interface NoticicationState {
    notifications: {
        [key: string]: Notification
    }
}

export const state = (): NoticicationState => ({
    notifications: {
        loginSuccess: {
            message: 'You have successfully logged in.',
            type: 'success',
            showed: false,
            timer: undefined
        },
        networkError: {
            message: 'Network error!',
            type: 'error',
            showed: false,
            timer: undefined
        },
        apiError: {
            message: 'Api error!',
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

export const mutations = {
    SHOW_NOTIFICATION(state: NoticicationState, payload: NotifyPayload) {
        state.notifications[payload.key].showed = true
        if (payload.overrideMsg) state.notifications[payload.key].message = payload.overrideMsg
    },

    HIDE_NOTIFICATION(state: NoticicationState, payload: { key: string }) {
        state.notifications[payload.key].showed = false
    }
}

async function wait(ms: number) {
    return new Promise(resolve => {
        resolve(setTimeout(resolve, ms))
    })
}

export const actions = {
    async notify(c: ActionContext<NoticicationState, any>, payload: NotifyPayload) {
        const t = c.state.notifications
        c.commit('SHOW_NOTIFICATION', payload)
        const timer = await wait(payload.duration || 5000)
        console.log(timer)
        c.commit('HIDE_NOTIFICATION', payload)
    }
}
