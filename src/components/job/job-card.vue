<template lang="pug">    
    .job-card
        .left
            profile-image.profile(:size="80" :userId="job.userId")
            .details
                h4 {{ job.title }}
                v-tag(color="green") {{ getTag }}
        .right
            p b
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ProfileImage from '~/components/profile/profile-image.vue'
    import { IJob } from '@bit/szkabaroli.karazann-shared.interfaces'

    export default Vue.extend({
        props: {
            job: Object as PropType<IJob>
        },
        computed: {
            getTag(): string {
                switch (this.job.type) {
                    case 0:
                        return 'Freelancer'
                    case 1:
                        return 'Intern'
                    case 2:
                        return 'Part-time'
                    case 3:
                        return 'Full-time'
                    default: 
                        return 'Default'
                }
            }
        },
        components: {
            ProfileImage
        }
    })
</script>

<style lang="scss" scoped>
    .job-card {
        @include make-card;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-bottom: 15px;

        .left {
            display: flex;

            .details {
                right: 40px;
                left: 100px;
                position: absolute;
                margin-left: 15px;

                word-wrap: break-word;

                h4 {
                    margin-bottom: 6px;
                }
            }
        }
    }
</style>
