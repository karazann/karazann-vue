<template lang="pug">
    main.container
        .row.spacing
            profile-header
        .row
            aside.side-wrapper
                skills-panel(:skills="skills")
            .center-wrapper
                add-story
                story-feed(:stories="stories")
            aside.side-wrapper
                p side
</template>

<script lang="ts">
    import Vue from 'vue'
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
                ],
                stories: [
                    {
                        id: '123',
                        type: 'story',
                        title: '123',
                        author: 'You'
                    },
                    {
                        id: '1234',
                        type: 'job',
                        title: '1234',
                        author: 'You'
                    },
                    {
                        id: '1234',
                        type: 'story',
                        title: '1234',
                        author: 'Roland'
                    }
                ]
            }
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