
const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition">
      <img className="w-full h-48 object-cover rounded-lg" src={recipe.image} alt={recipe.label} />
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-dark">{recipe.label}</h3>
        <ul className="mt-2 space-y-2 text-gray-600">
          {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
            <li key={index} className="text-sm">{ingredient.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCard;
