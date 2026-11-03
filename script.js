// =====================================
// THE GRILL HOUSE - MAIN JAVASCRIPT
// =====================================

// รายการอาหาร 18 เมนู
const foods = [
  { id: 1, name: "สเต็กเนื้อริบอาย", category: "beef", price: 459, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600" },
  { id: 2, name: "สเต็กเนื้อสันใน", category: "beef", price: 399, image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600" },
  { id: 3, name: "สเต็กเนื้อทีโบน", category: "beef", price: 499, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600" },
  { id: 4, name: "สเต็กเนื้อพริกไทยดำ", category: "beef", price: 429, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600" },

  { id: 5, name: "พอร์คชอป", category: "pork", price: 289, image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600" },
  { id: 6, name: "สเต็กหมูพริกไทยดำ", category: "pork", price: 259, image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600" },
  { id: 7, name: "ซี่โครงหมูบาร์บีคิว", category: "pork", price: 329, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600" },

  { id: 8, name: "สเต็กไก่ย่าง", category: "chicken", price: 189, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600" },
  { id: 9, name: "สเต็กไก่กรอบ", category: "chicken", price: 199, image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600" },
  { id: 10, name: "ไก่บาร์บีคิว", category: "chicken", price: 219, image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=600" },

  { id: 11, name: "สเต็กปลาแซลมอน", category: "seafood", price: 359, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600" },
  { id: 12, name: "กุ้งย่างเนยกระเทียม", category: "seafood", price: 299, image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600" },
  { id: 13, name: "ปลาทอดซอสเลมอน", category: "seafood", price: 269, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600" },

  { id: 14, name: "เฟรนช์ฟรายส์", category: "side", price: 89, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600" },
  { id: 15, name: "หัวหอมทอด", category: "side", price: 99, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=600" },
  { id: 16, name: "มันบด", category: "side", price: 79, image: "https://images.unsplash.com/photo-1600628422019-7b8c6c1c7c5e?w=600" },

  { id: 17, name: "ชีสเค้ก", category: "dessert", price: 129, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600" },
  { id: 18, name: "บราวนี่ช็อกโกแลต", category: "dessert", price: 99, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600" }
];

// ตะกร้าสินค้า
let cart = [];
let currentCategory = "all";

// ดึง element จาก HTML
const menuGrid = document.getElementById("menu-grid");
const searchInput = document.getElementById("search");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

// แสดงราคา
function formatPrice(price) {
  return price.toLocaleString("th-TH");
}

// แสดงเมนูอาหาร
function showFoods() {
  if (!menuGrid) return;

  const keyword = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const filteredFoods = foods.filter(food => {
    const matchCategory =
      currentCategory === "all" ||
      food.category === currentCategory;

    const matchSearch =
      food.name.toLowerCase().includes(keyword);

    return matchCategory && matchSearch;
  });

  menuGrid.innerHTML = "";

  if (filteredFoods.length === 0) {
    menuGrid.innerHTML = "<p>ไม่พบเมนูอาหาร</p>";
    return;
  }

  filteredFoods.forEach(food => {
    const card = document.createElement("div");
    card.className = "food-card";

    card.innerHTML = `
      <div class="food-image">
        <img src="${food.image}" alt="${food.name}">
      </div>
      <div class="food-info">
        <h3>${food.name}</h3>
        <p class="food-price">฿${formatPrice(food.price)}</p>
        <button class="add-button" data-id="${food.id}">
          เพิ่มลงตะกร้า
        </button>
      </div>
    `;

    menuGrid.appendChild(card);
  });
}

// เพิ่มอาหารลงตะกร้า
function addToCart(id) {
  const food = foods.find(item => item.id === id);
  if (!food) return;

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      ...food,
      quantity: 1
    });
  }

  updateCart();
}

// เพิ่มจำนวน
function increaseQuantity(id) {
  const item = cart.find(food => food.id === id);
  if (item) {
    item.quantity++;
  }
  updateCart();
}

// ลดจำนวน
function decreaseQuantity(id) {
  const item = cart.find(food => food.id === id);

  if (item) {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(food => food.id !== id);
    }
  }

  updateCart();
}

// ลบสินค้า
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// อัปเดตตะกร้า
function updateCart() {
  if (cartItems) {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<p>ยังไม่มีสินค้าในตะกร้า</p>";
    } else {
      cart.forEach(item => {
        const row = document.createElement("div");
        row.className = "cart-item";

        row.innerHTML = `
          <div>
            <strong>${item.name}</strong>
            <p>฿${formatPrice(item.price)} x ${item.quantity}</p>
          </div>
          <div class="cart-controls">
            <button data-action="minus" data-id="${item.id}">−</button>
            <span>${item.quantity}</span>
            <button data-action="plus" data-id="${item.id}">+</button>
            <button data-action="remove" data-id="${item.id}">ลบ</button>
          </div>
        `;

        cartItems.appendChild(row);
      });
    }
  }

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }

  if (cartTotal) {
    cartTotal.textContent = formatPrice(totalPrice);
  }
}

// คลิกปุ่มเพิ่มอาหารและปุ่มตะกร้า
document.addEventListener("click", function(event) {
  const addButton = event.target.closest(".add-button");

  if (addButton) {
    addToCart(Number(addButton.dataset.id));
    return;
  }

  const cartButton = event.target.closest("[data-action]");

  if (cartButton) {
    const id = Number(cartButton.dataset.id);
    const action = cartButton.dataset.action;

    if (action === "plus") increaseQuantity(id);
    if (action === "minus") decreaseQuantity(id);
    if (action === "remove") removeFromCart(id);
  }
});

// เลือกหมวดหมู่อาหาร
document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", function() {
    currentCategory = this.dataset.category || "all";

    document.querySelectorAll(".category").forEach(btn => {
      btn.classList.remove("active");
    });

    this.classList.add("active");
    showFoods();
  });
});

// ค้นหาอาหาร
if (searchInput) {
  searchInput.addEventListener("input", showFoods);
}

// ปุ่มสั่งซื้อ
const checkoutButton = document.getElementById("checkout");

if (checkoutButton) {
  checkoutButton.addEventListener("click", function() {
    if (cart.length === 0) {
      alert("กรุณาเลือกอาหารก่อนสั่งซื้อ");
      return;
    }

    const details = cart.map(function(item) {
  return item.name + " x " + item.quantity;
}).join("\n");

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    alert(
      "รายการอาหารของคุณ:\n\n" +
      details +
      "\n\nยอดรวม ฿" + formatPrice(total) +
      "\n\nนี่คือระบบสาธิต ยังไม่มีการชำระเงินจริง"
    );
  });
}

// เริ่มต้นเว็บไซต์
showFoods();
updateCart();