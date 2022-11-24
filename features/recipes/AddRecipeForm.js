import React, { useState } from "react";
import { recipeAdded } from "./recipeSlice";
import { nanoid } from '@reduxjs/toolkit';
import  { useDispatch } from 'react-redux'
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';


export const AddRecipeForm = () => {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("Recipe Name");
  const [time, setTime] = useState("1 hour");
  const [servings, setServings] = useState("4 people");
  const [image, setImage] = useState(
    "https://media.istockphoto.com/photos/table-top-view-of-spicy-food-picture-id1316145932?b=1&k=20&m=1316145932&s=170667a&w=0&h=feyrNSTglzksHoEDSsnrG47UoY_XX4PtayUPpSMunQI="
  );
  const [description, setDescription] = useState(
    "Write your recipe description here."
  );
  const [ingredient, setIngredient] = useState(''); // store individual ingredient
  const [ingredients, setIngredients] = useState([]); // store all ingredients as array 

  const [instruction, setInstruction] = useState('')
  const [instructions, setInstructions] = useState([]); 

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTimeChanged = (e) => setTime(e.target.value);
  const onServingsChanged = (e) => setServings(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  // update ingredient form value 
  const onIngredientChanged = (e) => setIngredient(e.target.value);
    
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

  const onInstructionChanged = (e) => setInstruction(e.target.value);

  const onSaveRecipeClicked = () => {
      dispatch(
        recipeAdded({
          id:nanoid(),
          title, 
          time, 
          servings, 
          image,
          description,
          ingredients,
          instructions
        })
      )
      setTitle('');
      setTime('');
      setServings('');
      setDescription('');
      setIngredients([]);
      setInstructions([]);
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Add a New Recipe</Text>
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

        <Text htmlFor="descriptionInfo" style={styles.title}>Description:</Text>
        <TextInput
          type="text"
          id="descriptionInfo"
          value={description}
          onChange={onDescriptionChanged}
          style={styles.TextInput}
        ></TextInput>

        <Text htmlFor="ingredientsInfo" style={styles.title}>Add Ingredient:</Text>
        <TextInput
          type="text"
          id="ingredientsInfo"
          value={ingredient}
          onChange={onIngredientChanged}
          style={styles.TextInput}
        ></TextInput>
        <Button style={styles.buttonField} title="Add Ingredient" onPress={onSubmitIngredient} />

        <Text htmlFor="stepsInfo" style={styles.title}>Add Step:</Text>
        <TextInput
          type="text"
          id="stepsInfo"
          value={instruction}
          onChange={onInstructionChanged}
          style={styles.TextInput}
          >
        </TextInput>
        <Button style={styles.buttonField} title="Add Instruction" onPress={onSubmitInstruction} />
   
        <Button style={styles.buttonField} title="Save Post" type="button" onPress={onSaveRecipeClicked} disabled={((ingredients.length > 0) && (instructions.length) > 0) ? false : true} />
      </View>
      <Text style={styles.headerText}>Ingredients</Text>
      <ul>
        {
          ingredients.map((ingred) => (
            <li>{ingred.raw_text}</li>
          ))  
        }
      </ul>
      <Text style={styles.headerText}>Instructions</Text>
      <ol>
        {
          instructions.map((instruction) => (
            <li>{instruction.display_text}</li>
          ))  
        }
      </ol>
      
    </View>
  );
};

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
