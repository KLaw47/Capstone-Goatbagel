import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createRecipe, updateRecipe } from '../../API/recipeData';

const initialState = {
  recipe_name: '',
  salt: '',
  water: '',
  directions: '',
  image: '',
  public: true,
};

export default function RecipeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateRecipe(formInput)
        .then(() => router.push(`/Recipes/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createRecipe(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Recipe</h2>
      <FloatingLabel controlId="floatingInput1" label="Recipe Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Recipe Name" name="recipe_name" value={formInput.recipe_name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Salt" className="mb-3">
        <Form.Control type="text" placeholder="Enter Salt Amount" name="salt" value={formInput.salt} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Water" className="mb-3">
        <Form.Control type="text" placeholder="Enter Water Amount" name="water" value={formInput.water} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Directions" className="mb-3">
        <Form.Control type="text" placeholder="Enter Directions" name="directions" value={formInput.dir} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Image" className="mb-3">
        <Form.Control type="text" placeholder="Image" name="image" value={formInput.image} onChange={handleChange} required />
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
  );
}

RecipeForm.propTypes = {
  obj: PropTypes.shape({
    recipe_name: PropTypes.string,
    salt: PropTypes.string,
    water: PropTypes.string,
    directions: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

RecipeForm.defaultProps = {
  obj: initialState,
};
