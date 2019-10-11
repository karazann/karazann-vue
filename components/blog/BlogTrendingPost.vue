<template lang="pug">
    li
        n-link.post(to="/")
            img(:src="post.image" alt="")
            .content
                h5 {{ post.title }}
                span {{ post.date }}
</template>

<script>
	export default {
		name: 'blog-trending-post',
		props: {
			post: {
				type: Object,
				validator: prop => {
					return 'title' && 'date' in prop
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.post {
		box-shadow: 0 3px 9px rgba(0, 0, 0, 0.04);
		border-radius: 5px;
		background-color: #fff;
		position: relative;
		width: 100%;
		overflow: hidden;

		display: block;
        min-height: 150px;
        

		&:before {
			content: '';
			width: 100%;
			height: 100%;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			background: #fff;
			opacity: 1;
			transition: 0.35s ease-in-out;
		}

		img {
			display: block;
			object-fit: cover;
			width: 100%;
			height: 100%;
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 9;
			opacity: 1;
			transition: 0.35s;
			border-radius: 5.5px;
		}

		&:hover:before,
		&.active:before {
			opacity: 0.6;
			background: #334;
		}
		&:hover img,
		&.active img {
			opacity: 1;
		}
		&:hover h5,
		&.active h5 {
			color: #fff;
		}
		&:hover span,
		&.active span {
			background: rgba(255, 255, 255, 0.25);
			color: #fff;
		}
	}

	.content {
		h5 {
			//font-size: $body-font-size;
			font-weight: 600;
			line-height: 24px;
			margin: 0 0 15px 0;
			color: #334;
			transition: 0.35s;
		}
		span {
			font-size: 14px;
			color: #888;
			display: inline-block;
			background-color: #f0f0f0;
			border-radius: 5px;
			line-height: 20px;
			padding: 4px 10px;
			margin-top: 3px;
			transition: 0.35s;
		}
		display: block;
		padding: 0;
		position: relative;
		z-index: 20;
		padding: 30px;
	}
</style>

