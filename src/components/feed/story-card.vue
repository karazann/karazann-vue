<template lang="pug">
    article.story-card.loading
        
        header 
            .image
                profile-image(:size="60" :userId="story.userId")
            .title
                p 
                    strong {{ story.displayName }}
                    |  posted a {{ story.storyType }}.
                v-tag.type-tag(:color="mapType(story.storyType)") {{ story.storyType }}
        section(v-if="!loading")
            p.content {{ story.content }}
            .attachment(v-for="(attachment, index) in story.attachments" :key="index")
                link-attachment(v-if="attachment.tp === 0" :attachment="attachment")
                job-attachment(v-if="attachment.tp === 1" :attachment="attachment")
        footer(v-if="!loading")
            div.test(:style="{ 'color': 'red' }" v-html="hearthIcon")
            div.test2(:style="{ 'color': 'red' }" v-html="commentsIcon")
        footer.loading(v-else)
            p loading...
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { IStory } from '@bit/szkabaroli.karazann-shared.interfaces'
    import ProfileImage from '../../components/profile/profile-image.vue'
    import LinkAttachment from './story-card-attachments/link-attachment.vue'
    import JobAttachment from './story-card-attachments/job-attachment.vue'
    import feather from 'feather-icons'

    interface Types {
        [key: string]: string
    }

    export default Vue.extend({
        components: {
            ProfileImage,
            LinkAttachment,
            JobAttachment
        },
        props: {
            story: Object as PropType<IStory>,
            loading: {
                type: Boolean as PropType<boolean>,
                default: false
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
        position: relative;

        &.loading {
            header::before, section::before, footer::before {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
            }
        }

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
