import React, { useMemo, useState } from "react";

const products = [
  {
    id: 1,
    name: "Everyday tote",
    category: "Accessories",
    price: 28,
    color: "Sand",
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Cloud ceramic mug",
    category: "Home",
    price: 18,
    color: "Warm white",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Weekend bottle",
    category: "Lifestyle",
    price: 32,
    color: "Sage",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Soft-knit throw",
    category: "Home",
    price: 64,
    color: "Oatmeal",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Daily journal",
    category: "Lifestyle",
    price: 16,
    color: "Terracotta",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Sunday candle",
    category: "Home",
    price: 24,
    color: "Cedar & fig",
    badge: "Loved",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Market basket",
    category: "Accessories",
    price: 38,
    color: "Natural",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Little catchall",
    category: "Home",
    price: 22,
    color: "Dusty rose",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=900&q=85",
  },
];

const categories = ["Everything", "Home", "Accessories", "Lifestyle"];
const formatPrice = (price) => `$${price.toFixed(2)}`;

function App() {
  const [category, setCategory] = useState("Everything");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        category === "Everything" || product.category === category;
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.color}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0,
  );

  function addToCart(id) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }

  function changeQuantity(id, amount) {
    setCart((current) => {
      const quantity = (current[id] || 0) + amount;
      if (quantity <= 0) {
        const next = { ...current };
        delete next[id];
        return next;
      }
      return { ...current, [id]: quantity };
    });
  }

  return (
    <div className="app-shell">
      <div className="announcement">
        A little something extra: free shipping on orders over $50
      </div>

      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Good Things home">
          good things<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#shop">Shop all</a>
          <a href="#story">Our story</a>
          <a href="#newsletter">Journal</a>
        </nav>
        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
          aria-label={`Open shopping bag, ${cartCount} items`}
        >
          <svg className="bag-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 8h14l1 13H4L5 8Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span>Bag</span>
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">A slower kind of shopping</p>
            <h1>Good things<br />for <em>every day.</em></h1>
            <p className="hero-description">
              Thoughtful little finds that make the everyday feel a bit more
              special. Made to be used, loved, and lived with.
            </p>
            <a className="primary-button" href="#shop">
              Find your good thing <span aria-hidden="true">↗</span>
            </a>
            <div className="hero-note">
              <span className="note-star">✳</span>
              Small joys, thoughtfully chosen
            </div>
          </div>
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=90"
              alt="A warm, sunlit independent shop"
            />
            <div className="hero-sticker">A little<br />more lovely</div>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The good stuff</p>
              <h2>Find your new <em>favorite.</em></h2>
            </div>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Looking for something?"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search products"
              />
            </label>
          </div>

          <div className="shop-controls">
            <div className="category-tabs" aria-label="Filter by category">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "category-tab active" : "category-tab"}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="product-count">{visibleProducts.length} lovely things</span>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <button
                      className="quick-add"
                      onClick={() => addToCart(product.id)}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      +
                    </button>
                  </div>
                  <div className="product-info">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.color}</p>
                    </div>
                    <span className="product-price">{formatPrice(product.price)}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span>✳</span>
              <p>No little finds just yet. Try another search.</p>
            </div>
          )}
        </section>

        <section className="story-section" id="story">
          <span className="story-flower" aria-hidden="true">✳</span>
          <p className="eyebrow">A note from us</p>
          <h2>Less, but a little<br /><em>more meaningful.</em></h2>
          <p>
            We believe the things you keep close should make you feel something.
            So we look for useful, lovely, well-made pieces that bring a little
            brightness to the ordinary.
          </p>
          <a href="#shop" className="text-link">A bit about us <span>↗</span></a>
        </section>

        <section className="newsletter" id="newsletter">
          <div>
            <p className="eyebrow">Notes from the good side</p>
            <h2>A little joy in<br />your inbox.</h2>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              event.currentTarget.reset();
              window.alert("You're on the list. Talk soon!");
            }}
          >
            <label className="sr-only" htmlFor="email">Your email address</label>
            <input id="email" type="email" placeholder="Your email address" required />
            <button type="submit" aria-label="Subscribe">Join us <span>↗</span></button>
            <p>Good notes only. Unsubscribe whenever.</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark" href="#">good things<span>.</span></a>
        <p>Made for the little moments. © 2025 Good Things</p>
        <a href="#shop">Back to the good stuff ↑</a>
      </footer>

      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <p className="eyebrow">Your good finds</p>
                <h2 id="cart-title">Your bag <span>({cartCount})</span></h2>
              </div>
              <button
                className="close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
              >
                ×
              </button>
            </div>
            {cartItems.length ? (
              <>
                <div className="cart-items">
                  {cartItems.map((product) => (
                    <div className="cart-item" key={product.id}>
                      <img src={product.image} alt="" />
                      <div className="cart-item-details">
                        <h3>{product.name}</h3>
                        <p>{formatPrice(product.price)}</p>
                        <div className="quantity-control">
                          <button onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}>−</button>
                          <span>{cart[product.id]}</span>
                          <button onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}>+</button>
                        </div>
                      </div>
                      <strong>{formatPrice(product.price * cart[product.id])}</strong>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="subtotal"><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div>
                  <p>Shipping is calculated at checkout.</p>
                  <button
                    className="checkout-button"
                    onClick={() => window.alert("Thanks! Checkout is a demo for now.")}
                  >
                    Continue to checkout <span>↗</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span>♡</span>
                <p>Your bag is taking a little breather.</p>
                <button onClick={() => setCartOpen(false)}>Keep browsing</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
