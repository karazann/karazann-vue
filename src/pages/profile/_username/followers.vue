<template lang="pug">
    .row
        profile-card(v-for="user in users" :profile="user")
</template>

<script lang="ts">
    import Vue from 'vue'
    import ProfileCard from '~/components/profile/profile-card.vue'

    export default Vue.extend({
        components: {
            ProfileCard
        },
        async asyncData({ store, params, $axios, app, error }) {
            const { payload } = await this.$api.getFollowers()
            return {
                users: payload
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