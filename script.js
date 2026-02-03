// Database 14 Produk
const dbProducts = [
    { id: 1, name: "Midnight Glow Serum", category: "skincare", price: 245000, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Bikini Bekas Fawwaz", category: "makeup", price: 89000, img: "https://i5.walmartimages.com/asr/6da2dafd-a115-42b1-b7c7-4038abf63af5.7c1ea4dd5980ee123755b196d038f231.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" },
    { id: 3, name: "Morning Mist Hydrator", category: "skincare", price: 155000, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Santal Bloom Perfume", category: "fragrance", price: 420000, img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Oat Cleansing Balm", category: "skincare", price: 135000, img: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Rose Quartz Face Roller", category: "skincare", price: 175000, img: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "Anggur Merah", category: "makeup", price: 110000, img: "https://www.canggusky.com/wp-content/uploads/2022/09/anggurmerah.jpg" },
    { id: 8, name: "Almond Body Butter", category: "skincare", price: 120000, img: "https://images.unsplash.com/photo-1552046122-03184de85e08?auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: "Lash Lift Mascara", category: "makeup", price: 98000, img: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: "Golden Glow Oil", category: "makeup", price: 165000, img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80" },
    { id: 11, name: "Bamboo Charcoal Mask", category: "skincare", price: 85000, img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80" },
    { id: 12, name: "Jack Daniel", category: "skincare", price: 45000, img: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/catalog-image/104/MTA-180705756/jack_daniel-s_jack_daniel-s_whisky_700_ml_full01_hrgp4wnp.jpg" },
    { id: 13, name: "Nude Eyeshadow Palette", category: "makeup", price: 195000, img: "https://images.unsplash.com/photo-1583241475880-083f84372725?auto=format&fit=crop&w=400&q=80" },
    { id: 14, name: "Lavender Pillow Mist", category: "fragrance", price: 75000, img: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=400&q=80" }
];

let cart = JSON.parse(localStorage.getItem('havaz-cart')) || [];

// Render Produk
function displayProducts(items) {
    const grid = document.getElementById('mainProductGrid');
    grid.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="price">Rp ${p.price.toLocaleString('id-ID')}</p>
                <button class="btn-primary" style="width:100%; margin-top:10px" onclick="addToCart(${p.id})">
                    Tambah Ke Keranjang
                </button>
            </div>
        </div>
    `).join('');
}

// Tambah Produk
function addToCart(id) {
    const p = dbProducts.find(item => item.id === id);
    const inCart = cart.find(item => item.id === id);
    if(inCart) { inCart.qty++; } else { cart.push({...p, qty: 1}); }
    saveCart();
    toggleCart(true);
}

// Simpan & Update UI
function saveCart() {
    localStorage.setItem('havaz-cart', JSON.stringify(cart));
    updateUI();
}

function updateUI() {
    const counter = document.getElementById('cart-counter');
    const content = document.getElementById('cartContent');
    const grandTotal = document.getElementById('grandTotal');
    
    counter.innerText = cart.reduce((s, i) => s + i.qty, 0);
    content.innerHTML = cart.map((item, idx) => `
        <div style="display:flex; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px">
            <img src="${item.img}" width="50" style="border-radius:5px">
            <div style="flex:1; margin-left:15px">
                <h4 style="font-size:13px">${item.name}</h4>
                <p style="font-size:12px">${item.qty} x Rp ${item.price.toLocaleString()}</p>
            </div>
            <i class="fas fa-trash-alt" style="color:red; cursor:pointer" onclick="removeCart(${idx})"></i>
        </div>
    `).join('');
    
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    grandTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function removeCart(idx) { cart.splice(idx, 1); saveCart(); }
function toggleCart(show) {
    document.getElementById('cartSidebar').classList.toggle('active', show);
    document.getElementById('cartOverlay').style.display = show ? 'block' : 'none';
}

// Filter & Search
function filterItems(cat) {
    document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    const filtered = cat === 'all' ? dbProducts : dbProducts.filter(p => p.category === cat);
    displayProducts(filtered);
}

document.getElementById('productSearch').addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const result = dbProducts.filter(p => p.name.toLowerCase().includes(val));
    displayProducts(result);
});

// WhatsApp Checkout
function checkoutToWA() {
    if(!cart.length) return alert("Keranjang kosong!");
    let text = "Halo HavaZ Kosmetik, saya ingin memesan:\n\n";
    cart.forEach(i => text += `- ${i.name} (${i.qty}x)\n`);
    window.open(`https://wa.me/6285727146011?text=${encodeURIComponent(text)}`);
}

// Init
displayProducts(dbProducts);
updateUI();