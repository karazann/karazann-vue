// tslint:disable: no-shadowed-variable
import { MutationTree, ActionContext, ActionTree } from 'vuex/types/index'
import { RootState } from '.'
import { IStory } from '@bit/szkabaroli.karazann-shared.interfaces'
 
export interface StoryState {
    stories: any[]
}

export const state = (): StoryState => ({
    stories: []
})

export const mutations: MutationTree<StoryState> = {
    SET_PROFILE_STORIES(state: StoryState, data: any) {
        state.stories = data
    },
    POST_PROFILE_STORY(state: StoryState, data: any) {
        state.stories.unshift(data)
    }
}

export const actions: ActionTree<StoryState, RootState> = {
    async getProfileFeed({ commit, rootState }, payload: { userId: string}) {
        const { data } = await this.$axios.get<IStory[]>(`/user/${payload.userId}/feed`)
        commit('SET_PROFILE_STORIES', data)
    },
    async postStory({ commit }: ActionContext<StoryState, any>, story: any) {
        const { data } = await this.$axios.post<any>(`/story`, story)
        commit('POST_PROFILE_STORY', data)
    }
}
