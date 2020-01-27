import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { APIResponse, ICreateFlowRequest } from '@bit/szkabaroli.karazann-shared.interfaces'

export const flowApi = ($axios: NuxtAxiosInstance) => ({
    createFlow(req: ICreateFlowRequest) {
        return $axios.$post<APIResponse<any[]>>(`/flows`, req)
    },
    getFlowData(flowId: string) { 
        return $axios.$get<APIResponse<any>>(`/flows/${flowId}?fields=nodes`)
    },
    getUserFlows() { 
        return $axios.$get<APIResponse<any[]>>(`/flows?fields=name,flowId`)
    },
    // TODO: Remove req: any
    updateFlow(flowId: string, req: any) {
        return $axios.$patch<APIResponse>(`/flows/${flowId}`, req)
    }
})
