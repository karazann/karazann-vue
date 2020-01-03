<template lang="pug">
    main.container
        .row.spacing
            profile-header.header-spacing(:profile="profile" :isMe="isMe")
        nuxt-child(keep-alive :profile="profile" :isMe="isMe")
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import { IUser } from '@bit/szkabaroli.karazann-shared.interfaces'
    import ProfileHeader from '@/components/profile/profile-header.vue'

    interface VueData {
        profile: IUser | undefined
    }

    export default Vue.extend({
        middleware: 'auth',
        components: {
            ProfileHeader
        },
        async asyncData({ store, params, $axios, app, error }) {
            try {
                const { payload } = await app.$api.getUser(params.username)
                const isMe = payload!.username === store.state.user.currentUser.username
                return {
                    profile: payload!,
                    isMe
                }
            } catch (e) {
                error({ statusCode: 404 })
            }
        },
        data(): VueData {
            return {
                profile: undefined
            }
        },
        computed: {
            ...mapState('story', ['stories'])
        }
    })
</script>

<style lang="scss" scoped>
    .spacing {
        padding-top: 80px;
    }
    .header-spacing {
        padding-bottom: 30px;
    }
</style>