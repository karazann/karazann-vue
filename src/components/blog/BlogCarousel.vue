<template lang="pug">
    slick.carousel(:options="options")
        blog-compact-post(v-for="(post, index) in posts" :key="index" :post="post")
</template>

<script lang="ts">
    import Vue from 'vue'
    import Slick from 'vue-slick'
    import BlogCompactPost from './BlogCompactPost.vue'

    const slickOptions = {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        dots: false,
        rows: 0,
        arrows: true,
        responsive: [
            {
                breakpoint: 1365,
                settings: {
                    slidesToShow: 3,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    arrows: false
                }
            }
        ]
    }

    export default Vue.extend({
        components: {
            Slick,
            BlogCompactPost
        },
        props: {
            posts: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                options: slickOptions
            }
        }
    })
</script>

<style lang="scss" scoped>
    .carousel {
        width: calc(100% + 30px);
        left: -15px;

        &.slick-initialized {
            .slick-list {
                overflow: visible;
            }

            .slick-slide {
                transform: scale(0.8);
                opacity: 0;
                transition: transform 0.4s, opacity 0.6s;
                pointer-events: none;
            }

            .slick-slide.slick-active {
                transform: scale(1);
                opacity: 1;
                pointer-events: all;
            }

            .slick-slide.slick-active:hover {
                transform: scale(1) translateY(-5px);
            }
        }
    }
</style>
