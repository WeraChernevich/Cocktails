<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ROUTES_PATHS } from '@/constants';

import {
    Back
} from '@element-plus/icons-vue';

const props = defineProps({
    imgUrl: {
        type: String,
        required: true,
    },
    backFunc: {
        type: Function,
    },
    isBackButtonVisible: {
        type: Boolean,
        default: true,
    }
});

const route = useRoute()
const router = useRouter()

const routeName = computed(() => route.name);
function goForCocktailRandom() {
    router.push(ROUTES_PATHS.COCKTAIL_RANDOM);

    if(routeName.value === ROUTES_PATHS.COCKTAIL_RANDOM) {
        router.go();
    }
}

function goBack() {
    props.backFunc ? props.backFunc() : router.go(-1);
}
</script>

<template>
    <div class="root">
        <div :style="`background-image: url(${imgUrl})`" class="img">

        </div>
        <div class="main">
            <div class="btns">
                <el-button v-if="isBackButtonVisible" type="primary" :icon="Back" circle class="back"
                    @click="goBack" />
                <el-button @click="goForCocktailRandom" class="btn">Приготовьте коктейль</el-button>
            </div>
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
    padding: 20px 30px;
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

.btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.back {
    background-color: transparent;
    border-color: var(--color-icon);

    &:hover {
        border-color: var(--color-accent);
    }
}
</style>