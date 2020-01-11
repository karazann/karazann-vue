<template lang="pug">
    .col
        .profile-card(@click="click")
            img.cover(v-if="profile.hasCover" :src="coverImage")
            div.cover(v-else)
            profile-image.profile(:size="100" :profile="profile")
            .profile-details
                h3 {{ `${profile.firstName} ${profile.lastName}` }}
                p {{ `@${profile.username}` }}
            .skills
                v-tag(color="blue") Tag
            .footer
                v-button.primary(@onClick="follow") {{ profile.following ? 'Unfollow' : 'Follow'}}
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ProfileImage from './profile-image.vue'
    import { IOtherUser } from '@bit/szkabaroli.karazann-shared.interfaces'

    export default Vue.extend({
        props: {
            profile: Object as PropType<IOtherUser>
        },
        components: {
            ProfileImage
        },
        computed: {
            coverImage(): string {
                return `${process.env.staticUrl}/covers/${this.profile.userId}.jpg`
            }
        },
        methods: {
            click(e: PointerEvent) {
                this.$router.push({ path: `/profile/@${this.profile.username}/feed` })
            },
            async follow() {
                if (this.profile.following) {
                    const res = await this.$api.unfollowUser(this.profile.userId)
                    if (res.success === true) this.profile.following = false
                    this.$emit('unfollow', this.profile.userId)
                } else {
                    const res = await this.$api.followUser(this.profile.userId)
                    if (res.success === true) this.profile.following = true
                    this.$emit('follow', this.profile.userId)
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    .col {
        @include make-col-ready;
        @include make-col(8);
        margin-bottom: 30px;
    }

    .profile-card {
        @include make-card;
        transition: transform 0.3s;

        &:hover {
            transform: translateY(-2px);
        }

        .cover {
            display: block;
            height: 90px;
            width: 100%;
            border-top-left-radius: $border-radius-lg;
            border-top-right-radius: $border-radius-lg;
            border-bottom: $border;
        }

        img.cover {
            object-fit: cover;
        }

        .profile {
            margin: -50px auto 0 auto;
            position: relative;
            display: border-box;
            z-index: 10;
        }

        .skills {
            padding: 20px;
        }

        .profile-details {
            padding: 15px 0 10px 0;
            * {
                text-align: center;
            }
            p {
                margin-top: 4px;
            }
        }

        .footer {
            border-top: $border;
            display: flex;
            justify-content: flex-end;
            padding: 15px;
        }
    }
</style>
