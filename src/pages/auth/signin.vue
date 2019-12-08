<template lang="pug">
    main
        #head
            v-brand
        div
            .auth-panel()
                div#title
                    h1 Sign in
                    p or 
                        n-link.bold(to="/auth/signup") create an account
                form(@submit.prevent="onSubmit")
                    v-input(placeholder="Username or email" type="text" v-model="user.identifier")
                    v-input(placeholder="Password" type="password" v-model="user.password")
                    v-button(:onClick="signIn" fill type="submit") Sign in
                p#separator or
                v-button(fill type="google") Google
</template>

<script lang="ts">
    import Vue from 'vue'
    import AuthPanel from '@/components/auth/AuthPanel.vue'

    export default Vue.extend({
        name: 'signin-page',
        head: {
            title: 'Sign In'
        },
        layout: 'auth',
        data() {
            return {
                loading: false,
                errors: [],
                user: {
                    identifier: '',
                    password: ''
                }
            }
        },
        components: {
            AuthPanel
        },
        methods: {
            async onSubmit(e: any) {
                this.loading = true
                try {
                    await this.$store.dispatch('user/signInInternal', this.user)
                } catch (e) {
                    const data = e.response.data
                        console.log(data)
                    
                    if(data.name === 'UnauthorizedError') {
                        this.errors = []
                    } else if(data === 'ValidationError') {
                        this.errors = []
                    }
                    
                    //this.$store.dispatch('notify/error', e.message)
                }
                this.loading = false
            }
        }
    })
</script>

<style lang="scss" scoped>
    main {
        width: 100%;
    }
    
    .auth-panel {
        background: #FFF;
        border-radius: 12px;
        box-shadow: 0px 7px 50px rgba(5, 29, 64, 0.05);
        height: 500px; 
        width: 400px;
        padding: 30px 40px;
        margin: 0 auto;
        position: relative;
    }
    
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
            width: 100px;
            margin: 0 10px;
            font-variant: small-caps;
            transform: translateY(-5px);
        }
    }

    #title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 15px 0 80px 0;
        height: 30px;

        h1 {
            line-height: 30px;
            margin: 0;
        }

        p {
            margin: 0;
            line-height: 30px;

            .bold {
                color: #0396FF;
                font-weight: bold;
            }
        }
    }
</style>
