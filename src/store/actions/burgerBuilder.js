import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredientType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredientType: ingredientType },
  };
};

export const delIngredient = (ingredientType) => {
  return {
    type: actionTypes.DEL_INGREDIENT,
    payload: { ingredientType: ingredientType },
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS
  }
};
