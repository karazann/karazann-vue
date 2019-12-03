<template lang="pug">
    g.node.filter(ref="node" :style="{ transform: transformStyle }" )
       
        // Outputs
        g.output(v-for='(output, i) in outputs' :key="output.key")
            pin(:editorPin="output.pin" :x="output.pinX" :y="output.pinY")
        
        // Inputs
        g.input(v-for='(input, i) in inputs' :key="input.key")
            pin(:editorPin="input.pin" :x="input.pinX" :y="input.pinY")
        
        rect.back(:height="height")
        rect.header(height="50px" width="150px" fill="transparent" stroke="#e6e9ef" stroke-width="1px")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import Pin from './Pin.vue'
    import { Drag } from './Drag'
    import { EditorNode, IO, Input, EditorPin } from '@/shared/flow'

    interface VueData {
        startPosition: number[]
        transformStyle: string,
        height: number
    }

    interface IOContext {
        io: IO
        pin: EditorPin
        pinX: number
        pinY: number
    }

    export default Vue.extend({
        name: 'v-node',
        components: {
            Pin
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
                else return 170
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
                const x = this.startPosition[0] + dx
                const y = this.startPosition[1] + dy
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
                this.transformStyle = `translate(${x}px, ${y}px)`
                this.$root.$emit('update-connections')
            }
        },
        mounted() {
            const el = this.$refs.node as SVGGElement

            let n = 0
            
            this.editorNode.node.outputs.size > this.editorNode.node.inputs.size ?
            n = this.editorNode.node.outputs.size :
            n = this.editorNode.node.inputs.size

            this.height = 70 + (30 * n)

            this.$nextTick(() => {
                const drag = new Drag(el, this.onStart, this.onDrag)
            })

            this.update()
        }
    })
</script>

<style lang="scss">
    .node {
        overflow: visible rect {
            fill: white;
        }
    }
    .back {
        width: 150px;
        rx: 12px;
        fill: white;
        stroke: #e6e9ef;
        filter: url(#filter);
    }
</style>

<style lang="scss">
    .filter {
    }
</style>