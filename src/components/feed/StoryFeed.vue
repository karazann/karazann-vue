<template lang="pug">
    .story-feed
        story-card(v-for="story in stories" :key="story.id" :story="story")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import StoryCard from './StoryCard.vue'


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
        }
    })
</script>