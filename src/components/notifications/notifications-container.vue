<template lang="pug">
    .notification-container(:style="{ top: `${top}px`}")
        notification(v-for="notification in notifications" :key="notification.key" :notification="notification")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import Notification from './notification.vue'

    export default Vue.extend({
        name: 'notifications-container',
        components: {
            Notification
        },
        props: {
            top: String as PropType<string>
        },
        computed: {
            notifications(): any {
                return this.$store.state.notification.notifications
            }
        }
    })
</script>

<style lang="sass" scoped>
    .notification-container
        pointer-events: none
        right: 0
        bottom: auto
        left: 0
        position: fixed
        z-index: 1060
        width: 80%
        max-width: 400px
        margin: auto
</style>
