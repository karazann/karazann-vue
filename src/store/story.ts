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
    SET_PROFILE_STORIES(state: StoryState, data: IStory[]) {
        state.stories = data
    },
    POST_PROFILE_STORY(state: StoryState, data: IStory) {
        state.stories.unshift(data)
    }
}

export const actions: ActionTree<StoryState, RootState> = {
    async getProfileFeed({ commit }, profile: { userId: string}) {
        const { payload } = await this.$api.getUserStories(profile.userId)
        commit('SET_PROFILE_STORIES', payload)
    },
    async postStory({ commit }: ActionContext<StoryState, any>, story: any) {
        const { payload } = await this.$api.postStory(story)
        commit('POST_PROFILE_STORY', payload)
    }
}