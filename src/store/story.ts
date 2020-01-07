// tslint:disable: no-shadowed-variable
import { MutationTree, ActionContext, ActionTree } from 'vuex/types/index'
import { RootState } from '.'
import { IStory } from '@bit/szkabaroli.karazann-shared.interfaces'

type ILoadingStory = Partial<IStory>

export interface StoryState {
    stories: IStory[],
    loadingStories: ILoadingStory[],
}

export const state = (): StoryState => ({
    stories: [],
    loadingStories: []
})

export const mutations: MutationTree<StoryState> = {
    SET_PROFILE_STORIES(state: StoryState, data: IStory[]) {
        state.stories = data
    },
    POST_STORY_LOADING(state, data: ILoadingStory) { 
        state.loadingStories.unshift(data)
    },
    POST_STORY(state, data: IStory) {
        state.loadingStories.shift()
        state.stories.unshift(data)
    }
}

export const actions: ActionTree<StoryState, RootState> = {
    async getProfileFeed({ commit }, profile: { userId: string}) {
        const { payload } = await this.$api.getUserStories(profile.userId)
        commit('SET_PROFILE_STORIES', payload)
    },
    async postStory({ commit, rootState }: ActionContext<StoryState, RootState>, story: IStory) {
        const loadingStory: ILoadingStory = {
            userId: rootState.user.currentUser!.userId,
            displayName: rootState.user.currentUser!.firstName + ' ' +  rootState.user.currentUser!.lastName,
            content: story.content,
            attachments: []
        }
        commit('POST_STORY_LOADING', loadingStory)

        const { payload } = await this.$api.postStory(story)
        commit('POST_STORY', payload)
    }
}