<template lang="pug">
    main
        .container
            h1 Users
            .row
                profile-card(v-for="user in users" :profile="user" :key="profile.userId")
</template>

<script lang="ts">
    import Vue from 'vue'
    import ProfileCard from '../components/profile/profile-card.vue'

    export default Vue.extend({
        head: {
            title: 'Users'
        },
        components: {
            ProfileCard
        },
        async asyncData({ store, params, $axios, app, error }) {
            const { data } = await app.$api.getUsers()
            return {
                users: data
            }
        },
        data() {
            return {
                profile: {
                    firstName: 'Don',
                    lastName: 'Jon',
                    username: 'donjohn',
                    coverImageUrl: 'https://images.unsplash.com/photo-1538291323976-37dcaafccb12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
                    avatarImageUrl: 'https://avatars0.githubusercontent.com/u/22996412?s=460&v=4'
                }
            }
        }
    })
</script>