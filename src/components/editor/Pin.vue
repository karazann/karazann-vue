<template lang="pug">
    
    svg(v-if="flow" ref="arrow" :x="x-5" :y="y-8" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg" )
        path(stroke="#0396FF" ref="test" stroke-width="2" d="M1 3.86852L1 12.1315C1 13.7289 2.78029 14.6817 4.1094 13.7956L10.3066 9.6641C11.4941 8.87246 11.4941 7.12754 10.3066 6.3359L4.1094 2.20442C2.78029 1.31835 1 2.27112 1 3.86852Z" )
    
    circle.pin(v-else-if="!flow" ref="circle" :cx="x" :cy="y" stroke="#0396FF" stroke-width="2px" r="5px" fill="transparent")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { EditorPin, Input, Output } from '../../shared/flow'

    export default Vue.extend({
        name: 'v-pin',
        props: {
            editorPin: {
                type: Object as PropType<EditorPin>,
                required: true
            },
            x: {
                type: Number as PropType<number>,
                required: true
            },
            y: {
                type: Number as PropType<number>,
                required: true
            }
        },
        computed: {
            flow(): boolean {
                return this.editorPin.io.pin.isFlow()
            }
        },
        methods: {
            updatePoints() {
                let el: SVGCircleElement | SVGSVGElement

                if (this.$refs.circle) el = this.$refs.circle as SVGCircleElement
                else el = this.$refs.arrow as SVGSVGElement

                const [x, y] = this.editorPin.node.node.metadata.position
                if (this.editorPin.io instanceof Input) {
                    this.editorPin.position = [x + this.x-4, y + this.y]
                } else {
                    this.editorPin.position = [x + this.x+6, y + this.y]
                }
            }
        },
        mounted() {
            this.updatePoints()

            this.$root.$on('update-connections', () => {
                this.updatePoints()
            })

            // console.debug(this.editorPin.position)
        }
    })
</script>

<style lang="scss" scoped>
    path {
        x: -10px;
        x: 10px;
        transform-origin: 10px 10px;
    }
</style>