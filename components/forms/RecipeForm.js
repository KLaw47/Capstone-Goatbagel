import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../API/recipeData';
import { getFlours } from '../../API/flourData';
import { getYeasts } from '../../API/yeastData';
import getSalts from '../../API/saltData';

const initialState = {
  name: '',
  saltAmount: '',
  water: '',
  flourAmount: '',
  yeastAmount: '',
  directions: '',
  image: '',
  public: true,
};

function RecipeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [flours, setFlours] = useState([]);
  const [yeasts, setYeasts] = useState([]);
  const [salts, setSalts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getFlours().then(setFlours);
    getYeasts().then(setYeasts);
    getSalts().then(setSalts);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const converter = (unit) => {
    const selectedFlour = flours.find((flour) => flour.firebaseKey === formInput.flourId);
    const selectedYeast = yeasts.find((yeast) => yeast.firebaseKey === formInput.yeastId);
    const selectedSalt = salts.find((salt) => salt.firebaseKey === formInput.saltId);
    if (unit === 'cups') {
      return Number(formInput.flourAmount) * Number(selectedFlour.grams);
    } if (unit === 'ounces') {
      return Number(formInput.yeastAmount) * Number(selectedYeast.grams);
    } if (unit === 'teaspoons') {
      return Number(formInput.saltAmount) * Number(selectedSalt.grams);
    } return Number(formInput.water) * 240;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateRecipe(formInput)
        .then(() => router.push(`/Recipes/${obj.firebaseKey}`));
    } else {
      console.warn(user.uid);
      const payload = {
        ...formInput,
        userName: user.displayName,
        saltAmount: converter('teaspoons'),
        water: converter(),
        flourAmount: converter('cups'),
        yeastAmount: converter('ounces'),
        uid: user.uid,
      };
      createRecipe(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Recipe</h2>
        <FloatingLabel controlId="floatingInput1" label="Recipe Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Recipe Name" name="name" value={formInput.name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Salt">
          <Form.Select
            aria-label="Salt"
            name="saltId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.saltId}
            required
          >
            <option value="">Select Salt Type</option>
            {
            salts.map((salt) => (
              <option
                key={salt.firebaseKey}
                value={salt.firebaseKey}
              >
                {salt.saltType}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Water" className="mb-3">
          <Form.Control type="text" placeholder="Enter Water Amount" name="water" value={formInput.water} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Directions" className="mb-3">
          <Form.Control type="text" placeholder="Enter Directions" name="directions" value={formInput.directions} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
          <Form.Control type="text" placeholder="Image" name="image" value={formInput.image} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Flour">
          <Form.Select
            aria-label="Flour"
            name="flourId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.flourId}
            required
          >
            <option value="">Select Flour Type</option>
            {
            flours.map((flour) => (
              <option
                key={flour.firebaseKey}
                value={flour.firebaseKey}
              >
                {flour.flourType}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Yeast">
          <Form.Select
            aria-label="yeast"
            name="yeastId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.yeastId}
            required
          >
            <option value="">Select Yeast Type</option>
            {
            yeasts.map((yeast) => (
              <option
                key={yeast.firebaseKey}
                value={yeast.firebaseKey}
              >
                {yeast.yeastType}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput1" label="Cups Flour" className="mb-3">
          <Form.Control type="text" placeholder="Enter Recipe Flour" name="flourAmount" value={formInput.flourAmount} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput1" label="Ounces Yeast" className="mb-3">
          <Form.Control type="text" placeholder="Enter Recipe Yeast" name="yeastAmount" value={formInput.yeastAmount} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput1" label="Teaspoons Salt" className="mb-3">
          <Form.Control type="text" placeholder="Enter Recipe Salt" name="saltAmount" value={formInput.saltAmount} onChange={handleChange} required />
        </FloatingLabel>
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="public"
          name="public"
          label="public?"
          checked={formInput.public}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            public: e.target.checked,
          }))}
        />
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Recipe</Button>
      </Form>
    </>
  );
}

RecipeForm.propTypes = {
  obj: PropTypes.shape({
    flourId: PropTypes.string,
    yeastId: PropTypes.string,
    saltId: PropTypes.string,
    flourAmount: PropTypes.string,
    yeastAmount: PropTypes.string,
    name: PropTypes.string,
    saltAmount: PropTypes.string,
    water: PropTypes.string,
    directions: PropTypes.string,
    public: PropTypes.bool,
    userName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

RecipeForm.defaultProps = {
  obj: initialState,
};

export default RecipeForm;
