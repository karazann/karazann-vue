<template lang="pug">
    mixin menu-item(linkTo, text)
        li
            n-link(class!=attributes.class, to=linkTo)=text

    header(:class="{'shadow': !top || shadow}")
        .container
            .row.inner
                v-brand
                .links
                    div(v-if='!signedIn')
                        .horizontal-list
                            +menu-item('/developers', 'Developers')
                            +menu-item('/blog', 'Blog')
                            +menu-item('/faq', 'FAQ')
                            +menu-item('/roadmap', 'Roadmap')
                            +menu-item('/auth/signin', 'Sign in')
                            +menu-item('/auth/signup', 'Sign up')(class='btn')
                    div(v-if='signedIn')
                        .horizontal-list
                            +menu-item('/', 'Hello')
                            +menu-item('/', 'Test')
                        .horizontal-list
                            li
                                profile-menu(:user='user')
</template>

<script>
    import ProfileMenu from './ProfileMenu.vue'

    export default {
        name: 'v-header',
        components: {
            ProfileMenu
        },
        props: {
            top: Boolean,
            signedIn: Boolean,
            shadow: Boolean
        }
    }
</script>

<style lang="scss" scoped>
    header {
        top: 0;
        display: flex;
        padding: 20px 0;
        justify-content: space-between;
        background: #fff;
        position: relative;
        position: fixed;
        width: 100%;
        z-index: 1000;
        transition: all 0.4s ease;
    }
    .shadow {
        box-shadow: 0 3px 30px rgba(0, 0, 0, 0.08);
    }
    .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .horizontal-list {
        display: flex;
        list-style: none;
    }
    .links {
        display: none;
        position: relative;

        @include media-breakpoint-up(md) {
            // Larger than md: 768px,
            display: flex;
        }

        a {
            margin: 0 15px 0 22px;
            height: 38px;
            line-height: 38px;
            text-decoration: none;
            color: #051d40;
            font-size: 16px;

            &:hover {
                color: #9285f5;
            }
        }
    }
</style>
