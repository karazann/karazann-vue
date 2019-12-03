<template lang="pug">
    g
        circle.pin( :cx="x" :cy="y" r="5px" fill="transparent" stroke="#0396FF" stroke-width="2px")
        svg(:x="x-5" :y="y-8" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg" )
            path(stroke="#0396FF" stroke-width="2" d="M1 3.86852L1 12.1315C1 13.7289 2.78029 14.6817 4.1094 13.7956L10.3066 9.6641C11.4941 8.87246 11.4941 7.12754 10.3066 6.3359L4.1094 2.20442C2.78029 1.31835 1 2.27112 1 3.86852Z" )
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { EditorPin } from '../../shared/flow'

    export default Vue.extend({
        name: 'pin',
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
        mounted() {
            Vue.nextTick(() => {
                console.debug(this.editorPin)
            })
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