<template lang="pug">
    .document-container
        document-page
        document-page
        document-page
</template>

<script lang="ts">
    import Vue from 'vue'
    import DocumentPage from '@/components/document/document-page.vue'

    export default Vue.extend({
        components: {
            DocumentPage
        }
    })
</script>

<style lang="scss" scoped>
    .document-container {
        padding: 60px 0;
        margin: 0 auto;
        width: 210mm;
    }
</style>