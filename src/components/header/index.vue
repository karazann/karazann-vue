<template lang="pug">
    mixin menu-item(linkTo, text)
        li
            n-link(class!=attributes.class, to=linkTo)=text

    header(:class="{'shadow': !top || shadow}")
        .container
            .row
                .col.inner
                    .brand
                        v-brand
                        v-tag.tag ALPHA
                    nav(v-if='!loggedIn')
                        .horizontal-list
                            +menu-item('/boards/123', 'Roadmap')
                            +menu-item('/auth/signin', 'Sign in')
                            +menu-item('/auth/signup', 'Sign up')(class='btn')
                    nav(v-if='loggedIn')
                        .horizontal-list
                            li
                                n-link(:to="`/feed`") Feed
                            li
                                n-link.profile(:to="`/profile/@${currentUser.username}/feed`")
                                    profile-image(:size="45" :style="{ marginTop: '-5px' }" :profile="currentUser")
                                    p Hi, {{ currentUser.firstName }}
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState, Store } from 'vuex'
    import ProfileMenu from './profile-menu.vue'
    import ProfileImage from '~/components/profile/profile-image.vue'

    export default Vue.extend({
        name: 'v-header',
        components: {
            ProfileMenu,
            ProfileImage
        },
        props: {
            top: Boolean,
            shadow: Boolean
        },
        computed: {
            ...mapState('user', ['loggedIn']),
            ...mapState('user', ['currentUser'])
        },
        methods: {
            logout() {
                this.$store.dispatch('user/logout')
            }
        }
    })
</script>

<style lang="scss" scoped>
    header {
        background: theme-var(surface);
        border-bottom: 1px solid theme-var(secondary-2);
        top: 0;
        display: flex;
        padding: 15px 0;
        justify-content: space-between;
        position: fixed;
        height: 69px;
        width: 100%;
        z-index: 1000;
        transition: all 0.4s ease;
    }

    .brand {
        display: flex;
        align-items: center;

        .tag {
            margin-left: 8px;
        }
    }

    .profile {
        display: flex;

        p {
            margin-left: 10px;
            color: theme-var(primary-text)
        }
    }

    .shadow {
        box-shadow: $shadow-lg;
    }

    .horizontal-list {
        display: flex;
        list-style: none;
    }

    .inner {
        display: flex;
        justify-content: space-between;
    }

    nav {
        display: none;
        position: relative;

        @include media-breakpoint-up(md) {
            display: flex;
        }

        a {
            color: theme-var(secondary);
            padding: 0 0px 0 30px;
            margin: 0 0 0 5px;
            line-height: 38px;
            font-size: 15px;
            font-weight: bold;
            display: block;
            transition: all 0.1s ease-in;

            &:hover {
                color: theme-var(primary);
            }

            &.btn {
                background: theme-var(primary);
                color: white;
                border-radius: $border-radius-md;
                box-shadow: $primary-shadow-lg;

                &:hover {
                    color: white;
                    box-shadow: none;
                    transform: translateY(1px);
                }
            }
        }
    }
</style>