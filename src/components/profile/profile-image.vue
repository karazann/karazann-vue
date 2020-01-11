<template lang="pug">
    .profile-image(:style="style")
        img(:src="avatarImage" @error="fallback")
</template>


<script lang="ts">
    // https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80
    import Vue, { PropType } from 'vue'
    import { IUser } from '@bit/szkabaroli.karazann-shared.interfaces'

    export default Vue.extend({
        name: 'profile-image',
        props: {
            size: {
                type: Number as PropType<number>,
                default: 70
            },
            profile: Object as PropType<IUser>
        },
        data() {
            return {
                letters: ''
            }
        },
        methods: {
            fallback(e: Event) {
                const target = e.target as HTMLImageElement
                target.hidden = true
            }
        },
        computed: {
            avatarImage(): string {
                return `${process.env.staticUrl}/avatars/${this.profile.userId}.${this.profile.hasAvatar ? 'jpg': 'svg'}`
            },
            style(): any {
                const realSize = (this.size as number) + 2
                return {
                    padding: `${3 + realSize / 15}px`,
                    width: `${realSize}px`,
                    height: `${realSize}px`
                }
            },
            fontStyle(): any {
                return {
                    fontSize: `${this.size / 3}px`
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

        .letters {
            width: 100%;
            height: 100%;
            background: theme-var(primary-3);
            border-radius: $border-radius-md;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 100%;

            span {
                color: theme-var(primary);
                font-weight: bold;
                text-align: center;
                width: 100%;
            }
        }
    }
</style>