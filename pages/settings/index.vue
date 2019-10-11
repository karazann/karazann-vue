<template lang="pug">
    main
        title-bar#title(title="Settings")
        section#account
            .container
                .row
                    .col test
        section#profile
            .container
                .row
                    .col dasf
</template>

<script>
	import TitleBar from '@/components/shared/TitleBar.vue'
	export default {
		name: 'settings-page',
		head: {
			title: 'Settings'
		},
		components: {
			TitleBar
		}
	}
</script>

<style lang="scss" scoped>
	.col {
		@include make-col-ready;
		@include make-col(12);
	}
</style>
