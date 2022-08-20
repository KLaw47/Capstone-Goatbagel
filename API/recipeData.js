import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getRecipies = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/Recipes.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createRecipe = (recipeObj, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/Recipes.json`, recipeObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/Recipes/${response.data.name}.json`, payload)
        .then(() => {
          getRecipies().then(resolve);
        });
    }).catch((error) => reject(error));
});

const deleteRecipe = (uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/members/${uid}.json`)
    .then(() => {
      getMembers(uid).then(resolve);
    })
    .catch((error) => reject(error));
});

const updateRecipe = (recipeObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/Recipes/${recipeObj.firebaseKey}.json`, recipeObj)
    .then(() => getRecipies(recipeObj.user).then(resolve))
    .catch(reject);
});

const getSingleRecipe = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/Recipes/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getRecipies,
  getSingleRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
};
