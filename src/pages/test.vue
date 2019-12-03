<template lang="pug">
    v-editor
</template>

<script lang="ts">
    import Vue from 'vue'
    
    export default Vue.extend({
        name: 'test-page',
        head: {
            title: 'Test'
        },
        components: {
           'v-editor': () => import('@/components/editor/Editor.vue')
        }
    })
</script>

<style lang="scss" scoped>
    div {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        aside {
            height: 100%;
            background: white;
            width: 300px;
        }
    }
</style>
