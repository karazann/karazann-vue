<template lang="pug">
    svg(v-drag="{ onEnd}" v-if="flow"  :x="x-5" :y="y-8" width="14" height="17" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg" )
        path(:fill="fill ? pinColor: 'transparent'" ref="arrow" :stroke="pinColor" d="M1 2.93426L1 13.0657C1 14.2638 2.33522 14.9784 3.33205 14.3138L10.9307 9.24808C11.8213 8.65434 11.8213 7.34566 10.9307 6.75193L3.33205 1.68618L2.77735 2.51823L3.33205 1.68618C2.33522 1.02163 1 1.73621 1 2.93426Z" )
    
    circle.pin(v-drag="{ onEnd }" v-else-if="!flow" ref="circle" :cx="x" :cy="y" r="6" :fill="fill ? pinColor: 'transparent'" :stroke="pinColor")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    
    import { EditorPin, Input, Output } from '~/shared/flow'
    import { pinColorMapping } from '~/utils/nodes'
    import { dragDirective } from '../../utils'

    export default Vue.extend({
        name: 'pin-view',
        directives: {
            drag: dragDirective()
        },
        inject: ['foo'],
        props: {
            editorPin: Object as PropType<EditorPin>,
            x: Number as PropType<number>,
            y: Number as PropType<number>,
        },
        computed: {
            flow(): boolean {
                return this.editorPin.io.pin.isFlow()
            },
            
            pinColor(): string {
                const name = this.editorPin.io.pin.name
                return pinColorMapping[name]
            },
            fill() {
                return this.editorPin.io.hasConnection()
            },
        },
        methods: {
            
            updatePinPosition() {
                const [x, y] = this.editorPin.node.node.metadata.position

                if (this.editorPin.io instanceof Input) {
                    this.editorPin.position = [x + this.x-3, y + this.y]
                } else {
                    this.editorPin.position = [x + this.x+5, y + this.y]
                }
            },
            onEnd(e: PointerEvent) { 
                const pin: EditorPin = (this as any).foo.get(e.target)
                this.editorPin.node.editor.connect(this.editorPin.io as Output, pin.io as Input)
            }
        },
        mounted() {
            let el: SVGCircleElement | SVGPathElement

            if (this.$refs.circle) el = this.$refs.circle as SVGCircleElement
            else el = this.$refs.arrow as SVGPathElement

            ((this as any).foo as WeakMap<SVGElement, EditorPin>).set(el, this.editorPin)

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