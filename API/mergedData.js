import {
  getRecipeFlour, getSingleRecipe, getRecipeYeast, getRecipeSalt,
} from './recipeData';

const viewRecipeDetails = (recipeFirebaseKey) => new Promise((resolve, reject) => {
  getSingleRecipe(recipeFirebaseKey)
    .then((recipeObj) => (Promise.all(
      [getRecipeFlour(recipeObj.flourId), getRecipeYeast(recipeObj.yeastId), getRecipeSalt(recipeObj.saltId)],
    )
      .then(([flour, yeast, salt]) => {
        resolve({
          ...recipeObj, flour, yeast, salt,
        });
      }))).catch((error) => reject(error));
});

export default viewRecipeDetails;
