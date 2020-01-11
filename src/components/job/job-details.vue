<template lang="pug">    
    .details(v-if="job") {{ job.title }}
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import { IJob } from '@bit/szkabaroli.karazann-shared.interfaces'

    export default Vue.extend({
        props: {
            job: Object as PropType<IJob>
        }
    })
</script>

<style lang="scss" scoped>
    .details {
        @include make-card;
        padding: 20px;
    }
</style>