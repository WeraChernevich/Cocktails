<script setup>

const props = defineProps({
    cocktail: {
        type: Object,
        required: true,
    },
});

</script>

<template>
    <div class="root">
        <div :style="`background-image: url(${cocktail.strDrinkThumb})`" class="pic"></div>
        <div class="name">{{ cocktail.strDrink }}</div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/main.scss';

.root {
    width: calc((100% - 76px) / 3);
    padding-right: 30px;
    padding-bottom: 20px;

    &:nth-child(3n + 3) {
        padding-right: 0;
    }
}

.pic {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 100%;
}

.name {
    padding-top: 15px;
    letter-spacing: .1em;
}

</style>