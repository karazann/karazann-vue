<template lang="pug">
    article.story-card
        header 
            .image
                profile-image
            .title
                p 
                    strong {{ story.author }}
                    |  posted a {{ story.type }}.
                v-tag.type-tag(:color="mapType(story.type)") {{ story.type }}
        section
            slot
        footer
            div.test(v-html="hearthIcon")
            div(v-html="commentsIcon")
            div(v-html="shareIcon")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ProfileImage from '~/components/profile/ProfileImage.vue'
    import feather from 'feather-icons'

    interface Types {
        [key: string]: string
    }

    export default Vue.extend({
        components: {
            ProfileImage
        },
        props: {
            story: {
                type: Object as PropType<any>
            }
        },
        computed: {
            hearthIcon() {
                return feather.icons['heart'].toSvg({ color: 'var(--theme-color-blue)' })
            },
            commentsIcon() {
                return feather.icons['message-square'].toSvg({ color: 'var(--theme-color-blue)' })
            },
            shareIcon() {
                return feather.icons['share-2'].toSvg({ color: 'var(--theme-color-blue)' })
            }
        },
        methods: {
            mapType(type: string) {
                const typeMap: Types = {
                    job: 'green',
                    story: 'purple',
                    document: 'orange'
                }
                return typeMap[type as any]
            }
        }
    })
</script>

<style lang="scss" scoped>
    .story-card {
        @include make-card;
        margin-top: 20px;

        header {
            padding: 20px;
            border-bottom: 1px solid theme-var(secondary-2);
            display: flex;

            .title {
                margin: 7px 15px;

                p {
                    color: theme-var(primary-text);

                    strong {
                        font-size: 18px;
                    }
                }

                .type-tag {
                    margin-top: 10px;
                    text-transform: capitalize;
                }
            }
        }

        section {
            border-bottom: 1px solid theme-var(secondary-2);
            padding: 20px;
        }

        footer {
            display: flex;
            padding: 20px;

            & > * {
                margin-right: 30px;
            }
        }
    }

    @keyframes heartbeat {
        0% {
            transform: scale(1);
        }
        20% {
            transform: scale(1.25);
        }
        40% {
            transform: scale(1);
        }
        60% {
            transform: scale(1.25);
        }
        80% {
            transform: scale(1);
        }
        100% {
            transform: scale(1);
        }
    }

    .test:hover {
        cursor: pointer;
        animation: heartbeat 1s infinite;
    }
</style>
