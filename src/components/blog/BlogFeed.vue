<template lang="pug">
    div
        h3 Recent Posts
        div
            blog-post(v-for="(post, index) in posts" :key="index" :post="post")
</template>

<script lang="ts">
    import Vue from 'vue'
    import BlogPost from './BlogPost.vue'
    
    export default Vue.extend({
        components: {
            BlogPost
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
        margin-bottom: 35px !important;
        margin-top: 60px !important;
        line-height: 34px;
    }
</style>
