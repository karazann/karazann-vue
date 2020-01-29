<template lang="pug">
    .overlay
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    export default Vue.extend({})
</script>

<style lang="scss" scoped>
    .overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 900;
        background: rgba(#000, 0.5);
        backdrop-filter: blur(10px);
    }
</style>