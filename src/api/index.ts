import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { userApi } from './user'
import { storyApi } from './story'
import { flowApi } from './flow'

export const apiFactory = ($axios: NuxtAxiosInstance) => ({
    ...userApi($axios),
    ...storyApi($axios),
    ...flowApi($axios)
})