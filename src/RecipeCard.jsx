const RecipeCard = ({ recipe, toggleFavorite, isFavorite }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg border">
        <img className="w-full h-48 object-cover" src={recipe.image} alt={recipe.label} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{recipe.label}</div>
          <p className="text-gray-700 text-base">
            <strong>Calories :</strong> {Math.round(recipe.calories)} kcal
          </p>
          <ul className="text-gray-600 text-sm mt-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
          <button
            onClick={() => toggleFavorite(recipe)}
            className={`mt-2 p-2 rounded ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          >
            {isFavorite ? 'Retirer des Favoris' : 'Ajouter aux Favoris'}
          </button>
        </div>
      </div>
    );
  };
  
  export default RecipeCard;
  