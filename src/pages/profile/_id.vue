<template lang="pug">
    main.container
        .row.spacing
            profile-header
        .row
            aside.side-wrapper
                skills-panel(:skills="skills")
            .center-wrapper
                add-story
                story-feed(:stories="$store.state.story.stories")
            aside.side-wrapper
                p side
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import ProfileHeader from '~/components/profile/ProfileHeader.vue'
    import SkillsPanel from '~/components/profile/SkillsPanel.vue'
    import AddStory from '~/components/feed/AddStory.vue'
    import StoryFeed from '~/components/feed/StoryFeed.vue'

    export default Vue.extend({
        components: {
            ProfileHeader,
            SkillsPanel,
            AddStory,
            StoryFeed
        },
        async asyncData (ctx) {
            await ctx.store.dispatch('story/getProfileFeed')
        },
        data() {
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