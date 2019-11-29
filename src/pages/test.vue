<template lang="pug">
    //div
    //    aside fadsf
    editor
</template>

<script>
    export default {
        name: 'test-page',
        head: {
            title: 'Test'
        },
        components: {
            Editor: () => import('@/components/editor/Editor.vue')
        }
    }
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
