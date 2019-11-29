<template lang="pug">
    div(:style="{ width: (windowWidth-2) + 'px', height: (windowHeight-2) + 'px' }")
        svg(width="100%" height="100%")
            defs
                clipPath(id="clip")
                    rect(id="rect" x="18px" y="18px" width="70px" height="70px" rx="6")
                filter(id="drop" x="-100%" y="-100%" width="300%" height="300%" filterUnits="userSpaceOnUse")
                    feGaussianBlur(in="SourceAlpha" stdDeviation="40")
                    feOffset(dx="0" dy="0" result="offsetblur")
                    feFlood(flood-color="#051D4010")
                    feComposite(in2="offsetblur" operator="in")
                    feMerge
                        feMergeNode
                        feMergeNode(in="SourceGraphic")
                pattern(id="grid-pattern" :width="gridSize" :height="gridSize" patternUnits="userSpaceOnUse")
                    circle(cx="3" cy="3" r="1.5px" fill="#8093AD50")
            rect(id="grid" height="410%" width="410%" x="-10%" y="-10%")
            g(id="graph")
                path(class="link" stroke-width="3px" stroke="#AE86FF" fill="none" v-for="link in links_data")
                circle(class="arrow" r="6px" fill="#AE86FF" v-for="link in links_data" stroke="#AE86FF" stroke-width="3px")
                path(class="shadow" stroke-width="3px" stroke="#AE86FF" fill="none")
                g(class="node" v-for="node in nodes_data" :transform="`translate(${node.x}, ${node.y})`")
                    rect(rx="12px" fill="#fff" width="270px" height="330px" )
                    image(xlink:href="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" width="110px" height="110px" clip-path="url(#clip)")
                    text(x="100" y="18" ) My
                    //circle(class="t" r="8px" stroke="#AE86FF" stroke-width="4px" fill="white" cx="135px" cy="330px")
                    //path(class="arrow1" transform="translate(123, -30)" d="M1.30165 5.17717C0.464038 3.7835 1.46936 2 3.10426 2L20.8957 2C22.5306 2 23.536 3.7835 22.6984 5.17717L13.8008 19.9832C12.9842 21.3403 11.0139 21.3376 10.1992 19.9832L1.30165 5.17717Z" fill="none" stroke="#AE86FF" stroke-width="3px")
                    circle(class="grabber" r="6px" transform="translate(135, 350)" d="M1.30165 5.17717C0.464038 3.7835 1.46936 2 3.10426 2L20.8957 2C22.5306 2 23.536 3.7835 22.6984 5.17717L13.8008 19.9832C12.9842 21.3403 11.0139 21.3376 10.1992 19.9832L1.30165 5.17717Z" fill="transparent" stroke="#AE86FF" stroke-width="3px")
</template>

<script>
    import { select, selectAll, event } from 'd3-selection'
    import { zoom } from 'd3-zoom'
    import { timer } from 'd3-timer'
    import { drag as dragger } from 'd3-drag'

    export default {
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
                select(this).classed('dragging', true)
            }
            function dragend(d) {
                select(this).classed('dragging', false)
            }

            function dragged(d, i) {
                d.x = event.x
                d.y = event.y
                //Translate the object on the actual moved point
                //d3.select(this).attr('transform', `translate(${d.x}, ${d.y})`)
                //.attr('x', Math.ceil(d.x / 30) * 30)
                //.attr('y', Math.ceil(d.y / 30) * 30)

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

            var drag = dragger()
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

            var grabber = dragger()
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
                .on('drag', function(d, i) {
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
    }
</script>

<style lang="scss">
    .node {
        //transition: fill 0.1s ease-in-out;
        //filter: drop-shadow(0 10px 40px rgba(128, 147, 173, 0.2));
        //-webkit-filter: drop-shadow(0 10px 40px rgba(128, 147, 173, 0.2));
        //box-shadow: 0 10px 40px rgba(128, 147, 173, 0.2);
        padding: 50px;
    }
    .dragging {
        cursor: grab;
        transform-origin: 165px 135px;
        //filter: drop-shadow(0px 10px 40px rgba(5, 29, 64, 0.1));
    }
</style>
