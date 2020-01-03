<template lang="pug">
    div(v-scroll="onScroll")
        notifications-container(top="100")
        v-header(:signedIn="false" :top="top")
        nuxt.top
</template>

<script lang="ts">
    import Vue from 'vue'
    import NotificationsContainer from '@/components/notifications/notifications-container.vue'

    export default Vue.extend({
        name: 'default-layout',
        components: {
            NotificationsContainer
        },
        data() {
            return {
                top: true
            }
        },
        methods: {
            onScroll(e: any) {
                this.top = e.target.scrollingElement.scrollTop === 0
            }
        }
    })
</script>

<style lang="sass" scoped>
    .top 
        margin-top: 78px
</style>
