<template lang="pug">
    .story-feed
        story-card(:story="test")
        story-card(v-for="story in stories" :key="story.id" :story="story")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import StoryCard from './story-card.vue'

    interface IStory {
        id: string
        title: string,
        type: string
    }

    export default Vue.extend({
        name: 'story-feed',
        components: {
            StoryCard
        },
        props: {
            stories: Array as PropType<IStory[]>
        },
        data() {
            return {
                test: {
                    storyType: 'job',
                    displayName: 'fadf',
                    content: 'this maybe help',
                    attachments: [
                        {
                            tp: 1,
                            id: ''
                        }
                    ]
                }
            }
        }
    })
</script>