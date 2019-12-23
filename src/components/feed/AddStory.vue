<template lang="pug">
    form.add-story(@submit.prevent="postStory")
        v-input(type="textarea" placeholder="Type..."  v-model="story.content") type
        .controls
            .elements
                v-button.secondary(v-html="iconImage")
                v-button.secondary(v-html="iconLink")
            .add-button
                v-button.primary(type="submit") Post
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import feather from 'feather-icons'

    interface VueData {
        story: {
            content: string
        }
    }

    export default Vue.extend({
        data(): VueData {
            return {
                story: {
                    content: ''
                }
            }
        },
        computed: {
            iconImage(): string {
                return feather.icons['image'].toSvg()
            },
            iconLink(): string {
                return feather.icons['link'].toSvg()
            }
        },
        methods: {
            postStory() {
                try {
                    this.$store.dispatch('story/postStory', this.story)
                } catch(e) {
                    console.error(e)
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    .add-story {
        @include make-card;
        padding: 20px;

        .input {
            height: 80px;
            @include make-card;
            border-radius: $border-radius-md;
            padding: 10px;
        }

        .controls {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
        }

        .elements {
            display: flex;

            & > button {
                margin-right: 10px;
            }
        }
    }
</style>