<template lang="pug">
    .row
        aside.left-wrapper
            skills-panel(:skills="skills")
        .center-wrapper
            post-story(v-if="isMe")
            story-feed(:stories="stories" :loadingStories="$store.state.story.loadingStories")
        aside.right-wrapper
            p side
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    import SkillsPanel from '../../../components/profile/skills-panel.vue'
    import PostStory from '../../../components/feed/post-story.vue'
    import StoryFeed from '../../../components/feed/story-feed.vue'
    import { IUser, IStory } from '@bit/szkabaroli.karazann-shared.interfaces'

    interface VueData {
        stories: IStory[],
        skills: any
    }

    export default Vue.extend({
        head(this: { profile: IUser }) {
            return {
                title: `${this.profile.lastName} ${this.profile.firstName} (@${this.profile.username})`
            }
        },
        components: {
            SkillsPanel,
            PostStory,
            StoryFeed
        },
        props: {
            profile: Object as PropType<any>,
            isMe: Boolean as PropType<boolean>
        },
        async mounted() {
            const { data } = await this.$api.getUserStories(this.profile.userId)
            this.stories = data
        },
        data(): VueData {
            return {
                skills: [
                    {
                        text: 'React.js',
                        color: 'blue'
                    },
                    {
                        text: 'Node.js',
                        color: 'orange'
                    },
                    {
                        text: 'Web Development',
                        color: 'red'
                    },
                    {
                        text: 'Test',
                        color: 'green'
                    }
                ],
                stories: []
            }
        }
    })
</script>

<style lang="scss" scoped>
    .center-wrapper {
        @include make-col-ready;
        @include make-col(24);

        @include media-breakpoint-up(md) {
            @include make-col(18);
        }

        @include media-breakpoint-up(lg) {
            @include make-col(12);
        }
    }
    .left-wrapper, .right-wrapper {
        @include make-col-ready;
        display: none;
    }
    .left-wrapper {
        @include media-breakpoint-up(md) {
            display: initial;
            @include make-col(6);
        }
    }
    .right-wrapper {
        @include media-breakpoint-up(lg) {
            display: initial;
            @include make-col(6);
        }
    }
</style>