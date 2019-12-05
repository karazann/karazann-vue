<template lang="pug">
    .node-editor()
        svg(id="svg" ref="view" :style="{ height: height-78 + 'px', width: width-17 + 'px' }")
            filter#filter(x='-20%' y='-20%' width='140%' height='140%' filterunits='objectBoundingBox', primitiveunits='userSpaceOnUse' color-interpolation-filters='linearRGB')
                feDropShadow(stdDeviation='6' in='SourceGraphic' dx='0' dy='7' flood-color='#051d4008' flood-opacity='1' x='-10%' y='-10%' width='130%' height='130%' result='dropShadow')
            area-view(:editor="editor" :svgSize="[width, height]")
                connection-view(v-for="(connection, i) in getConnections" :editorConnection="connection" :key="i")
                node-view(v-for="(node, i) in getNodes()" :editorNode="node" :key="node.index")
        v-toolbox
            div.tool-outer(v-for="(builder, i) in getBuilders" :key="builder.name" )
                .tool(ref="nodeCard" :data-id="builder.name") {{builder.name}}
        .tool.ghost(v-if="placeholder" :style="{ top: placeholder.pos[1] + 'px', left:placeholder.pos[0]+ 'px', transform: placeholder.transform }") {{placeholder.builder}}
</template>

<script lang="ts">
    import Vue from 'vue'

    import { Console, OnStart } from './nodes'
    import Toolbox from '@/components/editor/Toolbox.vue'
    import AreaView from '@/components/editor/area-view.vue'
    import NodeView from '@/components/editor/node-view.vue'
    import ConnectionView from '@/components/editor/connection-view.vue'
    import { Editor, EditorNode, NodeBuilder, EditorConnection } from '@/shared/flow'
    import { Drag } from './drag'

    interface PlaceholderNode {
        startPos: [number, number]
        pos: [number, number]
        offset: [number, number]
        transform?: string
        builder: string
    }

    interface VueData {
        width: number
        height: number
        editor: null | Editor
        isDragging: boolean
        placeholder: PlaceholderNode | undefined
    }

    export default Vue.extend({
        name: 'node-editor',
        components: {
            'v-toolbox': Toolbox,
            NodeView,
            ConnectionView,
            AreaView
        },
        data(): VueData {
            return {
                width: 0,
                height: 0,
                editor: null,
                isDragging: false,
                placeholder: undefined
            }
        },
        computed: {
            getConnections(): EditorConnection[] | null {
                return this.editor ? Array.from(this.editor.editorConnections.values()) : null
            },
            getBuilders(): NodeBuilder[] | null {
                return this.editor ? Array.from(this.editor.builders.values()) : null
            }
        },
        methods: {
            handleResize() {
                this.width = window.innerWidth
                this.height = window.innerHeight
            },
            getNodes(): EditorNode[] | null {
                return this.editor ? Array.from(this.editor.editorNodes.values()) : null
            },
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize()
        },
        mounted() {
            Vue.nextTick(() => {
                const cards = this.$refs.nodeCard as HTMLDivElement[]

                cards.forEach((c: HTMLDivElement) => {
                    const onStart = (e: PointerEvent) => {
                        const z = this.editor!.zoomLevel
                        
                        const ox = e.offsetX * z
                        const oy = e.offsetY * z 

                        const x = e.clientX - ox
                        const y = e.clientY - oy
                        
                        const builder = c.getAttribute('data-id')!

                        this.placeholder = {
                            startPos: [x, y],
                            pos: [x, y],
                            transform: `scale(1)`,
                            offset: [ox, oy],
                            builder
                        }
                    }

                    const onDrag = (dx: number, dy: number) => {
                        const cx =  this.placeholder!.startPos[0] + dx
                        const cy = this.placeholder!.startPos[1] + dy
                        
                        this.placeholder!.pos = [cx,cy]
                        this.placeholder!.transform = `scale(${this.editor!.zoomLevel.toFixed(2)})`
                    }

                    const onEnd = (e: PointerEvent) => {
                        
                        
                        const svg = this.editor!.root as SVGSVGElement
                        const pt = svg.createSVGPoint()

                        pt.x = e.clientX - this.placeholder!.offset[0]
                        pt.y = e.clientY - this.placeholder!.offset[1]

                        const svgP = pt.matrixTransform((this.editor!.area as SVGGElement).getScreenCTM()!.inverse())
                        
                        const node = this.editor!.builders.get(this.placeholder!.builder)!.createNode({
                            position: [svgP.x, svgP.y]
                        })

                        this.editor!.addNode(node)
                        this.placeholder = undefined
                    }

                    const d = new Drag(c, onStart, onDrag, onEnd)
                })
            })

            this.editor = new Editor(this.$refs.view as SVGElement)

            const builders = [new OnStart(), new Console()]
            builders.forEach((b: NodeBuilder) => {
                this.editor!.register(b)
            })

            const node1 = builders[0].createNode({
                position: [0, 0]
            })

            const node2 = builders[1].createNode({
                position: [400, 100]
            })

            const node3 = builders[1].createNode({
                position: [800, 150]
            })

            this.editor.addNode(node1)
            this.editor.addNode(node2)
            this.editor.addNode(node3)

            const o1 = node1.outputs.get('controlOut')
            const i1 = node2.inputs.get('controlIn')

            const o2 = node2.outputs.get('controlOut')
            const i2 = node3.inputs.get('controlIn')

            const o3 = node2.outputs.get('textOut')
            const i3 = node3.inputs.get('textIn')

            this.editor.connect(o1!, i1!)
            this.editor.connect(o2!, i2!)
            this.editor.connect(o3!, i3!)
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        }
    })
</script>

<style lang="sass" scoped>
    .node-editor
        overflow-y: hidden

    svg 
        overflow-y: hidden
        position: absolute
        height: 100%
        width: 100%

    .tool-outer
        width: 100%
        heght: auto
        margin: 15px 0

    .tool
        width: 100%
        height: 50px
        padding: 15px
        background: #FFF
        border: 1px solid rgba(128, 147, 173, 0.2)
        box-shadow: 0px 10px 20px rgba(5, 29, 64, 0.05)
        border-radius: 12px
        text-align: center
        font-weight: bold
        font-size: 16px

    .ghost
        z-index: 1000
        width: 210px
        position: absolute
        transition: transform .3s
        cursor: grab
</style>