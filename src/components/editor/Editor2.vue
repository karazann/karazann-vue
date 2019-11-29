<template lang="pug">
    div(:style="{ width: (windowWidth-2) + 'px', height: (windowHeight-2) + 'px' }")
        svg(width="100%" height="100%")
            defs
                filter(id="drop" x="-100%" y="-100%" width="300%" height="300%")
                    feGaussianBlur(in="SourceAlpha" stdDeviation="40")
                    feOffset(dx="0" dy="0" result="offsetblur")
                    feFlood(flood-color="#051D4010")
                    feComposite(in2="offsetblur" operator="in")
                    feMerge
                        feMergeNode
                        feMergeNode(in="SourceGraphic")
                pattern(id="grid-pattern" :width="gridSize" :height="gridSize" patternUnits="userSpaceOnUse")
                    circle(cx="3" cy="3" r="1.5px" fill="#8093AD40")
            rect(id="grid" height="410%" width="410%" x="-10%" y="-10%")
            g(id="graph")
                path(class="link" stroke-width="4px" stroke="#AE86FF" fill="none" v-for="link in links_data")
                path(class="arrow" d="M1.30165 5.17717C0.464038 3.7835 1.46936 2 3.10426 2L20.8957 2C22.5306 2 23.536 3.7835 22.6984 5.17717L13.8008 19.9832C12.9842 21.3403 11.0139 21.3376 10.1992 19.9832L1.30165 5.17717Z" fill="#AE86FF" v-for="link in links_data")
                g(class="node" v-for="node in nodes_data" :transform="`translate(${node.x}, ${node.y})`")
                    rect(rx="12px" fill="#fff" width="270px" height="330px" )
                    circle(r="8px" stroke="#AE86FF" stroke-width="4px" fill="white" cx="135px" cy="330px")
</template>

<script>
    import * as d3 from 'd3'

    export default {
        name: 'v-editor',
        data() {
            return {
                windowWidth: 0,
                windowHeight: 0,
                gridSize: 30,
                selections: {},
                dragHandler: null,
                nodes_data: [
                    {
                        x: 180,
                        y: 0
                    },
                    {
                        x: 0,
                        y: 500
                    },
                    {
                        x: 350,
                        y: 500
                    }
                ],
                links_data: [
                    {
                        from: 0,
                        to: 1,
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
            }
        },
        computed: {
            innerGridSize() {
                return this.gridSize / 10
            }
        },
        created() {
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
            this.selections.svg = d3.select(this.$el.querySelector('svg'))
            const svg = this.selections.svg

            // Add zoom and panning triggers
            this.zoom = d3
                .zoom()
                .scaleExtent([1 / 16, 4])
                .on('zoom', this.zoomed)

            svg.call(this.zoom)

            // A background grid to help user experience
            // The width and height depends on the minimum scale extent and
            // the + 10% and negative index to create an infinite grid feel
            // The precedence of this element is important since you'll have
            // click events on the elements above the grid
            const self = this

            function dragstarted(d) {
                d3.select(this).classed('dragging', true)
            }

            function dragged(d, i) {
                /*d.x = d3.event.x
                d.y = d3.event.y
                //Translate the object on the actual moved point
                d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`)
                //.attr('x', Math.ceil(d.x / 30) * 30)
                //.attr('y', Math.ceil(d.y / 30) * 30)

                self.selections.links.nodes().forEach(function(l, li) {
                    const sel = d3.select(l)
                    const data = sel.data()[0]

                    if (data.from == i) {
                        const x = 135 + d.x
                        const y = 330 + d.y

                        const path = `M ${x}, ${y} C ${x}, ${100 + y}, ${data.toData.x}, ${data.toData.y - 100}, ${data.toData.x}, ${data.toData.y}`
                        sel.attr('d', path)

                        data.fromData.x = x
                        data.fromData.y = y
                    } else if (data.to == i) {
                        const x = 135 + d.x
                        const y = -15 + d.y

                        const path = `M ${data.fromData.x}, ${data.fromData.y} C ${data.fromData.x}, ${100 + data.fromData.y}, ${x}, ${y - 100}, ${x}, ${y}`
                        sel.attr('d', path)

                        data.toData.x = x
                        data.toData.y = y
                    }
                })

                self.selections.arrows.nodes().forEach(function(l, li) {
                    const sel = d3.select(l)
                    const data = sel.data()[0]
                    if (data.to == i) {
                        const x = data.toData.x - 12
                        const y = data.toData.y - 6
                        sel.attr('transform', `translate(${x}, ${y})`)
                    }
                })*/
            }

            function dragended(d) {
                // self.selections.link.remove()
                d3.select(this).classed('dragging', false)
            }

            var drag = d3
                .drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended)

            this.selections.grid = d3.select('#grid').attr('fill', 'url(#grid-pattern)')

            this.selections.graph = d3.select('#graph')

            //build links
            {
                this.selections.graph.selectAll('.link').data(this.links_data)
            }

            this.selections.nodes = d3
                .selectAll('.node')
                .attr('filter', 'url(#drop)')
                .call(drag)
                .data(this.nodes_data)

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
                    const y1 = 330 + sourceNode.y

                    const x2 = 135 + destNode.x
                    const y2 = -15 + destNode.y

                    l.fromData.x = x1
                    l.fromData.y = y1

                    l.toData.x = x2
                    l.toData.y = y2

                    return `M ${x1}, ${y1} C ${x1}, ${100 + y1}, ${x2}, ${y2 - 100}, ${x2}, ${y2}`
                })

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
            getWindowWidth(event) {
                this.windowWidth = document.documentElement.clientWidth
            },

            getWindowHeight(event) {
                this.windowHeight = document.documentElement.clientHeight - 78
            },
            zoomed() {
                const transform = d3.event.transform
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
    }
</script>

<style lang="scss">
    .node {
        transition: fill 0.1s ease-in-out;
    }
    .dragging {
        fill: red;
        cursor: grab;
        transform-origin: 165px 135px;
        //filter: drop-shadow(0px 10px 40px rgba(5, 29, 64, 0.1));
    }
</style>
