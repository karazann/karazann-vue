<template lang="pug">
    main
        v-title#title(title="Blog" subtitle="Featured posts")
        section#carousel
            .container
                .row
                    .col
                        blog-carousel(:posts="posts")
        section#content
            .container
                .row
                    .side
                        v-input.search(placeholder="Search")
                        blog-trending(:posts="posts.slice(0, 3)")
                    .feed 
                        blog-feed(:posts="posts")
</template>

<script lang="ts">
    import Vue from 'vue'

    import { mapState } from 'vuex'
    import BlogTrending from '@/components/blog/BlogTrending.vue'
    import BlogFeed from '@/components/blog/BlogFeed.vue'

    export default Vue.extend({
        name: 'blog-page',
        head: {
            title: 'Blog'
        },
        components: {
            BlogCarousel: () => import('@/components/blog/BlogCarousel.vue'),
            BlogTrending,
            BlogFeed
        },
        async created() {
            console.time('test1')
        },
        computed: {
            ...mapState('blog', ['posts'])
        }
    })
</script>

<style lang="scss" scoped>
    .search {
        margin-top: 60px;
        margin-bottom: 35px;
    }
    .col {
        @include make-col-ready;
        @include make-col(12);
    }
    #title {
        background: #fff;
    }
    #carousel {
        background: #fff;
        padding-bottom: 60px;
        overflow: hidden;

        .slick-list {
            overflow: visible;
        }
    }
    .feed {
        @include make-col-ready;
        @include make-col(12);

        @include media-breakpoint-up(lg) {
            @include make-col(8);
        }
    }
    .side {
        @include make-col-ready;
        @include make-col(12);
        //padding-left: 30px;

        @include media-breakpoint-up(lg) {
            @include make-col(4);
            order: 1;
            //@include make-col-offset(8);
        }
    }
</style>
