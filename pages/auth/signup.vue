<template lang="pug">
	main
		section#head
			v-brand
		section
			auth-panel(:height="500" :width="400")
				h1 Sign up
				v-input(placeholder="Email")
				v-input(placeholder="Password")
				v-input(placeholder="Password again")
				v-button(:fill="true" type="primary") Sign up
</template>

<script>
	import AuthPanel from '@/components/auth/AuthPanel.vue'

	export default {
		name: 'signup-page',
		layout: 'auth',
		components: {
			AuthPanel
		},
		head: {
			title: 'Sign Up'
		}
	}
</script>

<style lang="scss" scoped>
	#head {
		width: 142px;
		text-align: center;
		margin: 0 auto;
		padding: 90px 0 35px 0;
	}
</style>
