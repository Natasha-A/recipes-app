import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { nanoid } from '@reduxjs/toolkit';

function RecipeApi() {
  const [data, setData] = useState([]);
  let recipes = []

  // function fetchData() {
  //   fetch('https://www.themealdb.com/api/json/v2/9973533/randomselection.php')
  //   .then((response) => response.json())
  //   .then((json) => {
  //     setData(Object.entries(json.meals)) 
  //   })
  //   .catch((error) => console.error(error))
  // }

  console.log(data)
  createRecipesArray(data)


function createRecipesArray(recipeArray) {
   recipeArray.map((recipe, index) => {

    let stringCategory = recipe[1].strCategory
    let stringImage = recipe[1].strMealThumb
    let stringTitle = recipe[1].strMeal
    let stringCusinine = recipe[1].strArea

    let instructionsEntry = recipe[1].strInstructions
    let stringInstructions = instructionsEntry.replace(/(?:\\r\\n|\r|\n)/g, 'LB')
  
    // Sanitize and format ingredients array
    let ingredientEntry = recipe[1]
    let measureEntry = recipe[1]

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
      description: `Category ${stringCategory} | Cuisine: ${stringCusinine}`,
      ingredients: cleanedIngredientsArray,
      instructions: cleanInstructionsArray
    }
    recipes.push(recipeObject)
  }) 
}

console.table(recipes)

  return (JSON.stringify(recipes));
}


export default RecipeApi;