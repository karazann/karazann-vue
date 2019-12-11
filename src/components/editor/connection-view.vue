<template lang="pug">
    path(:d="pathData" :stroke="pinColor" )
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    import { EditorConnection } from '~/shared/flow'
    import { createPath, pinColorMapping } from '~/helpers'

    interface VueData {
        pathData: string
    }

    export default Vue.extend({
        name: 'connection-view',
        props: {
            editorConnection: Object as PropType<EditorConnection>
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
            this.$nextTick(() => {
                this.pathData = createPath(this.editorConnection.getPoints(), 0.6)
                this.$root.$on('update-connections', () => {
                    this.pathData = createPath(this.editorConnection.getPoints(), 0.6)
                })
            })
        }
    })
</script>

<style lang="sass" scoped>
    path
        stroke-width: 2px
        fill: transparent
</style>
