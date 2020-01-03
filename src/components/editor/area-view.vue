<template lang="pug">
    g
        defs
            pattern(id="grid-pattern" :width="`${gridSize}px`" :height="`${gridSize}px`" patternUnits="userSpaceOnUse")
                line(x1="0" y1="0" x2="0" :y2="`${gridSize}`" stroke-width="1px" shape-rendering="geometricPrecision")
                line(x1="0" y1="0" :x2="`${gridSize}`" y2="0" stroke-width="1px" shape-rendering="geometricPrecision")
        rect(height="410%" width="410%" x="-10%" y="-10%" fill="url(#grid-pattern)" :style="{ transform: gridStyle, transformOrigin: '0 0' }")
        g.area(ref="area" :style="{ transform: transformStyle, transformOrigin: '0 0' }")
            slot
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    import { Zoom } from '../../helpers'
    import { Editor } from '../../shared/flow'

    interface Position {
        x: number
        y: number
    }

    interface Transform {
        k: number
        x: number
        y: number
    }

    type ZoomSource = 'wheel' | 'touch' | 'dblclick'

    interface VueData {
        mouse: Position
        transform: Transform
        transformStyle: string
        gridStyle: string
        startPosition?: Transform
    }

    export default Vue.extend({
        name: 'area-view',
        props: {
            editor: {
                type: Object as PropType<Editor>
            },
            gridSize: {
                type: Number,
                default: 55
            },
            svgSize: {
                type: Array as PropType<number[]>
            }
        },
        data(): VueData {
            return {
                mouse: { x: 0, y: 0 },
                transform: { k: 1, x: 0, y: 0 },
                transformStyle: `translate(0px, 0px) scale(0)`,
                gridStyle: `translate(0px, 0px) scale(0)`
            }
        },
        methods: {
            onStart() {
                this.startPosition = { ...this.transform }
            },
            onDrag(dx: number, dy: number) {
                // if (this.zoom.translating) return; // lock translation while zoom on multitouch
                if (this.startPosition) this.translate(this.startPosition.x + dx, this.startPosition.y + dy)
            },
            onZoom(delta: number, ox: number, oy: number, source: ZoomSource) {
                this.zoom(this.transform.k * (1 + delta), ox, oy, source)

                this.update()
            },
            translate(x: number, y: number) {
                this.transform.x = x
                this.transform.y = y

                this.update()
            },
            zoom(zoom: number, ox = 0, oy = 0, source: ZoomSource) {
                if (zoom > 2) return
                if (zoom < 0.4) return
                this.editor.zoomLevel = zoom

                const k = this.transform.k

                const d = (k - zoom) / (k - zoom || 1)

                this.transform.k = zoom || 1
                this.transform.x += ox * d
                this.transform.y += oy * d

                this.update()
            },
            update() {
                const t = this.transform
                this.transformStyle = `translate(${t.x}px, ${t.y}px) scale(${t.k})`
                this.gridStyle = `translate(${t.x % (this.gridSize * t.k)}px,${t.y % (this.gridSize * t.k)}px) scale(${t.k})`
            }
        },
        mounted() {
            const el = this.$refs.area as SVGGElement

            this.$nextTick(() => {
                this.editor.area = el
                const bbox = el.getBBox()
                const [width, height] = this.svgSize
                this.transform.x = (width - bbox.width) / 2
                this.transform.y = (height - bbox.height) / 2

                const zoom = new Zoom(this.editor.root, el, 0.1, this.onZoom)

                this.update()
            })
        }
    })

    /*let z = this.transform.k 
                                    
                                    z = z * (1 + delta)

                                    const min = 0.5
                                    const max = 1.4

                                    z = z < min ? min : (z > max ? max : z)

                                    this.editor.zoomLevel = this.transform.k = z*/
</script>

<style lang="scss" scoped>
    .area {
        overflow: hidden;
    }
    line {
        stroke: theme-var(secondary-2);
    }
</style>
