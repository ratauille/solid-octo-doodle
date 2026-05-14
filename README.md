# 🍽️ Comandago Platform - Sistema de Menú Digital Profesional

Una plataforma completa para crear y gestionar menús digitales premium con soporte multiidioma, carrito de compras integrado y WhatsApp API.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Despliegue](#despliegue)
- [Documentación](#documentación)

---

## ✨ Características

✅ **Menú Digital Responsivo**
- Diseño mobile-first
- Soporte para tablets y desktop
- Visualización optimizada de productos

✅ **Sistema de Carrito**
- Agregar/eliminar productos
- Cálculo automático de totales
- Persistencia en localStorage

✅ **Integración WhatsApp**
- Envío directo de órdenes
- Mensajes personalizados
- Tracking de pedidos

✅ **Multiidioma**
- Español e Inglés
- Fácil de extender
- Traductor en tiempo real

✅ **Admin Dashboard**
- Editor de menús
- Gestión de restaurantes
- Configuración de precios

✅ **Demos Interactivas**
- QR para móviles
- Previsualizaciones responsive
- Pruebas en tiempo real

---

## 📁 Estructura del Proyecto

```
comandago-platform/
│
├── index.html                    # Página principal
├── README.md                     # Este archivo
├── package.json                  # Dependencias (si aplica)
├── .gitignore                    # Archivos a ignorar
│
├── assets/                       # Recursos estáticos
│   ├── css/
│   │   ├── global.css           # Estilos globales
│   │   ├── menu.css             # Estilos del menú
│   │   ├── landing.css          # Estilos landing
│   │   ├── cart.css             # Estilos del carrito
│   │   └── responsive.css       # Media queries
│   │
│   ├── js/
│   │   ├── app.js               # Inicializador principal
│   │   ├── menu.js              # Lógica del menú
│   │   ├── cart.js              # Gestión del carrito
│   │   ├── whatsapp.js          # Integración WhatsApp
│   │   ├── translations.js      # Gestión de idiomas
│   │   └── api.js               # Llamadas API
│   │
│   ├── images/                  # Imágenes del proyecto
│   └── icons/                   # Iconos SVG
│
├── components/                  # Componentes HTML reutilizables
│   ├── navbar.html              # Barra de navegación
│   ├── footer.html              # Pie de página
│   ├── hero.html                # Sección hero
│   ├── menu-card.html           # Tarjeta de producto
│   ├── category-tabs.html       # Tabs de categorías
│   ├── cart-modal.html          # Modal del carrito
│   ├── whatsapp-button.html     # Botón WhatsApp
│   └── language-switcher.html   # Selector de idioma
│
├── templates/                   # Plantillas completas
│   ├── premium-menu/
│   │   ├── index.html           # Menú premium
│   │   └── config.json          # Configuración
│   │
│   ├── weekly-menu/
│   │   ├── index.html           # Menú semanal
│   │   └── config.json          # Configuración
│   │
│   └── landing-page/
│       ├── index.html           # Página de inicio
│       └── config.json          # Configuración
│
├── data/                        # Datos estáticos
│   ├── restaurants/
│   │   ├── verano-estate.json   # Restaurante 1
│   │   ├── taqueria-demo.json   # Restaurante 2
│   │   └── sushi-demo.json      # Restaurante 3
│   │
│   ├── menus/
│   │   ├── breakfast.json       # Menú desayuno
│   │   ├── lunch.json           # Menú almuerzo
│   │   ├── dinner.json          # Menú cena
│   │   └── drinks.json          # Menú bebidas
│   │
│   └── translations/
│       ├── es.json              # Español
│       └── en.json              # Inglés
│
├── admin/                       # Panel administrativo
│   ├── dashboard.html           # Dashboard principal
│   ├── menu-editor.html         # Editor de menús
│   └── restaurant-settings.html # Configuración
│
├── demo/                        # Demos y pruebas
│   ├── qr-demo.html             # Demo QR
│   ├── mobile-demo.html         # Demo mobile
│   └── tablet-demo.html         # Demo tablet
│
└── docs/                        # Documentación
    ├── installation.md          # Guía de instalación
    ├── deploy.md                # Guía de despliegue
    └── customization.md         # Guía de personalización
```

---

## 🚀 Instalación

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- Git (opcional, para control de versiones)

### Pasos

1. **Clonar o descargar el repositorio**
```bash
git clone https://github.com/ratauille/solid-octo-doodle.git
cd solid-octo-doodle
```

2. **Abrir en el navegador**
```bash
# Opción 1: Abrir directamente
open index.html

# Opción 2: Usar Live Server en VS Code
# Instalar extensión: Live Server
# Click derecho en index.html → Open with Live Server
```

3. **Verificar la estructura**
```bash
# Asegúrate que todas las carpetas existan
ls -la assets/css/
ls -la assets/js/
ls -la components/
ls -la data/
```

---

## ⚙️ Configuración

### 1. Datos del Restaurante

Edita `data/restaurants/verano-estate.json`:

```json
{
  "name": "Tu Restaurante",
  "description": "Descripción del restaurante",
  "logo": "assets/images/logo.png",
  "phone": "+34123456789",
  "whatsapp": "34123456789",
  "email": "contacto@turestaurante.com",
  "address": "Tu dirección",
  "hours": {
    "monday": "11:00 - 23:00",
    "tuesday": "11:00 - 23:00"
  }
}
```

### 2. Menú de Productos

Edita `data/menus/dinner.json`:

```json
{
  "category": "Cenas",
  "items": [
    {
      "id": 1,
      "name": "Plato Premium",
      "description": "Descripción del plato",
      "price": 25.99,
      "image": "assets/images/plato.jpg",
      "allergies": ["gluten", "lactosa"],
      "vegetarian": false
    }
  ]
}
```

### 3. Idiomas

Edita `data/translations/es.json` y `en.json`:

```json
{
  "menu": "Menú",
  "cart": "Carrito",
  "order": "Hacer Pedido",
  "language": "Idioma"
}
```

### 4. Número de WhatsApp

En `assets/js/whatsapp.js`, configura tu número:

```javascript
const WHATSAPP_NUMBER = "34123456789"; // Tu número sin +
const WHATSAPP_MESSAGE = "Hola, quisiera ordenar...";
```

---

## 📱 Uso

### Para Clientes

1. Abre `index.html` o la URL de tu sitio
2. Selecciona categorías y productos
3. Agrega al carrito
4. Selecciona idioma si lo deseas
5. Haz clic en "Pedir por WhatsApp"

### Para Administradores

1. Accede a `admin/dashboard.html`
2. Edita menús en `admin/menu-editor.html`
3. Configura restaurante en `admin/restaurant-settings.html`

### Para Desarrolladores

Estructura de archivos JavaScript:

```javascript
// app.js - Inicializador
import { initMenu } from './menu.js';
import { initCart } from './cart.js';
import { initTranslations } from './translations.js';

// menu.js - Lógica del menú
export function initMenu() { }
export function renderMenu(data) { }

// cart.js - Gestión del carrito
export function addToCart(item) { }
export function removeFromCart(id) { }

// translations.js - Multiidioma
export function changeLanguage(lang) { }
export function t(key) { } // Acceso a traducciones
```

---

## 🌐 Despliegue

### Opción 1: GitHub Pages (RECOMENDADO)

1. **Crea un repositorio en GitHub**
2. **Sube el código**
```bash
git add .
git commit -m "Setup: Estructura profesional del proyecto"
git push origin main
```

3. **Activa GitHub Pages**
   - Ve a `Settings` → `Pages`
   - Selecciona `main` como rama
   - Selecciona `/ (root)` como carpeta
   - Haz clic en `Save`

4. **Tu sitio estará disponible en:**
```
https://tuusuario.github.io/solid-octo-doodle/
```

### Opción 2: Vercel

1. Conecta tu repositorio a Vercel
2. Vercel desplegará automáticamente
3. Obtén tu URL: `https://tuproyecto.vercel.app`

### Opción 3: Netlify

1. Arrastra la carpeta a https://app.netlify.com
2. O conecta tu repositorio
3. Obtén tu URL automáticamente

---

## 📚 Documentación

Consulta las guías detalladas:

- **[installation.md](./docs/installation.md)** - Instalación paso a paso
- **[deploy.md](./docs/deploy.md)** - Guía de despliegue completa
- **[customization.md](./docs/customization.md)** - Personalización avanzada

---

## 🎯 Próximos Pasos

- [ ] Agregar base de datos (Firebase/Supabase)
- [ ] Sistema de pedidos completo
- [ ] Panel de administración avanzado
- [ ] Análisis y reportes
- [ ] Programa de lealtad
- [ ] Integración con sistemas de pago

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

## 📞 Contacto

- **Email:** contacto@comandago.com
- **WhatsApp:** +34 123 456 789
- **GitHub:** [@ratauille](https://github.com/ratauille)

---

## 🎉 Estado del Proyecto

✅ Estructura base completada
⏳ Funcionalidad core en desarrollo
⏳ Panel de admin en progreso
⏳ Documentación completa

**Última actualización:** 2026-05-14

---

**Creado con ❤️ por Ratauille**
