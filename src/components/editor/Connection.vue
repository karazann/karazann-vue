<template lang="pug">
    path(:d="pathData" stroke-width="2px" :stroke="pinColor" fill="transparent")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { pinColorMapping } from './Nodes'
    import { EditorConnection } from '../../shared/flow'

    interface VueData {
        pathData: string
    }

    const defaultPath = (points: number[], curvature: number) => {
        const [x1, y1, x2, y2] = points
        const hx1 = x1 + Math.abs(x2 - x1) * curvature
        const hx2 = x2 - Math.abs(x2 - x1) * curvature

        return `M ${x1} ${y1} C ${hx1} ${y1} ${hx2} ${y2} ${x2} ${y2}`
    }

    export default Vue.extend({
        props: {
            editorConnection: {
                type: Object as PropType<EditorConnection>
            }
        },
        data(): VueData {
            return {
                pathData: ''
            }
        },
        computed: {
            pinColor(): string {
                const name = this.editorConnection.connection.input.pin.name
                return pinColorMapping[name]
            }
        },
        mounted() {
            this.pathData = defaultPath(this.editorConnection.getPoints(), 0.6)

            this.$root.$on('update-connections', () => {
                this.pathData = defaultPath(this.editorConnection.getPoints(), 0.6)
            })
        }
    })
</script>