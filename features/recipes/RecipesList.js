import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Image, FlatList, Text, Button, StyleSheet, Pressable} from "react-native";
import { Link } from '@react-navigation/native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withNavigation } from "react-navigation";
import { recipeDeleted } from "./recipeSlice";
import { selectAllRecipes, fetchRecipes } from "./recipeSlice";
import {BsPlusLg, BsX} from 'react-icons/bs'


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
  return (
    <View>
      {recipes.map((recipe) => (
        <View style={styles.Card}>
          <Image
            style={{ width: 200, height: 200 }}
            source={{ uri: `${recipe.image}` }}
          />
          <View style={styles.CardText}>

            <View style={styles.CardHeader}>
              <Text style={styles.CardHeaderText}>{recipe.title}</Text>
              <Pressable style={styles.CardHeaderButton} onPress={() => onDeleteRecipeClicked(recipe.id)}>
              <BsX/>
              </Pressable>
            </View>
            <Text>{`${recipe.description}`}</Text>
            <Text>{recipe.time} | {recipe.servings}</Text>
            <Text></Text>

          <Button title="View Recipe" onPress={() => navigation.navigate('SingleRecipePage', {recipeId:recipe.id})}></Button>
          </View>

        </View>
      ))}
    </View>
  );
};

export const RecipesList = ({ navigation }) => {
  return (
    <View className="recipes-list" styles={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Latest Recipes</Text>
        <Pressable style={[styles.addButton, {backgroundColor:'#e86868'}]} onPress={() => navigation.navigate('AddRecipe')}>{<BsPlusLg />}</Pressable>
      </View>
        {RecipeChildren(navigation)}
      <FlatList
        renderItem={RecipeChildren}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  }, 
  Card: {
    margin: 20,
    backgroundColor:'white',
    borderRadius:10,
    shadowColor: '#171717',
    shadowOffset: {width: 3, height: 4},
    shadowOpacity: 0.17,
    shadowRadius: 3,
    padding:15,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
    },
  CardText: {
    flexDirection:'column',
    marginLeft:10,
    marginRight:20
  },
  CardHeader: {
    flexDirection:'row',
    justifyContent:'space-between',
  },
  CardHeaderText: {
    fontSize:20,
    fontWeight:'bold',
    width:'70%',
    height:100
  },
  CardHeaderButton: {
    width:15,
    height:25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    color:'white',
    borderRadius:7,
    backgroundColor:'#e86868'
  },
  header: {
    flex:10,
    flexDirection:'row',
    justifyContent:'space-between',
    height:100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20

  }, 
  headerText: {
    fontSize:30,
    fontWeight:'bold'
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    color:'white',
    borderRadius:7
  },
})

export default RecipesList