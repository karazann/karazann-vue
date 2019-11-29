<template lang="pug">
    nuxt-link.item-container(:to="`/blog/${post.slug}`" @mousedown.native="handleMouseDown" @click.native="handleClick" :event="''")
        .item
            img(v-if="post.image" :src="post.image" :alt="post.title")
            span.item-tag {{post.tag}}
            article.content
                ul.post-tags
                    li {{post.date}}
                h3 {{post.title}}
                p  {{post.description}}
</template>

<script>
    export default {
        name: 'blog-compact-post',
        props: {
            post: {
                type: Object,
                validator: prop => {
                    return 'slug' && 'title' && 'description' && 'tag' && 'date' in prop
                }
            }
        },
        data() {
            return {
                clientX: 0,
                clientY: 0
            }
        },
        methods: {
            handleMouseDown(e) {
                ;(this.clientX = e.clientX), (this.clientY = e.clientY)

                e.preventDefault() // stops weird link dragging effect
            },
            handleClick(e) {
                e.stopPropagation()
                if (this.clientX === e.clientX || this.clientY === e.clientY) {
                    console.log('open')
                    this.$router.push({ path: this.post.slug })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .item-container {
        display: block;
        height: 100%;
        width: 100%;
        background: transparent;
        transform: translate3d(0, 0, 0);
        transition: transform 0.4s;
        margin-bottom: 30px;
        margin-top: 30px;
        margin: 15px;
        display: block;
        width: calc(100% - 30px);
    }

    .item {
        background: #ccd;
        border-radius: 12px;
        height: 100%;
        display: block;
        position: relative;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        height: 460px;
        z-index: 100;
        cursor: pointer;
        transition: all 0.4s;
        &:hover {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
        }
        img {
            object-fit: cover;
            height: 100%;
            width: 100%;
            border-radius: 12px;
        }
        &:before {
            content: '';
            top: 0;
            position: absolute;
            height: 100%;
            width: 100%;
            z-index: 9;
            border-radius: 12px;
            background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.7) 10%, rgba(0, 0, 0, 0) 100%);
            transition: all 0.4s;
        }
    }

    @media (max-width: 1366px) {
        .item {
            height: 420px;
        }
    }

    .content {
        position: absolute;
        bottom: 32px;
        left: 0;
        padding: 0 34px;
        width: 100%;
        z-index: 50;
        box-sizing: border-box;
        h3 {
            color: #fff;
            padding: 5px 0;
            margin: 2px 0 0 0;
        }
        span {
            font-weight: 300;
            display: inline-block;
            color: rgba(255, 255, 255, 0.7);
        }
        p {
            display: inline-block;
            color: rgba(255, 255, 255, 0.8);
            margin: 7px 0 0 0;
        }
    }

    span.item-tag {
        background-color: #fff;
        border-radius: 12px;
        padding: 5px 12px;
        line-height: 20px;
        margin-bottom: 9px;
        position: absolute;
        top: 30px;
        left: 32px;
        z-index: 110;
        transition: 0.4s;
    }

    .post-tags {
        list-style: none;
        padding: 0;
        margin: 0;
        margin-bottom: 0;
        color: #fff;
        font-size: 14px;
        font-weight: 400;
        opacity: 0.9;
        li {
            display: inline-block;
            margin-right: 5px;
            i {
                margin-right: 3px;
                font-weight: normal;
                display: inline-block;
            }
        }
    }
</style>

