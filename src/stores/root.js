import { defineStore } from 'pinia'
import axios from 'axios'
import { INGREDIENTS_URL, COCTAILS_BY_INGR_URL } from '../constants/api.js'

export const useRootStore = defineStore('root', {
  state: () => ({
    ingredients: [],
    ingredient: null,
    cocktails: [],
  }),
  actions: {
    async getIngredients() {
      try {
        const response = await axios.get(INGREDIENTS_URL)
        this.ingredients = response?.data?.drinks
      } catch (error) {
        console.error('Error fetching ingredients from API:', error);
        console.log('Trying to load ingredients from local JSON...');
        try {
          const localData = await import('../../public/local_ingredients.json');
          this.ingredients = localData.default.drinks;
          console.log('Ingredients loaded from local JSON.');
        } catch (localError) {
          console.error('Error loading ingredients from local JSON:', localError);
          this.ingredients = []; 
        }
      }
    },
    async getCocktails(ingredient) {
      try {
        const response = await axios.get(`${COCTAILS_BY_INGR_URL}${ingredient}`)
        this.cocktails = response?.data?.drinks
      } catch (error) {
        console.error('Error fetching ingredients from API:', error);
        console.log('Trying to load ingredients from local JSON...');
        try {
          const localData = await import('../../public/local_ingredients.json');
          this.cocktails = localData.default.drinks;
          console.log('Ingredients loaded from local JSON.');
        } catch (localError) {
          console.error('Error loading ingredients from local JSON:', localError);
          this.cocktails = []; 
        }
      }
    },
    setIngredient(val) {
      this.ingredient = val;
    }
  }
})

