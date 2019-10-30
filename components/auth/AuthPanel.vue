<template lang="pug">
    section.panel(:style="{ width: `${width}px`, height: `${height}px` }")
        svg(:viewBox="`0 0 ${width} ${height}`" xmlns="http://www.w3.org/2000/svg")
            defs
                filter#dropshadow-1(x="-500%" y="-500%" width="1000%" height="1000%" filterUnits="objectBoundingBox")
                    feOffset(dy="16" in="SourceAlpha" result="shadowOffsetOuter")
                    feGaussianBlur(stdDeviation="35" in="shadowOffsetOuter" result="shadowBlurOuter")
                    feColorMatrix(values="0 0 0 0 0.10 0 0 0 0 0.17 0 0 0 0 0.21 0 0 0 0.10 0" in="shadowBlurOuter")
                
            g(fill="none" fill-rule="evenodd")
                rect(:width="width" :height="height" rx="4" fill="#FFF" style="filter:url(#dropshadow-1)")
                rect(:width="width" :height="height" rx="4" fill="#FFF")
        div
            slot
</template>

<script>
	export default {
		name: 'auth-panel',
		props: {
			width: {
				type: Number,
				required: true
			},
			height: {
				type: Number,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.panel {
		margin: 0 auto;
		position: relative;
        
        & > svg {
            overflow: visible;
            position: absolute;
			z-index: 0;
			visibility: hidden;
        }

        & > div {
            width: 100%;
            height: 100%;
            padding: 30px;
            position: absolute;
            z-index: 10;
        }
	}

</style>


