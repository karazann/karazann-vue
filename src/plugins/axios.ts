import { APIErrorResponse, IOtherUser, APIResponse, IUser, ISignInUserRequest, IStory, IJob } from '@bit/szkabaroli.karazann-shared.interfaces'
import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

/** Declare types for vue and vuex */

/*declare module 'vue/types/vue' {
    interface Vue {
        $api: ReturnType<typeof apiFactory>
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $api: ReturnType<typeof apiFactory>
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $api: ReturnType<typeof apiFactory>
    }
}*/

export const apiFactory = ($axios: NuxtAxiosInstance) => ({
    followUser(userId: string) {
        return $axios.$post<APIResponse>(`/follows/${userId}`)
    },
    unfollowUser(userId: string) {
        return $axios.$delete<APIResponse>(`/follows/${userId}`)
    },
    getUser(username: string) {
        return $axios.$get<APIResponse<IUser>>(`/user/${username}`)
    },
    getFollowers() {
        return $axios.$get<APIResponse<IOtherUser[]>>(`/follows/followers`)
    },
    getFollowings() {
        return $axios.$get<APIResponse<IOtherUser[]>>(`/follows/followings`)
    },
    signInInternal(req: ISignInUserRequest) { 
        return $axios.$post<any>('/user/signin', req)
    },
    getFeed() { 
        return $axios.$get<APIResponse<IStory[]>>(`/user/feed`)
    },
    getUserStories(userId: string) { 
        return $axios.$get<APIResponse<IStory[]>>(`/user/${userId}/feed`)
    },
    postStory(story: any) { 
        return $axios.$post<APIResponse<IStory>>(`/story`, story)
    },
    getUserJobs(userId: string) { 
        return $axios.$get<APIResponse<IJob[]>>(`/jobs?user_id=${userId}&fields=userId,title,jobId,type`)
    }
})

export default ({ store, app }: Context, inject: any) => {
    app.$axios.interceptors.request.use(
        config => {
            const token = localStorage.getItem('jwt_token')
            if (token != null) config.headers.Authorization = `Bearer ${token}`
            return config
        },
        err => {
            return Promise.reject(err)
        }
    )

    app.$axios.interceptors.response.use(
        response => {
            return response
        },
        error => {
            if (!error.response) {
                store.dispatch('notification/notify', { key: 'networkError' })
                return
            }

            const { response } = error
            const apiError: APIErrorResponse = response.data

            if (apiError.errors.length === 1) {
                if (apiError.errors[0].name !== 'ValidationError' && apiError.errors[0].name !== 'NotFoundError') {
                    store.dispatch('notification/notify', { key: 'apiError', overrideMsg: apiError.errors[0].message }, { root: true })
                }
            }

            return Promise.reject(error)
        }
    )

    const api = apiFactory(app.$axios)
    inject('api', api)
}
