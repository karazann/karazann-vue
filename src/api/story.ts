import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { APIResponse, IStory, IJob,  } from '@bit/szkabaroli.karazann-shared.interfaces'

export const storyApi = ($axios: NuxtAxiosInstance) => ({
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
    },
    reactStory(storyId: string, reactionType: string) {
        return $axios.$post<APIResponse>(`/reactions?story_id=${storyId}&type=${reactionType}`)
    },
    unreactStory(storyId: string) { 
        return $axios.$delete<APIResponse>(`/reactions?story_id=${storyId}`)
    }
})