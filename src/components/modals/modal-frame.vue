<template lang="pug">
    .modal
        transition(name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut")
            modal-overlay(v-if="visible")
        
        transition(name="custom-classes-transition" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown")
            .content(v-if="visible" @mousedown.self="$emit('closeModal')")
                .inner-content
                    header
                        h3 {{ title }}
                    section
                        slot(name="content")
</template>

<script lang="ts">
    import Vue, { PropType } from 'vue'
    import ModalOverlay from './modal-overlay.vue'

    export default Vue.extend({
        components: {
            ModalOverlay
        },
        props: {
            title: String as PropType<string>,
            visible: Boolean as PropType<boolean>
        },
        created() {
            const escapeHandler = (e: KeyboardEvent) => {
                if (e.key === `Escape` && this.visible) {
                    this.$emit('closeModal')
                }
            }
            document.addEventListener(`keydown`, escapeHandler)
            this.$once(`hook:destroyed`, () => {
                document.removeEventListener(`keydown`, escapeHandler)
            })
        }
    })
</script>

<style lang="scss" scoped>
    .modal {
        .content {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 901;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .inner-content {
            @include make-card;
            header {
                padding: 20px;
                h3 {
                    margin: 0;
                }
                border-bottom: $border;
            }

            section {
                padding: 20px;
            }

            //padding: 15px;
        }
    }

    .animated {
        animation-duration: 0.3s;
        animation-fill-mode: both;
    }
    .fadeIn {
        animation-name: fadeIn;
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    }
    .fadeOut {
        animation-name: fadeOut;
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    }
    .fadeInUp {
        animation-name: fadeInUp;
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: scale(0.4);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    }
    .fadeOutDown {
        animation-name: fadeOutDown;
        @keyframes fadeOutDown {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
                transform: scale(0.4);
            }
        }
    }
</style>