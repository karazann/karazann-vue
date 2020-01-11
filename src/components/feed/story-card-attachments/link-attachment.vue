<template lang="pug">
    a.link-attachment(:href="attachment.url" target="_blank")
        section
            img(v-if="attachment.img" :src="attachment.img")
            .content
                .url() {{ hostName }}
                h4.title {{ attachment.tl }}
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'

    export default Vue.extend({
        props: {
            attachment: Object as PropType<any>
        },
        computed: {
            hostName() {
                const match = this.attachment.url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
                if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
                    return match[2]
                } else {
                    return null
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    .link-attachment {
        section {
            @include make-card;
            margin-top: 15px;
            display: flex;
            transition: all .3s;

            &:hover {
                background: theme-var(secondary-2);
                transform: translateY(-1px);
            }

            img {
                height: auto;
                max-width: 140px !important;
                object-fit: cover;
                border-top-left-radius: $border-radius-lg;
                border-bottom-left-radius: $border-radius-lg;
            }

            .content {
                padding: 20px;

                .title {
                    padding-top: 7px;
                }
            }
        }
    }
</style>
