// tslint:disable: no-shadowed-variable
import { MutationTree, ActionTree } from 'vuex/types/index'
import { RootState } from '.'

export interface FlowEditorState {
    currentFlowId: string
}

export const state = (): FlowEditorState => ({
    currentFlowId: ''
})

export const mutations: MutationTree<FlowEditorState> = {
    SET_FLOW(state, payload: { flowId: string }) {
        state.currentFlowId = payload.flowId
    }
}

export const actions: ActionTree<FlowEditorState, RootState> = {
    async updateFlow({ commit, state }) {
        await this.$api.updateFlow(state.currentFlowId, {})
    }
}
