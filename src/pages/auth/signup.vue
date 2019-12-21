<template lang="pug">
    main
        .head
            v-brand
        
        .auth-panel
            .title
                h1 Sign Up
                p or 
                    n-link.bold(to="/auth/signin") go to sign in
            v-input(autocomplete="given-name" placeholder="First name" v-model="firstName")
            v-input(autocomplete="family-name" placeholder="Last name" v-model="lastName")
            v-input(autocomplete="email" type="email" placeholder="Email" v-model="email")
            v-input(autocomplete="new-password" type="password" placeholder="Password" v-model="password")
            p.warning By clicking the "Sign Up" button below you agree to the Terms and Conditions
            v-button(fill large) Sign Up
            p.separator or
            v-button(type="google" fill large) Google
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
    .auth-panel {
        @include make-card;
        padding: 30px 40px;
        grid-area: panel;
    }

    .head {
        margin: 0 auto;
        grid-area: head;
    }

    .separator {
        margin: 25px 0;
        width: 100%;
        text-align: center;
        font-weight: 700;
        color: #b8bcc2;

        &::before,
        &::after {
            content: '';
            display: inline-block;
            border-top: 1px solid #eaecf0;
            width: 100px;
            margin: 0 10px;
            font-variant: small-caps;
            transform: translateY(-5px);
        }
    }

    .title {
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
                color: -var(primary);
                font-weight: bold;
            }
        }
    }

    .warning {
        margin: 28px 0;
        text-align: center;
        font-size: 14px;
        line-height: 21px;
        color: #8192ac;
    }
</style>
