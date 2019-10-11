<template lang="pug">
    div
        h4 Recent Posts
        div
            blog-post(v-for="(post, index) in posts" :key="index" :post="post")
</template>

<script>
	import BlogPost from './BlogPost.vue'
	export default {
		components: {
			BlogPost
		},
		props: {
			posts: {
				type: Array,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	h4 {
		margin-bottom: 35px !important;
		margin-top: 60px !important;

		font-size: 22px;
		line-height: 34px;
	}
</style>
