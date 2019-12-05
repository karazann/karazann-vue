<template lang="pug">
    g.node.filter(ref="node" :style="{ transform: transformStyle }" )
       
        // Outputs
        g.output(v-for='(output, i) in outputs' :key="output.key")
            pin-view(:editorPin="output.pin" :x="output.pinX" :y="output.pinY")
        
        // Inputs
        g.input(v-for='(input, i) in inputs' :key="input.key")
            pin-view(:editorPin="input.pin" :x="input.pinX" :y="input.pinY")
        
        g(width="200px")
            rect.back(:height="height")
            polyline.header(points="0,50 210,50" fill="transparent" stroke="#e6e9ef" stroke-width="1px")
            text.text(x="105" y="32" text-anchor="middle") {{editorNode.node.builderName}}
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import PinView from './pin-view.vue'
    import { Drag } from './drag'
    import { EditorNode, IO, Input, EditorPin } from '@/shared/flow'

    interface VueData {
        startPosition: number[]
        transformStyle: string
        height: number
    }

    interface IOContext {
        io: IO
        pin: EditorPin
        pinX: number
        pinY: number
    }

    export default Vue.extend({
        name: 'node-view',
        components: {
            PinView
        },
        props: {
            editorNode: {
                type: Object as PropType<EditorNode>
            }
        },
        data(): VueData {
            return {
                startPosition: [],
                transformStyle: 'translate(0px, 0px)',
                height: 0
            }
        },
        computed: {
            inputs(): IOContext[] {
                const ctxs: IOContext[] = []
                let index: number = 0
                this.editorNode.node.inputs.forEach((i, key) => {
                    ctxs.push({
                        io: i,
                        pin: this.getPin(i),
                        pinX: this.getPinX(true),
                        pinY: this.getPinY(index)
                    })
                    index++
                })
                return ctxs
            },
            outputs(): IOContext[] {
                const ctxs: IOContext[] = []
                let index = 0
                this.editorNode.node.outputs.forEach((o, key) => {
                    ctxs.push({
                        io: o,
                        pin: this.getPin(o),
                        pinX: this.getPinX(false),
                        pinY: this.getPinY(index)
                    })
                    index++
                })
                return ctxs
            }
        },
        methods: {
            getPinX(isOutput: boolean) {
                if (isOutput) return -20
                else return 230
            },
            getPinY(index: number) {
                const baseY = 75
                return baseY + index * 30
            },
            getPin(io: IO) {
                return this.editorNode.editorPins.get(io)!
            },
            onStart() {
                this.startPosition = [...this.editorNode.node.metadata.position]
            },
            onDrag(dx: number, dy: number, e: PointerEvent) {
                const z = this.editorNode.editor.zoomLevel

                const x = this.startPosition[0] + dx / z
                const y = this.startPosition[1] + dy / z
                this.translate(x, y, e)
            },
            translate(x: number, y: number, e: PointerEvent) {
                const node = this.editorNode.node

                const [px, py] = node.metadata.position
                const prev: [number, number] = [px, py]

                node.metadata.position![0] = x
                node.metadata.position![1] = y

                this.update()
            },
            update() {
                const [x, y] = this.editorNode.node.metadata.position
                // x = Math.ceil(x/25)*25
                // y = Math.ceil(y/25)*25
                this.transformStyle = `translate(${x}px, ${y}px)`
                this.$root.$emit('update-connections')
            }
        },
        mounted() {
            const el = this.$refs.node as SVGGElement

            let ioCount = 0

            this.editorNode.node.outputs.size > this.editorNode.node.inputs.size ? (ioCount = this.editorNode.node.outputs.size) : (ioCount = this.editorNode.node.inputs.size)

            this.height = 70 + 30 * ioCount

            this.$nextTick(() => {
                const drag = new Drag(el, this.onStart, this.onDrag)
            })

            this.update()
        }
    })
</script>

<style lang="sass" scoped>
    .node
        overflow: visible 
        rect
            fill: white
    .back 
        width: 210px
        rx: 12px
        y: 0
        fill: white
        stroke: #e6e9ef;
        filter: url(#filter)
    .text
        fill: #051D40
        y: 20
        user-select: none
</style>