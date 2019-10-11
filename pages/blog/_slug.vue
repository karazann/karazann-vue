<template lang="pug">
    h1 {{msg}}
</template>

<script>
	export default {
        name: 'blog-detail-page',
		asyncData({ store, params }) {
            return {
                msg: params.slug
            }
		}
	}
</script>

<style lang="scss" scoped>
	h1 {
		color: green;
	}
</style>
