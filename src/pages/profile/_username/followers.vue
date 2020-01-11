<template lang="pug">
    div
        .row.spacer-b
            .col
                h2 Followers
        .row
            profile-card(v-for="user in users" :profile="user" :key="user.userId")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ProfileCard from '../../../components/profile/profile-card.vue'
    import { IUser } from '@bit/szkabaroli.karazann-shared.interfaces'

    export default Vue.extend({
        head() {
            return {
                title: `${this.profile.lastName} ${this.profile.firstName} (@${this.profile.username}) - Followers`
            }
        },
        props: {
            profile: Object as PropType<IUser>
        },
        components: {
            ProfileCard
        },
        async asyncData({ store, params, $axios, app, error }) {
            const { data } = await app.$api.getFollowers()
            return {
                users: data
            }
        }
    })
</script>