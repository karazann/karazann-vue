<template lang="pug">
    main
        node-editor
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'flow-page',
        head: {
            title: 'Flow'
        },
        components: {
            'node-editor': () => import('../../components/editor/node-editor.vue')
        }
    })
</script>

<style lang="scss" scoped>
    main {
        overflow-y: hidden;
    }

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
