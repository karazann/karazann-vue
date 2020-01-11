<template lang="pug">
    article.story-card
        header 
            .image
                profile-image(:size="57" :profile="{ userId: story.userId, hasAvatar: false }")
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
            .left
                .footer-btn.reaction(:class="{ active: story.reacted === 'thumbsup' }" @click="toggleReaction('thumbsup')" v-if="reactionSum == 0 || more || story.thumbsUpNum > 0")
                    span 👍
                    span.count {{ story.thumbsUpNum }}
                .footer-btn.reaction(:class="{ active: story.reacted === 'thumbsdown' }" @click="toggleReaction('thumbsdown')" v-if="story.thumbsDownNum > 0 || more")
                    span 👎 
                    span.count {{ story.thumbsDownNum  }}
                .footer-btn.reaction(:class="{ active: story.reacted === 'heart' }" @click="toggleReaction('heart')" v-if="story.heartNum > 0 || more")
                    span ❤️
                    span.count {{ story.heartNum }}
                .footer-btn.reaction(:class="{ active: story.reacted === 'eyes' }" @click="toggleReaction('eyes')" v-if="story.eyesNum > 0 || more")
                    span 👀
                    span.count {{ story.eyesNum }}
                .footer-btn.reaction(:class="{ active: story.reacted === 'celebrate' }" @click="toggleReaction('celebrate')" v-if="story.celebrateNum > 0 || more")
                    span 🎉
                    span.count {{ story.celebrateNum }}
                .footer-btn.more(@click="showMore")
                    span(v-html="moreIcon")
            .right
                .footer-btn.comments
                    span(v-html="commentsIcon")
                    span.count 10
        footer.loading(v-else)
            p loading...
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { IFeedStory } from '@bit/szkabaroli.karazann-shared.interfaces'
    import ProfileImage from '../../components/profile/profile-image.vue'
    import LinkAttachment from './story-card-attachments/link-attachment.vue'
    import JobAttachment from './story-card-attachments/job-attachment.vue'
    import feather from 'feather-icons'

    interface Types {
        [key: string]: string
    }

    const changeNum = (story: IFeedStory, reactionType: string, changeValue: number) => {
        switch (reactionType) {
            case 'thumbsup':
                story.thumbsUpNum += changeValue
                break
            case 'thumbsdown':
                story.thumbsDownNum += changeValue
                break
            case 'heart':
                story.heartNum += changeValue
                break
            case 'eyes':
                story.eyesNum += changeValue
                break
            case 'celebrate':
                story.celebrateNum += changeValue
                break
        }
    }

    export default Vue.extend({
        components: {
            ProfileImage,
            LinkAttachment,
            JobAttachment
        },
        props: {
            story: Object as PropType<IFeedStory>,
            loading: {
                type: Boolean as PropType<boolean>,
                default: false
            }
        },
        computed: {
            moreIcon(): string {
                return feather.icons['more-horizontal'].toSvg({ color: `var(--theme-color-${this.mapType(this.story.storyType)})` })
            },
            commentsIcon(): string {
                return feather.icons['message-square'].toSvg({ color: `var(--theme-color-${this.mapType(this.story.storyType)})` })
            },
            reactionSum(): number {
                return this.story.thumbsUpNum + this.story.thumbsDownNum + this.story.heartNum + this.story.eyesNum + this.story.celebrateNum
            }
        },
        data() {
            return {
                more: false
            }
        },
        mounted() {
            document.addEventListener('click', this.hideMore, { passive: true })
        },
        methods: {
            mapType(type: string) {
                const typeMap: Types = {
                    job: 'green',
                    story: 'blue',
                    document: 'orange'
                }
                return typeMap[type as any]
            },
            async toggleReaction(reactionType: string) {
                if (reactionType === this.story.reacted) {
                    const { success } = await this.$api.unreactStory(this.story.storyId)
                    if (success === true) {
                        this.story.reacted = null
                        changeNum(this.story, reactionType, -1)
                    }
                } else {
                    const { success } = await this.$api.reactStory(this.story.storyId, reactionType)
                    if (success === true) {
                        changeNum(this.story, this.story.reacted as string, -1)
                        this.story.reacted = reactionType
                        changeNum(this.story, reactionType, 1)
                    }
                }
            },
            showMore(e: MouseEvent) {
                e.stopPropagation()
                this.more = !this.more
            },
            hideMore() {
                this.more = false
            }
        }
    })
</script>

<style lang="scss" scoped>
    .story-card {
        @include make-card;
        margin-bottom: 15px;
        position: relative;

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
            padding: 15px;

            .content {
                color: theme-var(primary-text);
            }
        }

        footer {
            display: flex;
            padding: 15px;
            justify-content: space-between;

            .left,
            .right {
                display: flex;
            }

            .right {
                border-left: $border;
                padding-left: 15px;
            }

            .comments {
                span:first-child {
                    margin-top: 2px;
                }
            }

            .more {
                span:first-child {
                    margin-top: 2px;
                }
            }

            .reaction {
                margin-right: 3px;

                span:first-child {
                    margin-top: 0px;
                    font-size: 18px;
                }
            }

            .footer-btn {
                border: $border;
                cursor: pointer;
                padding: 5px 8px 5px 8px;
                border-radius: $border-radius-md;
                display: flex;

                .count {
                    color: theme-var(secondary-text);
                    font-size: 14px;
                    margin-left: 5px;
                }

                span {
                    line-height: 25px;
                }

                &.active {
                    background: theme-var(primary-3);
                    border: theme-var(primary) 1px solid;

                    span {
                        color: theme-var(primary);
                    }
                }
            }
        }
    }
</style>
