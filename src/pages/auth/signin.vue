<template lang="pug">
    main.grid
        .head
            v-brand
        .auth-panel
            .title
                h1 Sign In
                p or 
                    n-link.bold(to="/auth/signup") create an account
            form(@submit.prevent="onSubmit")
                v-input(autocomplete="email" placeholder="Username or email" type="text" @input="clear('identifier')" v-model="user.identifier" name="identifier" :error="getError('identifier')")
                v-input(autocomplete="password" placeholder="Password" type="text" @input="clear('password')" v-model="user.password" name="password" :error="getError('password')")
                v-button(fill type="submit") Sign in
            p.separator or
            v-button(fill type="google") Google
</template>

<script lang="ts">
    import Vue from 'vue'
    import mixins from 'vue-typed-mixins'

    import AuthPanel from '~/components/auth/AuthPanel.vue'

    import { formError } from '~/mixins/form-errors.ts'
    import { validate, mapError } from '~/helpers'

    import { ValidationError } from '@bit/szkabaroli.karazann-shared.validator'
    import { SignInValidator } from '@bit/szkabaroli.karazann-shared.validators'
    import { ISignInUserRequest, APIErrorResponse, APIError } from '@bit/szkabaroli.karazann-shared.interfaces'

    interface VueData {
        loading: boolean
        user: ISignInUserRequest
    }

    export default mixins(formError).extend({
        name: 'signin-page',
        head: {
            title: 'Sign In'
        },
        layout: 'auth',
        data(): VueData {
            return {
                loading: false,
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
            async onSubmit() {
                this.clearAll()
                const errors = validate(SignInValidator, this.user as any)

                if (errors.length > 0) {
                    this.addErrors(errors)
                } else {
                    this.loading = true

                    try {
                        await this.$store.dispatch('user/signInInternal', this.user)
                        this.$store.dispatch('notification/notify', { key: 'loginSuccess' })
                    } catch (e) {
                        const { response } = e

                        response.data.errors.forEach((error: APIError) => {
                            if (error.name === 'ValidationError') {
                                this.addError(error as ValidationError)
                            }
                        })
                    }

                    this.loading = false
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    .auth-panel {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0px 7px 50px rgba(5, 29, 64, 0.05);
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
                color: #0396ff;
                font-weight: bold;
            }
        }
    }
</style>
