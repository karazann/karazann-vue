<template lang="pug">
    h1 {{msg}}
</template>

<script lang="ts">
    import { Store } from 'vuex'

    interface Context {
        strore: Store<any>
        params: any
    }

    export default {
        name: 'blog-detail-page',
        asyncData(ctx: Context) {
            return {
                msg: ctx.params.slug
            }
        }
    }
</script>

<style lang="scss" scoped>
    h1 {
        color: green;
    }
</style>
