<template lang="pug">
    transition(name="notification")
        .notification(v-show="notification.showed" )
            .notification-message(:class="`notification-${notification.type}`") {{ notification.message }}
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    export default Vue.extend({
        name: 'notification',
        props: {
            notification: Object as PropType<any>
        }
    })
</script>

<style lang="sass" scoped>
    .notification
        position: relative
        border-radius: 4px
        margin-bottom: 2px
        max-height: 800px
        overflow: hidden
        color: #FFFFFF

        .notification-message
            word-break: break-word
            text-align: center
            font-weight: bold
            padding: 10px 30px 10px 30px

    .notification-error
        background-color: $red-color

    .notification-warn
        background-color: $orange-color

    .notification-info
        background-color: $blue-color

    .notification-success
        background-color: $green-color

    .notification-enter-active
        animation: notification-show 180ms cubic-bezier(.175,.885,.32,1.27499)

    .notification-leave-active
        animation: notification-hide 250ms cubic-bezier(.33859,-.42,1,-.22), notification-shrink 250ms 250ms cubic-bezier(.5,0,0,1)
        animation-fill-mode: forwards

    @keyframes notification-show
        0%
            opacity: 0
            transform: perspective(450px) translate(0, -30px) rotateX(90deg)
        100%
            opacity: 1
            transform: perspective(450px) translate(0, 0) rotateX(0deg)

    @keyframes notification-shrink
        0%
            opacity: 0
            transform: scale(.8)
        100%
            opacity: 0
            max-height: 0
            margin-bottom: 0
            transform: scale(.8)

    @keyframes notification-hide
        0%
            opacity: 1
            transform: scale(1)
        100%
            opacity: 0
            transform: scale(.8)
</style>
