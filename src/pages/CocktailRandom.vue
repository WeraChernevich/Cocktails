<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { COCTAIL_RANDOM, INGREDIENT_PIC } from '@/constants';
import AppLayout from '@/components/AppLayout.vue';

const cocktail = ref(null);

const ingredients = computed(() => {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        if (!cocktail.value[`strIngredient${i}`]) break

        const ingredient = cocktail.value[`strIngredient${i}`];

        ingredients.push(ingredient)
    }
    return ingredients;
})

async function getCocktail() {
    const data = await axios.get(COCTAIL_RANDOM);
    cocktail.value = data?.data?.drinks[0];
}

getCocktail();

</script>

<template>
    <div v-if="cocktail" class="wrap">
        <AppLayout :imgUrl="cocktail.strDrinkThumb">
            <div class="wrapper">
                <div class="info">
                    <div class="title">{{ cocktail.strDrink }}</div>
                    <div class="line"></div>
                    <div class="slider">
                        <swiper :slides-per-view="3" :space-between="50" class="swiper">
                            <swiper-slide v-for="(ingredient, key) in ingredients" :key="key">
                                <img :src="`${INGREDIENT_PIC}${ingredient}-Small.png`" width="100px" height="100px"/>
                                <div class="name">
                                    {{ ingredient }}
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="instructions">
                        {{ cocktail.strInstructions }}
                    </div>
                </div>
            </div>
        </AppLayout>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/main.scss';

.list {
    margin-top: 50px;
    max-height: 250px;
    overflow-y: auto;
}

.instructions {
    padding: 50px 0;
}

.slider {
    padding: 50px 0;
}

.swiper-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.swiper {
    max-width: 586px;
}

.name {
    padding-top: 20px;
}
</style>