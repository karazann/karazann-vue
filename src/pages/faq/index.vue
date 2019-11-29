<template lang="pug">
    title-bar.title(title="FAQ" subtitle="Frequently Asked Questions")
</template>

<script>
    import TitleBar from '@/components/shared/TitleBar.vue'

    export default {
        head: {
            title: 'FAQ'
        },
        components: {
            TitleBar
        }
    }
</script>

<style lang="scss" scoped></style>
