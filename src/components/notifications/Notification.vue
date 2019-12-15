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

<style lang="scss" scoped>
    .notification {
        position: relative;
        border-radius: 4px;
        margin-bottom: 2px;
        max-height: 800px;
        overflow: hidden;
        color: #ffffff;

        .notification-message {
            word-break: break-word;
            text-align: center;
            font-weight: bold;
            padding: 10px 30px 10px 30px;
        }
    }

    .notification-error {
        background-color: theme-var(color-red);
    }

    .notification-warn {
        background-color: theme-var(color-yellow);
    }

    .notification-info {
        background-color: theme-var(color-blue);
    }

    .notification-success {
        background-color: theme-var(color-green);
    }

    .notification-enter-active {
        animation: notification-show 180ms cubic-bezier(0.175, 0.885, 0.32, 1.27499);
    }

    .notification-leave-active {
        animation:  notification-hide 250ms cubic-bezier(0.33859, -0.42, 1, -0.22), 
                    notification-shrink 250ms 250ms cubic-bezier(0.5, 0, 0, 1);
        animation-fill-mode: forwards;
    }

    @keyframes notification-show {
        0% {
            opacity: 0;
            transform: perspective(450px) translate(0, -30px) rotateX(90deg);
        }
        100% {
            opacity: 1;
            transform: perspective(450px) translate(0, 0) rotateX(0deg);
        }
    }

    @keyframes notification-shrink {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        100% {
            opacity: 0;
            max-height: 0;
            margin-bottom: 0;
            transform: scale(0.8);
        }
    }

    @keyframes notification-hide {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.8);
        }
    }
</style>
