<template lang="pug">
    .notification-container
        notification(v-for="notification in notifications" :key="notification.key" :notification="notification")
</template>

<script lang="ts">
    import Vue from 'vue'
    import Notification from './Notification.vue'

    export default Vue.extend({
        name: 'notifications-container',
        components: {
            Notification
        },
        computed: {
            notifications() {
                return this.$store.state.notification.notifications
            }
        }
    })
</script>

<style lang="sass" scoped> 
    .notification-container 
        top: 20px
        right: 0
        bottom: auto
        left: 0
        position: fixed
        z-index: 1060
        width: 80%
        max-width: 400px
        margin: auto
</style>