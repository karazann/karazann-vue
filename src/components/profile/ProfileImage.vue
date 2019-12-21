<template lang="pug">
    .profile-image(:style="style")
        img(src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    export default Vue.extend({
        name: 'profile-image',
        props: {
            size: {
                type: Number as PropType<number>,
                default: 70
            }
        },
        computed: {
            style() {
                const realSize = (this.size as number) + 2
                return {
                    padding: `${realSize/10}px`,
                    width: `${realSize}px`,
                    height: `${realSize}px`
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    .profile-image {
        @include make-card;
        display: flex;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: $border-radius-md;
        }
    }
</style>