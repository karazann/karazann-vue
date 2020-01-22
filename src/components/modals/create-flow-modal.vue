<template lang="pug">
    modal-frame(:visible="visible" @closeModal="$emit('hide')" title="Create Flow")
        form(slot="content" @submit.prevent="onCreateFlow")
            v-input(type="text" v-model="flow.name" placeholder="Flow name")
            v-button.primary(type="submit") Create
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ModalFrame from './modal-frame.vue'

    const delay = (ms: number) => {
        return new Promise((res, rej) => {
            setTimeout(() => res(), ms)
        })
    }

    export default Vue.extend({
        components: {
            ModalFrame
        },
        props: {
            visible: Boolean as PropType<boolean>
        },
        data() {
            return {
                flow: {
                    name: ''
                }
            }
        },
        methods: {
            async onCreateFlow() {
                console.debug(this.flow)
                const { data } = await this.$api.createFlow(this.flow)
                this.$emit('hide')
            }
        }
    })
</script>