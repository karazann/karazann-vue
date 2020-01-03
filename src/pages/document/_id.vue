<template lang="pug">
    main
        document-editor
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        components: {
            'document-editor': () => import('../../components/document/document-editor.vue')
        }
    })
</script>