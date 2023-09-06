document.addEventListener("DOMContentLoaded", function () {
  // Sample product data
  const products = [
    { id: 1, name: 'Product A', category: 'Electronics' },
    { id: 2, name: 'Product B', category: 'Clothing' },
    { id: 3, name: 'Product C', category: 'Electronics' },
    { id: 4, name: 'Product D', category: 'Books' },
    // Add more products here
  ];

  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const productsContainer = document.getElementById("products");

  // Function to display filtered products
  function displayProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category;

      return (
        productName.includes(searchTerm) &&
        (selectedCategory === "" || productCategory === selectedCategory)
      );
    });

    // Clear previous results
    productsContainer.innerHTML = "";

    // Display filtered products
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = "<p>No products found.</p>";
    } else {
      filteredProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>Category: ${product.category}</p>
                `;
        productsContainer.appendChild(productElement);
      });
    }
  }

  // Event listeners
  searchInput.addEventListener("input", displayProducts);
  categoryFilter.addEventListener("change", displayProducts);

  // Initial display
  displayProducts();
});
