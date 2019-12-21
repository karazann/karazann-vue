<template lang="pug">
    n-link.brand(to="/")
        img(src='/images/logo-blue.svg' alt='Karazann Logo')
        p Karazann
</template>

<style lang="scss" scoped>
    .brand {
        display: flex;
        align-items: center;
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
            color: theme-var(primary-text);
            margin-left: 10px;
            font-family: 'Pouttu';
            font-size: 15px;
            font-weight: 500;
        }
    }
</style>
