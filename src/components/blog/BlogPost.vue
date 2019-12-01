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

<style lang="scss" scoped>
    .post {
        display: flex;
        background: #fff;
        margin-bottom: 35px;
        border-radius: 12px;
        overflow: hidden;
        transition: 0.3s;
        &:hover {
            box-shadow: 0 30px 70px rgba(0, 0, 0, 0.07);
            transform: translateY(-2px);
        }

        flex-direction: column;

        @include media-breakpoint-up(md) {
            // Larger than md: 768px,
            flex-direction: row;
        }
    }

    .thumbnail {
        flex: 0 0 auto;
        max-width: none;
        max-height: 100%;
        overflow: hidden;
        position: relative;

        width: 100%;
        height: 230px;

        @include media-breakpoint-up(md) {
            width: 260px;
            height: auto;
        }
    }

    .thumbnail-inner {
        height: 100%;
        width: 100%;
        overflow: hidden;
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
        transition: 0.3s;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
        }

        .tag {
            bottom: 20px;
            left: 20px;
            margin: 0;

            box-sizing: border-box;

            color: #233458;
            background-color: #fff;
            border-radius: 12px;
            padding: 6px 14px;
            line-height: 20px;
            margin-bottom: 9px;
            position: absolute;
            left: 32px;
            z-index: 110;
            transition: 0.4s;
        }
    }

    .content {
        flex: 1;
        padding: 35px;

        h3 {
            margin-bottom: 15px;
            display: block;

            a {
                font-size: 22px;
                line-height: 33px;
                //color: $body-heading-color;
                margin-bottom: 15px;
                display: block;
                &:hover {
                    color: #9185f5;
                }
            }
        }
    }

    a.info,
    .info,
    .date {
        font-size: 14px;
        font-weight: 500;
        color: #7c42fe;
        margin-bottom: 20px;
        display: inline-block;
        background-color: rgba(126, 66, 254, 0.164);
        border-radius: 12px;
        padding: 10px 14px;
        margin-right: 3px;
        transition: 0.3s;
    }

    a.info:hover {
        color: #fff;
        //background-color: $primary-color;
    }

    .content {
        p {
            padding: 0;
            margin: 0;
            display: block;
        }
        a.button i.icon-feather-arrow-right {
            font-size: 20px;
            top: 4px;
            left: -1px;
            position: relative;
            margin: 0 -5px;
        }
    }

    .info-list {
        display: block;
    }

    blockquote {
        padding: 10px 20px;
        margin: 0 20px;
        font-size: 17px;
        line-height: 30px;
        color: #888;
        border-left: 5px solid #eee;
    }
</style>
