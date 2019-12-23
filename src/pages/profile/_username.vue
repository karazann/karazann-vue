<template lang="pug">
    main.container
        .row.spacing
            profile-header(:profile="profile" :isMe="isMe")
        .row
            aside.side-wrapper
                skills-panel(:skills="skills")
            .center-wrapper
                post-story
                story-feed(:stories="$store.state.story.stories")
            aside.side-wrapper
                p side
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { IUser } from '@bit/szkabaroli.karazann-shared.interfaces'
    import ProfileHeader from '~/components/profile/profile-header.vue'
    import SkillsPanel from '~/components/profile/skills-panel.vue'
    import PostStory from '~/components/feed/post-story.vue'
    import StoryFeed from '~/components/feed/story-feed.vue'

    interface VueData {
        profile: IUser | undefined,
        skills: any
    }

    export default Vue.extend({
        middleware: 'auth',
        components: {
            ProfileHeader,
            SkillsPanel,
            PostStory,
            StoryFeed
        },
        async asyncData ({ store, params, $axios, app, error }) {
            try {
                const profile = await $axios.$get<IUser>(`user/${params.username}`)
                const isMe = profile.username === store.state.user.currentUser.username
                await store.dispatch('story/getProfileFeed', { userId: profile._id })
                return {
                    profile,
                    isMe
                }
            } catch(e) {

                error({ statusCode: 404, message: 'Post not found' })
            }

        },
        data(): VueData {
            return {
                profile: undefined,
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
                        text: 'WebDevelopment',
                        color: 'red'
                    },
                    {
                        text: 'Test',
                        color: 'green'
                    }
                ]
            }
        },
        computed: {
            ...mapState('story', ['stories'])
        }
    })
</script>

<style lang="scss" scoped>
    .spacing {
        padding-top: 80px;
    }

    .center-wrapper {
        @include make-col-ready;
        @include make-col(12);
        margin-top: 30px;
    }

    .side-wrapper {
        @include make-col-ready;
        @include make-col(6);
        margin-top: 30px;
    }

    p {
        background: theme-var(color-red);
    }
</style>