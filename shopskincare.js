//* ===== Navigation System ===== */

document.addEventListener("DOMContentLoaded", function () {

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");

/* ================= MOBILE MENU ================= */

if (hamburger) {
hamburger.addEventListener("click", () => {
hamburger.classList.toggle("active");
navLinks.classList.toggle("active");
});
}

/* ================= SCROLL EFFECT ================= */

window.addEventListener("scroll", () => {
if (window.scrollY > 50) {
navbar.classList.add("active");
} else {
navbar.classList.remove("active");
}
});

/* ================= ACTIVE PAGE HIGHLIGHT ================= */

const currentPage = document.body.getAttribute("data-page");

document.querySelectorAll(".nav-links a").forEach(link => {
const linkPage = link.getAttribute("data-link");

if (linkPage === currentPage) {
link.classList.add("active");
}
});

});



   /* ================= SLIDER ================= */

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');

let unAcceppClick;

const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = listHTML.querySelectorAll('.item');

    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 1200);
};

nextButton.onclick = function(){
    showSlider('next');
};

prevButton.onclick = function(){
    showSlider('prev');
};


/* ================= AUTO SCROLL ================= */

let autoScroll = setInterval(() => {
    showSlider('next');
}, 3500);


/* ================= PRODUCTS SYSTEM ================= */

const productsGrid = document.getElementById("productsGrid");
const clearBtn = document.getElementById("clearFilters");
const productCount = document.getElementById("productCount");

const cartCountEl = document.getElementById("cartCount");

let cartCount = 0;
let products = [];


/* ================= RENDER PRODUCTS ================= */

function renderProducts(productArray){

productsGrid.innerHTML = "";

productArray.forEach(product => {

const card = document.createElement("div");
card.classList.add("product-card");

card.innerHTML = `
<img src="${product.image_url}" alt="${product.product_name}">
<h4>${product.product_name}</h4>
<p>₹${product.price}</p>
<button class="addCartBtn">Add to Cart</button>
`;

card.addEventListener("click",()=>{
openProduct(product);
});

card.querySelector(".addCartBtn").addEventListener("click",(e)=>{
e.stopPropagation();
cartCount++;
cartCountEl.textContent = cartCount;
});

productsGrid.appendChild(card);

});

productCount.textContent = productArray.length + " Products";

}

/* ================= PRODUCT QUANTITY ================= */

let qty = 1;
let currentProduct = null;

function initProductControls(){

const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const qtyEl = document.getElementById("qtyValue");

if(!plusBtn || !minusBtn || !qtyEl) return;

/* PLUS BUTTON */
plusBtn.onclick = () => {
qty++;
qtyEl.innerText = qty;
};

/* MINUS BUTTON */
minusBtn.onclick = () => {
if(qty > 1){
qty--;
qtyEl.innerText = qty;
}
};

}


/* ================= ADD TO CART ================= */

function initAddToCart(){

const addCartBtn = document.getElementById("addCartBtn");
const cartCounter = document.getElementById("cartCount");
const toast = document.getElementById("toastCart");

if(!addCartBtn) return;

addCartBtn.onclick = () => {

if(!currentProduct) return;

/* UPDATE CART COUNT */

cartCount += qty;

if(cartCounter){
cartCounter.innerText = cartCount;
}

/* PRODUCT DATA */

const productData = {
name: document.getElementById("detailName").innerText,
price: document.getElementById("detailPrice").innerText,
quantity: qty
};

console.log("Added to Cart:", productData);

/* TOAST NOTIFICATION */

if(toast){
toast.style.opacity = "1";
toast.style.bottom = "40px";

setTimeout(()=>{
toast.style.opacity = "0";
},2000);
}

};

}


/* ================= UPDATE PRODUCT OPEN FUNCTION ================= */

function openProduct(product){

document.querySelector(".shop-container").style.display="none";
document.getElementById("productDetailPage").style.display="block";

document.getElementById("detailImage").src = product.image_url;
document.getElementById("detailName").innerText = product.product_name;
document.getElementById("detailPrice").innerText = "₹"+product.price;

currentProduct = product;

/* RESET QUANTITY */

qty = 1;
document.getElementById("qtyValue").innerText = qty;

/* INITIALIZE BUTTONS */

initProductControls();
initAddToCart();

}







