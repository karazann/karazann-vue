<template lang="pug">
    .document-editor
        p hi
        
        v-toolbox(title="Components")
            p tools

        v-toolbox(title="Properties")
            p tools

        document-container
</template>

<script lang="ts">
    import Vue from 'vue'
    import Toolbox from '../../components/editor/toolbox.vue'
    import DocumentContainer from '../../components/document/document-container.vue'

    export default Vue.extend({
        components: {
            'v-toolbox': Toolbox,
            DocumentContainer
        }
    })
</script>

<style lang="scss" scoped>
    .document-editor {
        width: 100%;
        height: 100%;
    }
</style>