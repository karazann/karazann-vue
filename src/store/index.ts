import { UserState } from './user'
import { StoryState } from './story'
import { NotificationState } from './notification'

export interface RootState { 
    user: UserState,
    story: StoryState
    notification: NotificationState
}