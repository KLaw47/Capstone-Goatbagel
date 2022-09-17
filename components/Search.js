import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Search({ recipes, setFilteredRecipes }) {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    const results = recipes.filter((recipe) => recipe.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredRecipes(results);
  };
  return (
    <div>
      <input placeholder="Search Recipes" value={query} onChange={handleChange} />
    </div>
  );
}

Search.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  setFilteredRecipes: PropTypes.func.isRequired,
};

export default Search;
