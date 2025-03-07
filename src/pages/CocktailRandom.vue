<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { COCTAIL_RANDOM, INGREDIENT_PIC } from '@/constants';
import AppLayout from '@/components/AppLayout.vue';

const cocktail = ref(null);
const error = ref(null);

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
    try {
    const response = await axios.get(COCTAIL_RANDOM);
    if (response.status === 200) {
      cocktail.value = response.data.drinks[0];
      error.value = null; // Сбрасываем ошибку, если загрузка прошла успешно
    } else {
      error.value = `Failed to load cocktail. Status code: ${response.status}`;
      cocktail.value = null;
    }
  } catch (e) {
    console.error("Error fetching cocktail:", e);
    error.value = "Failed to load cocktail. Please check your internet connection and try again.";
    cocktail.value = null;
  }
}

onMounted(() => {
  getCocktail(); 
});

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