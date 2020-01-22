<template lang="pug">
    main
        .container
            .row.spacer
                aside.left-wrapper
                    p side
                .center-wrapper
                    story-feed(:stories="stories")
                aside.right-wrapper
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
            const { data } = await app.$api.getFeed()

            return {
                stories: data
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

