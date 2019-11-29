<template lang="pug">
    button.ripple-outer(@mousedown="addRipple" @mouseup="purgeRipples" @lick ref="container" :style="style" :class="this.type")
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
        background: #9185f5;
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
        border-radius: 12px;
        //&:hover {
        //	transform: translateY(-3px);
        //}

        //box-shadow: 0 8px 24px rgba(20,20,20,0.10);
        //background: white;
        //color: #334;

        &:hover {
            //box-shadow: 0 8px 24px rgba(20,20,20,0.16);
            //background: white;

            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(1px);
            //box-shadow: 0 8px 24px rgba(20,20,20,0.05);
        }
    }

    .primary {
        box-shadow: 0 8px 16px rgba(255, 94, 91, 0.4);
        background: #fc6b74;
        background: linear-gradient(65deg, #ff5e5b 0%, #f8778d 100%);
        color: white;

        &:hover {
            background: #fc7080;
            box-shadow: 0 10px 20px rgba(255, 94, 91, 0.3);
            background: linear-gradient(65deg, #ff6360 0, #f87c91 100%);
        }

        &:active {
            box-shadow: 0 8px 16px rgba(255, 94, 91, 0.1);
            background: #fc7080;
            background: linear-gradient(65deg, #ff6360 0, #f87c91 100%);
        }
    }

    .google {
        box-shadow: 0 8px 16px rgba(146, 133, 245, 0.3);
        background: linear-gradient(65deg, #867ce0 0%, #a599f4 100%);
        color: white;

        &:hover {
            box-shadow: 0 8px 16px rgba(146, 133, 245, 0.4);
            background: linear-gradient(65deg, #867ce0 0%, #a599f4 100%);
        }

        &:active {
            box-shadow: 0 8px 16px rgba(146, 133, 245, 0.1);
            background: linear-gradient(65deg, #867ce0 0%, #a599f4 100%);
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
