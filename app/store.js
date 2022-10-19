import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../features/recipes/recipeSlice'

export default configureStore({
  reducer: {
    // all the data for states.recipes will be updated by recipesReducers when actions are dispatched
    recipes: recipesReducer
  }
})