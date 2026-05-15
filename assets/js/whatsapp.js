/**
 * Integración con WhatsApp
 * Envía órdenes directamente a WhatsApp
 */

class WhatsAppManager {
    constructor() {
        // Configuración de WhatsApp
        this.WHATSAPP_NUMBER = '34123456789'; // Número sin +
        this.RESTAURANT_NAME = 'Comandago';
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
    }
    
    generateMessage(items) {
        const lines = [];
        
        lines.push(`🍽️ *Nuevo Pedido - ${this.RESTAURANT_NAME}*\n`);
        lines.push('📋 *Detalles del pedido:*\n');
        
        // Listar items
        items.forEach((item, index) => {
            const subtotal = (item.price * item.quantity).toFixed(2);
            lines.push(`${index + 1}. ${item.name}`);
            lines.push(`   Cantidad: ${item.quantity}`);
            lines.push(`   Precio unitario: $${item.price.toFixed(2)}`);
            lines.push(`   Subtotal: $${subtotal}`);
            lines.push('');
        });
        
        // Resumen
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
}

const whatsappManager = new WhatsAppManager();