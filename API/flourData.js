import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getFlours = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/Flours.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createFlour = (flourObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/Flours.json`, flourObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/Flours/${response.data.name}.json`, payload)
        .then(() => {
          getFlours().then(resolve);
        });
    }).catch((error) => reject(error));
});

const deleteFlour = (uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/Flours/${uid}.json`)
    .then(() => {
      getFlours().then(resolve);
    })
    .catch((error) => reject(error));
});

const updateFlour = (flourObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/Flours/${flourObj.firebaseKey}.json`, flourObj)
    .then(() => getFlours(flourObj.user).then(resolve))
    .catch(reject);
});

const getSingleFlour = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/Flours/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getFlours,
  getSingleFlour,
  createFlour,
  updateFlour,
  deleteFlour,
};
