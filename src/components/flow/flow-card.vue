<template lang="pug">
    nuxt-link(:to="`/flow/${flow.flowId}`")
        .flow-card
            h3 {{ flow.name }}
            p {{ flow.flowId }}
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    
    interface IFlow {
        id: string,
        name: string
    }

    export default Vue.extend({
        props: {
            flow: Object as PropType<IFlow>
        }    
    })
</script>

<style lang="scss" scoped>
    .flow-card {
        @include make-card;
        height: 100px;
        padding: 15px;
        text-align: center;
        line-height: 35px;
    }
</style>