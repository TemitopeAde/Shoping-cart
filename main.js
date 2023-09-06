const input = document.getElementById("searchInput");
const result = document.getElementById("results");
const submitBtn = document.getElementById("searchButton");
const pagination = document.getElementById("pagination");

const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
RESULTS_PER_PAGE = 10;
let currentPage = 1;
let currentSearchQuery = ".";


const fetchBooks = async (query, page) => {
  currentSearchQuery = query
  const startIndex = (page - 1) * RESULTS_PER_PAGE
  const url = `${API_BASE_URL}?q=${currentSearchQuery}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}`;
  await fetch(url)
    .then(response => response.json())
    .then(data => displayBooks(data))
    .catch(err => console.log(err, "Error"))
}


const displayBooks = (data) => {
  result.innerHTML = ""
  data.items?.map((book) => {
    const title = book.volumeInfo.title;
    const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown Author";
    const imageUrl = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "no-image.png";


    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book")
    bookContainer.innerHTML = `
      <img src=${imageUrl} alt=${author}>
      <h3>${title}</h3>
      <p>${author}</p>
    `
    result.appendChild(bookContainer);
  });

  const totalItems = data.totalItems;
  const totalPages = totalItems / RESULTS_PER_PAGE;

  displayPagination(totalPages)
}


const displayPagination = (totalPages) => {
  
  for (let page = 1; page <= totalPages; page ++) {
    const button = document.createElement("button");
    button.textContent = page;
    pagination.appendChild(button)

    button.addEventListener("click", () => {
      currentPage = page
      fetchBooks(currentSearchQuery, currentPage)
    })
  }

}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  currentSearchQuery = searchInput.value
  currentPage = 1
  fetchBooks(currentSearchQuery, currentPage)
})


fetchBooks(currentSearchQuery, currentPage)