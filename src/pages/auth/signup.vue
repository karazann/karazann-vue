<template lang="pug">
    main
        section#head
            v-brand
        
        .auth-panel
            div#title
                h1 Sign Up
                p or 
                    n-link.bold(to="/auth/signin") go to sign in
            v-input(autocomplete="given-name" placeholder="First name" v-model="firstName")
            v-input(autocomplete="family-name" placeholder="Last name" v-model="lastName")
            v-input(autocomplete="email" type="email" placeholder="Email" v-model="email")
            v-input(autocomplete="new-password" type="password" placeholder="Password" v-model="password")
            p#warning By clicking the "Sign Up" button below you agree to the Terms and Conditions
            v-button(fill) Sign Up
            p#separator or
            div#social
                v-button(type="google") Google
</template>

<script lang="ts">
    import AuthPanel from '@/components/auth/AuthPanel.vue'
    import { mapState } from 'vuex'

    export default {
        name: 'signup-page',
        head: {
            title: 'Sign Up'
        },
        layout: 'auth',
        components: {
            AuthPanel
        },
        data() {
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    main {
        width: 100%;
        height: 100%
    }

    .auth-panel {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0px 7px 50px rgba(5, 29, 64, 0.05);
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

    #warning {
        margin: 28px 0;
        text-align: center;
        font-size: 14px;
        line-height: 21px;
        color: #8192ac;
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

    #social {
        display: flex;
        justify-items: center;

        & > * {
            flex-grow: 1;
        }
    }

    #title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 15px 0 60px 0;
        height: 30px;

        h1 {
            line-height: 30px;
            margin: 0;
        }

        p {
            margin: 0;
            line-height: 30px;

            .bold {
                color: #0396ff;
                font-weight: bold;
            }
        }
    }
</style>
