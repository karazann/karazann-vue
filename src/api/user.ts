import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { APIResponse, ISignInUserRequest, IAuthResponse, IUser, IOtherUser } from '@bit/szkabaroli.karazann-shared.interfaces'

export const userApi = ($axios: NuxtAxiosInstance) => ({
    signInInternal(req: ISignInUserRequest) {
        return $axios.$post<APIResponse<IAuthResponse>>('/user/signin', req)
    },
    followUser(userId: string) {
        return $axios.$post<APIResponse>(`/follows/${userId}`)
    },
    unfollowUser(userId: string) {
        return $axios.$delete<APIResponse>(`/follows/${userId}`)
    },
    getUser(username: string) {
        return $axios.$get<APIResponse<IUser>>(`/user/${username}`)
    },
    getUsers() {
        return $axios.$get<APIResponse<IOtherUser[]>>(`/user`)
    },
    getFollowers() {
        return $axios.$get<APIResponse<IOtherUser[]>>(`/follows/followers`)
    },
    getFollowings() {
        return $axios.$get<APIResponse<IOtherUser[]>>(`/follows/followings`)
    }
})
