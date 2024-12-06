var hearts=document.getElementsByClassName("fas fa-heart");
console.log(hearts)

for(let i=0; i<hearts.length; i++){
    let heart=hearts[i];
    heart.style.color=""
    heart.addEventListener("click", function(){
        
        if(heart.style.color=="red")
            heart.style.color=""
        else{
            heart.style.color="red"
        }
    })
}


// الكائنات والخصائص
var items = {
    sbat: document.getElementById("sbat"),
    socks: document.getElementById("socks"),
    bag: document.getElementById("bag"),
    total: document.getElementById("total"),
    conter1: document.getElementById("conter1"),
    conter2: document.getElementById("conter2"),
    conter3: document.getElementById("conter3")
};

// دالة لتحديث الإجمالي
function updateTotal() {
    let totalValue = parseInt(items.sbat.textContent) + parseInt(items.socks.textContent) + parseInt(items.bag.textContent);
    items.total.textContent = totalValue;
}

// دالة لتحديث الكمية للعنصر المحدد
function updateQuantity(element, isIncrement) {
    let quantityElement = element.previousElementSibling || element.nextElementSibling;
    let currentQuantity = parseInt(quantityElement.textContent);
    if (isIncrement) {
        quantityElement.textContent = currentQuantity + 1;
    } else {
        if (currentQuantity > 1) {
            quantityElement.textContent = currentQuantity - 1;
        }
    }
    updateTotal();
}

// دالة لتعديل السعر بناءً على الزيادة أو النقصان
function updatePrice(element, amount, isIncrement) {
    let currentPrice = parseInt(element.textContent);
    if (isIncrement) {
        element.textContent = currentPrice + amount;
    } else {
        if (currentPrice > amount) {
            element.textContent = currentPrice - amount;
        }
    }
    updateTotal();
}

// إضافة الأحداث لعناصر السلة
document.querySelectorAll(".fas.fa-plus-circle").forEach(plus => {
    plus.addEventListener("click", () => {
        updateQuantity(plus, true);
    });
});

document.querySelectorAll(".fas.fa-minus-circle").forEach(minus => {
    minus.addEventListener("click", () => {
        updateQuantity(minus, false);
    });
});

// إضافة الأحداث لأزرار الزيادة والنقصان (الأصناف الثلاثة)
document.getElementById("plus1").addEventListener('click', () => updatePrice(items.sbat, 100, true));
document.getElementById("plus2").addEventListener('click', () => updatePrice(items.socks, 20, true));
document.getElementById("plus3").addEventListener('click', () => updatePrice(items.bag, 50, true));

document.getElementById("munis1").addEventListener('click', () => updatePrice(items.sbat, 100, false));
document.getElementById("munis2").addEventListener('click', () => updatePrice(items.socks, 20, false));
document.getElementById("munis3").addEventListener('click', () => updatePrice(items.bag, 50, false));

// إضافة أحداث للأزرار لحذف العناصر
document.getElementById("trash").addEventListener("click", () => {
    items.sbat.textContent = 100;
    items.conter1.textContent = 1;
    updateTotal();
});
document.getElementById("trash2").addEventListener("click", () => {
    items.socks.textContent = 20;
    items.conter2.textContent = 1;
    updateTotal();
});
document.getElementById("trash3").addEventListener("click", () => {
    items.bag.textContent = 50;
    items.conter3.textContent = 1;
    updateTotal();
});

// تحديث الإجمالي عند تحميل الصفحة
updateTotal();


    var cartb =document.getElementsByClassName("fas fa-cart-plus")
    for(let k=0; k<cartb.length; k++){
        let carts=cartb[k]
        carts.addEventListener("clike",function(){
            console.log("carng")
        })
    }



    for(let m=0; m<cartb.length; m++){
        let carts=cartb[m];
        carts.addEventListener("click", function(){
            box.style.transform = "translateX(0)";

        })
    }



    const box = document.getElementById("boch")
    const button = document.getElementById("close-cart")

    button.addEventListener("click", function() {
        box.style.transform = "translateX(300px)";
    });

        // Shopping Cart Logic
        class ShoppingCart {
            constructor() {
            this.items = [];
            }
        
            addItem(product) {
            const existingItem = this.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
            this.updateCartUI();
            }
        
            removeItem(productId) {
            this.items = this.items.filter(item => item.id !== productId);
            this.updateCartUI();
            }
        
            updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.id === productId);
            if (item) {
                item.quantity = Math.max(1, item.quantity + quantity); // Minimum quantity is 1
            }
            this.updateCartUI();
            }
        
            calculateTotal() {
            return this.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(3);
            }
        
            updateCartUI() {
                const cartItemsContainer = document.getElementById('cart-items');
                cartItemsContainer.innerHTML = '';
                this.items.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                    <img src="/assets/baskets.png" class="card-img"/>
                <div class="elkol">
                    <div class="text">
                    <span>${item.name}</span>
                    <span>${item.price.toFixed(3)}</span>
                    </div>
                    <div class="blus">
                        <button class="decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-id="${item.id}">+</button>
                    </div>
                    </div>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });
                document.getElementById('total-price').innerText = this.calculateTotal();
                }
            }
            
        // Initialize Shopping Cart
        const cart = new ShoppingCart();
        
        // Event Listeners
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
            const product = {
                id: parseInt(button.dataset.id),
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
            };
            cart.addItem(product);
            });
        });
        
        document.getElementById('cart-items').addEventListener('click', event => {
            const productId = parseInt(event.target.dataset.id);
            if (event.target.classList.contains('decrease')) {
            cart.updateQuantity(productId, -1);
            } else if (event.target.classList.contains('increase')) {
            cart.updateQuantity(productId, 1);
            }
        });
        
        document.getElementById('close-cart').addEventListener('click', () => {
            alert('Cart Closed');
        });
        