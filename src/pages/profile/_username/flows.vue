<template lang="pug">
    div
        .row.col.spacer-b
            h2 Flows
        .row
            .flow-col
                button.new-flow + New flow
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    interface VueData {}

    export default Vue.extend({
        
    })
</script>

<style lang="scss" scoped>
    .flow-col {
        @include make-col-ready;
        @include make-col(6);
    }

    .new-flow {
        height: 100px;
        border-radius: $border-radius-lg;
        text-align: center;
        line-height: 100px;
        font-weight: bold;
        color: theme-var(secondary-text);
        border: theme-var(secondary-2) 2px dashed;
        width: 100%;
        user-select: none;
        &:hover {
            border: theme-var(primary) 2px dashed;
            background: theme-var(primary-2);
            color: theme-var(primary);
        }
    }
</style>