<template lang="pug">
    g.node.filter(:style="{ transform: transformStyle }" )
        g.graphics(width="220px" v-drag="{ onStart, onDrag }" )
            rect.back(:height="height")
            polyline.header(points="1,50 219,50" fill="transparent" stroke="#e6e9ef" stroke-width="1px")
            text.text(x="110" y="32" text-anchor="middle") {{editorNode.node.builderName}}
            // Output texts
            g.output(v-for='(output, i) in outputs' :key="output.key")
                text(:y="output.pinY+5" x="200" width="110px" text-anchor="end") {{output.io.name}}
            // Input text
            g.input(v-for='(input, i) in inputs' :key="input.key")
                text(:y="input.pinY+5" x="20" width="110px" ) {{input.io.name}}

        // Outputs
        g.output(v-for='(output, i) in outputs' :key="output.key")
            pin-view(:editorPin="output.pin" :x="output.pinX" :y="output.pinY")
        
        // Inputs
        g.input(v-for='(input, i) in inputs' :key="input.key")
            pin-view(:editorPin="input.pin" :x="input.pinX" :y="input.pinY")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    import PinView from './pin-view.vue'
    import { dragDirective } from '~/helpers'
    import { EditorNode, IO, Input, EditorPin } from '~/shared/flow'

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
        directives: {
            drag: dragDirective()
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
                else return 240
            },
            getPinY(index: number) {
                const baseY = 75
                return baseY + index * 30
            },
            getPin(io: IO) {
                return this.editorNode.editorPins.find(epin => epin.io === io)!
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
                this.transformStyle = `translate(${x}px, ${y}px)`
                this.$root.$emit('update-connections')
            }
        },
        mounted() {
            let ioCount = 0
            this.editorNode.node.outputs.size > this.editorNode.node.inputs.size ? (ioCount = this.editorNode.node.outputs.size) : (ioCount = this.editorNode.node.inputs.size)
            this.height = 70 + 30 * ioCount

            this.update()
        }
    })
</script>

<style lang="sass" scoped>
    .node
        overflow: visible
    
    text
        user-select: none
        fill: #051D40

    .graphics
        .back 
            width: 220px
            rx: 6px
            y: 0
            fill: white
            stroke: #e6e9ef;
            filter: url(#filter-black)
            transition: stroke .1s, filter .1s
        &:hover
            .back
                stroke: #0396FF
                filter: url(#filter-blue)
        
    .text
        y: 20
    
    .output, .input
        text
            font-weight: 400 
</style>