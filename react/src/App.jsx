import { useState } from "react";
import "./App.css";
import MenuPage from "./components/MenuPage";
import { mainCategories } from "./data/menuCategories";

console.log(mainCategories);

function App() {
  const [activeCategoryId, setActiveCategoryId] = useState(
    mainCategories[0].id,
  );
  const activeCategory = mainCategories.find((c) => c.id === activeCategoryId);

  return (
    <div className="container">
      <div className="overlay">
        <nav className="category-nav" aria-label="Menu categories">
          {mainCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-tab ${cat.id === activeCategoryId ? "active" : ""}`}
              onClick={() => setActiveCategoryId(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {activeCategory && (
          <MenuPage key={activeCategory.id} category={activeCategory} />
        )}
      </div>
    </div>
  );
}

export default App;
