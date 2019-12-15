<template lang="pug">
    button.ripple-outer.primary(@mousedown="addRipple" @mouseup="purgeRipples" @lick ref="container" :style="style" :class="this.type")
        slot
        transition-group.ripples(name="grow" tag="div" )
            span.ripple(v-for="ripple in ripples" :key="ripple.id" :style="ripple.style")
</template>

<script>
    export default {
        name: 'v-button',
        data() {
            return {
                id: 0,
                ripples: []
            }
        },
        props: {
            fill: Boolean,
            type: String,
            onClick: Function
        },
        computed: {
            style() {
                return `width: ${this.fill ? '100%' : 'intherited'};`
            }
        },
        mounted() {
            const width = this.$refs.container.offsetWidth
            const height = this.$refs.container.offsetHeight
            this.rippleWidth = width > height ? width : height
            this.halfRippleWidth = this.rippleWidth / 2
        },
        methods: {
            addRipple(e) {
                const { left, top } = this.$refs.container.getBoundingClientRect()
                const rippleId = Date.now()
                this.ripples.push({
                    style: {
                        width: `${this.rippleWidth}px`,
                        height: `${this.rippleWidth}px`,
                        left: `${e.clientX - left - this.halfRippleWidth}px`,
                        top: `${e.clientY - top - this.halfRippleWidth}px`
                    },
                    id: rippleId
                })
            },
            async purgeRipples(e) {
                this.ripples = []
                this.onClick ? await this.onClick(e) : null
            }
        }
    }
</script>

<style lang="scss" scoped>
    button {
        top: 0;
        background: #0396ff;
        padding: 12px 20px;
        line-height: 24px;
        color: #fff;
        position: relative;
        font-size: 16px;
        font-weight: 500;
        display: inline-block;
        transition: all 0.15s ease;
        cursor: pointer;
        overflow: hidden;
        border: none;
        border-radius: 6px;

        &:hover {
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(1px);
        }
    }

    .primary {
        box-shadow: 0 8px 20px theme-var(primary-3);
        box-shadow: $primary-shadow-md;
        background: theme-var(primary);
        color: white;

        &:hover {
            box-shadow: 0 8px 40px theme-var(primary-2);
            box-shadow: $primary-shadow-lg;
        }

        &:active {
            box-shadow: none;
        }
    }

    .ripple-outer {
        position: relative;
        z-index: 1;
        overflow: hidden;
        cursor: pointer;
    }

    .ripples {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    }

    .ripple {
        width: 30px;
        height: 30px;
        position: absolute;
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        background: #fff;
    }

    .grow-enter-active,
    .grow-enter-to-active {
        transition: all 1800ms ease-out;
    }

    .grow-leave-active,
    .grow-leave-to-active {
        transition: all 700ms ease-out;
    }

    .grow-enter {
        transform: scale(0);
        opacity: 0.2;
    }

    .grow-enter-to {
        transform: scale(4);
        opacity: 0.2;
    }

    .grow-leave {
        transform: scale(4);
        opacity: 0.2;
    }

    .grow-leave-to {
        transform: scale(4);
        opacity: 0;
    }
</style>
