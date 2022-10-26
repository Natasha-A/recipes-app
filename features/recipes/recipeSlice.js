import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import RecipeApi from "../../api/RecipesApi";

const initialState = {
  recipes: [],
  status: 'idle',
  error: null
}

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v2/9973533/randomselection.php')
  const json = await response.json()
  return createRecipesArray(json.meals)
})

function createRecipesArray(fetchedRecipes) {
  let recipeObjects = []
  fetchedRecipes.map((recipe, index) => {

   let stringCategory = recipe.strCategory
   let stringImage = recipe.strMealThumb || 'https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI='
   let stringTitle = recipe.strMeal
   let stringCusinine = recipe.strArea

   let instructionsEntry = recipe.strInstructions
   let stringInstructions = instructionsEntry.replace(/(?:\r\n|\r\n|\r|\n)/g, 'LB')
 
   // Sanitize and format ingredients array
   let ingredientEntry = recipe
   let measureEntry = recipe

   let cleanedIngredientsArray = []
   for (let i=1; i < 15; i++) {
     let string = ""

     if (ingredientEntry["strIngredient" + i]) {
       string = measureEntry["strMeasure" + i] + " " + ingredientEntry["strIngredient" + i]
       cleanedIngredientsArray.push({raw_text:string})
     }
   }
   
   // Sanitize and format instructions array 
   let cleanedInstructions = stringInstructions.replaceAll("\"", "")
   let seperatedInstructionsArray = cleanedInstructions.split("LB")
   let cleanInstructionsArray = []

   seperatedInstructionsArray.map((instruction) => {
     let item = {display_text : instruction}
     cleanInstructionsArray.push(item)
   })

   // Format and create cleaned recipe object 
   let recipeObject = {
     id: nanoid(),
     title: stringTitle,
     time: "1 hour",
     servings: "4 people",
     image: stringImage,
     description: `Category: ${stringCategory} | Cuisine: ${stringCusinine}`,
     ingredients: cleanedIngredientsArray,
     instructions: cleanInstructionsArray
   }
   recipeObjects.push(recipeObject)
 }) 
 console.table(recipeObjects)
 return recipeObjects
}


const recipeSlice = createSlice({
   // initalize reducer with initial state 
  name: 'recipes',
  initialState,
  // reducer function to handle recipe added 
  // retrieves the current state value and the action object that will be dispatched 
  // state - array of post
  // action - recipe entry 
  // action.payload - new post object into state array
  reducers:{
    recipeAdded(state, action) {
      state.recipes.push(action.payload)
    },
    recipedUpdated(state, action) {
      const {id, title, time, servings, image, description, ingredients, instructions} = action.payload
      const existingRecipe = state.recipes.find(recipe => recipe.id === id) // check if recipe exists, update with new value
      if (existingRecipe) {
        existingRecipe.title = title 
        existingRecipe.time = time 
        existingRecipe.servings = servings
        existingRecipe.image = image
        existingRecipe.description = description
        existingRecipe.ingredients = ingredients
        existingRecipe.instructions = instructions
      }
    },
    recipeDeleted(state, action) {
      const recipeId = action.payload 
      state.recipes.map((recipe, index) => { 
        if (recipe.id == recipeId) {
          state.recipes.splice(index, 1) 
        }
      })
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched recipes to the array
        state.recipes = state.recipes.concat(action.payload)
        console.table("table: " + action.payload)
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})



export const { recipeAdded, recipedUpdated, recipeDeleted } = recipeSlice.actions;

export const selectAllRecipes = state => state.recipes.recipes
export const selectRecipeById = (state, recipeId) => state.recipes.recipes.find(recipe => recipe.id === recipeId)


export default recipeSlice.reducer;