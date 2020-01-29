<template lang="pug">
    v-frag
        defs
            pattern(id="grid-pattern" :width="`${gridSize}px`" :height="`${gridSize}px`" patternUnits="userSpaceOnUse")
                line(x1="0" y1="0" x2="0" :y2="`${gridSize}`" stroke-width="1px" shape-rendering="geometricPrecision")
                line(x1="0" y1="0" :x2="`${gridSize}`" y2="0" stroke-width="1px" shape-rendering="geometricPrecision")
        rect(v-if="gridEnabled" height="410%" width="410%" x="-10%" y="-10%" fill="url(#grid-pattern)" :style="{ transform: gridStyle , transformOrigin: '0 0' }")
        g.area(ref="area" :style="{ transform: transformStyle, transformOrigin: '0 0' }")
            slot(name="connections")
            slot
            rect.selector( vector-effect="non-scaling-stroke" v-if="selector" ref="selector" :x="selectorOrigin.x" :y="selectorOrigin.y" :width="Math.abs(selectorPos.x)" :height="Math.abs(selectorPos.y)")
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
        selectorStartPos: Transform
        selectorOrigin: Transform
        selector: boolean
        selectorPos: Transform
        to: string
        gridEnabled: boolean
    }

    function debounced(delay: number, fn: any) {
        let timerId: any
        return (...args: any) => {
            if (timerId) {
                clearTimeout(timerId)
            }
            timerId = setTimeout(() => {
                fn(...args)
                timerId = null
            }, delay)
        }
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
                selectorPos: { k: 0, x: 0, y: 0 },
                selectorStartPos: { k: 0, x: 0, y: 0 },
                selectorOrigin: { k: 0, x: 0, y: 0 },
                selector: false,
                to: '0px 0px',
                gridEnabled: true
            }
        },
        methods: {
            onStart(e: PointerEvent) {
                if (e.buttons === 1) {
                    this.startPosition = { ...this.transform }
                    this.editor.select.clear()
                } else if (e.buttons === 2) {
                    this.selector = true
                    const svg = this.editor.root as SVGSVGElement
                    const pt = svg.createSVGPoint()
                    pt.x = e.clientX
                    pt.y = e.clientY
                    const svgP = pt.matrixTransform((this.$refs.area as SVGRectElement).getScreenCTM()!.inverse())
                    this.selectorStartPos = { x: svgP.x, y: svgP.y, k: 0 }

                    this.selectorOrigin = { x: svgP.x, y: svgP.y, k: 0 }
                    this.selectorPos = { x: 0, y: 0, k: 0 }
                }
            },
            onDrag(dxwz: number, dywz: number, e: PointerEvent) {
                if (e.buttons === 1) {
                    // if (this.zoom.translating) return; // lock translation while zoom on multitouch
                    if (this.startPosition) this.translate(this.startPosition.x + dxwz, this.startPosition.y + dywz)
                } else if (e.buttons === 2) {
                    const z = this.editor.zoomLevel

                    let dx = dxwz / z
                    let dy = dywz / z

                    let xoffset = this.selectorStartPos.x
                    let yoffset = this.selectorStartPos.y

                    if (dx < 0) {
                        xoffset = xoffset + dx
                        dx = -1 * dx
                    }

                    if (dy < 0) {
                        yoffset = yoffset + dy
                        dy = -1 * dy
                    }

                    this.selectorOrigin!.y = yoffset
                    this.selectorOrigin!.x = xoffset
                    this.selectorPos.x = dx
                    this.selectorPos.y = dy

                    debounced(250, this.selectIntersectedNodes)()
                }
            },
            onEnd(e: PointerEvent) {
                this.selectIntersectedNodes()

                this.selector = false
            },
            selectIntersectedNodes() {
                const selectorEl = this.$refs.selector as SVGRectElement
                const selectorBounds = selectorEl.getBoundingClientRect()
                this.editor.select.clear()
                
                this.$slots.default!.forEach(element => {
                    const el = element.elm as SVGGElement
                    const graphics = el.children[0] as SVGGElement
                    const graphicsBounds = graphics.getBoundingClientRect()

                    const intersects = !(
                        selectorBounds.left > graphicsBounds.right ||
                        selectorBounds.right < graphicsBounds.left ||
                        selectorBounds.top > graphicsBounds.bottom ||
                        selectorBounds.bottom < graphicsBounds.top
                    )

                    if (intersects) {
                        this.editor.select.add((element.componentOptions!.propsData! as any).editorNode, true)
                    }
                })
            },
            onZoom(d: number, oX: number, oY: number, source: ZoomSource) {
                // this.zoom(this.transform.k * (1 + delta), ox, oy, source)

                const tr = this.transform
                const z = tr.k + tr.k * d

                if (z > 2) return
                if (z < 0.4) return

                if (z > 0.6) this.gridEnabled = true
                else this.gridEnabled = false

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
</script>

<style lang="scss" scoped>
    .area {
        overflow: hidden;
    }
    line {
        stroke: theme-var(secondary-2);
    }
    .selector {
        fill: theme-var(primary-2);
        stroke: theme-var(primary);
        stroke-width: 1px;
    }
</style>
