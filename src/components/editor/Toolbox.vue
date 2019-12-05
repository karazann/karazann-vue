<template lang="pug">
    .toolbox(:style="{ top: y + 'px', left: x+'px'}")
        .header
            .handle(ref="handle")
            h2.title Toolbox
        div.tools
            slot
                h4 fdsa
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Drag } from './drag'

    interface VueData {
        x: number
        y: number
        startPosition: [number, number]
    }

    export default Vue.extend({
        data(): VueData {
            return {
                x: 60,
                y: 160,
                startPosition: [0, 0]   
            }
        },
        methods: {
            onStart() {
                this.startPosition[0] = this.x
                this.startPosition[1] = this.y
            },
            onDrag(dx: number, dy: number) {
                let x = this.startPosition[0] + dx
                let y = this.startPosition[1] + dy

                const minX = 0
                const maxX = window.window.innerWidth - 270 - 17

                const minY = 78
                const maxY = window.window.innerHeight - 600

                x = x < minX ? minX : (x > maxX ? maxX : x)
                y = y < minY ? minY : (y > maxY ? maxY : y)

                this.x = x
                this.y = y
            }
        },
        mounted() {
            const handle = this.$refs.handle as HTMLDivElement
            const drag = new Drag(handle, this.onStart, this.onDrag)
        }
    })
</script>

<style lang="sass" scoped>
    .toolbox
        overflow-y: hidden
        position: absolute
        height: 600px
        width: 270px
        background: #FFF;
        border-radius: 12px;
        box-shadow: 0px 7px 50px rgba(5, 29, 64, 0.05)
        .header 
            width: 270px
            height: 50px
            padding: 12px 30px
            .handle
                height: 6px
                cursor: grab
                margin: 2px auto
                width: 60px
                border-radius: 5px
                background: #ECEFF3
        .tools
            padding: 30px
</style>