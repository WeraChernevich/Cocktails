<script setup>
import { ref } from 'vue';
import AppLayout from '@/components/AppLayout.vue';
import CocktailThumb from '@/components/CocktailThumb.vue';
import { useRootStore } from '@/stores/root.js';
import { storeToRefs } from 'pinia';

const rootStore = useRootStore();
rootStore.getIngredients();

const { ingredients, cocktails } = storeToRefs(rootStore);
const ingredient = ref(null);

function getCocktails() {
    rootStore.getCocktails(ingredient.value);
}
</script>

<template>
    <AppLayout imgUrl="/src/assets/img/bg-1.jpg">
        <div class="wrapper">
            <div v-if="!ingredient || !cocktails" class="info">
                <div class="title">Выберите свой напиток</div>
                <div class="line"></div>
                <div class="select-wrapper">
                    <el-select v-model="ingredient" placeholder="Выберите основной ингредиент" size="large"
                        class="select" @change="getCocktails">
                        <el-option v-for="item in ingredients" :key="item.strIngredient1" :label="item.strIngredient1"
                            :value="item.strIngredient1" />
                    </el-select>
                </div>
                <div class="text">
                    Попробуйте наши рецепты вкусных коктейлей на любой случай жизни. Найдите рецепты вкусных коктейлей
                    по ингредиентам с помощью нашего генератора коктейлей.
                </div>
                <img src="/src/assets/img/main-cocktails.png" alt="Cocktails" class="img">
            </div>
            <div v-else class="info">
                <div class="title">КОКТЕЙЛИ С {{ ingredient }}</div>
                <div class="line"></div>
                <div class="cocktails">
                    <CocktailThumb v-for="cocktail in cocktails" :key="cocktail.idDrink" :cocktail="cocktail" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<style lang="scss" scoped>
@use '../assets/styles/main.scss';

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.info {
    padding: 80px 0;
    text-align: center;
}

.select-wrapper {
    padding-top: 50px;
}

.select {
    width: 220px;
}

.text {
    margin: 0 auto;
    max-width: 516px;
    padding-top: 50px;
    line-height: 36px;
    letter-spacing: .1em;
    color: var(--color-text-muted);
}

.img {
    margin: 60px auto 0;
}

.cocktails {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    max-height: 400px;
    overflow-y: auto;
}

</style>