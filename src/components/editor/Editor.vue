<template lang="pug">
    .editor(:style="{ height: height-78 + 'px', width: width-17 + 'px' }")
        svg(width="100%" height="100%" id="svg" ref="view")
            v-area(:editor="editor")
                v-node(v-for="(node, index) in getNodes" :node="node" :key="index")
</template>

<script lang="ts">
    import { Editor, Node, NodeBuilder, Output, Pin, PinType } from '@/shared/flow'
    import NodeView from '@/components/editor/Node.vue'
    import AreaView from '@/components/editor/Area.vue'
    import Vue from 'vue'

    interface EditorData {
        width: number
        height: number
        editor: null | Editor
    }

    const controlPin = new Pin('test', PinType.Flow)

    class OnStart extends NodeBuilder {
        constructor() {
            super('OnStart')
        }

        build(node: Node) {
            node.addOutput(new Output('control', controlPin))
        }

        async worker(node: Node, inputs: any, outputs: any, control: any) {
            node.processed = true
            control['control']()
        }
    }

    export default Vue.extend({
        name: 'v-editor',
        components: {
            'v-node': NodeView,
            'v-area': AreaView
        },
        data(): EditorData {
            return {
                width: 0,
                height: 1000,
                editor: null
            }
        },
        methods: {
            handleResize() {
                this.width = window.innerWidth
                this.height = window.innerHeight
            }
        },
        computed: {
            getNodes(): Node[] | null {
                return this.editor ? this.editor.nodes : null
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize()
        },
        mounted() {
            this.editor = new Editor(this.$refs.view as Element)

            const builders = [new OnStart()]
            builders.forEach((b: NodeBuilder) => {
                this.editor!.register(b)
            })

            this.editor.addNode(builders[0].createNode())
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        }
    })

    /*export default {
                                                        name: 'v-editor',
                                                        data() {
                                                            return {
                                                                windowWidth: 0,
                                                                windowHeight: 0,
                                                                gridSize: 30,
                                                                selections: {},
                                                                dragHandler: null
                                                            }
                                                        },
                                                        computed: {
                                                            innerGridSize() {
                                                                return this.gridSize / 10
                                                            }
                                                        },
                                                        created() {
                                                            this.nodes_data = [
                                                                {
                                                                    x: 180,
                                                                    y: 0
                                                                },
                                                                {
                                                                    x: 0,
                                                                    y: 600
                                                                },
                                                                {
                                                                    x: 350,
                                                                    y: 600
                                                                },
                                                                {
                                                                    x: 700,
                                                                    y: 600
                                                                },
                                                                {
                                                                    x: -350,
                                                                    y: 600
                                                                },
                                                                {
                                                                    x: -175,
                                                                    y: 1200
                                                                },
                                                                {
                                                                    x: -525,
                                                                    y: 1200
                                                                }
                                                            ]
                                                            this.links_data = [
                                                                {
                                                                    from: 0,
                                                                    to: 1,
                                                                    delta: 0,
                                                                    fromData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    },
                                                                    toData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    }
                                                                },
                                                                {
                                                                    from: 0,
                                                                    to: 2,
                                                                    delta: 0,
                                                                    fromData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    },
                                                                    toData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    }
                                                                },
                                                                {
                                                                    from: 0,
                                                                    to: 3,
                                                                    delta: 0,
                                                                    fromData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    },
                                                                    toData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    }
                                                                },
                                                                {
                                                                    from: 0,
                                                                    to: 4,
                                                                    delta: 0,
                                                                    fromData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    },
                                                                    toData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    }
                                                                },
                                                                {
                                                                    from: 4,
                                                                    to: 5,
                                                                    delta: 0,
                                                                    fromData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    },
                                                                    toData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    }
                                                                },
                                                                {
                                                                    from: 4,
                                                                    to: 6,
                                                                    delta: 0,
                                                                    fromData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    },
                                                                    toData: {
                                                                        x: 0,
                                                                        y: 0
                                                                    }
                                                                }
                                                            ]
                                                            this.$nextTick(() => {
                                                                window.addEventListener('resize', this.getWindowWidth)
                                                                window.addEventListener('resize', this.getWindowHeight)

                                                                this.getWindowWidth()
                                                                this.getWindowHeight()
                                                            })
                                                        },
                                                        beforeDestroy() {
                                                            window.removeEventListener('resize', this.getWindowWidth)
                                                            window.removeEventListener('resize', this.getWindowHeight)
                                                        },
                                                        mounted() {
                                                            console.log(dragger)
                                                            this.selections.svg = select(this.$el.querySelector('svg'))
                                                            const svg = this.selections.svg

                                                            // Add zoom and panning triggers
                                                            this.zoom = zoom()
                                                                .scaleExtent([1 / 4, 4])
                                                                .on('zoom', this.zoomed)

                                                            svg.call(this.zoom)

                                                            // A background grid to help user experience
                                                            // The width and height depends on the minimum scale extent and
                                                            // the + 10% and negative index to create an infinite grid feel
                                                            // The precedence of this element is important since you'll have
                                                            // click events on the elements above the grid
                                                            const self = this

                                                            function dragstarted(d) {
                                                                select(this).classed('dragging', true)
                                                            }
                                                            function dragend(d) {
                                                                select(this).classed('dragging', false)
                                                            }

                                                            function dragged(d, i) {
                                                                d.x = event.x
                                                                d.y = event.y
                                                                // Translate the object on the actual moved point
                                                                // d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`)
                                                                // .attr('x', Math.ceil(d.x / 30) * 30)
                                                                // .attr('y', Math.ceil(d.y / 30) * 30)

                                                                self.links_data.forEach(function(data) {
                                                                    if (data.from == i) {
                                                                        data.fromData.x = 135 + d.x
                                                                        data.fromData.y = 355 + d.y
                                                                        data.delta = Math.abs(data.toData.y - data.fromData.y) / 2
                                                                    } else if (data.to == i) {
                                                                        data.toData.x = 135 + d.x
                                                                        data.toData.y = d.y - 25
                                                                        data.delta = Math.abs(data.toData.y - data.fromData.y) / 2
                                                                    }
                                                                })
                                                            }

                                                            timer(this.tick, 100)

                                                            const drag = dragger()
                                                                .on('start', dragstarted)
                                                                .on('drag', dragged)
                                                                .on('end', dragend)

                                                            this.selections.grid = select('#grid').attr('fill', 'url(#grid-pattern)')
                                                            this.selections.graph = select('#graph')
                                                            this.selections.graph.selectAll('.link').data(this.links_data)
                                                            this.selections.nodes = selectAll('.node')
                                                                .call(drag)
                                                                .data(this.nodes_data)

                                                            this.selections.shadow = select('.shadow')

                                                            const grabber = dragger()
                                                                .on('start', function(d) {
                                                                    select(this).attr('fill', '#AE86FF')
                                                                    const ex = event.x + 135
                                                                    const ey = event.y + 355
                                                                    const x = d.x + 135
                                                                    const y = d.y + 355
                                                                    const delta = Math.abs(ey - y) / 2

                                                                    self.selections.shadow.attr('d', `M ${x}, ${y} C ${x}, ${delta + y}, ${ex}, ${ey - delta}, ${ex}, ${ey}`)
                                                                    self.selections.shadow.attr('visibility', 'visible')
                                                                })
                                                                .on('drag', (d, i) => {
                                                                    const ex = event.x + 135
                                                                    const ey = event.y + 355
                                                                    const x = d.x + 135
                                                                    const y = d.y + 355
                                                                    const delta = Math.abs(ey - y) / 2

                                                                    self.selections.shadow.attr('d', `M ${x}, ${y} C ${x}, ${delta + y}, ${ex}, ${ey - delta}, ${ex}, ${ey}`)
                                                                })
                                                                .on('end', function() {
                                                                    select(this).attr('fill', 'transparent')
                                                                    self.selections.shadow.attr('visibility', 'hidden')
                                                                })

                                                            //drags((this.selections.t = d3.selectAll('.t').data(this.nodes_data)))

                                                            this.selections.links = this.selections.graph
                                                                .selectAll('.link')
                                                                .data(this.links_data)
                                                                .attr('d', l => {
                                                                    var sourceNode = self.nodes_data.filter(function(d, i) {
                                                                        return i == l.from
                                                                    })[0]

                                                                    var destNode = self.nodes_data.filter(function(d, i) {
                                                                        return i == l.to
                                                                    })[0]

                                                                    const x1 = 135 + sourceNode.x
                                                                    const y1 = 355 + sourceNode.y

                                                                    const x2 = 135 + destNode.x
                                                                    const y2 = destNode.y - 25

                                                                    l.fromData.x = x1
                                                                    l.fromData.y = y1

                                                                    l.toData.x = x2
                                                                    l.toData.y = y2

                                                                    l.delta = Math.abs(l.toData.y - l.fromData.y) / 2

                                                                    return `M ${x1}, ${y1} C ${x1}, ${100 + y1}, ${x2}, ${y2 - 100}, ${x2}, ${y2}`
                                                                })
                                                            this.selections.graph
                                                                .selectAll('.grabber')
                                                                .data(this.nodes_data)
                                                                .call(grabber)

                                                            this.selections.arrows = this.selections.graph
                                                                .selectAll('.arrow')
                                                                .data(this.links_data)
                                                                .attr('transform', l => {
                                                                    const x = l.toData.x - 12
                                                                    const y = l.toData.y - 6
                                                                    return `translate(${x}, ${y})`
                                                                })

                                                            // You can set data in any ways you want
                                                        },
                                                        methods: {
                                                            tick() {
                                                                //const path = `M ${x}, ${y} C ${x}, ${100 + y}, ${data.toData.x}, ${data.toData.y - 100}, ${data.toData.x}, ${data.toData.y}`
                                                                this.selections.links.attr('d', d => {
                                                                    const x1 = d.fromData.x
                                                                    const y1 = d.fromData.y
                                                                    const x2 = d.toData.x
                                                                    const y2 = d.toData.y
                                                                    return `M ${x1}, ${y1} C ${x1}, ${d.delta + y1}, ${x2}, ${y2 - d.delta}, ${x2}, ${y2}`
                                                                })

                                                                this.selections.arrows.attr('transform', d => {
                                                                    const x = d.toData.x
                                                                    const y = d.toData.y
                                                                    return `translate(${x}, ${y})`
                                                                })

                                                                this.selections.nodes.attr('transform', d => {
                                                                    return `translate(${d.x}, ${d.y})`
                                                                })
                                                            },
                                                            getWindowWidth(event) {
                                                                this.windowWidth = document.documentElement.clientWidth
                                                            },

                                                            getWindowHeight(event) {
                                                                this.windowHeight = document.documentElement.clientHeight - 78
                                                            },
                                                            zoomed() {
                                                                const transform = event.transform
                                                                // The trick here is to move the grid in a way that the user doesn't perceive
                                                                // that the axis aren't really moving
                                                                // The actual movement is between 0 and gridSize only for x and y
                                                                const translate = (transform.x % (this.gridSize * transform.k)) + ',' + (transform.y % (this.gridSize * transform.k))
                                                                this.selections.grid.attr('transform', 'translate(' + translate + ') scale(' + transform.k + ')')
                                                                this.selections.graph.attr('transform', transform)

                                                                // Define some world boundaries based on the graph total size
                                                                // so we don't scroll indefinitely
                                                                const graphBox = this.selections.graph.node().getBBox()
                                                                const marginX = 5000
                                                                const marginY = 5000
                                                                const worldTopLeft = [graphBox.x - marginX, graphBox.y - marginY]
                                                                const worldBottomRight = [graphBox.x + graphBox.width + marginX, graphBox.y + graphBox.height + marginY]
                                                                this.zoom.translateExtent([worldTopLeft, worldBottomRight])
                                                            }
                                                        }
                                                    }*/
</script>

<style lang="scss">
</style>
