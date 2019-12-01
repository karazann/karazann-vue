<template lang="pug">
    rect.node()

        // Outputs
        g.output(v-for='output in outputs()' :key="output.key")
            pin(v-pin:output="output", type="output", :pin="output.pin")

        // Inputs
        g.input(v-for='input in inputs()' :key="input.key")
            pin(v-pin:input="input", type="input", :pin="input.pin")
</template>

<script lang="ts">
    import Vue from 'vue'
    import Pin from './Pin.vue'
    import { Node } from '@/shared/flow'

    export default Vue.extend({
        name: 'v-node',
        props: {
            node: {
                type: Object as import('vue').PropType<Node>
            }
        },
        methods: {
            inputs() {
                return Array.from(this.node.inputs.values())
            },
            outputs() {
                return Array.from(this.node.outputs.values())
            }
        },
        components: {
            Pin
        },
        mounted() {
            console.debug(this.node)
        }
    })
</script>

<style lang="scss">
    .node {
        fill: red;
        width: 10px;
        height: 10px;
    }
</style>