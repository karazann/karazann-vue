<template lang="pug">
    section
        h3.title Trending
        ul.trending-list
            blog-trending-post(v-for="(post, index) in posts" :key="index" :post="post")
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlogTrendingPost from './BlogTrendingPost.vue'
    
    export default Vue.extend({
        components: {
            BlogTrendingPost
        },
        props: {
            posts: {
                type: Array,
                required: true
            }
        }
    })
</script>

<style lang="scss" scoped>
    h3 {
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .trending-list {
        padding: 0;
        list-style: none;
        margin-top: 35px;
        display: block;

        li {
            margin-bottom: 20px;
        }
    }
</style>
