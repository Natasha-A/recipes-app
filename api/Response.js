import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { nanoid } from '@reduxjs/toolkit';

export default function App() {
  const [data, setData] = useState([]);

  function fetchData() {
    fetch('https://www.themealdb.com/api/json/v2/9973533/randomselection.php')
    .then((response) => response.json())
    .then((json) => {
      setData(Object.entries(json.meals[0])) 
    })
    .catch((error) => console.error(error))
  }

  // get data from api, call on load 
   useEffect(() => {
    fetchData()
  }, [])

  let createRecipeObject =  function() {

    instructionsEntry = JSON.stringify(Object.fromEntries(data).strInstructions)
    stringInstructions = String(instructionsEntry).replace(/(?:\\r\\n|\r|\n)/g, 'LB')
    stringCategory = String(Object.fromEntries(data).strCategory)
    stringImage = String(Object.fromEntries(data).strMealThumb)
    ingredientEntry =  Object.fromEntries(data)
    measureEntry = Object.fromEntries(data)
    
    ingredientsArray = []
    for (i=1; i < 15; i++) {
      string = ""
      if ((ingredientEntry["strIngredient" + i])) {
        string = measureEntry["strMeasure" + i] + ' ' + ingredientEntry["strIngredient" + i] 
        ingredientsArray.push({raw_text: string})
      } 
    }

    cleanedInstructions = stringInstructions.replaceAll("\"", "");
    seperatedInstructionsArray = cleanedInstructions.split("LB") 
    instructionsArray = []

    seperatedInstructionsArray.map((instruction) => {
      let item = {display_text : instruction}
      instructionsArray.push(item)
    })
    
    return {
      id: nanoid(),
      title: Object.fromEntries(data).strMeal,
      time: "1 hour",
      servings: "4 people",
      image: stringImage,
      description: `Category: ${stringCategory} | Cuisine: ${Object.fromEntries(data).strArea}`,
      ingredients: ingredientsArray,
      instructions: instructionsArray
    }
  }

  return (
    <View style={styles.container}>
    <Text>{JSON.stringify(createRecipeObject())}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
