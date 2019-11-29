<template lang="pug">
	div#test
		//i.icon-material-outline-account-circle
		input(:type="type ? type : 'text'" :placeholder="placeholder" v-model="content" @input="handleInput")
		//span
</template>

<script>
    export default {
        props: {
            placeholder: String,
            type: String,
            value: String
        },
        data() {
            return {
                content: this.value
            }
        },
        methods: {
            handleInput(e) {
                this.$emit('input', this.content)
            }
        }
    }
</script>


<style lang="scss" scoped>
    div#test {
        margin: 0 0 25px;
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
        border: none;
        color: gray;
        max-width: 100%;
        width: 100%;
        box-sizing: border-box;
        display: block;
        font-weight: 500;
        opacity: 1;
        border-radius: 12px;
        //border: 1px solid #e0e0e0;
        //box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.07);

        //border: 1px solid #d5d5d8;

        & + span {
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            transition: all 0.3s ease-out;
            z-index: -1;
            border-radius: 15px;
        }
        transition: all 0.1s ease-out;
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
        }

        &:focus {
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
            transform: scale(1.01);
            //border: 1px solid #9f94f0;
            & + span {
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                border-radius: 15px;
                background: rgba(159, 148, 240, 0.2);
            }
        }

        &::-webkit-input-placeholder {
            /* Chrome/Opera/Safari */
            color: #cdd2d8;
        }
        &::-moz-placeholder {
            /* Firefox 19+ */
            color: #cdd2d8;
        }
        &:-ms-input-placeholder {
            /* IE 10+ */
            color: #cdd2d8;
        }
        &:-moz-placeholder {
            /* Firefox 18- */
            color: #cdd2d8;
        }
    }
</style>

