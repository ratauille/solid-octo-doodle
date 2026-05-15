/**
 * Integración con WhatsApp
 * Envía órdenes directamente a WhatsApp
 */

class WhatsAppManager {
    constructor(phoneNumber = '34123456789', restaurantName = 'Comandago') {
        this.WHATSAPP_NUMBER = phoneNumber.replace(/[^0-9]/g, '');
        this.RESTAURANT_NAME = restaurantName;
    }
    
    init() {
        const whatsappButton = document.getElementById('whatsappButton');
        if (whatsappButton) {
            whatsappButton.addEventListener('click', () => this.sendOrder());
        }
    }
    
    sendOrder() {
        const items = cart.getItems();
        
        if (items.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        
        const message = this.generateMessage(items);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        cart.clear();
    }
    
    generateMessage(items) {
        const lines = [];
        
        lines.push(`🍽️ *Nuevo Pedido - ${this.RESTAURANT_NAME}*\n`);
        lines.push('📋 *Detalles del pedido:*\n');
        
        items.forEach((item, index) => {
            const subtotal = (item.price * item.quantity).toFixed(2);
            lines.push(`${index + 1}. ${item.name}`);
            lines.push(`   Cantidad: ${item.quantity}`);
            lines.push(`   Precio unitario: $${item.price.toFixed(2)}`);
            lines.push(`   Subtotal: $${subtotal}`);
            lines.push('');
        });
        
        const subtotal = cart.getSubtotal().toFixed(2);
        const tax = cart.getTax().toFixed(2);
        const total = cart.getTotal().toFixed(2);
        
        lines.push('💰 *Resumen:*');
        lines.push(`Subtotal: $${subtotal}`);
        lines.push(`Impuestos: $${tax}`);
        lines.push(`*Total: $${total}*`);
        lines.push('');
        lines.push('⏰ Por favor, confirma tu pedido y tiempo de entrega.');
        lines.push(`🌐 Pedido desde: ${window.location.href}`);
        
        return lines.join('\n');
    }
    
    setPhoneNumber(number) {
        this.WHATSAPP_NUMBER = number.replace(/[^0-9]/g, '');
    }
    
    setRestaurantName(name) {
        this.RESTAURANT_NAME = name;
    }
}

const whatsappManager = new WhatsAppManager();