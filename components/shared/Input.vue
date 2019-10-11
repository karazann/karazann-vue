<template lang="pug">
	div
		//i.icon-material-outline-account-circle
		input(name="name" type="text" :placeholder="placeholder")
</template>

<script>
	export default {
		props: {
			placeholder: String
		}
	}
</script>


<style lang="scss" scoped>
	div {
		position: relative;
	}

	i {
		position: absolute;
		top: 0;
		color: #a0a0a0;
		text-align: center;
		line-height: 48px;
		width: 48px;
		height: 48px;
		font-size: 19px;
		background-color: #f8f8f8;
		border: 1px solid #e0e0e0;
		box-sizing: border-box;
		display: block;
		border-radius: 4px 0 0 4px;
	}

	input {
		height: 48px;
		line-height: 48px;
		padding: 0 20px;
		outline: none;
		font-size: 16px;
		color: gray;
		margin: 0 0 16px;
		max-width: 100%;
		width: 100%;
		box-sizing: border-box;
		display: block;
		background-color: #F4F6FA;
		font-weight: 500;
		opacity: 1;
		border-radius: 4px;
		border: none;
		//border: 1px solid #e0e0e0;
		//box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);

		&::-webkit-input-placeholder {
			/* Chrome/Opera/Safari */
			color: #CDD2D8;
		}
		&::-moz-placeholder {
			/* Firefox 19+ */
			color: #CDD2D8;
		}
		&:-ms-input-placeholder {
			/* IE 10+ */
			color: #CDD2D8;
		}
		&:-moz-placeholder {
			/* Firefox 18- */
			color: #CDD2D8;
		}
	}
</style>

