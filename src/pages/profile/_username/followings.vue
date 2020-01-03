<template lang="pug">
    .row
        profile-card(v-for="user in users" @unfollow="removeFollow" :profile="user" :key="user.userId")
</template>

<script lang="ts">
    import Vue from 'vue'
    import ProfileCard from '@/components/profile/profile-card.vue'
    import { IOtherUser } from '@bit/szkabaroli.karazann-shared.interfaces'

    interface VueData {
        users: IOtherUser[]
    }

    export default Vue.extend({
        components: {
            ProfileCard
        },
        async asyncData({ store, params, $axios, app, error }): Promise<VueData> {
            const { payload } = await app.$api.getFollowings()
            return {
                users: payload!
            }
        },
        data(): VueData {
            return {
                users: []
            }
        },
        methods: {
            removeFollow(userId: string) {
                this.users = this.users.filter(user => {
                    return user.userId !== userId
                })
            }
        }
    })
</script>