const container = document.getElementById("products");
const sortForm = document.getElementById("sort");
const limitForm = document.getElementById("limit");


// console.log(addCart);

let currentSortValue = "asc";
let currentLimitValue = 10;
cart = [];
let total = 0;
let products = [];

const fetchProduct = async (limit, sort) => {
  const url = `https://fakestoreapi.com/products?sort=${sort}&limit=${limit}`

  await fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      products.push(data)
      console.log(products, "pro");
      displayProducts(data)
    })
    .catch(err => console.log(err))
};

sortForm.addEventListener("change", (e) => {
  e.preventDefault();
  const val = e.target.value
  currentSortValue = val
  console.log(currentSortValue);
  fetchProduct(currentSortValue, currentLimitValue)
})


limitForm.addEventListener("click", (e) => {
  e.preventDefault();
  const val = e.target.value;
  currentLimitValue = val

  fetchProduct(currentLimitValue, currentSortValue)
})


const displayProducts = async (product) => {
  // console.log(product);
  container.innerHTML = ""
  product.map((product) => {
    const name = product?.title
    const image = product?.image
    const price = product?.price

    const productContainer = document.createElement("div");
    productContainer.classList.add("wrap")
    productContainer.innerHTML = `
      <h3>${name}</h3>
      <img src=${image} alt=${name}>
      <p>$${price}</p>
      <button class=cart>Add to Cart</button>
    `
    container.appendChild(productContainer)
  })

  const cartBtn = document.querySelectorAll(".cart")
  cartBtn.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      const product = products[1];
      console.log(product);
    })
  })
}


const addToCart = () => {
  const addCart = document.querySelector(".cart")
  console.log(addCart);
}



// addToCart()
fetchProduct(currentLimitValue, currentSortValue);