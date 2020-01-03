<template lang="pug">
    div
        notifications-container(top="50")
        nuxt.layout
</template>

<script lang="ts">
    import Vue from 'vue'
    import NotificationsContainer from '../components/notifications/notifications-container.vue'

    export default Vue.extend({
        name: 'auth-layout',
        components: {
            NotificationsContainer
        }
    })
</script>

<style lang="scss" scoped>
    .layout {
        display: grid;
        grid-template-columns: 1fr 400px 1fr;
        grid-template-rows: 130px 60px 1fr;
        grid-template-areas: ". . ." ". head ." ". panel .";
    }
</style>