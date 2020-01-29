<template lang="pug">
    v-toolbox(title="Properties" :x="width-340" :y="160")
        .tool-outer
            p Please select a node to view its properties.
</template>

<script lang="ts">
    import Vue from 'vue'
    import Toolbox from './toolbox.vue'
    export default Vue.extend({
        components: {
            'v-toolbox': Toolbox
        },
        data() {
            return {
                width: window.window.innerWidth
            }
        }
    })
</script>