<template lang="pug">
    .wrapper
        //i.icon-material-outline-account-circle
        input(:id="`input-${name}`" :type="type" :placeholder="placeholder" v-model="content" @input="handleInput" :class="error ? 'error' : null")
        label.error(:for="`input-${name}`" v-show="error") {{ error }}
</template>

<script>
    export default {
        props: {
            placeholder: String,
            type: {
                type: String,
                default: 'text'
            },
            name: String,
            value: String,
            error: String
        },
        data() {
            return {
                content: this.value
            }
        },
        methods: {
            handleInput(e) {
                this.$emit('input', this.content)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        margin: 0 0 20px;
        position: relative;
    }

    label.error {
        color: theme-var(color-red);
        font-style: italic;
        display: block;
        margin: 10px 0;
    }

    i {
        position: absolute;
        top: 0;
        color: #a0a0a0;
        text-align: center;
        line-height: 48px;
        width: 48px;
        height: 48px;
        font-size: 19px;
        background-color: #f8f8f8;
        box-sizing: border-box;
        display: block;
        border-radius: 4px 0 0 4px;
    }

    input {
        background: theme-var(surface);
        color: theme-var(primary-text);
        height: 48px;
        line-height: 48px;
        padding: 0 20px;
        outline: none;
        font-size: 16px;
        max-width: 100%;
        width: 100%;
        box-sizing: border-box;
        display: block;
        font-weight: 500;
        opacity: 1;
        border-radius: 6px;
        border: 1px solid theme-var(secondary-2);
        box-shadow: $shadow-md;

        & + span {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            z-index: -1;
            border-radius: 1000;
        }

        &:focus-within {
            border: 1px solid theme-var(primary);
        }

        &:focus {
            & + span {
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                border-radius: 15px;
                background: rgba(159, 148, 240, 0.2);
            }
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
        }

        &.error {
            border: 1px solid theme-var(color-red);
            color: theme-var(color-red);
            box-shadow: 0px 10px 20px rgba(235, 87, 87, 0.1);
            animation: shake 0.6s linear;
        }

        &::-webkit-input-placeholder {
            color: theme-var(secondary-text);
        }

        &::-moz-placeholder {
            color: theme-var(secondary-text);
        }

        &:-ms-input-placeholder {
            color: theme-var(secondary-text);
        }

        &:-moz-placeholder {
            color: theme-var(secondary-text);
        }

        @keyframes rubberBand {
            0% {
                transform: scale3d(1, 1, 1);
            }
            30% {
                transform: scale3d(1.25, 0.75, 1);
            }
            40% {
                transform: scale3d(0.75, 1.25, 1);
            }
            50% {
                transform: scale3d(1.15, 0.85, 1);
            }
            65% {
                transform: scale3d(0.95, 1.05, 1);
            }
            75% {
                transform: scale3d(1.05, 0.95, 1);
            }
            100% {
                transform: scale3d(1, 1, 1);
            }
        }
        @keyframes shake {
            from,
            to {
                transform: translate3d(0, 0, 0);
            }

            10%,
            30%,
            50%,
            70%,
            90% {
                transform: translate3d(-7px, 0, 0);
            }

            20%,
            40%,
            60%,
            80% {
                transform: translate3d(7px, 0, 0);
            }
        }
    }
</style>
