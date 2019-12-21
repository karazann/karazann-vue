<template lang="pug">
    span(:class="color")
        slot tag
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    export default Vue.extend({
        name: 'v-tag',
        props: {
            color: {
                type: String as PropType<'red' | 'orange' | 'yellow' | 'green' | 'blue'>,
                default: 'blue'
            }
        }
    })
</script>

<style lang="scss" scoped>
    span {
        border-radius: $border-radius-md;
        display: inline-block;
        padding: 5px 15px !important;
        font-weight: bold !important;
        font-size: 14px !important;
        font-family: 'Gilroy', sans-serif;

        &.red {
            color: theme-var(color-red);
            background: theme-var(color-red-2);
        }

        &.orange {
            color: theme-var(color-orange);
            background: theme-var(color-orange-2);
        }

        &.yellow {
            color: theme-var(color-yellow);
            background: theme-var(color-yellow-2);
        }

        &.green {
            color: theme-var(color-green);
            background: theme-var(color-green-2);
        }

        &.blue {
            color: theme-var(color-blue);
            background: theme-var(color-blue-2);
        }

        &.purple {
            color: theme-var(color-purple);
            background: theme-var(color-purple-2);
        }
    }
</style>