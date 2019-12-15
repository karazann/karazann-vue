<template lang="pug">
    n-link.post(:to="`/blog/${post.slug}`")
        //- Blog Post Thumbnail
        .thumbnail
            .thumbnail-inner
                span.tag {{post.tag}}
                img(:src="post.image" alt="")
        
        //- Blog Post Content
        .content
            span.date {{post.date}}
            h3 {{post.title}}
            p {{post.description}}
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            post: {
                type: Object,
                required: true
            }
        }
    })
</script>

<style lang="sass" scoped>
    .post
        @include create-card
        display: flex
        margin-bottom: 35px
        border-radius: 12px
        overflow: hidden
        transition: 0.3s
        box-shadow: $shadow-sm
        flex-direction: column

        @include md
            flex-direction: row

        &:hover
            box-shadow: $shadow-lg
            transform: translateY(-2px)

    .thumbnail
        flex: 0 0 auto
        max-width: none
        max-height: 100%
        overflow: hidden
        position: relative

        width: 100%
        height: 230px

        @include md
            width: 260px
            height: auto

    .thumbnail-inner
        height: 100%
        width: 100%
        overflow: hidden
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15)
        transition: 0.3s

        img
            height: 100%
            width: 100%
            object-fit: cover
            position: absolute
            top: 0
            left: 0

        .tag
            @include create-tag
            bottom: 20px
            left: 20px
            margin: 0
            line-height: 20px
            margin-bottom: 9px
            position: absolute
            left: 32px
            z-index: 110
            transition: 0.4s

    .content
        flex: 1
        padding: 35px
        h3
            margin-bottom: 15px
            display: block
            a
                font-size: 22px
                line-height: 33px
                margin-bottom: 15px
                display: block

    a.info,
    .info,
    .date
        font-size: 14px
        font-weight: bold
        // color: #7c42fe
        color: #0396FF
        margin-bottom: 15px
        display: inline-block
        background-color: rgba(3, 150, 255, 0.16)
        border-radius: 6px
        padding: 8px 12px
        margin-right: 3px
        transition: 0.3s

    a.info:hover
        color: #fff
        background-color: $primary-color

    .content
        p
            padding: 0
            margin: 0
            display: block

        a.button i.icon-feather-arrow-right
            font-size: 20px
            top: 4px
            left: -1px
            position: relative
            margin: 0 -5px

    .info-list
        display: block
</style>
