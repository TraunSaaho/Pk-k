/* ===== Navigation System ===== */

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


/* ================= SLIDER End  ================= */


/* ================= thride streds   ================= */


// ===============================
// SELECT ELEMENTS
// ===============================

const productsGrid = document.getElementById("productsGrid");
const filters = document.querySelectorAll(".filter");
const clearBtn = document.getElementById("clearFilters");
const productCount = document.getElementById("productCount");

const cartCountEl = document.getElementById("cartCount");

let cartCount = 0;


// ===============================
// 40 PRODUCTS DATA
// ===============================

let products = [
{ id:1, name:"Cevar Cleanser", skin:"oily", type:"cleanser", price:499, image:"40 Products/Cevar-cleanser.webp" },
{ id:2, name:"Oil Control Cleanser", skin:"oily", type:"cleanser", price:399, image:"40 Products/Oil Control Cleanser id -2.webp" },
{ id:3, name:"Gentle Foam Cleanser", skin:"sensitive", type:"cleanser", price:650, image:"40 Products/Cetaphil-Gentle-Foaming-Cleanser-id -3.webp" },
{ id:4, name:"Deep Pore Cleanser", skin:"combination", type:"cleanser", price:899, image:"https://picsum.photos/300?4" },
{ id:5, name:"Vitamin C Serum", skin:"dry", type:"serum", price:1299, image:"https://picsum.photos/300?5" },
{ id:6, name:"Niacinamide Serum", skin:"oily", type:"serum", price:799, image:"https://picsum.photos/300?6" },
{ id:7, name:"Brightening Serum", skin:"combination", type:"serum", price:999, image:"https://picsum.photos/300?7" },
{ id:8, name:"Calming Serum", skin:"sensitive", type:"serum", price:1100, image:"https://picsum.photos/300?8" },
{ id:9, name:"Ultra Moisturizer", skin:"dry", type:"moisturizer", price:899, image:"https://picsum.photos/300?9" },
{ id:10, name:"Matte Moisturizer", skin:"oily", type:"moisturizer", price:699, image:"https://picsum.photos/300?10" },
{ id:11, name:"Repair Moisturizer", skin:"sensitive", type:"moisturizer", price:1200, image:"https://picsum.photos/300?11" },
{ id:12, name:"Glow Moisturizer", skin:"combination", type:"moisturizer", price:1000, image:"https://picsum.photos/300?12" },
{ id:13, name:"Hydra Clean Gel", skin:"dry", type:"cleanser", price:450, image:"https://picsum.photos/300?13" },
{ id:14, name:"Fresh Face Wash", skin:"oily", type:"cleanser", price:550, image:"https://picsum.photos/300?14" },
{ id:15, name:"Mild Skin Cleanser", skin:"sensitive", type:"cleanser", price:480, image:"https://picsum.photos/300?15" },
{ id:16, name:"Charcoal Cleanser", skin:"combination", type:"cleanser", price:720, image:"https://picsum.photos/300?16" },
{ id:17, name:"Radiance Serum", skin:"dry", type:"serum", price:1499, image:"https://picsum.photos/300?17" },
{ id:18, name:"Acne Control Serum", skin:"oily", type:"serum", price:950, image:"https://picsum.photos/300?18" },
{ id:19, name:"Hydra Boost Serum", skin:"combination", type:"serum", price:1050, image:"https://picsum.photos/300?19" },
{ id:20, name:"Barrier Repair Serum", skin:"sensitive", type:"serum", price:1300, image:"https://picsum.photos/300?20" },
{ id:21, name:"Daily Moist Cream", skin:"dry", type:"moisturizer", price:750, image:"https://picsum.photos/300?21" },
{ id:22, name:"Oil Free Cream", skin:"oily", type:"moisturizer", price:650, image:"https://picsum.photos/300?22" },
{ id:23, name:"Sensitive Care Cream", skin:"sensitive", type:"moisturizer", price:850, image:"https://picsum.photos/300?23" },
{ id:24, name:"Hydra Soft Cream", skin:"combination", type:"moisturizer", price:900, image:"https://picsum.photos/300?24" },
{ id:25, name:"Aloe Cleanser", skin:"dry", type:"cleanser", price:499, image:"https://picsum.photos/300?25" },
{ id:26, name:"Tea Tree Wash", skin:"oily", type:"cleanser", price:399, image:"https://picsum.photos/300?26" },
{ id:27, name:"Milk Cleanser", skin:"sensitive", type:"cleanser", price:550, image:"https://picsum.photos/300?27" },
{ id:28, name:"Clay Cleanser", skin:"combination", type:"cleanser", price:650, image:"https://picsum.photos/300?28" },
{ id:29, name:"Vitamin E Serum", skin:"dry", type:"serum", price:1400, image:"https://picsum.photos/300?29" },
{ id:30, name:"Pore Minimizing Serum", skin:"oily", type:"serum", price:980, image:"https://picsum.photos/300?30" },
{ id:31, name:"Hydration Serum", skin:"combination", type:"serum", price:1150, image:"https://picsum.photos/300?31" },
{ id:32, name:"Soothing Serum", skin:"sensitive", type:"serum", price:1250, image:"https://picsum.photos/300?32" },
{ id:33, name:"Night Moisturizer", skin:"dry", type:"moisturizer", price:1100, image:"https://picsum.photos/300?33" },
{ id:34, name:"Light Gel Moisturizer", skin:"oily", type:"moisturizer", price:700, image:"https://picsum.photos/300?34" },
{ id:35, name:"Derma Repair Cream", skin:"sensitive", type:"moisturizer", price:1350, image:"https://picsum.photos/300?35" },
{ id:36, name:"Glow Boost Cream", skin:"combination", type:"moisturizer", price:950, image:"https://picsum.photos/300?36" },
{ id:37, name:"Hydra Fresh Wash", skin:"dry", type:"cleanser", price:420, image:"https://picsum.photos/300?37" },
{ id:38, name:"Foam Control Wash", skin:"oily", type:"cleanser", price:580, image:"https://picsum.photos/300?38" },
{ id:39, name:"Sensitive Foam Wash", skin:"sensitive", type:"cleanser", price:610, image:"https://picsum.photos/300?39" },
{ id:40, name:"Balance Skin Wash", skin:"combination", type:"cleanser", price:760, image:"https://picsum.photos/300?40" }
];


