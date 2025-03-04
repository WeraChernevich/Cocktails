<script setup>
const props = defineProps({
    imgUrl: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="root">
        <div :style="`background-image: url(${imgUrl})`" class="img">

        </div>
        <div class="main">
            <el-button class="btn">Get random cocktail</el-button>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/main.scss';

.root {
    display: flex;
    min-height: 100vh;
    background-color: var(--color-bg);
}

.img {
    width: 50%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
}

.main {
    position: relative;
    width: 50%;
    padding: 32px 40px;
}

.btn {
    position: absolute;
    top: 32px;
    right: 40px;
    font-size: 16px;
    font-family: 'Raleway', 'Arial', sans-serif;
    background-color: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--color-text);

    &:hover,
    &:active {
        background-color: color-mix(in srgb, var(--color-accent) 80%, black);
        border-color: color-mix(in srgb, var(--color-accent) 80%, black);
    }
}

</style>