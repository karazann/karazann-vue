<template lang="pug">
    section
        .container
            .row
                .col
                    h2 {{title}}
                    span(v-if="subtitle") {{subtitle}}
</template>

<script>
	export default {
		name: 'title-bar',
		props: {
			title: {
				type: String,
				required: true
			},
			subtitle: String
		}
	}
</script>

<style lang="scss" scoped>
	section {
        padding-top: 55px;
        padding-bottom: 30px;
    }
    .row {
        display: flex;
        flex: 0 0 100%;
        max-width: 100%;
    }
    .col {
        @include make-col-ready;
        @include make-col(12);
    }
	h2 {
		font-size: 30px;
		line-height: 40px;
		margin: 1px 0 3px;
		color: #334;
		font-weight: 500;
		margin: 0;
		padding: 0;
	}

	span {
		font-size: 20px;
		color: #889;
		margin-bottom: 3px;
		margin-top: 3px;
		display: block;
	}
</style>



