/**
 * Módulo de Gestión del Carrito
 * Maneja agregar/eliminar productos y cálculo de totales
 */

class CartManager {
    constructor() {
        this.items = this.loadFromStorage();
        this.TAX_RATE = 0.10;
    }
    
    init() {
        this.setupListeners();
        this.updateUI();
    }
    
    setupListeners() {
        const cartButton = document.getElementById('cartButton');
        const closeButton = document.getElementById('closeCartButton');
        const cartModal = document.getElementById('cartModal');
        
        if (cartButton) {
            cartButton.addEventListener('click', () => this.toggleModal());
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', () => this.toggleModal());
        }
        
        if (cartModal) {
            cartModal.addEventListener('click', (e) => {
                if (e.target === cartModal) this.toggleModal();
            });
        }
        
        // Listener para cambios de idioma
        window.addEventListener('languageChanged', () => this.updateUI());
    }
    
    toggleModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.classList.toggle('active');
        }
    }
    
    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push(item);
        }
        
        this.saveToStorage();
        this.updateUI();
    }
    
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveToStorage();
        this.updateUI();
    }
    
    updateQuantity(id, quantity) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(id);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateUI();
            }
        }
    }
    
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getTax() {
        return this.getSubtotal() * this.TAX_RATE;
    }
    
    getTotal() {
        return this.getSubtotal() + this.getTax();
    }
    
    updateUI() {
        this.updateCartCount();
        this.renderCartItems();
        this.updateCartSummary();
    }
    
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const total = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = total;
        }
    }
    
    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `<p>${translator.t('emptyCart')}</p>`;
            return;
        }
        
        cartItemsContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">🍽️</div>
                <div class="cart-item-content">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="qty-button qty-decrease" data-id="${item.id}">−</button>
                        <input type="number" class="qty-input" value="${item.quantity}" data-id="${item.id}" min="1">
                        <button class="qty-button qty-increase" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">${translator.t('remove')}</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Configurar listeners para controles
        this.attachCartItemListeners();
    }
    
    attachCartItemListeners() {
        // Botones de aumentar cantidad
        document.querySelectorAll('.qty-increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const item = this.items.find(i => i.id === id);
                if (item) this.updateQuantity(id, item.quantity + 1);
            });
        });
        
        // Botones de disminuir cantidad
        document.querySelectorAll('.qty-decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const item = this.items.find(i => i.id === id);
                if (item) this.updateQuantity(id, item.quantity - 1);
            });
        });
        
        // Input de cantidad
        document.querySelectorAll('.qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const id = e.target.dataset.id;
                const qty = parseInt(e.target.value) || 0;
                this.updateQuantity(id, qty);
            });
        });
        
        // Botones de eliminar
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.removeItem(e.target.dataset.id);
            });
        });
    }
    
    updateCartSummary() {
        const subtotal = this.getSubtotal();
        const tax = this.getTax();
        const total = this.getTotal();
        
        const subtotalElement = document.getElementById('subtotalValue');
        const taxElement = document.getElementById('taxValue');
        const totalElement = document.getElementById('totalValue');
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
        
        // Habilitar/deshabilitar botón de orden
        const whatsappButton = document.getElementById('whatsappButton');
        if (whatsappButton) {
            whatsappButton.disabled = this.items.length === 0;
        }
    }
    
    saveToStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
    
    loadFromStorage() {
        const stored = localStorage.getItem('cartItems');
        return stored ? JSON.parse(stored) : [];
    }
    
    getItems() {
        return this.items;
    }
    
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateUI();
    }
}

const cart = new CartManager();