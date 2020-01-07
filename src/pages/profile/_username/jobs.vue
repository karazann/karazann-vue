<template lang="pug">
    <!-- TODO: remove in vue 3 -->
    div
        .row.spacer-b
            .col
                h2 Jobs
        .row
            aside.left-wrapper
                job-card(v-for="job in jobs" :job="job" :key="job.jobId")
            .center-wrapper
                job-details(:job="currentJob")
            aside.right-wrapper
                job-summary side
</template>

<script lang="ts">
    import Vue from 'vue'
    import { createComponent, ref, PropType } from '@vue/composition-api'
    import { IJob, IUser } from '@bit/szkabaroli.karazann-shared.interfaces'
    import JobCard from '~/components/job/job-card.vue'
    import JobDetails from '~/components/job/job-details.vue'
    import JobSummary from '~/components/job/job-summary.vue'

    interface VueData {
        jobs: Array<Partial<IJob>>
        selectedJob: string
    }

    export default Vue.extend({
        components: {
            JobCard,
            JobDetails,
            JobSummary
        },
        head() {
            return {
                title: `${this.profile.lastName} ${this.profile.firstName} (@${this.profile.username}) - Jobs`
            }
        },
        props: {
            profile: Object as PropType<IUser>
        },
        computed: {
            currentJob() {
                return this.jobs.find()
            }
        },
        data(): VueData {
            return {
                jobs: [],
                selectedJob: ''
            }
        },
        async mounted() {
            
            try {
                const { payload } = await this.$api.getUserJobs(this.profile.userId)
                this.jobs = payload!
                this.currentJob = payload[0].jobId
            } catch (e) {
                console.log(e.name)
            }
        }
    })
</script>

<style lang="scss" scoped>
    .center-wrapper {
        @include make-col-ready;
        @include make-col(10);
    }
    .left-wrapper {
        @include make-col-ready;
        @include make-col(8);
    }
    .right-wrapper {
        @include make-col-ready;
        @include make-col(6);
    }
</style>