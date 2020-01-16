<template lang="pug">
    .node-editor
        svg(id="svg" ref="view" v-drag="dragOptions" :style="{ height: height-68 + 'px', width: width-17 + 'px' }")
            filter#filter-black(x='-20%' y='-20%' width='140%' height='140%' filterunits='objectBoundingBox', primitiveunits='userSpaceOnUse' color-interpolation-filters='sRGB')
                feDropShadow(stdDeviation='6' in='SourceGraphic' dx='0' dy='7' flood-color='#051d4008' flood-opacity='1' x='-10%' y='-10%' width='130%' height='130%' result='dropShadow')
            filter#filter-blue(x='-20%' y='-20%' width='140%' height='140%' filterunits='objectBoundingBox', primitiveunits='userSpaceOnUse' color-interpolation-filters='sRGB')
                feDropShadow(stdDeviation='6' in='SourceGraphic' dx='0' dy='7' flood-color='#0396FF20' flood-opacity='1' x='-10%' y='-10%' width='130%' height='130%' result='dropShadow')
            area-view(:editor="editor" :svgSize="[width, height]" ref="area" @updateArea="onUpdateArea")
                connection-view(v-for="(connection, i) in getConnections" :editorConnection="connection" :key="i")
                node-view(v-for="(node, i) in getNodes" :editorNode="node" :key="node.index")
            circle.pin(:cx="debugX" :cy="debugY" r="5" fill="red" )
        
        v-toolbox(title="Toolbox")
            v-button.primary(fill @onClick="toJSON") 123
            div.tool-outer(v-for="(builder, i) in getBuilders" :key="builder.name" )
                .tool(v-drag="{ onStart, onDrag, onEnd }" :data-id="builder.name") {{builder.name}}
        
        .tool.ghost(v-if="ghost" :style="{ top: ghost.pos[1] + 'px', left: ghost.pos[0]+ 'px', transform: `scale(${ghost.scale})` }") {{ ghost.builder }}
</template>

<script lang="ts">
    import Vue from 'vue'

    import { Drag, dragDirective } from '../../helpers'
    import { Console, OnStart, Branch, All } from '../../helpers/nodes'
    import Toolbox from './toolbox.vue'
    import AreaView from '../../components/editor/area-view.vue'
    import NodeView from '../../components/editor/node-view.vue'
    import ConnectionView from '../../components/editor/connection-view.vue'
    import { Editor, EditorNode, NodeBuilder, EditorConnection } from '../../shared/flow'

    interface GhostNodeTool {
        startPos: [number, number]
        pos: [number, number]
        offset: [number, number]
        scale?: number
        builder: string
    }

    interface VueData {
        width: number
        height: number
        editor?: Editor
        isDragging: boolean
        ghost?: GhostNodeTool
        dragOptions: any
        editorConnections?: any,
        debugX: number,
        debugY: number
    }

    export default Vue.extend({
        name: 'node-editor',
        components: {
            'v-toolbox': Toolbox,
            NodeView,
            ConnectionView,
            AreaView
        },
        directives: {
            drag: dragDirective()
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
                dragOptions: {
                    onStart: undefined,
                    onDrag: undefined
                },
                debugX: 0,
                debugY: 0
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
            },
            onDrag(dx: number, dy: number) {
                if (!this.ghost) return

                const cx = this.ghost.startPos[0] + dx
                const cy = this.ghost.startPos[1] + dy

                this.ghost.pos = [cx, cy]
                this.ghost.scale = this.editor!.zoomLevel
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

                this.editor!.addNode(node)
                this.ghost = undefined
            },
            toJSON() {
                console.debug(this.editor!.toJSON())
            },
            onUpdateArea(x: number, y: number) {
                
                this.debugX = x
                this.debugY = y
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize()
        },
        mounted() {
            Vue.nextTick(() => {
                this.dragOptions = {
                    onStart: (this.$refs.area as any).onStart,
                    onDrag: (this.$refs.area as any).onDrag
                }
            })

            console.log((this.$refs.area as any).to)

            this.editor = new Editor(this.$refs.view as SVGElement)

            const builders = [new OnStart(), new Console(), new Branch(), new All()]
            builders.forEach((b: NodeBuilder) => {
                this.editor!.register(b)
            })

            const node1 = builders[0].createNode({
                position: [0, 0]
            })

            this.editor.addNode(node1)
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        }
    })
</script>

<style lang="scss" scoped>
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

    .tool {
        background: theme-var(surface);
        color: theme-var(primary);
        border: 1px solid theme-var(secondary-2);
        border-radius: 6px;
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
