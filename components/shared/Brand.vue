<template lang="pug">
    n-link.brand(to="/")
        img(src='/images/logo.svg' alt='logo')
        p Karazann
</template>

<style lang="scss" scoped>
	.brand {
		display: flex;
		height: 35px;
		font-size: 15px;
		width: 142px;
		line-height: 35px;
		text-decoration: none;

		img {
			z-index: 1100;
			height: 35px;
			width: 35px;
			filter: brightness(100%);
		}

		p {
			color: #445;
			margin-left: 8px;
			margin-top: 0;
			margin-bottom: 24px;
			font-family: 'Pouttu';
			font-size: 15px;
			font-weight: 400;
		}
	}
</style>
