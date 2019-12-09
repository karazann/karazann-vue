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

<style lang="sass" scoped>
    .wrapper
        margin: 0 0 20px
        position: relative

    label.error
        color: #EB5757
        font-style: italic
        display: block;
        margin: 10px 0

    i
        position: absolute
        top: 0
        color: #a0a0a0
        text-align: center
        line-height: 48px
        width: 48px
        height: 48px
        font-size: 19px
        background-color: #f8f8f8
        box-sizing: border-box
        display: block
        border-radius: 4px 0 0 4px

    input
        height: 48px
        line-height: 48px
        padding: 0 20px
        outline: none
        font-size: 16px
        color: gray
        max-width: 100%
        width: 100%
        box-sizing: border-box
        display: block
        font-weight: 500
        opacity: 1
        border-radius: 6px
        background: #FFF
        border: 1px solid rgba(128, 147, 173, 0.2)
        box-shadow: 0px 10px 20px rgba(5, 29, 64, 0.05)

        & + span 
            position: absolute
            top: 0px
            left: 0px
            right: 0px
            bottom: 0px
            transition: all 0.3s ease-out
            z-index: -1
            border-radius: 15px

        transition: all 0.1s ease-out
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active 
            -webkit-box-shadow: 0 0 0 30px white inset !important

        &:focus 
            transform: translateY(-1px)
            & + span 
                top: -5px
                left: -5px
                right: -5px
                bottom: -5px
                border-radius: 15px
                background: rgba(159, 148, 240, 0.2)
        
        &.error
            border: 1px solid #EB5757
            color: #EB5757
            box-shadow: 0px 10px 20px rgba(235, 87, 87, 0.05)

        &::-webkit-input-placeholder 
            color: #cdd2d8
        
        &::-moz-placeholder
            color: #cdd2d8
        
        &:-ms-input-placeholder
            color: #cdd2d8
        
        &:-moz-placeholder
            color: #cdd2d8
</style>
