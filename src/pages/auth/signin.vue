<template lang="pug">
    main
        #head
            v-brand
        .auth-panel
            div#title
                h1 Sign in
                p or 
                    n-link.bold(to="/auth/signup") create an account
            form(@submit.prevent="onSubmit")
                v-input(autocomplete="email" placeholder="Username or email" type="text" v-model="user.identifier" name="identifier" :error="mapError(validationErrors, 'identifier')")
                v-input(autocomplete="password" placeholder="Password" type="text" v-model="user.password" name="password" :error="mapError(validationErrors, 'password')")
                v-button(fill type="submit") Sign in
            p#separator or
            v-button(fill type="google") Google
</template>

<script lang="ts">
    import Vue from 'vue'
    import AuthPanel from '~/components/auth/AuthPanel.vue'
    import { validate, mapError } from '~/utils/validator'
    import { ValidationError } from '@bit/szkabaroli.karazann-shared.validator'
    import { SignInValidator } from '@bit/szkabaroli.karazann-shared.validators'
    import { plainToClass } from 'class-transformer'
    import { ISignInUserRequest, APIErrorResponse, APIError } from '@bit/szkabaroli.karazann-shared.interfaces'

    interface VueData {
        loading: boolean
        validationErrors: ValidationError[]
        user: ISignInUserRequest
        error?: APIError
    }

    export default Vue.extend({
        name: 'signin-page',
        head: {
            title: 'Sign In'
        },
        layout: 'auth',
        data(): VueData {
            return {
                loading: false,
                validationErrors: [],
                user: {
                    identifier: '',
                    password: ''
                }
            }
        },
        components: {
            AuthPanel
        },
        watch: {
            user(val, oldVal) {
                this.validationErrors = []
            }
        },
        methods: {
            mapError,
            async onSubmit(e: any) {
                const errors = validate(SignInValidator, this.user)

                if (/*errors.length !== 0*/ false) {
                    this.validationErrors = errors
                } else {
                    this.loading = true
                    
                    try {
                        await this.$store.dispatch('user/signInInternal', this.user)
                    } catch (e) {
                        this.validationErrors = [];
                        (e as APIErrorResponse).errors.forEach((error: APIError) => {
                            if(error.name === 'ValidationError') {
                                this.validationErrors.push(error as ValidationError)
                            } else {
                                this.error = error
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
    main {
        width: 100%;
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
