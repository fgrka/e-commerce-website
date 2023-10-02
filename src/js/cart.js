import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

function init() {
    showCart();
    setQuantityButtons();
    login(); 
};

class Cart {
    constructor() {
        this.cartItems = new Map();
        this.restoreCartItems();
    }

    restoreCartItems() {
        if (localStorage.length !== 0) {
            this.cartItems = new Map(Object.entries(JSON.parse(localStorage.getItem("data"))));
        }
    };

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

    sumItems() {
        let sum = 0; 
        if (this.cartItems.size !== 0) {
            let arr = Array.from(this.cartItems, x => {return x[1].quantity});
            sum = arr.reduce((x1, x2) => {return x1+x2});
        }
        return sum;
    }
    
    deleteItem(id) {
        this.cartItems.delete(id);
        localStorage.setItem("data", JSON.stringify(Object.fromEntries(this.cartItems)));
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

function showCart() {
    const cartTitle = document.querySelector(".cart-title");
    const cartContainer = document.querySelector(".cart-products-container");
    cartContainer.innerHTML = "";

    for (const [id, product] of cart.cartItems) {
        cartContainer.innerHTML += 
        `<div class="cart-product">
            <div class="cart-product-img">
                  <image class="cart-img" src="./src//img/product${id}.jpg">
            </div>
            <div class="cart-txt">
                <div class="cart-product-name">
                        ${product.name}
                </div>
                <div class="cart-product-price">
                        ${product.price}
                </div>
            </div>
            <div class="cart-buttons">
                <button id=${id} class="cart-btn-minus">-</button>
                <div class="cart-product-quantity">
                    ${product.quantity}
                </div>
                <button id=${id} class="cart-btn-plus">+</button>
            </div>
        </div>`
    }

    if (cart.sumPrices() != 0.00) {
        cartTitle.innerHTML = `<h3>TWOJE ZAMÓWIENIE</h3>`;
        showSummary();
    }
    else {
        cartTitle.innerHTML = `<h2>TWÓJ KOSZYK AKTUALNIE JEST PUSTY ...</h2>`;
        cartTitle.style.borderBottom = "none";
        cartContainer.innerHTML = `<img class="empty-cart-img" src="./src/img/sadcart.png">
                                    <a class="empty-cart-a-return" href="/index.html" >WRÓĆ DO SKLEPU</a>`;
        const cartSummary = document.querySelector(".cart-summary");
        cartSummary.innerHTML= " ";
    }
}

function showSummary() {
    const cartSummary = document.querySelector(".cart-summary");
    if (cart.cartItems.size !== 0) {
        cartSummary.innerHTML = `<div class="cart-summary-price"> 
                                    <p> Całkowity koszt: ${cart.sumPrices()} zł </p>
                                    <button class="cart-login">ZALOGUJ SIĘ <br> I ZAMÓW</button>
                                </div>` 
    showLoginForm();
    }
}

//set buttons incrementing/decrementing for cart, update local storage
function setQuantityButtons() {

    const btnsIncrement = document.querySelectorAll(".cart-btn-plus");
    const btnsDecrement = document.querySelectorAll(".cart-btn-minus");
    const quantityContainer = ".cart-product-quantity";
    btnsIncrement.forEach((b) => {
        b.addEventListener("click", () => {
            let quantity = parseInt(b.parentElement.querySelector(quantityContainer).innerHTML);
            let id = b.id;
            if (quantity < 100) {
                quantity += 1;
                b.parentElement.querySelector(quantityContainer).innerHTML= quantity; 
                    cart.updateItemQuantity(id, quantity); 
                    if (cart.sumPrices()) {
                        showSummary();
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
                cart.updateItemQuantity(id, quantity); 
                if (cart.sumPrices()) {
                    showSummary();
                }
            }
            else {
                cart.deleteItem(id);
                showCart();
                setQuantityButtons(); 
            }
        })
    })
}

function showLoginForm() {
    const showFormBtn = document.querySelector(".cart-login");
    const loginForm = document.querySelector(".login-container");
    const loginExitBtn = document.querySelector(".login-btn-exit");

    showFormBtn.addEventListener("click", () => {
        loginForm.classList.add("form-visible");
    })

    loginExitBtn.addEventListener("click", () => {
        loginForm.classList.remove("form-visible");
    })
}

function login() {
    const firebaseConfig = {
        apiKey: "AIzaSyCvQY6rlI9qpl4YWtXfMza_grzItHogyTk",
        authDomain: "user-login-e2cd5.firebaseapp.com",
        projectId: "user-login-e2cd5",
        storageBucket: "user-login-e2cd5.appspot.com",
        messagingSenderId: "995634856676",
        appId: "1:995634856676:web:6b53f7f4f2c1fe87af22f1",
        measurementId: "G-HZFKLFNH37"
      };
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    // email: example@example.com 
    // password: pasword123
    
    const signIn = () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user);
                loggedIn();
            })
            .catch((error) => {
                loginErrorAlert();
                console.log(error.code);
                console.log(error.message);
            })
    }    
    const signInBtn = document.querySelector(".login-btn-sign")
    signInBtn.addEventListener("click", signIn);
}

function loggedIn() {
    const loginForm = document.querySelector(".login-form");
    loginForm.innerHTML = `<div class="login-logged"><h3>Użytkownik zalogowany!</h3></div>`
}

function loginErrorAlert() {
    console.log("alert")
    const loginError = document.querySelector(".login-error");
    // loginError.style.display = "block";
    loginError.classList.add("login-error-visible");
    setTimeout(() => {
        // loginError.style.display = "none";
        loginError.classList.remove("login-error-visible")
    }, 1500)

}

init();