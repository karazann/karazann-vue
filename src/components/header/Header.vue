<template lang="pug">
    mixin menu-item(linkTo, text)
        li
            n-link(class!=attributes.class, to=linkTo)=text

    header(:class="{'shadow': !top || shadow}")
        .container
            .inner
                v-brand
                .links
                    nav(v-if='!signedIn')
                        .horizontal-list
                            +menu-item('/flow', 'Flows')
                            +menu-item('/blog', 'Blog')
                            +menu-item('/faq', 'FAQ')
                            +menu-item('/roadmap', 'Roadmap')
                            +menu-item('/auth/signin', 'Sign in')
                            +menu-item('/auth/signup', 'Sign up')(class='btn')
                    nav(v-if='signedIn')
                        .horizontal-list
                            +menu-item('/', 'Hello')
                            +menu-item('/', 'Test')
                        .horizontal-list
                            li
                                profile-menu(:user='user')
</template>

<script lang="ts">
    import Vue from 'vue'
    import ProfileMenu from './ProfileMenu.vue'

    export default Vue.extend({
        name: 'v-header',
        components: {
            ProfileMenu
        },
        props: {
            top: Boolean,
            signedIn: Boolean,
            shadow: Boolean
        }
    })
</script>

<style lang="sass" scoped>
    header 
        top: 0;
        display: flex;
        padding: 20px 0;
        border-bottom: $border
        justify-content: space-between;
        background: #fff;
        position: relative;
        position: fixed;
        height: 78px
        width: 100%;
        z-index: 1000;
        transition: all 0.4s ease;
    
    .shadow
        box-shadow: $shadow-sm


    
    .inner
        @include make-col-ready
        @include make-col(12)
        display: flex;
        justify-content: space-between;
        align-items: center;
    
    .horizontal-list 
        display: flex;
        list-style: none;
    
    .links 
        display: none;
        position: relative;

        @include media-breakpoint-up(md) 
            // Larger than md: 768px,
            display: flex;
        

        a 
            padding: 9px 17px 9px 17px
            margin: 0 0 0 5px
            text-decoration: none
            font-size: 15px
            font-weight: bold
            color: $grey-color
            display: block
            transition: all .1s ease-in

            &.btn
                background: $primary-color
                border-radius: $radius-md
                color: white
                box-shadow: $primary-shadow
                &:hover
                    box-shadow: none
                    transform: translateY(1px)
                    color: white

            &:hover
                color: $primary-color
            
        
    
</style>

/*
header
        top: 0
        display: flex
        padding: 20px 0
        justify-content: space-between
        background: #fff
        position: fixed
        width: 100%
        z-index: 1000
        transition: all 0.4s ease

    .header-wrapper
        @include create-container
        .header
            height: 38px
            display: flex
            justify-content: space-between
            align-items: center
            grid-area: container

    .shadow
        box-shadow: $shadow-sm


    .horizontal-list
        display: flex
        list-style: none

    .links
        display: none
        position: relative

        @include md
            // Larger than md: 768px,
            display: flex

        a
            padding: 9px 17px 9px 17px
            margin: 0 0 0 5px
            text-decoration: none
            font-size: 15px
            font-weight: bold
            color: $grey-color
            display: block
            transition: all .1s ease-in

            &.btn
                background: $primary-color
                border-radius: $radius-md
                color: white
                box-shadow: $primary-shadow
                &:hover
                    box-shadow: none
                    transform: translateY(1px)
                    color: white

            &:hover
                color: $primary-color

*/