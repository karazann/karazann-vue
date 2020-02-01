<template lang="pug">
    g
        path(v-if="ghostPath" :d="ghostPath" :stroke="pinColor" stroke-width="2px" fill="none")
    
        g.flow( v-drag="{ onStart, onDrag, onEnd }" v-if="flow" :style="{ transform: `translate(${x-6}px, ${y-8}px)` }" fill="transparent")
            path.n(:fill="fill ? pinColor: 'transparent'" ref="arrow" :stroke="pinColor" d="M1.83092 14.9205L1.83088 14.9206C1.4515 15.1456 1 14.8615 1 14.4696L1 1.53042C1 1.13845 1.45156 0.854416 1.83088 1.07943L1.83092 1.07945L12.7401 7.55013C12.7403 7.55023 12.7405 7.55033 12.7406 7.55043C13.0866 7.75638 13.0864 8.2443 12.7403 8.44981L1.83092 14.9205Z" )
    
        circle.data.n(v-drag="{ onStart, onDrag, onEnd }" v-else-if="!flow" ref="circle" :cx="x" :cy="y" r="6" :fill="fill ? pinColor: 'transparent'" :stroke="pinColor")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    import { EditorPin, Input, Output } from '../../shared/flow'
    import { dragDirective, createPath, pinColorMapping } from '../../helpers'

    interface VueData {
        ghostPath: string
        startPos: [number, number]
        dragging: boolean
    }

    export default Vue.extend({
        name: 'pin-view',
        directives: {
            drag: dragDirective()
        },
        data(): VueData {
            return {
                ghostPath: '',
                startPos: [0, 0],
                dragging: false
            }
        },
        inject: ['foo'],
        props: {
            editorPin: Object as PropType<EditorPin>,
            x: Number as PropType<number>,
            y: Number as PropType<number>
        },
        computed: {
            flow(): boolean {
                return this.editorPin.io.pin.isFlow()
            },
            pinColor(): string {
                const name = this.editorPin.io.pin.name
                if (name === 'polymorphic') {
                    const pinConnections = this.editorPin.io.getConnections()[0]
                    let polymorphedName
                    if (pinConnections) {
                        if (this.editorPin.io instanceof Input) {
                            polymorphedName = pinConnections.output.pin.name
                        } else {
                            polymorphedName = pinConnections.input.pin.name
                        }
                        return pinColorMapping[polymorphedName]
                    }
                }
                return pinColorMapping[name]
            },
            fill(): boolean {
                return this.editorPin.io.hasConnection() || this.ghostPath !== ''
            }
        },
        methods: {
            removeConnections() {
                const copy = this.editorPin.io.connections.slice()
                for (const conn of copy) {
                    conn.remove()
                    const json = conn.output.node!.toJSON()
                    this.$api.updateFlow(this.$route.params.id, { node: { id: json.id, data: json } })
                }
            },
            updatePinPosition() {
                const [x, y] = this.editorPin.node.node.metadata.position

                if (this.editorPin.io instanceof Input) {
                    this.editorPin.position = [x + this.x - 3, y + this.y]
                } else {
                    this.editorPin.position = [x + this.x + 5, y + this.y]
                }
            },
            onStart(e: PointerEvent) {
                this.dragging = false
                if (e.buttons === 1) {
                    const svg = this.editorPin.node.editor.root as SVGSVGElement
                    const pt = svg.createSVGPoint()
                    pt.x = e.clientX
                    pt.y = e.clientY
                    const svgP = pt.matrixTransform((this.$parent.$el as SVGRectElement).getScreenCTM()!.inverse())

                    this.startPos = [svgP.x, svgP.y]
                }
            },
            onDrag(dx: number, dy: number, e: PointerEvent) {
                this.dragging = true
                if (e.buttons === 1) {
                    const z = this.editorPin.node.editor.zoomLevel

                    const dxz = dx / z
                    const dyz = dy / z
                    if (this.editorPin.io instanceof Input) {
                        this.ghostPath = createPath([this.startPos[0] + dxz + 1, this.startPos[1] + dyz, this.x, this.y], 0.7)
                    } else {
                        this.ghostPath = createPath([this.x, this.y, this.startPos[0] + dxz - 1, this.startPos[1] + dyz], 0.7)
                    }
                }
            },
            onEnd(e: PointerEvent) {
                if (!this.dragging) {
                    this.removeConnections()
                } else {
                    this.ghostPath = ''
                    const pin: EditorPin = (this as any).foo.get(e.target)
                    if (pin) {
                        this.editorPin.node.editor.connect(this.editorPin, pin)

                        let node
                        if (this.editorPin.io instanceof Input) {
                            node = pin.node.node.toJSON()
                        } else {
                            node = this.editorPin.node.node.toJSON()
                        }
                        this.$api.updateFlow(this.$route.params.id, { node: { id: node.id, data: node } })
                    }
                }
                this.dragging = false
            },
            updatePin() {
                let el: SVGCircleElement | SVGPathElement

                if (this.$refs.circle) {
                    el = this.$refs.circle as SVGCircleElement
                } else {
                    el = this.$refs.arrow as SVGPathElement
                }

                ;((this as any).foo as WeakMap<SVGElement, EditorPin>).set(el, this.editorPin)
            }
        },
        mounted() {
            this.updatePin()

            this.editorPin.node.node.on('outcomingconnection', this.updatePin)
            this.editorPin.node.node.on('incomingconnection', this.updatePin)

            this.updatePinPosition()
            this.$root.$on('update-connections', () => {
                this.updatePinPosition()
            })
        }
    })
</script>

<style lang="scss" scoped>
    .n {
        transition: all 0.1s;
    }

    .flow,
    .data {
        stroke-width: 2;
    }

    .data:hover {
        r: 7px;
        cursor: pointer;
    }

    .flow {
        path {
            transform: scale(1);
            transform-origin: 6px 8px;
        }
        &:hover {
            path {
                transform: scale(1.15);
            }
            cursor: pointer;
        }
    }
</style>
