import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const INGREDIENT_PRICES = {
  salad: 0.2,
  bacon: 0.6,
  cheese: 0.4,
  meat: 0.8,
};

const initialPrice = 4;

// ingredients: {salad: {quantity: 1, order:4},}
const initialState = {
  ingredients: null,
  totalPrice: initialPrice,
  error: false,
  building: false,
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: initialPrice,
        error: false,
        building: false,
        loading: false
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true, loading: false});
    case actionTypes.ADD_INGREDIENT:
      return updateObject(state, {
        ingredients: updateObject(state.ingredients, {
          [action.payload.ingredientType]:
            state.ingredients[action.payload.ingredientType] + 1,
        }),
        totalPrice:
          Math.round(
            (state.totalPrice +
              INGREDIENT_PRICES[action.payload.ingredientType]) *
              100
          ) / 100,
        building: true,
      });

    case actionTypes.DEL_INGREDIENT:
      return updateObject(state, {
        ingredients: updateObject(state.ingredients, {
          [action.payload.ingredientType]:
            state.ingredients[action.payload.ingredientType] - 1,
        }),
        totalPrice:
          Math.round(
            (state.totalPrice -
              INGREDIENT_PRICES[action.payload.ingredientType]) *
              100
          ) / 100,
        building: true,
      });
    default:
      return state;
  }
};

export default reducer;
