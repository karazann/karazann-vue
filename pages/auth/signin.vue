<template lang="pug">
	main
		section#head
			v-brand
		section
			auth-panel(:height="450" :width="400")
				div#title
					h1 Sign in
					p or 
						n-link(to="/auth/signup") create an account
				v-input(placeholder="Email")
				v-input(placeholder="Password")
				v-button(:onClick="consoleClick" fill type="primary" ) Sign in
				p#separator or
				v-button(fill type="google") Google
</template>

<script>
    import AuthPanel from '@/components/auth/AuthPanel.vue'

    export default {
        name: 'signin-page',
        head: {
            title: 'Sign In'
        },
        layout: 'auth',
        components: {
            AuthPanel
        },
        methods: {
            consoleClick() {
                console.log('Button clicked')
            }
        }
    }
</script>

<style lang="scss" scoped>
    #head {
        width: 142px;
        text-align: center;
        margin: 0 auto;
        padding: 120px 0 35px 0;
    }

    #separator {
        margin: 25px 0;
        width: 100%;
        text-align: center;
        font-weight: 700;
        color: #cdd2d8;

        &::before,
        &::after {
            content: '';
            display: inline-block;
            border-top: 2px solid #f4f6fa;
            width: 140px;
            margin: 0 10px;
            font-variant: small-caps;
            transform: translateY(-5px);
        }
    }

    #title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 15px 0 35px 0;
        height: 30px;

        h1 {
            line-height: 30px;
        }

        p {
            line-height: 30px;

            a {
                color: #9285f5;
            }
        }
    }
</style>
