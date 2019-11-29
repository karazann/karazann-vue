<template lang="pug">
    li
        n-link.post(to="/")
            img(:src="post.image" alt="")
            .content
                h4 {{ post.title }}
                span {{ post.date }}
</template>

<script>
    export default {
        name: 'blog-trending-post',
        props: {
            post: {
                type: Object,
                validator: prop => {
                    return 'title' && 'date' in prop
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .post {
        border-radius: 12px;
        background-color: #fff;
        position: relative;
        width: 100%;
        overflow: hidden;

        display: block;
        min-height: 150px;

        &:before {
            content: '';
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            background: #fff;
            opacity: 1;
            transition: 0.3s ease-out;
        }

        img {
            display: block;
            object-fit: cover;
            width: 100%;
            height: 100%;
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 9;
            opacity: 1;
            transition: 0.35s;
            border-radius: 13px;
        }

        &:hover:before,
        &.active:before {
            opacity: 0.6;
            background: #334;
        }
        &:hover img,
        &.active img {
            opacity: 1;
        }
        &:hover h4,
        &.active h4 {
            color: #fff;
        }
        &:hover span,
        &.active span {
            background: rgba(255, 255, 255, 0.25);
            color: #fff;
        }
    }

    .content {
        h4 {
            //font-size: $body-font-size;
            font-weight: 600;
            line-height: 24px;
            margin: 0 0 15px 0;
            transition: 0.35s;
        }
        span {
            font-size: 14px;
            display: inline-block;
            background-color: #f5f7fb;
            border-radius: 12px;
            line-height: 20px;
            padding: 6px 12px;
            margin-top: 3px;
            transition: 0.3s;
        }
        display: block;
        padding: 0;
        position: relative;
        z-index: 20;
        padding: 30px;
    }
</style>
