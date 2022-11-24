import React from "react";
import { useSelector } from "react-redux";
import {Text, View, Button, Image, StyleSheet} from 'react-native'
import { selectRecipeById } from "./recipeSlice";

export const SingleRecipePage = ({ navigation, route }) => {
  const { recipeId } = route.params; // route.params

  // check if IDs match and returns the value
  const recipe = useSelector(state => selectRecipeById(state, recipeId));

  if (!recipe) {
    return (
      <section>
        <h2>Recipe not found!</h2>
      </section>
    );
  }

  return (
    <View>
      <View style={styles.containerBase}>
        <Text style={styles.headerText}>{recipe.title}</Text>
        <Text style={styles.Details} >{recipe.description}</Text>
        <Image style={styles.Image} source={recipe.image}></Image>
        <Text style={styles.Details}>{recipe.time} | {recipe.servings}</Text>
        <Text style={styles.subHeading}>Ingredients:</Text>
           {
            recipe.ingredients.map((ingredient,index) => (
              <Text>{index+1}. {ingredient.raw_text}</Text>
            ))
        }
        <Text style={styles.subHeading}>Steps:</Text>        
        {
          recipe.instructions.map((instruction, index) => (
            <Text>{index+1}. {instruction.display_text}</Text>
          ))
        }
      </View>
      <Button title="Edit Recipe"  onPress={() => navigation.navigate('EditRecipe', {recipeId: recipe.id})}/>
    </View>
  );
};



const styles = StyleSheet.create({
  containerBase:{
    flex:1,
    margin: 20, 
    flexDirection:'column',
  }, 
  childItem:{
    backgroundColor: '#F8F8F8',
    boxShadow: '1px 2px 9px #B0B0B0',
    margin: 10,
    padding: 5,
    borderRadius:5,
    height: '20%',
    color:'white',
    backgroundColor:' #c175ff'
  }, 
  headerText: {
    fontSize:30,
    fontWeight:'bold'
  },
  subHeading: {
    fontSize:20,
    fontWeight:'bold',
    padding:10,
  },
  Image: {
    height: 300,
    width:400,
  },
  Details: {
    fontSize:15,
    fontWeight:'600',
    margin:5
  }
})