// ===============================
// RENDER PRODUCTS
// ===============================

function renderProducts(productArray) {

    productsGrid.innerHTML = "";

    productArray.forEach(product => {

        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            <p>₹${product.price}</p>
            <button class="addCartBtn">Add to Cart</button>
        `;

        // Add cart click event
        card.querySelector(".addCartBtn").addEventListener("click", () => {
            cartCount++;
            cartCountEl.textContent = cartCount;
        });

        productsGrid.appendChild(card);
    });

    productCount.textContent = productArray.length + " Products";
}


// ===============================
// FILTER FUNCTION
// ===============================

function applyFilters() {

    let selectedSkins = [...document.querySelectorAll(".skin:checked")].map(el => el.value);
    let selectedPrices = [...document.querySelectorAll(".price:checked")].map(el => el.value);
    let selectedTypes = [...document.querySelectorAll(".type:checked")].map(el => el.value);

    let filtered = products.filter(product => {

        let skinMatch = selectedSkins.length ? selectedSkins.includes(product.skin) : true;
        let typeMatch = selectedTypes.length ? selectedTypes.includes(product.type) : true;

        let priceMatch = true;

        if (selectedPrices.length) {
            priceMatch = selectedPrices.some(range => {
                if (range === "under500") return product.price < 500;
                if (range === "500to1000") return product.price >= 500 && product.price <= 1000;
                if (range === "above1000") return product.price > 1000;
            });
        }

        return skinMatch && typeMatch && priceMatch;
    });

    renderProducts(filtered);
}


// ===============================
// EVENT LISTENERS
// ===============================

filters.forEach(filter => {
    filter.addEventListener("change", applyFilters);
});

clearBtn.addEventListener("click", () => {
    filters.forEach(f => f.checked = false);
    renderProducts(products);
});


// ===============================
// INITIAL LOAD
// ===============================

renderProducts(products);



// ===============================
// SEARCH FUNCTIONALITY
// ===============================

const searchIcon = document.getElementById("searchIcon");
const searchInput = document.getElementById("searchInput");

searchIcon.addEventListener("click", () => {
    searchInput.classList.toggle("active");
    searchInput.focus();
});

searchInput.addEventListener("keyup", () => {

    const searchValue = searchInput.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    renderProducts(filtered);
});



/* ================= thride streds End   ================= */



/* ================= Fouth silde streds    ================= */













  /*  sixth silde 6th stared   */
// Subscribe Button Click Effect
const subscribeBtn = document.querySelector(".subscribe-box button");

subscribeBtn.addEventListener("click", () => {
    subscribeBtn.innerText = "Subscribed ✓";
    subscribeBtn.style.background = "#28a745";
});
