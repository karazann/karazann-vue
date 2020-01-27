<template lang="pug">
    g.node.filter(:style="{ transform: transformStyle }")
        g.graphics(width="220px" v-drag="{ onStart, onDrag, onEnd }")
            rect.back(:height="getHeight")
            polyline.header(points="1,50 219,50")
            text.text(x="110" y="32" text-anchor="middle") {{editorNode.node.builderName}}
            // Output texts
            g.output-text(v-for='(output, i) in outputs' :key="output.key")
                text(:y="output.pinY+5" x="200" width="110px" text-anchor="end") {{output.io.name}}
            // Input text
            g.input-text(v-for='(input, i) in inputs' :key="input.key")
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
    import { dragDirective } from '../../helpers'
    import { EditorNode, IO, Input, EditorPin } from '../../shared/flow'

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
            getHeight() {
                let ioCount = 0
                this.editorNode.editorOutPins.length > this.editorNode.editorInPins.length 
                    ? (ioCount = this.editorNode.editorOutPins.length)
                    : (ioCount = this.editorNode.editorInPins.length)
                return 70 + 33 * ioCount
            },
            inputs(): IOContext[] {
                const ctxs: IOContext[] = []
                let index = 0
                this.editorNode.editorInPins.forEach((p, key) => {
                    ctxs.push({
                        io: p.io,
                        pin: p,
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
                this.editorNode.editorOutPins.forEach((o, key) => {
                    ctxs.push({
                        io: o.io,
                        pin: o,
                        pinX: this.getPinX(false),
                        pinY: this.getPinY(index)
                    })
                    index++
                })
                return ctxs
            }
        },
        methods: {
            onEnd() {
                const node = this.editorNode.node.toJSON()
                this.$api.updateFlow(this.$route.params.id, { node })
            },
            getPinX(isOutput: boolean) {
                if (isOutput) return -20
                else return 240
            },
            getPinY(index: number) {
                const baseY = 75
                return baseY + index * 33
            },
            onStart() {
                this.startPosition = [...this.editorNode.node.metadata.position]
            },
            onDrag(dx: number, dy: number, e: PointerEvent) {
                const z = this.editorNode.editor.zoomLevel

                const x = this.startPosition[0] + dx / z
                const y = this.startPosition[1] + dy / z

                const tx = Math.round(x / 11)*11
                const ty = Math.round(y / 11)*11

                this.translate(tx, ty, e)
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
            this.update()
        }
    })
</script>

<style lang="scss" scoped>
    

    text {
        fill: theme-var(primary-text);
        user-select: none;
    }

    .graphics {
        cursor: pointer;

        &:active {
            cursor: grabbing;        
        }

        .header {
            stroke: theme-var(secondary-2);
            fill: transparent;
            stroke-width: 1px;
        }

        .back {
            fill: theme-var(surface);
            stroke: theme-var(secondary-2);
            width: 220px;
            rx: 6px;
            y: 0;
            filter: url(#filter-black);
            transition: stroke 0.1s, filter 0.1s;
        }

        &:hover {
            .back {
                stroke: theme-var(primary);
                filter: url(#filter-blue);
            }
        }
    }

    text {
        font: bold 15px 'Gilroy';
    }

    .text {
        y: 20;
    }

    .output-text,
    .input-text {
        text {
            font-weight: 400;
        }
    }
</style>
