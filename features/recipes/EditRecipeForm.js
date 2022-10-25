import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Image, FlatList, Text, Button} from "react-native";

import { recipedUpdated, recipeDeleted } from "./recipeSlice";

export const EditRecipeForm = ({ navigation, route }) => {
  const { recipeId } = route.params;

  const recipe = useSelector((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

  const [title, setTitle] = useState(recipe.title);
  const [time, setTime] = useState(recipe.time);
  const [servings, setServings] = useState(recipe.servings);
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
     <form> 
        <h2>Edit Recipe</h2>
        <label htmlFor="recipeTitle">Recipe Title:</label>
        <input
          type="text"
          id="recipeTitle"
          value={title}
          onChange={onTitleChanged}
        ></input>

        <label htmlFor="timeInfo">Time:</label>
        <input
          type="text"
          id="timeInfo"
          value={time}
          onChange={onTimeChanged}
        ></input>

        <label htmlFor="servingsInfo">Servings:</label>
        <input
          type="text"
          id="servingsInfo"
          value={servings}
          onChange={onServingsChanged}
        ></input>

        <label htmlFor="descriptionInfo">Description:</label>
        <input
          type="text"
          id="descriptionInfo"
          value={description}
          onChange={onDescriptionChanged}
        ></input>

        <label htmlFor="ingredientsInfo">Add Ingredient:</label>
        <input
          type="text"
          id="ingredientsInfo"
          value={ingredient}
          onChange={onIngredientChanged}
        ></input>
        <button type="button" onClick={onSubmitIngredient}>
          Add ingredient
        </button>

        <label htmlFor="stepsInfo">Add Step:</label>
        <input
          type="text"
          id="stepsInfo"
          value={instruction}
          onChange={onInstructionChanged}
        ></input>
        <button type="button" onClick={onSubmitInstruction}>
          Add Step
        </button>
        <Button title="Save Recipe" onPress={onSaveRecipeClicked}/>
      </form>
      
      <h3>Ingredients</h3>
      <ul>
        {
          ingredients.map(ingredient => (
            <li>{ingredient.raw_text}</li>
          ))
        }
      </ul>

      <h3>Instructions</h3>
      <ul>
      {
        instructions.map(instructions => (
          <li>{instructions.display_text}</li>
        ))
      }
      </ul>
      </View> : <View><Text>Recipe not found</Text></View>
    }
    </View>
  )
}