/* ================= NOTIFICATION ================= */

function showNotification(message){

const notification = document.createElement("div");

notification.innerText = message;

notification.style.position = "fixed";
notification.style.bottom = "30px";
notification.style.right = "30px";
notification.style.background = "black";
notification.style.color = "white";
notification.style.padding = "12px 18px";
notification.style.borderRadius = "6px";
notification.style.fontSize = "14px";
notification.style.zIndex = "9999";

document.body.appendChild(notification);

setTimeout(()=>{

notification.remove();

},2500);

}

/* ================= BACK BUTTON ================= */

document.getElementById("backBtn").onclick = () => {

document.querySelector(".shop-container").style.display="flex";
document.getElementById("productDetailPage").style.display="none";

};


/* ================= FILTER FUNCTION ================= */

function applyFilters(){

const selectedConditions = [...document.querySelectorAll(".condition:checked")]
.map(el => el.value);

let filteredProducts = products;

if(selectedConditions.length > 0){

filteredProducts = products.filter(product =>
selectedConditions.includes(product.condition)
);

}

renderProducts(filteredProducts);

}


/* ================= FILTER EVENTS ================= */

document.querySelectorAll(".condition").forEach(filter=>{
filter.addEventListener("change",applyFilters);
});

clearBtn.addEventListener("click",()=>{

document.querySelectorAll(".condition").forEach(c=>c.checked=false);
renderProducts(products);

});


/* ================= LOAD PRODUCTS JSON ================= */

fetch("products.json")
.then(res=>res.json())
.then(data=>{

products = data;
renderProducts(products);

});


/* ================= SEARCH ================= */

const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");

searchIcon.addEventListener("click",()=>{

searchInput.classList.toggle("active");
searchInput.focus();

});


searchInput.addEventListener("keyup",()=>{

const searchValue = searchInput.value.toLowerCase();

const filtered = products.filter(product =>
product.product_name.toLowerCase().includes(searchValue)
);

renderProducts(filtered);

});

/* ================= ENHANCED SEARCH FUNCTIONALITY ===== */

const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');

if (searchInput) {
    // Show/hide clear button based on input
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            clearSearchBtn.style.display = 'flex';
        } else {
            clearSearchBtn.style.display = 'none';
        }
    });

    // Clear search on button click
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchBtn.style.display = 'none';
        searchInput.focus();
        // Trigger search to show all products
        searchInput.dispatchEvent(new Event('input'));
    });

    // Add focus animation
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.borderColor = '#ff6b00';
    });

    searchInput.addEventListener('blur', () => {
        if (searchInput.value.length === 0) {
            searchInput.parentElement.style.borderColor = '#e0e0e0';
        }
    });
}

/* ================= WISHLIST & CART ANIMATIONS ===== */

const wishlistIcon = document.querySelector('.wishlist-wrapper');
const cartIcon = document.querySelector('.cart-wrapper');

if (wishlistIcon) {
    wishlistIcon.addEventListener('click', () => {
        wishlistIcon.classList.add('active');
        setTimeout(() => wishlistIcon.classList.remove('active'), 600);
    });
}

if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        cartIcon.classList.add('active');
        setTimeout(() => cartIcon.classList.remove('active'), 600);
    });
}

/* ================= MOBILE FILTER TOGGLE ===== */

const filterToggleMobile = document.getElementById('filterToggleMobile');
const filtersAside = document.querySelector('.filters');

if (filterToggleMobile && filtersAside) {
    filterToggleMobile.addEventListener('click', () => {
        filtersAside.classList.toggle('mobile-open');
        filterToggleMobile.classList.toggle('active');
    });
}


/* ================= SUBSCRIBE BUTTON ================= */

const subscribeBtn = document.querySelector(".subscribe-box button");

if(subscribeBtn){
subscribeBtn.addEventListener("click",()=>{
subscribeBtn.innerText = "Subscribed ✓";
subscribeBtn.style.background = "#28a745";
});
}

