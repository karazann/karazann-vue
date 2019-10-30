<template lang="pug">
    main
        section#head
            v-brand
        div
            auth-panel(:height="590" :width="400")
                div#title
                    h1 Sign up
                    p or 
                        n-link(to="/auth/signin") log in
                v-input(autocomplete="given-name" placeholder="First name" v-model="firstName")
                v-input(autocomplete="family-name" placeholder="Last name" v-model="lastName")
                v-input(autocomplete="email" type="email" placeholder="Email" v-model="email")
                v-input(autocomplete="new-password" type="password" placeholder="Password" v-model="password")
                p#warning By clicking the "Sign Up" button below you agree to the Terms and Conditions
                v-button(:onClick="signup" fill type="primary") Sign Up
                p#separator or
                div#social
                    v-button(type="google") Google 
                    v-button(type="google") Facebook 
                    v-button(type="google") Github
</template>

<script>
    import AuthPanel from '@/components/auth/AuthPanel.vue'
    import { mapState } from 'vuex'
    import { onError } from 'apollo-link-error'
    import gql from 'graphql-tag'

    const signupInternal = gql`
        mutation SignInAndGetToken($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
            signupInternal(firstName: $firstName, lastName: $lastName, email: $email, password: $password, passwordAgain: $password) {
                token
            }
        }
    `

    const link = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`))
        if (networkError) console.log(`[Network error]: ${networkError}`)
    })

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
        methods: {
            async signup() {
                this.$apollo.writeData({ data: { visibilityFilter: 'filter' } })
                const response = await this.$apollo.mutate({
                    mutation: signupInternal,
                    variables: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        password: this.password
                    }
                })
                console.log(response)
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

    #warning {
        margin: 28px 0;
        text-align: center;
        font-size: 13px;
        line-height: 21px;
        color: #8192ac;
    }

    #separator {
        margin: 25px 0;
        width: 100%;
        text-align: center;
        font-weight: 700;
        color: #d0dae7;

        &::before,
        &::after {
            content: '';
            display: inline-block;
            border-top: 2px solid #eef5ff;
            width: 140px;
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
