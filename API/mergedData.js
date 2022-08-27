import { getRecipeFlour, getSingleRecipe, getRecipeYeast } from './recipeData';
// import { getSingleFlour } from './flourData';
// import { getSingleYeast } from './yeastData';

const viewRecipeDetails = (recipeFirebaseKey) => new Promise((resolve, reject) => {
  getSingleRecipe(recipeFirebaseKey)
    .then((recipeObj) => (Promise.all([getRecipeFlour(recipeObj.flourId), getRecipeYeast(recipeObj.yeastId)])
      .then(([flour, yeast]) => {
        resolve({ ...recipeObj, flour, yeast });
      }))).catch((error) => reject(error));
});

export default viewRecipeDetails;
