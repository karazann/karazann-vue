<template lang="pug">
    .container
        .row
            .col-12
                h1(v-if="error.statusCode === 404") Page not found 404
                    nuxt-link(to="/") Home page
                h1(v-else) An error occurred
                    nuxt-link(to="/") Home page
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        props: ['error']
    })
</script>

<style lang="scss" scoped>
    .col-12 {
        @include make-col-ready;
        @include make-col(12);
        text-align: center;
        padding-top: 150px;
    }
</style>