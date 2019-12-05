<template lang="pug">
    g
        defs
            pattern(id="grid-pattern" :width="`${gridSize}px`" :height="`${gridSize}px`" patternUnits="userSpaceOnUse")
                line(x1="0" y1="0" x2="0" :y2="`${gridSize}`" stroke-width="1px" stroke="#DFE4EB")
                line(x1="0" y1="0" :x2="`${gridSize}`" y2="0" stroke-width="1px" stroke="#DFE4EB")
        rect(height="410%" width="410%" x="-10%" y="-10%" fill="url(#grid-pattern)" :style="{ transform: gridStyle, transformOrigin: '0 0' }")
        g.area(ref="area" :style="{ transform: transformStyle, transformOrigin: '0 0' }")
            slot
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { Drag } from './drag'
    import { Zoom } from './zoom'
    import { Editor } from '@/shared/flow'

    interface Mouse {
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
        mouse: Mouse
        transform: Transform
        transformStyle: string
        gridStyle: string
        startPosition: Transform | null
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
                gridStyle: `translate(0px, 0px) scale(0)`,
                startPosition: null
            }
        },
        methods: {
            pointermove(e: PointerEvent) {
                const el = this.$refs.area as SVGGElement

                const { clientX, clientY } = e
                const rect = el.getBoundingClientRect()
                const x = clientX - rect.left
                const y = clientY - rect.top
                const k = this.transform.k

                this.mouse = { x: x / k, y: y / k }
            },
            translate(x: number, y: number) {
                this.transform.x = x
                this.transform.y = y
                this.update()
            },
            zoom(zoom: number, ox: number = 0, oy: number = 0, source: ZoomSource) {
                const k = this.transform.k
                const d = (k - zoom) / (k - zoom || 1)

                this.transform.k = zoom || 1
                this.transform.x += ox * d
                this.transform.y += oy * d

                this.update()
            },
            onZoom(delta: number, ox: number, oy: number, source: ZoomSource) {
                let z = this.transform.k 
                
                z = z * (1 + delta)

                const min = 0.5
                const max = 1.4

                z = z < min ? min : (z > max ? max : z)

                this.editor.zoomLevel = this.transform.k = z

                this.zoom(z, ox, oy, source)
                this.update()
            },
            onStart() {
                this.startPosition = { ...this.transform }
            },
            onTranslate(dx: number, dy: number) {
                if (this.startPosition) this.translate(this.startPosition.x + dx, this.startPosition.y + dy)
            },
            update() {
                const t = this.transform
                this.transformStyle = `translate(${t.x}px, ${t.y}px) scale(${t.k})`
                this.gridStyle      = `translate(${t.x % (this.gridSize * t.k)}px,${t.y % (this.gridSize * t.k)}px) scale(${t.k})`
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
                
                const drag = new Drag(this.editor.root, this.onStart, this.onTranslate)
                const zoom = new Zoom(this.editor.root, el, 0.1, this.onZoom)
                
                this.update()
            })
        }
    })
</script>

<style lang="sass" scoped>
    .area 
        overflow: hidden
</style>