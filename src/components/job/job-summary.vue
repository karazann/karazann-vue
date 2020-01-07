<template lang="pug">    
    .job-summary
        v-button.green(fill) Apply
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    export default Vue.extend({})
</script>

<style lang="scss" scoped>
    .job-summary {
        @include make-card;
        padding: 20px;
    }
</style>