import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Homemade Ramem",
    time: "25 minutes",
    servings: "6 people",
    image: "https://www.forkknifeswoon.com/wp-content/uploads/2014/10/simple-homemade-chicken-ramen-fork-knife-swoon-01.jpg",
    description:
      "Fresh vegetables? Quick and easy homemade broth? A soft-boiled egg and a pile of our favorite curly-cue packaged ramen noodles that remind us of college? That’s this homemade ramen. At the end of the day, a deep bowl of bright veggies + flavorful broth + golden panko crumbs + soft-boiled egg + chewy, tangled noodles is not going to let you down",
    ingredients: [
      {
        raw_text: "1 tablespoon sesame oil"
      }, 
      {
        raw_text: "3 teaspoon grated ginger"
      },
      {
        raw_text: "4 teaspoons grated garlic"
      },
      {
        raw_text: "4 cups chicken broth"
      },
      {
      raw_text: "4 cups water",
      },
      {
        raw_text: "4 cups water"
      },
      {
      raw_text:"2 packets instant ramen"
      },
      {
        raw_text:"1/2 cup chopped kale"
      }, 
      {
        raw_text:"1 cup shredded carrots"
      }
    ],
    instructions: [
      {
        position: 1,
        display_text:
          "Heat the sesame oil in a large skillet over medium low heat. Add the garlic and ginger; stir fry for 2 minutes or until soft and fragrant.",
      },
      {
        position: 2,
        display_text:
          "Add the broth and the water. Bring to a simmer; add the mushrooms and simmer for 10 minutes or until the mushrooms have softened and the broth is flavorful.",
      },
      {
        position: 3,
        display_text:
          "Add the instant noodles to the hot liquid and simmer for an additional 5 minutes or until the noodles have softened. Add the scallions and stir to combine.",
      },
      {
        position: 4,
        display_text:
          "Remove from heat, stir in the kale and carrots, and top with crunchy panko crumbs (see notes) and a soft-boiled egg (optional). Season with chili oil, hot sauce, sesame oil, and/or soy sauce and salt to taste.",
      },
    ],
  },
];

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
      state.push(action.payload)
    },
    recipedUpdated(state, action) {
      const {id, title, time, servings, image, description, ingredients, instructions} = action.payload
      const existingRecipe = state.find(recipe => recipe.id === id) // check if recipe exists, update with new values 
      if (existingRecipe) {
        existingRecipe.title = title 
        existingRecipe.time = time 
        existingRecipe.servings = servings
        existingRecipe.image = image
        existingRecipe.description = description
        existingRecipe.ingredients = ingredients
        existingRecipe.instructions = instructions
      }

    }
  }
})


export const { recipeAdded, recipedUpdated } = recipeSlice.actions;

export default recipeSlice.reducer;