<template lang="pug">
    .node-editor(oncontextmenu="return false;")
        svg(id="svg" ref="view" v-drag="dragOptions" :style="{ height: height-68 + 'px', width: width-17 + 'px' }")
            filter#filter-black(x='-20%' y='-20%' width='140%' height='140%' filterunits='objectBoundingBox', primitiveunits='userSpaceOnUse' color-interpolation-filters='sRGB')
                feDropShadow(stdDeviation='6' in='SourceGraphic' dx='0' dy='7' flood-color='#051d4008' flood-opacity='1' x='-10%' y='-10%' width='130%' height='130%' result='dropShadow')
            filter#filter-blue(x='-20%' y='-20%' width='140%' height='140%' filterunits='objectBoundingBox', primitiveunits='userSpaceOnUse' color-interpolation-filters='sRGB')
                feDropShadow(stdDeviation='6' in='SourceGraphic' dx='0' dy='7' flood-color='#0396FF20' flood-opacity='1' x='-10%' y='-10%' width='130%' height='130%' result='dropShadow')
            area-view(:editor="editor" :svgSize="[width, height]" ref="area")
                template(v-slot:connections)
                    connection-view(v-for="(connection, i) in getConnections" :editorConnection="connection" :key="connection.connection.id")
                node-view(v-for="(node, i) in getNodes" :editorNode="node" :key="node.node.id")
        
        v-toolbox(title="Toolbox" :x="60" :y="160")
            .tool-outer(v-for="(builder, i) in getBuilders" :key="builder.name" )
                .tool(v-drag="{ onStart, onDrag, onEnd }" :data-id="builder.name") {{builder.name}}

        properties-toolbox(:editor="editor")
        
        v-toolbox(title="Controls" :x="width-340" :y="440")
            .tool-outer
                v-button.primary.tool-btn(fill @onClick="toJSON") Debug

        .tool.ghost(v-if="ghost" :style="{ top: ghost.pos[1] + 'px', left: ghost.pos[0]+ 'px', transform: `scale(${ghost.scale})` }") {{ ghost.builder }}
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    import { Drag, dragDirective } from '../../helpers'
    import Toolbox from './toolbox.vue'
    import PropertiesToolbox from './properties-toolbox.vue'
    import AreaView from '../../components/editor/area-view.vue'
    import NodeView from '../../components/editor/node-view.vue'
    import ConnectionView from '../../components/editor/connection-view.vue'

    import { builders } from '../../shared/nodes'
    import { Editor, EditorNode, NodeBuilder, EditorConnection, FlowEngine } from '../../shared/flow'

    interface GhostNodeTool {
        startPos: [number, number]
        pos: [number, number]
        offset: [number, number]
        scale?: number
        builder: string
    }

    interface SelectorOptions {
        startPos: [number, number]
        pos: [number, number]
    }

    interface VueData {
        width: number
        height: number
        editor?: Editor
        isDragging: boolean
        selector: SelectorOptions
        ghost?: GhostNodeTool
        dragOptions: any
        editorConnections?: any
    }

    export default Vue.extend({
        name: 'node-editor',
        components: {
            'v-toolbox': Toolbox,
            NodeView,
            ConnectionView,
            AreaView,
            PropertiesToolbox
        },
        directives: {
            drag: dragDirective()
        },
        props: {
            jsonData: Object as PropType<any>
        },
        provide() {
            return {
                foo: new WeakMap()
            }
        },
        data(): VueData {
            return {
                width: 0,
                height: 0,
                isDragging: false,
                editor: undefined,
                ghost: undefined,
                selector: {
                    startPos: [0, 0],
                    pos: [0, 0]
                },
                dragOptions: {
                    onStart: undefined,
                    onDrag: undefined
                }
            }
        },
        computed: {
            getConnections(): EditorConnection[] {
                return this.editor ? this.editor.editorConnections : []
            },
            getBuilders(): NodeBuilder[] | null {
                return this.editor ? Array.from(this.editor.builders.values()) : null
            },
            getNodes(): EditorNode[] | null {
                return this.editor ? this.editor.editorNodes : null
            }
        },
        methods: {
            handleResize() {
                this.width = window.innerWidth
                this.height = window.innerHeight
            },
            onStart(e: PointerEvent) {
                if (e.buttons === 1) {
                    const z = this.editor!.zoomLevel

                    const ox = e.offsetX * z
                    const oy = e.offsetY * z

                    const x = e.clientX - 110
                    const y = e.clientY - 25

                    const builder = (e.target as HTMLElement).getAttribute('data-id')!
                    this.ghost = {
                        startPos: [x, y],
                        pos: [x, y],
                        scale: 1,
                        offset: [ox, oy],
                        builder
                    }
                } else if (e.buttons === 2) {
                    return
                }
            },
            onDrag(dx: number, dy: number, e: PointerEvent) {
                if (e.buttons === 1) {
                    if (!this.ghost) return

                    const cx = this.ghost.startPos[0] + dx
                    const cy = this.ghost.startPos[1] + dy

                    this.ghost.pos = [cx, cy]
                    this.ghost.scale = this.editor!.zoomLevel
                } else if (e.buttons === 2) {
                    return
                }
            },
            onEnd(e: PointerEvent) {
                if (!this.ghost) return

                const svg = this.editor!.root as SVGSVGElement
                const pt = svg.createSVGPoint()

                pt.x = e.clientX - 110 * this.editor!.zoomLevel
                pt.y = e.clientY - 25 * this.editor!.zoomLevel

                const svgP = pt.matrixTransform((this.editor!.area as SVGGElement).getScreenCTM()!.inverse())

                const node = this.editor!.builders.get(this.ghost!.builder)!.createNode({
                    position: [svgP.x, svgP.y]
                })

                // Update on remmote
                const nodeJson = node.toJSON()
                this.$api.updateFlow(this.$route.params.id, { node: { id: nodeJson.id, data: nodeJson } })
                this.editor!.addNode(node)
                this.ghost = undefined
            },
            toJSON() {
                const nodes = this.editor!.nodes
                console.debug(nodes)

                const engine = new FlowEngine({ logger: console })

                builders.forEach((b: NodeBuilder) => {
                    engine.register(b)
                })

                const json = this.editor!.toJSON()
                Vue.nextTick(() => {
                    this.editor!.fromJSON(json)
                })
            },
            keyPress(e: KeyboardEvent) {
                if (e.keyCode === 46) {
                    this.editor!.select.each(n => {
                        this.$api.updateFlow(this.$route.params.id, { node: { id: n.node.id, data: {} } })
                        this.editor!.removeNode(n.node)
                    })
                }
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize()

            window.addEventListener('keydown', this.keyPress)
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
            window.removeEventListener('keypress', this.keyPress)
        },
        mounted() {
            Vue.nextTick(() => {
                this.dragOptions = {
                    onStart: (this.$refs.area as any).onStart,
                    onDrag: (this.$refs.area as any).onDrag,
                    onEnd: (this.$refs.area as any).onEnd
                }
            })

            this.editor = new Editor(this.$refs.view as SVGElement)

            builders.forEach((b: NodeBuilder) => {
                this.editor!.register(b)
            })

            this.editor.fromJSON(this.jsonData)
        }
    })
</script>

<style lang="scss" scoped>
    .tool-btn {
        margin-bottom: 15px;
    }

    .node-editor {
        overflow-y: hidden;
    }

    svg {
        overflow-y: hidden;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .tool-outer {
        width: 100%;
        height: auto;
        margin: 15px 0;
    }

    .comment {
        fill: theme-var(color-green-2);
        stroke: theme-var(color-green);

        &:hover {
            stroke: theme-var(color-green);
        }
    }

    .tools {
        padding: 30px;
    }

    .tool {
        background: theme-var(surface);
        color: theme-var(primary);
        border: 1px solid theme-var(secondary-2);
        border-radius: 4px;
        box-shadow: $shadow-lg;
        width: 100%;
        height: 50px;
        padding: 15px;
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        transition: border 0.2s, box-shadow 0.2s;
        user-select: none;

        &:hover {
            border: 1px solid theme-var(primary);
            box-shadow: 0px 10px 30px theme-var(primary-2);
            cursor: pointer;
        }

        &:active {
            cursor: grab;
        }
    }

    .ghost {
        z-index: 1000;
        width: 220px;
        position: absolute;
        transition: transform 0.3s;
        cursor: grab !important;
    }
</style>
