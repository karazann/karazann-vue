<template lang="pug">
    mixin menu-item(linkTo, text)
        li
            n-link(class!=attributes.class, to=linkTo)=text

    header(:class="{'shadow': !top || shadow}")
        .container
            .row.inner
                .brand
                    v-brand
                    v-tag.tag BETA
                nav(v-if='!loggedIn')
                    .horizontal-list
                        +menu-item('/boards/123', 'Roadmap')
                        +menu-item('/auth/signin', 'Sign in')
                        +menu-item('/auth/signup', 'Sign up')(class='btn')
                nav(v-if='loggedIn')
                    .horizontal-list
                        +menu-item('/feed', 'Feed')
                        li
                            n-link(:to="`/profile/@${currentUser.username}`") Me
                        li
                            a.btn(@click="logout") Logout
                    .horizontal-list
                        li
                            //profile-menu(:user='user')
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapState, Store } from 'vuex'
    import ProfileMenu from './ProfileMenu.vue'

    export default Vue.extend({
        name: 'v-header',
        components: {
            ProfileMenu
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
        padding: 20px 0;
        justify-content: space-between;
        position: fixed;
        height: 78px;
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

    .shadow {
        box-shadow: $shadow-lg;
    }

    .inner {
        @include make-col-ready;
        @include make-col(24);
        justify-content: space-between;
    }

    .horizontal-list {
        display: flex;
        list-style: none;
    }

    nav {
        display: none;
        position: relative;

        @include media-breakpoint-up(md) {
            display: flex;
        }

        a {
            color: theme-var(secondary);
            padding: 9px 17px 9px 17px;
            margin: 0 0 0 5px;
            text-decoration: none;
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