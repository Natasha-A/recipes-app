import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Image, FlatList, Text, Button} from "react-native";
import { Link } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withNavigation } from "react-navigation";
import { recipeDeleted } from "./recipeSlice";
import { selectAllRecipes, fetchRecipes } from "./recipeSlice";



const RecipeExcerpt = ({recipe}) => {
  return(
    <View>
      <View>
        <Text>{recipe.title}</Text>
        <Text>{recipe.content.substring(0, 100)}</Text>
       <Button title="View Recipe" onPress={() => navigation.navigate('SingleRecipePage', {recipeId:recipe.id})}></Button>
          <Button title="Delete Recipe" onPress={() => onDeleteRecipeClicked(recipe.id)}></Button>
      </View>
    </View>
  )
}

const RecipeChildren = (navigation) => {
  const recipes = useSelector(selectAllRecipes)
  const dispatch = useDispatch();

  const recipeStatus = useSelector(state => state.recipes.status)
  const error = useSelector(state => state.recipes.error)


  useEffect(() => {
    if (recipeStatus === 'idle') {
      dispatch(fetchRecipes())
    }
  }, [recipeStatus, dispatch])

  
  const onDeleteRecipeClicked = (recipeId) => {
    dispatch(
      recipeDeleted(recipeId)
    )
  }


  
  //let content 
  //content = <RecipeExcerpt key={recipe.id} recipe={recipe}/>
  
  return (
    <View>
      {recipes.map((recipe) => (
        <View style={{borderWidth: 1, margin: 10}}>
          <Text>{recipe.title}</Text>
          <Text>{recipe.time}</Text>
          <Text>{recipe.servings}</Text>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: `${recipe.image}` }}
          />
          <Text>{`${recipe.description}`}</Text>

          <Button title="View Recipe" onPress={() => navigation.navigate('SingleRecipePage', {recipeId:recipe.id})}></Button>
          <Button title="Delete Recipe" onPress={() => onDeleteRecipeClicked(recipe.id)}></Button>
        </View>
      ))}
    </View>
  );
};

export const RecipesList = ({ navigation }) => {
  return (
    <View className="recipes-list">
        <Button title="Add Recipe" onPress={() => navigation.navigate('AddRecipe')}/>
        {RecipeChildren(navigation)}
    </View>
  );
};

export default RecipesList