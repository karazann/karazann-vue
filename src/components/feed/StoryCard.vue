<template lang="pug">
    article.story-card
        header 
            .image
                profile-image
            .title
                p 
                    strong {{ story.displayName }}
                    |  posted a {{ story.storyType }}.
                v-tag.type-tag(:color="mapType(story.storyType)") {{ story.storyType }}
        section
            p.content {{ story.content }}
            story-card-attachment(v-for="(attachment, index) in story.attachments" :attachment="attachment" :key="index")
        footer
            div.test(v-html="hearthIcon")
            div(v-html="commentsIcon")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ProfileImage from '~/components/profile/ProfileImage.vue'
    import StoryCardAttachment from './StoryCardAttachment.vue'
    import feather from 'feather-icons'

    interface Types {
        [key: string]: string
    }

    enum StoryType {
        Job = 'job',
        Story = 'story',
        Document = 'document'
    }

    export interface IStoryImage {
        url: string
    }

    export enum StoryAttachmentType {
        Link = 0,
        Image = 1,
        Document = 2,
        Job = 3
    }

    export interface IStoryAttachment {
        tp: StoryAttachmentType
        tl: string
        url: string
        img?: IStoryImage
    }

    export interface IStory {
        storyType: StoryType
        displayName: string
        content: string
        attachments: IStoryAttachment[]
    }

    export default Vue.extend({
        components: {
            ProfileImage,
            StoryCardAttachment
        },
        props: {
            story: {
                type: Object as PropType<IStory>
            }
        },
        computed: {
            hearthIcon() {
                return feather.icons['heart'].toSvg({ color: 'var(--theme-color-blue)' })
            },
            commentsIcon() {
                return feather.icons['message-square'].toSvg({ color: 'var(--theme-color-blue)' })
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

            .content {
                color: theme-var(primary-text);
                padding-bottom: 20px;
            }
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
