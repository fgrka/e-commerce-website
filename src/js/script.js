const productsData =  [{
    "id": "01",
    "name": "Alokazja Mini",
    "price": "239.90",
    "img": "./src/img/product01.jpg"
},

{
    "id": "02",
    "name": "Aglaonema Variegata",
    "price": "18.90",
    "img": "./src/img/product02.jpg"
},

{
    "id": "03",
    "name": "Epipremnum",
    "price": "102.90",
    "img": "./src/img/product03.jpg"
},

{
    "id": "04",
    "name": "Filodendron",
    "price": "58.90",
    "img": "./src/img/product04.jpg"
},

{
    "id": "05",
    "name": "Aglaonema Snow White",
    "price": "25.90",
    "img": "./src/img/product05.jpg"
},

{
    "id": "06",
    "name": "Alokazja XXL",
    "price": "32.90",
    "img": "./src/img/product06.jpg"
},

{
    "id": "07",
    "name": "Calathea",
    "price": "239.90",
    "img": "./src/img/product01.jpg"
},

{
    "id": "08",
    "name": "Hoya Globulosa",
    "price": "18.90",
    "img": "./src/img/product02.jpg"
},

{
    "id": "09",
    "name": "Scindapsus Moonlight",
    "price": "102.90",
    "img": "./src/img/product03.jpg"
},

{
    "id": "10",
    "name": "Hoya Carnosa Ghost",
    "price": "58.90",
    "img": "./src/img/product04.jpg"
},

{
    "id": "11",
    "name": "Hoya Kalimantan",
    "price": "25.90",
    "img": "./src/img/product05.jpg"
},

{
    "id": "12",
    "name": "Araucaria",
    "price": "32.90",
    "img": "./src/img/product06.jpg"
}
];

// load products from JSON file - option:

// fetch('./src/data/products.json')
// .then((res)=> res.json())
// .then((productsData) => {
//     init(productsData);
// });


function init() { 
    showProducts(productsData);
    setCardAddBtns();
    setCardQuantityBtns();
    toggleCartPreview(); 
    showCartPreview();
    searchProduct();
};



//show available products' cards

function showProducts(productsData) {
    return (productsData
        .map((product) => { 
        const productsContainer = document.querySelector(".products-inner");
        productsContainer.innerHTML +=
        `<div class="product-card" id="product-card-${product.name}">  
            <img id="${product.name}" src="${product.img}" alt="produkt">
            <div class="product-card-info">
                <p class="product-name">
                    ${product.name}
                </p>
                <p class="product-price">
                    ${product.price} zł
                </p>                
                <div class="btn-quantity">
                    <button id=${product.id} class="btn-add-to-cart">DO KOSZYKA</button>
                    <button class="btn-decrement"> -
                    </button>
                    <div class="txt-quantity">0</div>
                    <button id=${product.id} class="btn-increment"> +
                    </button>
                <div class="btn-quantity">
         </div>
        </div>`;
        })
)};
 /* id="product-card${product.id}" */
//display added products within the cart preview   
function showCartPreview() {
    const cartPreviewContainer = document.querySelector(".cart-preview-products-container");
    cartPreviewContainer.innerHTML = "";
    for (const [id, product] of cart.cartItems) {
        cartPreviewContainer.innerHTML += 
        `<div class="cart-preview-product">
            <div class="cart-preview-product-name">
                    ${product.name}
            </div>
            <div class="cart-preview-product-price">
                    ${product.price}
            </div>
            <div class="cart-preview-buttons">
                <button id=${id} class="cart-preview-btn-minus">-</button>
                <div class="cart-preview-product-quantity">
                    ${product.quantity}
                </div>
                <button id=${id} class="cart-preview-btn-plus">+</button>
            </div>
        </div>`
    }
    setCartPreviewQuantityBtns();
}


