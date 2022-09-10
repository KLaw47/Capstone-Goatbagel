import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createUser = (userObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users.json`, userObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/users/${response.data.name}.json`, payload)
        .then(() => {
          getUsers().then(resolve);
        });
    }).catch((error) => reject(error));
});

const deleteUser = (uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/users/${uid}.json`)
    .then(() => {
      getUsers().then(resolve);
    })
    .catch((error) => reject(error));
});

const updateUser = (userObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/users/${userObj.firebaseKey}.json`, userObj)
    .then(() => getUsers(userObj.firebaseKey).then(resolve))
    .catch(reject);
});

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users/${uid}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

export {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
