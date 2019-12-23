<template lang="pug">
    .profile-image(:style="style")
        img(:src="avatarImage")
</template>


<script lang="ts">
// https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
    import Vue, { PropType } from 'vue'

    export default Vue.extend({
        name: 'profile-image',
        props: {
            size: {
                type: Number as PropType<number>,
                default: 70
            },
            avatarImage: {
                type: String as PropType<string>,
                default: '/no-image.jpg'
            }
        },
        computed: {
            style() {
                const realSize = (this.size as number) + 2
                return {
                    padding: `${3+realSize/15}px`,
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
        box-shadow: $shadow-md;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: $border-radius-md;
        }
    }
</style>