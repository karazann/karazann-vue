<template lang="pug">
    svg(v-if="flow" ref="arrow" :x="x-5" :y="y-8" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg" )
        path(:fill="fill ? pinColor: 'transparent'" :stroke="pinColor" ref="test" d="M1 2.93426L1 13.0657C1 14.2638 2.33522 14.9784 3.33205 14.3138L10.9307 9.24808C11.8213 8.65434 11.8213 7.34566 10.9307 6.75193L3.33205 1.68618L2.77735 2.51823L3.33205 1.68618C2.33522 1.02163 1 1.73621 1 2.93426Z" )
    
    circle.pin(v-else-if="!flow" ref="circle" :cx="x" :cy="y" r="5" :fill="fill ? pinColor: 'transparent'" :stroke="pinColor")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    
    import { EditorPin, Input, Output } from '~/shared/flow'
    import { pinColorMapping } from '~/utils/nodes'

    export default Vue.extend({
        name: 'pin-view',
        props: {
            editorPin: Object as PropType<EditorPin>,
            x: Number as PropType<number>,
            y: Number as PropType<number>,
        },
        computed: {
            flow(): boolean {
                return this.editorPin.io.pin.isFlow()
            },
            fill(): boolean {
                return this.editorPin.io.hasConnection()
            },
            pinColor(): string {
                const name = this.editorPin.io.pin.name
                return pinColorMapping[name]
            }
        },
        methods: {
            updatePinPosition() {
                let el: SVGCircleElement | SVGSVGElement

                if (this.$refs.circle) el = this.$refs.circle as SVGCircleElement
                else el = this.$refs.arrow as SVGSVGElement

                const [x, y] = this.editorPin.node.node.metadata.position

                if (this.editorPin.io instanceof Input) {
                    this.editorPin.position = [x + this.x-3, y + this.y]
                } else {
                    this.editorPin.position = [x + this.x+5, y + this.y]
                }
            }
        },
        mounted() {
            this.updatePinPosition()
            this.$root.$on('update-connections', () => {
                this.updatePinPosition()
            })
        }
    })
</script>

<style lang="sass" scoped>
    path, circle
        stroke-width: 2
</style>