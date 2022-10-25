import React from "react";
import { useSelector } from "react-redux";
import {Text, View, Button} from 'react-native'


export const SingleRecipePage = ({ navigation, route }) => {
  const { recipeId } = route.params; // route.params

  // check if IDs match and returns the value
  const recipe = useSelector((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  if (!recipe) {
    return (
      <section>
        <h2>Recipe not found!</h2>
      </section>
    );
  }

  return (
    <View>
      <View className="post">
        <Text>{recipe.title}</Text>
        <Text>{recipe.time}</Text>
        <Text>{recipe.servings}</Text>
        <Text className="post-content">{recipe.description}</Text>
        <Text>Ingredients:</Text>
           {
            recipe.ingredients.map((ingredient,index) => (
              <Text>{index+1}. {ingredient.raw_text}</Text>
            ))
        }
        <Text>Steps:</Text>        
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
