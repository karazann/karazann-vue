<template lang="pug">
    .wrapper
        header
            img(:src="profile.coverImageUrl ? profile.coverImageUrl : '/no-image.jpg'")
            .profile
                .profile-image
                    profile-image(:avatarImage="profile.avatarImageUrl" :size="144")
                .profile-details
                    .name
                        h2 {{`${profile.firstName} ${profile.lastName}`}}
                        v-tag.tag(color="green") Freelancer
                    p @{{profile.username}}
                .follow
                    v-button.primary(v-if="!isMe") Follow
            nav 
                n-link(:to="`/profile/@${profile.username}/feed`") Feed
                n-link(to="/") Skills
                n-link(to="/flow") Flows
                n-link(to="/document") Docs
                n-link(v-if="isMe" :to="`/profile/@${profile.username}/followings`") Followings
                n-link(v-if="isMe" :to="`/profile/@${profile.username}/followers`") Followers
</template>

<script lang="ts">
    // https://images.unsplash.com/photo-1538291323976-37dcaafccb12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80
    import Vue, { PropType } from 'vue'
    import ProfileImage from './profile-image.vue'
    import { IUser } from '@bit/szkabaroli.karazann-shared.interfaces'

    export default Vue.extend({
        name: 'profile-header',
        props: {
            profile: Object as PropType<IUser>,
            isMe: Boolean as PropType<boolean>
        },
        components: {
            ProfileImage
        }
    })
</script>

<style lang="scss" scoped>
    .wrapper {
        @include make-col-ready;
        @include make-col(24);
    }

    header {
        @include make-card;

        img {
            display: block;
            height: 210px;
            width: 100%;
            object-fit: cover;
            border-top-left-radius: $border-radius-lg;
            border-top-right-radius: $border-radius-lg;
        }

        .profile {
            margin: 15px 30px 30px 30px;
            display: flex;
            flex-direction: row;
            position: relative;
            justify-content: space-between;

            .profile-image {
                position: absolute;
                bottom: -2px;
            }

            .profile-details {
                margin-left: 146px + 10px;
                padding-bottom: 15px;

                .name {
                    display: flex;
                    align-items: center;
                    h1 {
                        line-height: 38px;
                    }
                    .tag {
                        margin-left: 8px;
                    }
                }

                p {
                    color: theme-var(primary);
                }
            }

            .follow {
                align-self: flex-end;
            }
        }

        nav {
            padding: 25px 30px;
            border-top: $border;

            a {
                font-weight: bold;
                margin: 0 20px 0 0;
                color: theme-var(secondary) !important;

                &.active {
                    color: theme-var(primary) !important;
                }

                &:hover {
                    color: theme-var(primary) !important;
                }
            }
        }
    }
</style>