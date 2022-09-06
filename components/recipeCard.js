import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteRecipe } from '../API/recipeData';

function RecipeCard({ recipeObj, onUpdate }) {
  const { user } = useAuth;
  console.warn(user);
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeObj.name}?`)) {
      deleteRecipe(recipeObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '20rem', margin: '10px' }}>
      <Link href={`/Recipe/${recipeObj.firebaseKey}`} passHref>
        <Card.Img variant="top" src={recipeObj.image} alt={recipeObj.name} style={{ height: '300px' }} />
      </Link>
      <Card.Body>
        <Card.Title>{recipeObj.name}</Card.Title>
        <p>{recipeObj.userName}</p>
        {recipeObj.uid === user.uid ? (
          <>
            <Link href={`/Recipe/edit/${recipeObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisRecipe} className="m-2">
              DELETE
            </Button>
          </>
        ) : ''}
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    userName: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecipeCard;
