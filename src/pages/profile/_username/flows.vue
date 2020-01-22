<template lang="pug">
    div
        portal(to="modal-container")
            create-flow-modal(:visible="createFlowOpened" @show="showModal" @hide="hideModal")
        .row.col.spacer-b
            h2 Flows
        .row
            .flow-col
                button.new-flow(@click="showModal()") + New flow
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import CreateFlowModal from '~/components/modals/create-flow-modal.vue'


    export default Vue.extend({
        components: {
            CreateFlowModal
        },
        data() {
            return {
                createFlowOpened: false
            }
        },
        methods: {
            showModal() {
                this.createFlowOpened = true
            },
            hideModal() {
                this.createFlowOpened = false
            }
        }
    })
</script>

<style lang="scss" scoped>
    .flow-col {
        @include make-col-ready;
        @include make-col(24);

        @include media-breakpoint-up(sm) {
            @include make-col(12);
        }

        @include media-breakpoint-up(lg) {
            @include make-col(8);
        }
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