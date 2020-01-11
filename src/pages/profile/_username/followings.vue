<template lang="pug">
    div
        .row.spacer-b
            .col
                h2 Followings
        .row
            profile-card(v-for="user in users" @unfollow="removeFollow" :profile="user" :key="user.userId")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ProfileCard from '../../../components/profile/profile-card.vue'
    import { IOtherUser } from '@bit/szkabaroli.karazann-shared.interfaces'
    import { IUser } from '@bit/szkabaroli.karazann-shared.interfaces'

    interface VueData {
        users: IOtherUser[]
    }

    export default Vue.extend({
        head(this: { profile: IUser }) {
            return {
                title: `${this.profile.lastName} ${this.profile.firstName} (@${this.profile.username}) - Followings`
            }
        },
        props: {
            profile: Object as PropType<IUser>
        },
        components: {
            ProfileCard
        },
        async asyncData({ app }): Promise<VueData> {
            const { data } = await app.$api.getFollowings()
            return {
                users: data
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