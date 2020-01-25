<template lang="pug">
    v-frag
        defs
            pattern(id="grid-pattern" :width="`${gridSize}px`" :height="`${gridSize}px`" patternUnits="userSpaceOnUse")
                line(x1="0" y1="0" x2="0" :y2="`${gridSize}`" stroke-width="1px" shape-rendering="geometricPrecision")
                line(x1="0" y1="0" :x2="`${gridSize}`" y2="0" stroke-width="1px" shape-rendering="geometricPrecision")
        rect(v-if="gridEnabled" height="410%" width="410%" x="-10%" y="-10%" fill="url(#grid-pattern)" :style="{ transform: gridStyle , transformOrigin: '0 0' }")
        g.area(ref="area" :style="{ transform: transformStyle, transformOrigin: '0 0' }")
            slot
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    import { Zoom } from '../../helpers'
    import { Editor } from '../../shared/flow'
    import { Fragment } from 'vue-fragment'

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
        to: string,
        gridEnabled: boolean
    }

    export default Vue.extend({
        name: 'area-view',
        components: {
            'v-frag': Fragment
        },
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
                to: '0px 0px',
                gridEnabled: true
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
            onZoom(d: number, oX: number, oY: number, source: ZoomSource) {
                // this.zoom(this.transform.k * (1 + delta), ox, oy, source)
                

                const tr = this.transform
                const z = tr.k + tr.k * d

                if (z > 2) return
                if (z < 0.4) return

                if(z < 0.8) this.gridEnabled = false
                if(z > 0.8) this.gridEnabled = true

                this.editor.zoomLevel = z

                // Get the current x, y
                const currentX = tr.x
                const currentY = tr.y
                const scaleD = z / tr.k

                // Compute the final x, y
                const x = scaleD * (currentX - oX) + oX
                const y = scaleD * (currentY - oY) + oY
                
                // apply transform
                this.transform.x = x
                this.transform.y = y
                this.transform.k = z

                this.update()
            },
            translate(x: number, y: number) {
                this.transform.x = x
                this.transform.y = y

                this.update()
            },
            update() {
                const t = this.transform
                this.transformStyle = `translate(${t.x}px, ${t.y}px) scale(${t.k})`
                this.gridStyle = `translate(${t.x % (this.gridSize * t.k)}px,${t.y % (this.gridSize * t.k)}px) scale(${t.k})`

                const el = this.$refs.area as SVGGElement
                const rect = el.getBoundingClientRect()
                const bb = el.getBBox()

                this.$emit('updateArea', rect.left - bb.x, rect.top - bb.y)

                const m = `matrix(transform.scaleX, 0, 0, transform.scaleY, transform.x, transform.y)`
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
