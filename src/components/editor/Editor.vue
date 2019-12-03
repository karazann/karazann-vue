<template lang="pug">
    .editor(:style="{ height: height-78 + 'px', width: width-17 + 'px' }")
        svg(width="100%" height="100%" id="svg" ref="view")
            filter#filter(x='-20%' y='-20%' width='140%' height='140%' filterunits='objectBoundingBox', primitiveunits='userSpaceOnUse' color-interpolation-filters='linearRGB')
                feDropShadow(stdDeviation='5' in='SourceGraphic' dx='0' dy='7' flood-color='#051d4005' flood-opacity='1' x='-10%' y='-10%' width='130%' height='130%' result='dropShadow')
            v-area(:editor="editor" :svgSize="[width, height]")
                v-node(v-for="node in getNodes" :editorNode="node" :key="node.index")
                v-connection(v-for="(connection, i) in getConnections" :editorConnection="connection" :key="i")
</template>

<script lang="ts">
    import { Editor, EditorNode, NodeBuilder, EditorConnection } from '@/shared/flow'
    import { Console, OnStart } from './Nodes'
    import AreaView from '@/components/editor/Area.vue'
    import NodeView from '@/components/editor/Node.vue'
    import ConnectionView from '@/components/editor/Connection.vue'
    import Vue from 'vue'

    interface EditorData {
        width: number
        height: number
        editor: null | Editor
    }

    export default Vue.extend({
        name: 'v-editor',
        components: {
            'v-node': NodeView,
            'v-connection': ConnectionView,
            'v-area': AreaView
        },
        data(): EditorData {
            return {
                width: 0,
                height: 0,
                editor: null
            }
        },
        computed: {
            getNodes(): EditorNode[] | null {
                return this.editor ? Array.from(this.editor.editorNodes.values()) : null
            },
            getConnections(): EditorConnection[] | null {
                return this.editor ? Array.from(this.editor.editorConnections.values()) : null
            }
        },
        methods: {
            handleResize() {
                this.width = window.innerWidth
                this.height = window.innerHeight
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize()
        },
        mounted() {
            this.editor = new Editor(this.$refs.view as SVGElement)

            const builders = [new OnStart(), new Console()]
            builders.forEach((b: NodeBuilder) => {
                this.editor!.register(b)
            })

            const node1 = builders[0].createNode({
                position: [0, 0]
            })

            const node2 = builders[1].createNode({
                position: [300, 100]
            })

            const node3 = builders[1].createNode({
                position: [1000, 500]
            })

            this.editor.addNode(node1)
            this.editor.addNode(node2)
            this.editor.addNode(node3)

            const o1 = node1.outputs.get('controlOut')!
            const i1 = node2.inputs.get('controlIn')!

            const o2 = node2.outputs.get('controlOut')!
            const i2 = node3.inputs.get('controlIn')!

            const o3 = node2.outputs.get('textOut')!
            const i3 = node3.inputs.get('textIn')!

            this.editor.connect(o1, i1)
            this.editor.connect(o2, i2)
            this.editor.connect(o3, i3)

            console.debug(this.editor)
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        }
    })
</script>

<style lang="scss">
</style>
