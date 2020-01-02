<template lang="pug">
    nuxt-link.job-attachment(to="/") 
        section job
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    export default Vue.extend({
        props: {
            attachment: Object as PropType<any>
        }
    })
</script>

<style lang="scss" scoped>
    .job-attachment {
        @include make-card;
        margin-top: 15px;
        display: flex;

        section {
            padding: 20px;
        }
    }
</style>
