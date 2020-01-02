<template lang="pug">
    .page
        vue-draggable-resizable(:min-width="20" :min-height="20" class-name-active="my-active-class" class-name-handle="handle" class-name="my-class"  :parent="true" :grid="[20,20]") 
            .wrapper
                p f
        vue-draggable-resizable(:min-width="20" :min-height="20" class-name-active="my-active-class" class-name-handle="handle" :handles="['ml','mr']" class-name="my-class" drag-handle=".drag" :parent="true" :grid="[20,20]") 
            .dragger.drag(v-html="iconMove")
            .wrapper.drag
                p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin felis ipsum, congue ac lectus sed, lacinia tincidunt nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum efficitur ex ac gravida aliquet. Nunc pretium arcu a nunc lobortis facilisis. Aliquam sollicitudin fringilla sapien sed cursus. Vivamus ultricies dui in leo commodo semper. Vestibulum rhoncus tortor tortor, ac luctus augue maximus id. Donec suscipit nunc quis ante lobortis, pulvinar maximus nisi vestibulum. Praesent efficitur ipsum et fringilla molestie. Ut laoreet porta est condimentum laoreet. Nam nisl odio, viverra non tellus ut, porta ullamcorper est. Nam dapibus vulputate justo et pulvinar. Mauris vel diam pharetra, viverra massa vitae, fermentum erat. Curabitur tempor sit amet est nec semper. Duis a magna et enim maximus eleifend. Donec euismod odio at diam tincidunt fermentum.
</template>

<script lang="ts">
    import Vue from 'vue'
    import VueDraggableResizable from 'vue-draggable-resizable'
    import feather from 'feather-icons'

    export default Vue.extend({
        components: {
            VueDraggableResizable
        },
        computed: {
            iconMove(): string {
                return feather.icons['move'].toSvg()
            }
        }
    })
</script>

<style lang="scss" scoped>
    .page {
        width: 800px;
        height: 1120px;
        border-radius: $border-radius-md;
        background: white;
        background: theme-var(surface);
        position: relative;
        margin-bottom: 40px;
    }

    .my-class {
        border: 1px solid theme-var(secondary-2);
        border-radius: $border-radius-sm;

        .dragger {
            position: absolute;
            height: 32px;
            cursor: move;
            padding: 5px 5px;
            top: -45px;
            opacity: 0;
            transition: opacity 0.5s;
            margin-bottom: 10px;
            left: -1px;
            color: theme-var(color-orange);
            background: theme-var(secondary-2);
            border-radius: $border-radius-sm;
        }

        &:hover {
            .dragger {
                opacity: 1;
            }
        }

        .wrapper {
            width: 100%;
            height: 100%;
            overflow: hidden;
            p {
                pointer-events: fill;
                text-overflow: ellipsis;
                white-space: normal;
            }
        }
    }

    .my-active-class {
        border: 1px solid theme-var(color-orange);

        .dragger {
            background: theme-var(color-orange);
            color: white;
        }
    }
</style>

<style lang="scss">
    .handle {
        box-sizing: border-box;
        position: absolute;
        width: 10px;
        height: 10px;
        background: theme-var(color-orange);
        border-radius: 2px;
    }

    .handle-tl {
        top: -10px;
        left: -10px;
        cursor: nw-resize;
    }

    .handle-tm {
        top: -10px;
        left: 50%;
        margin-left: -5px;
        cursor: n-resize;
    }

    .handle-tr {
        top: -10px;
        right: -10px;
        cursor: ne-resize;
    }

    .handle-ml {
        top: 50%;
        margin-top: -5px;
        left: -10px;
        cursor: w-resize;
    }

    .handle-mr {
        top: 50%;
        margin-top: -5px;
        right: -10px;
        cursor: e-resize;
    }

    .handle-bl {
        bottom: -10px;
        left: -10px;
        cursor: sw-resize;
    }

    .handle-bm {
        bottom: -10px;
        left: 50%;
        margin-left: -5px;
        cursor: s-resize;
    }

    .handle-br {
        bottom: -10px;
        right: -10px;
        cursor: se-resize;
    }

    @media only screen and (max-width: 768px) {
        [class*='handle-']:before {
            content: '';
            left: -10px;
            right: -10px;
            bottom: -10px;
            top: -10px;
            position: absolute;
        }
    }
</style>