<template lang="pug">
    article.story-card
        header 
            .image
                profile-image(:size="60")
            .title
                p 
                    strong {{ story.displayName }}
                    |  posted a {{ story.storyType }}.
                v-tag.type-tag(:color="mapType(story.storyType)") {{ story.storyType }}
        section
            p.content {{ story.content }}
            .attachment(v-for="(attachment, index) in story.attachments" :key="index")
                link-attachment(v-if="attachment.tp === 0" :attachment="attachment")
                job-attachment(v-if="attachment.tp === 1" :attachment="attachment")
        footer
            div.test(:style="{ 'color': 'red' }" v-html="hearthIcon")
            div.test2(:style="{ 'color': 'red' }" v-html="commentsIcon")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ProfileImage from '~/components/profile/profile-image.vue'
    import LinkAttachment from './story-card-attachments/link-attachment.vue'
    import JobAttachment from './story-card-attachments/job-attachment.vue'
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
            LinkAttachment,
            JobAttachment
        },
        props: {
            story: {
                type: Object as PropType<IStory>
            }
        },
        computed: {
            hearthIcon(): string {
                return feather.icons['heart'].toSvg({ color: `var(--theme-color-${this.mapType(this.story.storyType)})` })
            },
            commentsIcon(): string {
                return feather.icons['message-square'].toSvg({ color: `var(--theme-color-${this.mapType(this.story.storyType)})` })
            }
        },
        methods: {
            mapType(type: string) {
                const typeMap: Types = {
                    job: 'green',
                    story: 'blue',
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
        margin-bottom: 15px;

        header {
            padding: 15px;
            border-bottom: $border;
            display: flex;

            .title {
                margin: 0px 15px;

                p {
                    color: theme-var(primary-text);

                    strong {
                        font-size: 18px;
                    }
                }

                .type-tag {
                    margin-top: 6px;
                    text-transform: capitalize;
                }
            }
        }

        section {
            border-bottom: $border;
            padding: 20px;

            .content {
                color: theme-var(primary-text);
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

    @keyframes rot {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.25);
        }
        100% {
            transform: scale(1);
        }
    }

    .test:hover {
        cursor: pointer;
        animation: heartbeat 1s infinite;
    }

    .test2:hover {
        cursor: pointer;
        animation: rot 0.5s infinite;
    }
</style>
