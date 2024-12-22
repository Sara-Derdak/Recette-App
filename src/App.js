import React, { useState } from 'react';
import RecipeCard from './RecipeCard';

const APP_ID = 'a0c38c55';
const APP_KEY = '2aa00c3874bf9593f1edc2c1e0bcaf56';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [sort, setSort] = useState('calories');
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8; // Nombre de recettes par page

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
    <div className="App bg-gray-100 min-h-screen p-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-center py-10 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-extrabold">Trouvez des recettes savoureuses</h1>
        <p className="mt-2 text-lg">Des idées de plats adaptés à vos envies et votre régime !</p>
      </header>

      {/* Formulaire de recherche */}
      <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-md max-w-4xl mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher une recette..."
          className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select
          className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="calories">Trier par calories</option>
          <option value="time">Trier par temps de préparation</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
        >
          Rechercher
        </button>
      </form>

      {/* Message d'erreur */}
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      {/* Affichage de la liste des recettes */}
      {loading ? (
        <p className="text-center text-gray-500">Chargement des recettes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6 ">
        <button
          className="bg-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-400 focus:outline-none "
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <button
          className="bg-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-400 focus:outline-none"
          onClick={nextPage}
          disabled={currentPage === Math.ceil(recipes.length / recipesPerPage)}
        >
          Suivant
        </button>
      </div>
      <footer className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-6 rounded-t-lg shadow-lg mt-5">
        <div className="container mx-auto px-4 text-center">
          {/*  Texte principal  */}
          <h2 className="text-xl font-bold">Recette App</h2>
          <p className="text-sm mt-2">
            Découvrez, cuisinez et partagez vos plats préférés avec le monde entier !
          </p>

          {/*  Liens rapides  */}
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="text-white hover:text-gray-200">À propos</a>
            <a href="#" className="text-white hover:text-gray-200">Recettes populaires</a>
            <a href="#" className="text-white hover:text-gray-200">Contactez-nous</a>
          </div>

          {/*  Droits d'auteur  */}
          <p className="mt-6 text-xs text-gray-200">
            © 2024 Recette App . Tous droits réservés. Crée par  <a href="https://github.com/Sara-Derdak">Sara DERDAK</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
