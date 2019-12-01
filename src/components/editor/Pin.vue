<template lang="pug">
    rect.pin(:title="pin.name")
</template>

<script lang="ts">
    import Vue from 'vue'
    
    export default Vue.extend({
        name: 'pin',
        props: [
            'type', 
            'pin'
        ]
    })
</script>