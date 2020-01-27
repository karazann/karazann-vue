<template lang="pug">
    section
        .container
            .row
                .col
                    h1 {{title}}
                    p.lg(v-if="subtitle") {{subtitle}}
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'title-bar',
        props: {
            title: {
                type: String,
                required: true
            },
            subtitle: String
        }
    })
</script>

<style lang="scss" scoped>
    section {
        padding-top: 55px;
        padding-bottom: 30px;
    }

    .row {
        display: flex;
        flex: 0 0 100%;
        max-width: 100%;
    }

    .col {
        @include make-col-ready;
        @include make-col(12);
    }

    h1 {
        line-height: 40px;
        margin: 1px 0 3px;
        margin: 0;
        padding: 0;
    }

    p {
        margin-bottom: 3px;
        margin-top: 3px;
        display: block;
    }
</style>
