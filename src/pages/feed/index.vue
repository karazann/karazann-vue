<template lang="pug">
    main
        .container
            .row.spacer
                aside.side-wrapper
                    p side
                .center-wrapper
                    story-feed(:stories="stories")
                aside.side-wrapper
                    p side
</template>

<script lang="ts">
    import Vue from 'vue'
    import StoryFeed from '../../components/feed/story-feed.vue'

    export default Vue.extend({
        components: {
            StoryFeed
        },
        async asyncData({ app }) {
            const { payload } = await app.$api.getFeed()

            return {
                stories: payload
            }
        }
    })
</script>

<style lang="scss" scoped>
    .spacer {
        padding-top: 80px;
    }
    .center-wrapper {
        @include make-col-ready;
        @include make-col(12);
    }
    .side-wrapper {
        @include make-col-ready;
        @include make-col(6);
    }
</style>