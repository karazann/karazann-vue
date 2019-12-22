import { APIErrorResponse } from '@bit/szkabaroli.karazann-shared.interfaces'

export default ({ store, app: { $axios } }: any) => {
    $axios.interceptors.request.use(
        (config: any) => {
            const token = localStorage.getItem('jwt_token')
            if (token != null) config.headers.Authorization = `Bearer ${token}`
            return config
        },
        (err: any) => {
            return Promise.reject(err)
        }
    )

    $axios.interceptors.response.use(
        (response: any) => {
            return response
        },
        (error: any) => {
            if (!error.response) {
                store.dispatch('notification/notify', { key: 'networkError' })
                return
            }

            const { response } = error
            const apiError: APIErrorResponse = response.data

            if (apiError.errors.length === 1) {
                console.log(apiError.errors[0])
                if (apiError.errors[0].name !== 'ValidationError') {
                    store.dispatch('notification/notify', { key: 'apiError', overrideMsg: apiError.errors[0].message }, { root: true })
                }
            } else return Promise.reject(error)
        }
    )
}
