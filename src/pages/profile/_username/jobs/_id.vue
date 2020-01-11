<template lang="pug">
    <!-- TODO: remove in vue 3 -->
    div
        .row.spacer-b
            .col
                h2 Jobs
        .row
            aside.left-wrapper
                nuxt-link(v-for="job in jobs" :to="{ params: { id: job.jobId }}" :key="job.jobId")
                    job-card(:job="job")
            .center-wrapper
                job-details(:job="currentJob")
            aside.right-wrapper
                job-summary side
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
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
        data(): VueData {
            return {
                jobs: [],
                selectedJob: ''
            }
        },
        computed: {
            currentJob(): Partial<IJob> {
                return this.jobs.filter(j => j.jobId === this.$route.params.id)[0]
            }
        },
        methods: {
            selectJob(node: any) {
                this.selectedJob = node.key as string
            }
        },
        activated() {
            if(this.jobs.length > 0) {
                const id = this.jobs[0].jobId
                if(id) this.$router.replace({ params: { id: this.jobs![0].jobId! } })
            }
        },
        async mounted() {
            const { data } = await this.$api.getUserJobs(this.profile.userId)
            this.jobs = data
            this.$router.replace({ params: { id: data[0].jobId } })
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