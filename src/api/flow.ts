import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { APIResponse, ICreateFlowRequest } from '@bit/szkabaroli.karazann-shared.interfaces'

export const flowApi = ($axios: NuxtAxiosInstance) => ({
    createFlow(req: ICreateFlowRequest) {
        return $axios.$post<APIResponse<any[]>>(`/flows`, req)
    }
})