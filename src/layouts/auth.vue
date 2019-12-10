<template lang="pug">
    div
        notifications-container
        nuxt
</template>

<script lang="ts">
    import Vue from 'vue'
    import NotificationsContainer from '~/components/notifications/NotificationsContainer.vue'

    export default Vue.extend({
        name: 'auth-layout',
        components: {
            NotificationsContainer
        }
    })
</script>
