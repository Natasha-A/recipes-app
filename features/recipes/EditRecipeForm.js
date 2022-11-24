import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';

import { recipedUpdated, recipeDeleted } from "./recipeSlice";
import { selectRecipeById } from "./recipeSlice";

export const EditRecipeForm = ({ navigation, route }) => {
  const { recipeId } = route.params;

  const recipe = useSelector(state => selectRecipeById(state, recipeId));

  const [title, setTitle] = useState(recipe.title);
  const [time, setTime] = useState(recipe.time);
  const [servings, setServings] = useState(recipe.servings);
  const [image, setImage] = useState(recipe.image);
  const [description, setDescription] = useState(recipe.description);

  const [ingredient, setIngredient] = useState('')
  const [ingredients, setIngredients] = useState(recipe.ingredients);

  const [instruction, setInstruction] = useState('')
  const [instructions, setInstructions] = useState(recipe.instructions);

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTimeChanged = (e) => setTime(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onServingsChanged = (e) => setServings(e.target.value);
  const onIngredientChanged = (e) => setIngredient(e.target.value);
  const onInstructionChanged = (e) => setInstruction(e.target.value);

  const onSubmitIngredient = function(e) {
    e.preventDefault();

    const ingredientObj = {raw_text: ingredient}

    setIngredients(ingredients.concat(ingredientObj))

    console.log(ingredients)
    setIngredient('')
  }

  const onSubmitInstruction = function(e) {
    e.preventDefault();

    const instructionObj = {display_text: instruction}

    setInstructions(instructions.concat(instructionObj))

    console.log(instructions)
    setInstruction('')
  }

  const onSaveRecipeClicked = () => {
    dispatch(
      recipedUpdated({
        id: recipeId,
        title,
        time,
        servings,
        image,
        description,
        ingredients,
        instructions,
      }) 
    )
    setTitle('');
    setTime('');
    setServings('');
    setDescription('');
    setIngredients([]);
    setInstructions([]);
    navigation.navigate('Home');
  };

  return (
    <View>
     {
     recipeId ? 
     <View>
     <View style={styles.container}> 
        <Text style={styles.headerText}>Edit Recipe</Text>
        <Text htmlFor="recipeTitle" style={styles.title}>Recipe Title:</Text>
        <TextInput
          type="text"
          id="recipeTitle"
          value={title}
          onChange={onTitleChanged}
          style={styles.TextInput}
        ></TextInput>

        <Text htmlFor="timeInfo" style={styles.title}>Time:</Text>
        <TextInput
          type="text"
          id="timeInfo"
          value={time}
          onChange={onTimeChanged}
          style={styles.TextInput}
        ></TextInput>

        <Text htmlFor="servingsInfo" style={styles.title}>Servings:</Text>
        <TextInput
          type="text"
          id="servingsInfo"
          value={servings}
          onChange={onServingsChanged}
          style={styles.TextInput}

        ></TextInput>

        <Text style={styles.title} htmlFor="descriptionInfo">Description:</Text>
        <TextInput
          type="text"
          id="descriptionInfo"
          value={description}
          onChange={onDescriptionChanged}
          style={styles.TextInput}

        ></TextInput>

        <Text style={styles.title} htmlFor="ingredientsInfo">Add Ingredient:</Text>
        <TextInput
          type="text"
          id="ingredientsInfo"
          value={ingredient}
          onChange={onIngredientChanged}
          style={styles.TextInput}

        ></TextInput>
        <Button style={styles.title} title="Add ingredient" onPress={onSubmitIngredient}/>

        <Text style={styles.title} htmlFor="stepsInfo">Add Step:</Text>
        <TextInput
          type="text"
          id="stepsInfo"
          value={instruction}
          onChange={onInstructionChanged}
          style={styles.TextInput}

        ></TextInput>
        <Button  title="Add Instruction" onPress={onSubmitInstruction} />
        <Button title="Save Recipe" onPress={onSaveRecipeClicked}/>
      </View>
      
      <h3>Ingredients</h3>
      <ul>
        {
          ingredients.map(ingredient => (
            <li>{ingredient.raw_text}</li>
          ))
        }
      </ul>

      <h3>Instructions</h3>
      <ol>
      {
        instructions.map(instructions => (
          <li>{instructions.display_text}</li>
        ))
      }
      </ol>

    </View> : <View><Text>Recipe not found</Text></View>
    }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin:20
  },
  headerText: {
    fontSize:30,
    fontWeight: 'bold',
    margin:20
  },
  title: {
    fontSize:15,
    fontWeight:500
  },
  buttonField:{
    margin: 20,
    padding: 10
  },
  TextInput: {
    backgroundColor:'white',
    padding:10,
    marginTop:20,
    marginBottom:20,
    color: 'grey'
  }
  
});
