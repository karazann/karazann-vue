<template lang="pug">
    .toolbox(:style="{ top: `${y}px`, left: `${x}px` }")
        .header
            .handle(v-drag="{ onStart, onDrag }")
            h2.title {{ title }}
        div.tools
            slot
                h4 fdsa
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { dragDirective } from '@/helpers/drag'

    interface VueData {
        x: number
        y: number
        startPosition: [number, number]
    }

    export default Vue.extend({
        directives: {
            drag: dragDirective()
        },
        props: {
            title: {
                type: String as PropType<string>,
                default: 'Toolbox'
            }
        },
        data(): VueData {
            return {
                x: 60,
                y: 160,
                startPosition: [0, 0]
            }
        },
        methods: {
            onStart(e: PointerEvent) {
                this.startPosition[0] = this.x
                this.startPosition[1] = this.y
            },
            onDrag(dx: number, dy: number, e: PointerEvent) {
                let x = this.startPosition[0] + dx
                let y = this.startPosition[1] + dy

                const minX = 0
                const maxX = window.window.innerWidth - 270 - 28

                const minY = 78
                const maxY = window.window.innerHeight - 600

                x = x < minX ? minX : x > maxX ? maxX : x
                y = y < minY ? minY : y > maxY ? maxY : y

                this.x = x
                this.y = y
            }
        }
    })
</script>

<style lang="scss" scoped>
    .toolbox {
        @include make-card;
        position: fixed;
        height: 600px;
        width: 280px;

        .header {
            width: 280px;
            height: 50px;
            padding: 12px 30px;

            .handle {
                height: 6px;
                cursor: grab;
                margin: 2px auto;
                width: 60px;
                border-radius: 5px;
                background: theme-var(secondary-2);
            }
        }

        .tools {
            padding: 30px;
        }
    }
</style>
