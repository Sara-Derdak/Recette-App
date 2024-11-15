import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const APP_ID = 'VOTRE_ID_API'; // Remplacez par votre ID d'API Edamam
const APP_KEY = 'VOTRE_CLE_API'; // Remplacez par votre clé d'API Edamam

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [sort, setSort] = useState('calories');
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6; // Nombre de recettes par page

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      if (data.hits.length > 0) {
        const sortedRecipes = data.hits
          .map((hit) => hit.recipe)
          .sort((a, b) => (sort === 'calories' ? a.calories - b.calories : a.totalTime - b.totalTime));
        setRecipes(sortedRecipes);
        setError('');
      } else {
        setRecipes([]);
        setError('Aucune recette trouvée. Essayez un autre mot-clé.');
      }
    } catch (err) {
      setError('Erreur lors de la récupération des données.');
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      setCurrentPage(1);
      fetchRecipes();
    } else {
      setError('Veuillez entrer un mot-clé pour rechercher des recettes.');
    }
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.find((fav) => fav.label === recipe.label);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.label !== recipe.label));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const nextPage = () => {
    if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App p-6">
      <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une recette..."
          className="border-2 border-gray-300 rounded p-2 flex-1"
        />
        <select
          className="border-2 border-gray-300 rounded p-2"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="calories">Trier par calories</option>
          <option value="time">Trier par temps de préparation</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Rechercher
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Chargement des recettes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((fav) => fav.label === recipe.label)}
            />
          ))}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="bg-gray-200 p-2 rounded"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <button
          className="bg-gray-200 p-2 rounded"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(recipes.length / recipesPerPage)}
        >
          Suivant
        </button>
      </div>

      {/* Favoris Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recettes favorites</h2>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                toggleFavorite={toggleFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucune recette ajoutée aux favoris.</p>
        )}
      </div>
    </div>
  );
};

export default App;
