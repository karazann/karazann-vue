// tslint:disable: no-shadowed-variable

import * as Api from '~/api'
import { MutationTree, ActionContext } from 'vuex/types/index'
import { APIErrorResponse } from '@bit/szkabaroli.karazann-shared.interfaces'

interface StoryState {
    stories: any[]
}

export const state = (): StoryState => ({
    stories: []
})

export const mutations: MutationTree<StoryState> = {
    SET_PROFILE_STORIES(state: StoryState, data: any) {
        state.stories = data
    },
    ADD_PROFILE_STORY(state: StoryState, data: any) {
        state.stories.unshift(data)
    }
}

export const actions = {
    async getProfileFeed({ commit, rootState }: ActionContext<StoryState, any>) {
        const { data } = await this.$axios.get<any[]>(`/user/${rootState.user.currentUser.userId}/feed`)
        commit('SET_PROFILE_STORIES', data)
    },
    async postStory({ commit }: ActionContext<StoryState, any>, story: any) {
        const { data } = await this.$axios.post<any>(`/story`, story)
        commit('ADD_PROFILE_STORY', data)
    }
}