function searchProduct() {
    const searchbar = document.querySelector(".header-searchbar");
    const searchBtn = document.querySelector(".header-search-link");
    const searchSuggestionBox = document.querySelector(".header-searchbar-suggestion");
    let productNames = [];
    productsData.map(product => {
        productNames.push((product.name));
    })

    searchbar.addEventListener("input", () => {
        let inputValue = searchbar.value;
        let searchWord = inputValue.toLowerCase();
        searchSuggestionBox.innerHTML="";

        productNames.some(name => {
            if (inputValue.length >= 2 && name.toLowerCase().includes(searchWord)) {
                let item = document.createElement("a");
                item.classList.add("header-searchbar-suggestion-item");
                item.innerHTML = name;

                searchSuggestionBox.classList.add("suggestion-visible");
                searchSuggestionBox.appendChild(item);
                item.addEventListener("click", () => {
                    item.href = `#${name}`;
                    let chosenItem = document.getElementById(`product-card-${name}`);
                    chosenItem.style.border = "2px solid red";
                    setTimeout(() => {
                        chosenItem.style.border = "none"; 
                    }, 1500);
                });
            }
            if (searchSuggestionBox.innerHTML === "") {
              searchSuggestionBox.classList.remove("suggestion-visible");
            }
        });
    });

    searchBtn.addEventListener("click", () => {
        let inputValue = searchbar.value;
        let searchWord = inputValue.toLowerCase();

        productNames.map(name => {
            if (name.toLowerCase() === (searchWord)){
                searchBtn.href = `#${name}`;
                let chosenItem = document.getElementById(`product-card-${name}`);
                chosenItem.style.border = "2px solid red";
                setTimeout(() => {
                    chosenItem.style.border = "none"; 
                }, 1500);
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (!searchSuggestionBox.contains(e.target) && !searchbar.contains(e.target)) {
            searchSuggestionBox.classList.remove("suggestion-visible");
        }
    })
}


//set visibility of cart preview
function toggleCartPreview() {
    const cartPreviewBtn = document.querySelector(".a-header-cart");
    const cartPreview = document.querySelector(".cart-preview");
    cartPreviewBtn.addEventListener("click", () => {
        if (cart.cartItems.size == 0) {
            cartPreview.classList.remove("visible");
        }
        else  {     
            cartPreview.classList.toggle("visible");
        }     
    });
    document.addEventListener("click", (e) => {
        if (!cartPreviewBtn.contains(e.target) && !cartPreview.contains(e.target)) {
            cartPreview.classList.remove("visible");
        }
    })
}

    
class Cart {
    constructor() {
        this.cartItems = new Map();
        this.restoreCartItems();
    }

    //update cartItems map from local storage data if it exists
    restoreCartItems() {
        if (localStorage.length !== 0) {
            this.cartItems = new Map(Object.entries(JSON.parse(localStorage.getItem("data"))));
        }
    };

    // add product both to Map and local storage
    addItem(id, quantity, name, price) {
        if (this.cartItems.has(id)) {
            let currentQuantity = this.cartItems.get(id).quantity;
            quantity += currentQuantity;
        }
        this.cartItems.set(id, {quantity: quantity, name: name, price: price})
        localStorage.setItem("data", JSON.stringify(Object.fromEntries(this.cartItems)));
    };

    updateItemQuantity(id, quantity) {
        if(this.cartItems.has(id)) {
            this.cartItems.get(id).quantity = quantity;
            localStorage.setItem("data", JSON.stringify(Object.fromEntries(this.cartItems)));
        }
    }

    deleteItem(id) {
        this.cartItems.delete(id);
        localStorage.setItem("data", JSON.stringify(Object.fromEntries(this.cartItems)));
    }

    //sum products quantities
    sumItems() {
        let sum = 0; 
        if (this.cartItems.size !== 0) {
            let arr = Array.from(this.cartItems, x => {return x[1].quantity});
            sum = arr.reduce((x1, x2) => {return x1+x2});
        }
        return sum;
    }

    sumPrices() {
        let sum = 0;
        for (const [id, product] of this.cartItems) {
            let price = parseFloat((product.price).slice(0, -3));
            let quantity = parseInt(product.quantity);
            sum += price * quantity; 
        }
        return sum.toFixed(2);
    }

}

let cart = new Cart();

const cartCounter = document.querySelector(".a-header-cart-count");
function updateCounter() {
    cartCounter.innerHTML = cart.sumItems();
}
updateCounter();

// set add-to-cart buttons for each product card
function setCardAddBtns() {
    let btnAdd = document.querySelectorAll(".btn-add-to-cart");
    btnAdd.forEach((b) =>
        b.addEventListener("click", () => {
            let quantity = parseInt(b.parentElement.querySelector(".txt-quantity").innerHTML);
            let btnContainer = b.closest("div");
            let name = btnContainer.parentElement.querySelector(".product-name").innerHTML.trim();
            let price = btnContainer.parentElement.querySelector(".product-price").innerHTML.trim();
            let id = b.id; //product id is equal to button id

            if (!cart) cart = new Cart();
            
            if (quantity !== 0) {
            //reset product quantity within a card to 0 after product quantity has been added to local storage
            const add = new Promise((resolve) => {
                resolve(cart.addItem(id, quantity, name, price));
            })
            add.then(() => {
                b.parentElement.querySelector(".txt-quantity").innerHTML = 0
            }); 

            //reload displayed info of added products
            showCartPreview(); 
            // setCartPreviewQuantityBtns();
            updateCounter();
        }
    }));
};

//set buttons incrementing/decrementing for each product card
function setCardQuantityBtns() {
    const btnsIncrement = document.querySelectorAll(".btn-increment");
    const btnsDecrement = document.querySelectorAll(".btn-decrement");
    const quantityContainer = ".txt-quantity";
    setQuantityButtons(btnsIncrement, btnsDecrement, quantityContainer)
}

//set buttons incrementing/decrementing for cart preview
function setCartPreviewQuantityBtns() {
    const btnsIncrement = document.querySelectorAll(".cart-preview-btn-plus");
    const btnsDecrement = document.querySelectorAll(".cart-preview-btn-minus");
    const quantityContainer = ".cart-preview-product-quantity";
    let isValueUpdate = true;
    setQuantityButtons(btnsIncrement, btnsDecrement, quantityContainer, isValueUpdate)
}

function setQuantityButtons(btnsIncrement, btnsDecrement, quantityContainer, isValueUpdate) {
    btnsIncrement.forEach((b) => {
        b.addEventListener("click", () => {
            let quantity = parseInt(b.parentElement.querySelector(quantityContainer).innerHTML);
            let id = b.id;
            if (quantity < 100) {
                quantity += 1;
                b.parentElement.querySelector(quantityContainer).innerHTML= quantity; 
                if (isValueUpdate) {
                    updateCounter();
                    cart.updateItemQuantity(id, quantity); 
                }
            }

        })
    })
    btnsDecrement.forEach((b) => {
        b.addEventListener("click", () => {
            let quantity = parseInt(b.parentElement.querySelector(quantityContainer).innerHTML);
            let id = b.id;
            if (quantity > 0) { 
                quantity -= 1;
                b.parentElement.querySelector(quantityContainer).innerHTML= quantity;
                if (isValueUpdate) {
                    updateCounter();
                    cart.updateItemQuantity(id, quantity); 
                }
            }

            else {
                cart.deleteItem(id);
                showCartPreview();
                updateCounter();
            }
        })
    })
}

init();
