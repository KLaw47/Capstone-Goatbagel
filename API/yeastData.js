import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getYeasts = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/Yeasts.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createYeast = (yeastObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/Yeasts.json`, yeastObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/Yeasts/${response.data.name}.json`, payload)
        .then(() => {
          getYeasts().then(resolve);
        });
    }).catch((error) => reject(error));
});

const deleteYeast = (uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/Yeasts/${uid}.json`)
    .then(() => {
      getYeasts().then(resolve);
    })
    .catch((error) => reject(error));
});

const updateYeast = (yeastObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/Flours/${yeastObj.firebaseKey}.json`, yeastObj)
    .then(() => getYeasts(yeastObj.user).then(resolve))
    .catch(reject);
});

const getSingleYeast = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/Yeasts/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getYeasts,
  getSingleYeast,
  createYeast,
  updateYeast,
  deleteYeast,
};
