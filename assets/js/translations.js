/**
 * Sistema de Traducciones Multiidioma
 * Soporta español e inglés
 */

const TRANSLATIONS = {
    es: {
        // Navbar
        menu: 'Menú',
        language: 'Idioma',
        cart: 'Carrito',
        
        // Hero
        heroTitle: 'Bienvenido a Nuestro Menú Digital',
        heroSubtitle: 'Selecciona tus platos favoritos y disfruta la experiencia',
        
        // Categories
        allTab: 'Todos',
        breakfast: 'Desayuno',
        lunch: 'Almuerzo',
        dinner: 'Cena',
        drinks: 'Bebidas',
        
        // Menu
        loading: 'Cargando menú...',
        noProducts: 'No hay productos disponibles',
        
        // Cart
        cartTitle: 'Carrito de Compras',
        emptyCart: 'Tu carrito está vacío',
        subtotal: 'Subtotal:',
        tax: 'Impuestos (10%):',
        total: 'Total:',
        orderButton: 'Pedir por WhatsApp',
        remove: 'Eliminar',
        quantity: 'Cantidad',
        
        // Badges
        vegetarian: 'Vegetariano',
        vegan: 'Vegano',
        glutenFree: 'Sin Gluten',
        allergen: 'Alérgeno',
        spicy: 'Picante',
        
        // Footer
        footer: '© 2026 Comandago Platform. Todos los derechos reservados.',
        madeWith: 'Creado con ❤️ para restaurantes profesionales',
        
        // Messages
        addedToCart: 'Agregado al carrito',
        removedFromCart: 'Eliminado del carrito',
        error: 'Error',
        success: 'Éxito',
    },
    en: {
        // Navbar
        menu: 'Menu',
        language: 'Language',
        cart: 'Cart',
        
        // Hero
        heroTitle: 'Welcome to Our Digital Menu',
        heroSubtitle: 'Select your favorite dishes and enjoy the experience',
        
        // Categories
        allTab: 'All',
        breakfast: 'Breakfast',
        lunch: 'Lunch',
        dinner: 'Dinner',
        drinks: 'Drinks',
        
        // Menu
        loading: 'Loading menu...',
        noProducts: 'No products available',
        
        // Cart
        cartTitle: 'Shopping Cart',
        emptyCart: 'Your cart is empty',
        subtotal: 'Subtotal:',
        tax: 'Taxes (10%):',
        total: 'Total:',
        orderButton: 'Order via WhatsApp',
        remove: 'Remove',
        quantity: 'Quantity',
        
        // Badges
        vegetarian: 'Vegetarian',
        vegan: 'Vegan',
        glutenFree: 'Gluten Free',
        allergen: 'Allergen',
        spicy: 'Spicy',
        
        // Footer
        footer: '© 2026 Comandago Platform. All rights reserved.',
        madeWith: 'Made with ❤️ for professional restaurants',
        
        // Messages
        addedToCart: 'Added to cart',
        removedFromCart: 'Removed from cart',
        error: 'Error',
        success: 'Success',
    }
};

class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'es';
        this.translations = TRANSLATIONS;
        this.updatePageLanguage();
    }
    
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.updatePageLanguage();
            this.dispatchLanguageChangeEvent();
        }
    }
    
    getLanguage() {
        return this.currentLanguage;
    }
    
    updatePageLanguage() {
        // Actualizar elementos por ID
        const elementsToUpdate = [
            'heroTitle', 'heroSubtitle', 'allTab', 'loadingText', 'emptyCartMessage',
            'cartTitle', 'subtotalLabel', 'subtotalValue', 'taxLabel', 'taxValue',
            'totalLabel', 'totalValue', 'orderButtonText', 'footerText', 'madeWith',
            'currentLanguage'
        ];
        
        elementsToUpdate.forEach(id => {
            const element = document.getElementById(id);
            const key = this.camelToSnake(id);
            if (element && this.translations[this.currentLanguage][key]) {
                if (id === 'currentLanguage') {
                    element.textContent = this.currentLanguage.toUpperCase();
                } else {
                    element.textContent = this.t(key);
                }
            }
        });
    }
    
    camelToSnake(str) {
        return str.replace(/([a-z])([A-Z])/g, '$1$2').toLowerCase();
    }
    
    dispatchLanguageChangeEvent() {
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }
}

// Instancia global
const translator = new TranslationManager();

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TranslationManager, translator };
}