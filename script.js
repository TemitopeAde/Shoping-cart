const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("results");
const paginationContainer = document.getElementById("pagination");

const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const RESULTS_PER_PAGE = 10;

let currentPage = 1;
let currentSearchQuery = ""; 

function fetchBooks(query, page) {
  // Update the current search query
  currentSearchQuery = query;

  const startIndex = (page - 1) * RESULTS_PER_PAGE;
  const url = `${API_BASE_URL}?q=${query}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBooks(data))
    .catch((error) => console.error("Error fetching data:", error));
}

function displayBooks(data) {
    
    resultsContainer.innerHTML = "";

    data.items.forEach((item) => {
        const title = item.volumeInfo.title;
        const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown Author";
        const imageUrl = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : "no-image.png";

        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <img src="${imageUrl}" alt="${title}">
            <h3>${title}</h3>
            <p>Author(s): ${authors}</p>
            <a href="book-detail.html?id=${item.id}">Details</a>
        `;

        resultsContainer.appendChild(bookElement);
    });

    const totalItems = data.totalItems;
    const totalPages = Math.ceil(totalItems / RESULTS_PER_PAGE);
    displayPagination(totalPages);
}

function displayPagination(totalPages) {
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchBooks(currentSearchQuery, currentPage); // Use the current search query
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let page = 1; page <= totalPages; page++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = page;
    pageButton.addEventListener("click", () => {
      currentPage = page;
      fetchBooks(currentSearchQuery, currentPage); // Use the current search query
    });
    paginationContainer.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchBooks(currentSearchQuery, currentPage); // Use the current search query
    }
  });
  paginationContainer.appendChild(nextButton);
}


searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage = 1;
    fetchBooks(searchInput.value, currentPage);
});

// Initial load
fetchBooks(".", currentPage);
