import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ITEMS_PER_PAGE } from "../data/menuCategories";

function groupBySubcat(items) {
  const sections = [];
  for (const item of items) {
    const subcat = item.subcat ?? null;
    const last = sections[sections.length - 1];
    if (last && last.subcat === subcat) {
      last.items.push(item);
    } else {
      sections.push({ subcat, items: [item] });
    }
  }

  let offset = 0;
  return sections.map((section) => {
    const withOffset = { ...section, itemOffset: offset };
    offset += section.items.length;
    return withOffset;
  });
}

function MenuPage({ category }) {
  const [page, setPage] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const totalPages = Math.max(
    1,
    Math.ceil(category.items.length / ITEMS_PER_PAGE),
  );
  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = category.items.slice(start, start + ITEMS_PER_PAGE);
  const sections = groupBySubcat(pageItems);

  useEffect(() => {
    setPage(1);
    setAnimKey((k) => k + 1);
  }, [category.id]);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [page]);

  const goToPage = (next) => {
    setPage((p) => Math.min(totalPages, Math.max(1, p + next)));
  };

  return (
    <section className="menu-page" aria-labelledby={`category-${category.id}`}>
      <Header />

      <div className="menu-page-body">
        <div className="category-heading">
          <h2 id={`category-${category.id}`} className="category-title">
            {category.name}
          </h2>
          <p className="category-desc">{category.description}</p>
        </div>

        <div className="menu-sections" key={`${category.id}-${animKey}`}>
          {sections.map((section) => (
              <div
                className="menu-section"
                key={`${section.subcat ?? "default"}-${start + section.itemOffset}`}
              >
                {section.subcat && (
                  <h3 className="subcategory-title">{section.subcat}</h3>
                )}
                <div className="menu-grid">
                  {section.items.map((item, index) => {
                    const globalIndex = start + section.itemOffset + index;
                    return (
                      <article
                        className="card card-enter"
                        key={`${item.name}-${globalIndex}`}
                        style={{
                          animationDelay: `${(section.itemOffset + index) * 0.07}s`,
                        }}
                      >
                        <img src={item.image} alt={item.name} loading="lazy" />
                        <div className="card-body">
                          <h3>{item.name}</h3>
                          {item.desc ? (
                            <p className="card-desc">{item.desc}</p>
                          ) : null}
                          <p className="card-price">{item.price}</p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
          ))}
        </div>

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Menu pagination">
            <button
              type="button"
              className="page-btn"
              onClick={() => goToPage(-1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="page-indicator">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              className="page-btn page-btn-next"
              onClick={() => goToPage(1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </nav>
        )}
      </div>

      <Footer />
    </section>
  );
}

export default MenuPage;
