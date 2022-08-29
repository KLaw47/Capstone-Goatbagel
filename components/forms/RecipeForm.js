import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../API/recipeData';
import { createFlour, updateFlour } from '../../API/flourData';

const recipeState = {
  name: '',
  salt: '',
  water: '',
  directions: '',
  image: '',
  public: true,
};

const flourState = {
  flourType: '',
  cups: '',
};

function RecipeForm({ obj }) {
  const [recipeInput, setRecipeInput] = useState(recipeState);
  // eslint-disable-next-line no-unused-vars
  const [flourInput, setFlourInput] = useState(flourState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setRecipeInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateRecipe(recipeInput)
        .then(() => router.push(`/Recipes/${obj.firebaseKey}`));
    } else {
      const payload = { ...recipeInput, uid: user.uid };
      createRecipe(payload).then(() => {
        router.push('/');
      });
    }
  };

  const handleFlour = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateFlour(flourInput);
    } else {
      const payload = { ...flourInput, uid: user.uid };
      createFlour(payload);
    }
  };
  return (
    <>
      <Form onSubmit={handleFlour}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} FLour</h2>
        <FloatingLabel controlId="floatingSelect" label="Flour Type">
          <Form.Select
            aria-label="Flour Type"
            name="flourType"
            onChange={handleChange}
            className="mb-3"
            value={flourInput.flourType}
            required
          >
            <option value="">Select a Flour Type</option>
            <option value="aPFlour"> A P Flour</option>
            <option value="breadFlour"> Bread flour</option>
            <option value="wholeWheatFlour">Whole wheat flour</option>
          </Form.Select>
        </FloatingLabel>
      </Form>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Recipe</h2>
        <FloatingLabel controlId="floatingInput1" label="Recipe Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Recipe Name" name="name" value={recipeInput.name} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Salt" className="mb-3">
          <Form.Control type="text" placeholder="Enter Salt Amount" name="salt" value={recipeInput.salt} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Water" className="mb-3">
          <Form.Control type="text" placeholder="Enter Water Amount" name="water" value={recipeInput.water} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Directions" className="mb-3">
          <Form.Control type="text" placeholder="Enter Directions" name="directions" value={recipeInput.directions} onChange={handleChange} required />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
          <Form.Control type="text" placeholder="Image" name="image" value={recipeInput.image} onChange={handleChange} required />
        </FloatingLabel>
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="public"
          name="public"
          label="public?"
          checked={recipeInput.public}
          onChange={(e) => setRecipeInput((prevState) => ({
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
    name: PropTypes.string,
    salt: PropTypes.string,
    water: PropTypes.string,
    directions: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

RecipeForm.defaultProps = {
  obj: recipeState,
};

export default RecipeForm;
