<template lang="pug">
    div
        portal(to="modal-container")
            create-flow-modal(:visible="createFlowOpened" @show="showModal" @hide="hideModal")
        .row.col.spacer-b
            h2 Flows
        .row
            .flow-col(v-for="flow in flows"  :key="flow.id")
                flow-card(:flow="flow")
            .flow-col
                button.new-flow(@click="showModal()") + New flow
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import CreateFlowModal from '~/components/modals/create-flow-modal.vue'
    import FlowCard from '~/components/flow/flow-card.vue'

    interface VueData {
        createFlowOpened: boolean
        flows: any[]
    }

    export default Vue.extend({
        components: {
            CreateFlowModal,
            FlowCard
        },
        data(): VueData {
            return {
                createFlowOpened: false,
                flows: []
            }
        },
        methods: {
            showModal() {
                this.createFlowOpened = true
            },
            hideModal() {
                this.createFlowOpened = false
            }
        },
        async mounted() {
            const { data } = await this.$api.getUserFlows()
            this.flows = data
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
        border: theme-var(secondary-2) 1px dashed;
        width: 100%;
        user-select: none;
        transition: all .1s linear;
        &:hover {
            border: theme-var(primary) 1px dashed;
            background: theme-var(primary-2);
            color: theme-var(primary);
        }
    }
</style>