<template lang="pug">
    main
        n-link(to="/flow/123") 123
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'flows-page',
        head: {
            title: 'Flows'
        },
        components: {}
    })
</script>

<style lang="scss" scoped>
</style>