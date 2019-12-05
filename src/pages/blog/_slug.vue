<template lang="pug">
    main
        h1 {{msg}}
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Store } from 'vuex'

    interface Context {
        strore: Store<any>
        params: any
    }

    export default Vue.extend({
        name: 'blog-detail-page',
        asyncData(ctx: any) {
            return {
                msg: ctx.params.slug
            }
        }
    })
</script>

<style lang="scss" scoped>
    h1 {
        color: green;
    }
</style>
