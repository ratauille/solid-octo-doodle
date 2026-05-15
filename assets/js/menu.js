/**
 * Módulo de Gestión del Menú
 * Carga, renderiza y gestiona el menú de productos
 */

class MenuManager {
    constructor(menuDataUrl = 'data/menus/dinner.json') {
        this.menuDataUrl = menuDataUrl;
        this.menuData = null;
        this.filteredData = null;
        this.currentCategory = 'all';
    }
    
    async init() {
        try {
            const response = await fetch(this.menuDataUrl);
            this.menuData = await response.json();
            this.filteredData = this.menuData;
            
            this.render();
            this.setupListeners();
        } catch (error) {
            console.error('Error cargando menú:', error);
            this.renderError();
        }
    }
    
    setupListeners() {
        const categoryButtons = document.querySelectorAll('.tab-button');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterByCategory(e.target.closest('.tab-button').dataset.category);
            });
        });
        
        this.attachAddToCartListeners();
    }
    
    filterByCategory(category) {
        this.currentCategory = category;
        
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
        
        if (category === 'all') {
            this.filteredData = this.menuData;
        } else {
            this.filteredData = this.menuData.filter(item => item.category === category);
        }
        
        this.renderItems();
        this.attachAddToCartListeners();
    }
    
    render() {
        this.renderCategories();
        this.renderItems();
    }
    
    renderCategories() {
        const categoryTabs = document.getElementById('categoryTabs');
        if (!categoryTabs || !this.menuData) return;
        
        const categories = ['all', ...new Set(this.menuData.map(item => item.category))];
        
        categoryTabs.innerHTML = categories.map(cat => {
            const label = cat === 'all' ? translator.t('allTab') : translator.t(cat.toLowerCase()) || cat;
            return `
                <button class="tab-button ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
                    <span>${label}</span>
                </button>
            `;
        }).join('');
    }
    
    renderItems() {
        const menuGrid = document.getElementById('menuGrid');
        if (!menuGrid) return;
        
        if (!this.filteredData || this.filteredData.length === 0) {
            menuGrid.innerHTML = `<p class="text-center">${translator.t('noProducts')}</p>`;
            return;
        }
        
        menuGrid.innerHTML = this.filteredData.map(item => this.createCard(item)).join('');
    }
    
    createCard(item) {
        const badgesHtml = this.getBadges(item);
        return `
            <div class="menu-card">
                <div class="card-image">${item.emoji || '🍽️'}</div>
                <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-description">${item.description}</p>
                    <div class="card-meta">
                        ${badgesHtml}
                    </div>
                </div>
                <div class="card-footer">
                    <div class="card-price">$${item.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                        🛒
                    </button>
                </div>
            </div>
        `;
    }
    
    getBadges(item) {
        let badges = '';
        
        if (item.vegetarian) {
            badges += `<span class="badge vegetarian">🌱 ${translator.t('vegetarian')}</span>`;
        }
        if (item.vegan) {
            badges += `<span class="badge vegetarian">🥕 ${translator.t('vegan')}</span>`;
        }
        if (item.glutenFree) {
            badges += `<span class="badge">🌾 ${translator.t('glutenFree')}</span>`;
        }
        if (item.spicy) {
            badges += `<span class="badge">🌶️ ${translator.t('spicy')}</span>`;
        }
        if (item.allergens && item.allergens.length > 0) {
            badges += `<span class="badge allergen">⚠️ ${translator.t('allergen')}</span>`;
        }
        
        return badges;
    }
    
    attachAddToCartListeners() {
        const buttons = document.querySelectorAll('.add-to-cart-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.dataset.id;
                const name = btn.dataset.name;
                const price = parseFloat(btn.dataset.price);
                
                const item = {
                    id,
                    name,
                    price,
                    quantity: 1
                };
                
                cart.addItem(item);
                btn.classList.add('added');
                setTimeout(() => btn.classList.remove('added'), 1000);
            });
        });
    }
    
    renderError() {
        const menuGrid = document.getElementById('menuGrid');
        if (menuGrid) {
            menuGrid.innerHTML = '<p class="text-center">Error cargando el menú</p>';
        }
    }
}

const menuManager = new MenuManager();