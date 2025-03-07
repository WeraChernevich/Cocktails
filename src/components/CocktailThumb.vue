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
        <RouterLink :to="`/cocktails/${cocktail.idDrink}`">
            <div :style="`background-image: url(${cocktail.strDrinkThumb})`" class="pic"></div>
        </RouterLink>
        <div class="name" :title="cocktail.strDrink">{{ cocktail.strDrink }}</div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/main.scss';

.root {
    width: calc((100% - 76px) / 3);
    margin-right: 30px;
    padding-bottom: 20px;

    &:nth-child(3n + 3) {
        margin-right: 0;
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
    position: relative;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 15px;
    letter-spacing: .1em;

    &:hover::after {
        content: attr(title);
        position: absolute;
        left: 0;
        top: 100%;
        background-color: #333;
        color: white;
        padding: 5px;
        border-radius: 5px;
        z-index: 1;
        white-space: normal;
        width: max-content;
        max-width: 300px;
    }
}
</style>