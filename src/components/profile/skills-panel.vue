<template lang="pug">
    .skills-panel
        h3 Skills
        .skill-tags
            v-tag.skill(v-for="skill in skills" :key="skill.text" :color="skill.color") {{ skill.text }} 
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    interface ISkill {
        text: string
        color: 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple'
    }

    interface VueData {
        username: string
    }

    export default Vue.extend({
        props: {
            skills: Array as PropType<ISkill[]>
        }
    })
</script>

<style lang="scss" scoped>
    .skills-panel {
        @include make-card;
        padding: 20px 25px 0 25px;
        position: sticky;
        top: 98px;

        .skill-tags {
            padding: 20px 0;

            .skill {
                margin: 4px 8px 4px 0px;
            }
        }
    }
</style>