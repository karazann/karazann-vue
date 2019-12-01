<template lang="pug">
    g.area(ref="area" :style="{ transform: transformStyle, transformOrigin: '0 0' }")
        slot
            rect(width="50px" height="50px" fill="red")
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Drag } from './Drag'
    import { Zoom } from './Zoom'

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

    interface AreaData {
        mouse: Mouse
        transform: Transform
        transformStyle: string
        startPosition: Transform | null
    }

    export default Vue.extend({
        props: ['editor'],
        data(): AreaData {
            return {
                mouse: { x: 0, y: 0 },
                transform: { k: 1, x: 0, y: 0 },
                transformStyle: `translate(0px, 0px) scale(0)`,
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
                this.zoom(this.transform.k * (1 + delta), ox, oy, source)
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
            }
        },
        mounted() {
            const el = this.$refs.area


            this.$nextTick(() => {
                console.log(this.editor)
                const drag = new Drag(this.editor.root, this.onTranslate, this.onStart)
                const zoom = new Zoom(this.editor.root, el as SVGGElement, 0.1, this.onZoom)
            })

            this.update()
        }
    })
</script>

<style lang="scss" scoped>
    .area {
        overflow: hidden;
    }
</style>