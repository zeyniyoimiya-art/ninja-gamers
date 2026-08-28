# 🥷 NINJA GAMERS — Catálogo de Diamantes

**Recarga fácil, rápido y seguro** 🇧🇴 · Venta de diamantes de **Free Fire**, **Mobile Legends** y **Magic Chess Go Go**.
Precios en **Bolivianos (Bs)**.

🔗 https://zeyniyoimiya-art.github.io/ninja-gamers/

---

## 📁 Archivos

| Archivo | Qué hace |
|---|---|
| `index.html` | Estructura de la página (header, tabs, buscador, footer) |
| `styles.css` | Diseño glassmorphism oscuro con orbes de luz |
| `app.js` | Catálogo de precios, tarjetas, tabs y links de WhatsApp |
| `og-image.jpg` | Imagen de vista previa al compartir en redes (1200×630) |

## ✏️ Cómo cambiar precios

Todo el catálogo vive en **`app.js`**, en la constante `CATALOGO`.
Cada paquete es una línea:

```js
{ nombre: "520 + 52", precio: 47 }
```

- `nombre`: lo que se muestra en la tarjeta.
- `precio`: número en Bs (sin comillas, usar punto para decimales: `3.5`).
- `tag: TAG.HOT` o `tag: TAG.FAV` → pone la etiqueta 🔥 MÁS VENDIDO / ⭐ FAVORITO.
- `nota: "Solo 1 vez por cuenta"` → cartelito azul.
- `esPase: true` → muestra el icono 🎫 en vez de 💎.
- `extra: "(1270 💎)"` → texto chiquito debajo del nombre.

Los paquetes se ordenan solos de más barato a más caro, así que se pueden
agregar en cualquier orden.

Los números de WhatsApp están arriba de todo en `app.js`, en `WA`.

## ✨ Funciona con

- 🔎 **Buscador**: filtra por cantidad, precio o "pase" dentro del juego abierto.
- 🔗 **Links directos**: `#freefire`, `#mobilelegends`, `#magicchess`.
- 💾 Recuerda el último juego que abriste.
- ⌨️ Tabs navegables con flechas (accesible con teclado y lectores de pantalla).
- 📱 Mensaje de WhatsApp pre-armado con el paquete y el precio.

## 🚀 Probar en local

```bash
python3 -m http.server 8080
# abrir http://localhost:8080
```
