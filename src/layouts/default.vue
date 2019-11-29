<template lang="pug">
    div(v-scroll="onScroll")
        v-header(:signedIn="false" :top="top")
        nuxt.top
</template>

<script lang="ts">
    import { createComponent, ref, PropType } from '@vue/composition-api'

    export default createComponent({
        setup() {
            const top = ref<boolean>(0)
            top.value = true

            const onScroll = (e: Event) => {
                top.value = (e.target as Document).scrollingElement!.scrollTop === 0
            }

            return {
                top,
                onScroll
            }
        }
    })

    /*export default {
            name: 'default-layout',
            data() {
                return {
                    top: true
                }
            },
            methods: {
                onScroll(e) {
                    this.top = e.target.scrollingElement.scrollTop == 0
                }
            },
            setup() {}
        }*/
</script>

<style lang="scss" scoped>
    .top {
        margin-top: 78px;
    }
</style>
