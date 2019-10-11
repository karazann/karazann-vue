<template lang="pug">
    div(v-scroll="onScroll")
        v-header(:signedIn="false" :top="top")
        nuxt.top
</template>

<script>
	export default {
		name: 'default-layout',
		data() {
			return {
				top: true
			}
		},
		methods: {
			onScroll(e) {
				this.top = (e.target.scrollingElement.scrollTop == 0)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		margin-top: 78px;
	}
</style>
