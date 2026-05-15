/**
 * Aplicación Principal
 * Inicializa todos los módulos
 */

class App {
    constructor(config = {}) {
        this.config = {
            menuDataUrl: 'data/menus/dinner.json',
            whatsappNumber: '34123456789',
            restaurantName: 'Comandago',
            ...config
        };
        this.initialized = false;
    }
    
    init() {
        if (this.initialized) return;
        
        try {
            console.log('🚀 Iniciando Comandago Platform...');
            
            // 1. Sistema de traducciones
            console.log('📝 Inicializando traducciones...');
            translator.updatePageLanguage();
            
            // 2. Carrito
            console.log('🛒 Inicializando carrito...');
            cart.init();
            
            // 3. Menú
            console.log('🍽️ Inicializando menú...');
            menuManager.menuDataUrl = this.config.menuDataUrl;
            menuManager.init();
            
            // 4. WhatsApp
            console.log('📱 Inicializando WhatsApp...');
            whatsappManager.setPhoneNumber(this.config.whatsappNumber);
            whatsappManager.setRestaurantName(this.config.restaurantName);
            whatsappManager.init();
            
            // 5. Event listeners globales
            this.setupGlobalListeners();
            
            // 6. Verificaciones de accesibilidad
            this.setupAccessibility();
            
            console.log('✅ Comandago Platform iniciada correctamente');
            this.initialized = true;
        } catch (error) {
            console.error('❌ Error inicializando aplicación:', error);
        }
    }
    
    setupGlobalListeners() {
        const languageSwitcher = document.getElementById('languageSwitcher');
        if (languageSwitcher) {
            languageSwitcher.addEventListener('click', () => {
                const currentLang = translator.getLanguage();
                const newLang = currentLang === 'es' ? 'en' : 'es';
                translator.setLanguage(newLang);
                translator.updatePageLanguage();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const cartModal = document.getElementById('cartModal');
                if (cartModal && cartModal.classList.contains('active')) {
                    cart.toggleModal();
                }
            }
        });
    }
    
    setupAccessibility() {
        const navBar = document.getElementById('navbar');
        if (navBar) navBar.setAttribute('role', 'navigation');
        
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.setAttribute('role', 'main');
        
        const footer = document.querySelector('.footer');
        if (footer) footer.setAttribute('role', 'contentinfo');
        
        document.querySelectorAll('a').forEach(link => {
            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', link.textContent || 'Enlace');
            }
        });
    }
}

const app = new App();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

window.app = app;
window.cart = cart;
window.menuManager = menuManager;
window.translator = translator;
window.whatsappManager = whatsappManager;