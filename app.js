/* ============================================
   NINJA GAMERS — app.js (v4)
   Catálogo, tabs accesibles, buscador y WhatsApp
   ============================================ */
"use strict";

/* ---- Números de WhatsApp (formato internacional, sin +) ---- */
const WA = {
  principal: "59160103641",
  secundario: "59177102832"
};

/* ---- Tags reutilizables ---- */
const TAG = {
  HOT: { texto: "🔥 MÁS VENDIDO", clase: "tag-hot" },
  FAV: { texto: "⭐ FAVORITO", clase: "tag-fav" }
};

/* ---- CATÁLOGO ----
   precio: número en Bolivianos (Bs). Nada de strings, así se puede
   ordenar, buscar y formatear sin sorpresas.                       */
const CATALOGO = {
  /* ===== FREE FIRE ===== */
  ffDiamantes: {
    juego: "Free Fire",
    contenedor: "ff-diamantes",
    packs: [
      { nombre: "100 + 10", precio: 10, tag: TAG.HOT },
      { nombre: "310 + 31", precio: 29 },
      { nombre: "520 + 52", precio: 47 },
      { nombre: "1060 + 106", precio: 84 },
      { nombre: "2180 + 218", precio: 164 },
      { nombre: "5600 + 560", precio: 410 }
    ]
  },
  ffPases: {
    juego: "Free Fire",
    contenedor: "ff-pases",
    packs: [
      { nombre: "120 💎", precio: 3.5, esPase: true, nota: "Solo 1 vez por cuenta" },
      { nombre: "200 💎", precio: 4.5, esPase: true, nota: "Solo 1 vez por cuenta" },
      { nombre: "350 💎", precio: 6.5, esPase: true, nota: "Solo 1 vez por cuenta" },
      { nombre: "Pase Completo", extra: "(1270 💎)", precio: 26.5, esPase: true, nota: "🎁 PROMO", tag: TAG.FAV }
    ]
  },

  /* ===== MOBILE LEGENDS ===== */
  mlDiamantes: {
    juego: "Mobile Legends",
    contenedor: "ml-diamantes",
    packs: [
      { nombre: "78 + 8", precio: 16, tag: TAG.HOT },
      { nombre: "156 + 16", precio: 30 },
      { nombre: "312 + 32", precio: 60 },
      { nombre: "468 + 46", precio: 88 },
      { nombre: "625 + 81", precio: 118 },
      { nombre: "859 + 104", precio: 162 },
      { nombre: "937 + 113", precio: 178 },
      { nombre: "1296 + 150", precio: 250 },
      { nombre: "1589 + 181", precio: 309 },
      { nombre: "1860 + 335", precio: 358 },
      { nombre: "2172 + 367", precio: 418 },
      { nombre: "2485 + 416", precio: 477 }
    ]
  },
  mlGigantes: {
    juego: "Mobile Legends",
    contenedor: "ml-gigantes",
    packs: [
      { nombre: "2655 + 321", precio: 503 },
      { nombre: "3099 + 589", precio: 598 },
      { nombre: "3527 + 635", precio: 686 },
      { nombre: "3724 + 670", precio: 716 },
      { nombre: "4649 + 883", precio: 903 },
      { nombre: "5117 + 929", precio: 990 },
      { nombre: "5274 + 964", precio: 1021 },
      { nombre: "6132 + 1050", precio: 1184 },
      { nombre: "6429 + 1073", precio: 1238 },
      { nombre: "6509 + 1218", precio: 1261 },
      { nombre: "7740 + 1548", precio: 1500 }
    ]
  },
  mlPases: {
    juego: "Mobile Legends",
    contenedor: "ml-pases",
    packs: [
      { nombre: "Pase Semanal", precio: 19, esPase: true, tag: TAG.FAV },
      { nombre: "Pase Crepuscular", precio: 99, esPase: true }
    ]
  },
  mlEspeciales: {
    juego: "Mobile Legends",
    contenedor: "ml-especiales",
    packs: [
      { nombre: "50 + 5", precio: 10 },
      { nombre: "150 + 15", precio: 29 },
      { nombre: "250 + 25", precio: 47 },
      { nombre: "500 + 65", precio: 95 }
    ]
  },

  /* ===== MAGIC CHESS: GO GO ===== */
  mcDiamantes: {
    juego: "Magic Chess: Go Go",
    contenedor: "mc-diamantes",
    packs: [
      { nombre: "77 + 8", precio: 18 },
      { nombre: "102 + 10", precio: 20 },
      { nombre: "154 + 16", precio: 33 },
      { nombre: "203 + 20", precio: 40 },
      { nombre: "217 + 23", precio: 47 },
      { nombre: "256 + 40", precio: 58 },
      { nombre: "303 + 33", precio: 60 },
      { nombre: "367 + 41", precio: 78 },
      { nombre: "504 + 66", precio: 100 },
      { nombre: "503 + 65", precio: 109 },
      { nombre: "774 + 101", precio: 164 },
      { nombre: "1007 + 156", precio: 200 },
      { nombre: "1708 + 302", precio: 370 },
      { nombre: "2015 + 383", precio: 399 },
      { nombre: "4003 + 827", precio: 859 },
      { nombre: "5035 + 1007", precio: 999 }
    ]
  }
};

/* ============================================
   UTILIDADES
   ============================================ */

/** Formatea un precio en Bs: 47 -> "47", 3.5 -> "3.50" */
function formatearPrecio(precio) {
  return Number.isInteger(precio) ? String(precio) : precio.toFixed(2);
}

/** Total de diamantes de un pack ("520 + 52" -> 572). null si no aplica. */
function totalDiamantes(nombre) {
  const numeros = nombre.match(/\d+/g);
  if (!numeros) return null;
  return numeros.reduce((suma, n) => suma + Number(n), 0);
}

/** Texto normalizado (sin tildes, minúsculas) para buscar. */
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* ============================================
   TARJETAS
   ============================================ */

function crearTarjeta(pack, seccion) {
  const juego = CATALOGO[seccion].juego;

  const card = document.createElement("article");
  card.className = "card";

  // Texto de búsqueda precalculado (nombre + precio + juego + total)
  const total = totalDiamantes(pack.nombre);
  card.dataset.buscar = normalizar(
    [pack.nombre, pack.extra || "", juego, formatearPrecio(pack.precio), total || "", pack.esPase ? "pase" : "diamantes"].join(" ")
  );

  /* Tag (🔥 MÁS VENDIDO / ⭐ FAVORITO) */
  if (pack.tag) {
    const tag = document.createElement("span");
    tag.className = "tag " + pack.tag.clase;
    tag.textContent = pack.tag.texto;
    card.appendChild(tag);
  }

  /* Cantidad */
  const cantidad = document.createElement("h4");
  cantidad.className = "cantidad";

  if (pack.esPase) {
    const ico = document.createElement("span");
    ico.className = "pase-ico";
    ico.setAttribute("aria-hidden", "true");
    ico.textContent = "🎫";
    cantidad.appendChild(ico);
    cantidad.appendChild(document.createTextNode(pack.nombre));
  } else {
    // no duplicar el 💎 si el nombre ya lo trae
    const prefijo = pack.nombre.includes("💎") ? "" : "💎 ";
    cantidad.appendChild(document.createTextNode(prefijo + pack.nombre));
  }

  if (pack.extra) {
    const extra = document.createElement("span");
    extra.className = "extra";
    extra.textContent = pack.extra;
    cantidad.appendChild(extra);
  } else if (total && !pack.esPase) {
    const extra = document.createElement("span");
    extra.className = "extra";
    extra.textContent = "= " + total.toLocaleString("es-BO") + " 💎 en total";
    cantidad.appendChild(extra);
  }

  card.appendChild(cantidad);

  /* Precio */
  const precio = document.createElement("p");
  precio.className = "precio";
  const simbolo = document.createElement("span");
  simbolo.className = "simbolo";
  simbolo.textContent = "Bs";
  precio.appendChild(simbolo);
  precio.appendChild(document.createTextNode(" " + formatearPrecio(pack.precio)));
  card.appendChild(precio);

  /* Nota */
  if (pack.nota) {
    const nota = document.createElement("p");
    nota.className = "nota";
    nota.textContent = pack.nota;
    card.appendChild(nota);
  }

  /* Botón WhatsApp */
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "btn-pedir";
  boton.textContent = "Pedir por WhatsApp";
  boton.setAttribute(
    "aria-label",
    "Pedir " + pack.nombre + " de " + juego + " por Bs " + formatearPrecio(pack.precio) + " por WhatsApp"
  );
  boton.addEventListener("click", () => pedirWhatsApp(pack, juego));
  card.appendChild(boton);

  return card;
}

/* ============================================
   RENDER
   ============================================ */

function renderizarCatalogo() {
  Object.keys(CATALOGO).forEach((seccion) => {
    const { contenedor, packs } = CATALOGO[seccion];
    const destino = document.getElementById(contenedor);
    if (!destino) {
      console.warn("[NINJA GAMERS] No existe el contenedor #" + contenedor);
      return;
    }

    // Ordenar de más barato a más caro (el catálogo venía con saltos)
    const ordenados = packs.slice().sort((a, b) => a.precio - b.precio);

    const fragmento = document.createDocumentFragment();
    ordenados.forEach((pack) => fragmento.appendChild(crearTarjeta(pack, seccion)));
    destino.replaceChildren(fragmento);
  });
}

/* ============================================
   WHATSAPP
   ============================================ */

function pedirWhatsApp(pack, juego) {
  const nombre = pack.extra ? pack.nombre + " " + pack.extra : pack.nombre;
  const mensaje =
    "Hola Ninja Gamers 🥷, quiero el paquete " + nombre +
    " de " + juego + " (Bs " + formatearPrecio(pack.precio) + ").";
  const url = "https://wa.me/" + WA.principal + "?text=" + encodeURIComponent(mensaje);

  const ventana = window.open(url, "_blank", "noopener");
  // Si el navegador bloquea el popup, navegamos en la misma pestaña
  if (!ventana) window.location.href = url;
}

/* ============================================
   TABS (accesibles + hash + memoria)
   ============================================ */

const TABS_VALIDOS = ["freefire", "mobilelegends", "magicchess"];

function activarTab(id, { foco = false, guardar = true } = {}) {
  if (!TABS_VALIDOS.includes(id)) return;

  document.querySelectorAll(".tab").forEach((tab) => {
    const activo = tab.dataset.tab === id;
    tab.classList.toggle("active", activo);
    tab.setAttribute("aria-selected", String(activo));
    tab.tabIndex = activo ? 0 : -1;
    if (activo && foco) tab.focus();
  });

  document.querySelectorAll(".panel").forEach((panel) => {
    const activo = panel.id === id;
    panel.classList.toggle("active", activo);
    panel.hidden = !activo;
  });

  if (guardar) {
    try {
      localStorage.setItem("ng-tab", id);
    } catch (_) {
      /* modo privado: sin memoria, no pasa nada */
    }
  }

  aplicarBusqueda();
}

function initTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activarTab(tab.dataset.tab);
      history.replaceState(null, "", "#" + tab.dataset.tab);
    });
  });

  // Navegación con flechas / Home / End (patrón ARIA de tabs)
  document.querySelector(".tablist").addEventListener("keydown", (e) => {
    const actual = tabs.findIndex((t) => t.classList.contains("active"));
    let siguiente = null;

    if (e.key === "ArrowRight") siguiente = (actual + 1) % tabs.length;
    else if (e.key === "ArrowLeft") siguiente = (actual - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") siguiente = 0;
    else if (e.key === "End") siguiente = tabs.length - 1;
    else return;

    e.preventDefault();
    activarTab(tabs[siguiente].dataset.tab, { foco: true });
    history.replaceState(null, "", "#" + tabs[siguiente].dataset.tab);
  });

  // Tab inicial: #hash > último usado > Free Fire
  const desdeHash = window.location.hash.replace("#", "");
  let guardado = null;
  try {
    guardado = localStorage.getItem("ng-tab");
  } catch (_) { /* noop */ }

  const inicial = TABS_VALIDOS.includes(desdeHash)
    ? desdeHash
    : TABS_VALIDOS.includes(guardado)
      ? guardado
      : "freefire";

  activarTab(inicial, { guardar: false });

  window.addEventListener("hashchange", () => {
    const id = window.location.hash.replace("#", "");
    if (TABS_VALIDOS.includes(id)) activarTab(id);
  });
}

/* ============================================
   BUSCADOR
   ============================================ */

let inputBusqueda = null;

function aplicarBusqueda() {
  if (!inputBusqueda) return;

  const consulta = normalizar(inputBusqueda.value.trim());
  const panel = document.querySelector(".panel.active");
  const info = document.getElementById("resultado-info");
  const vacio = document.getElementById("sin-resultados");
  const limpiar = document.getElementById("limpiar-busqueda");

  if (limpiar) limpiar.hidden = consulta === "";
  if (!panel) return;

  let visibles = 0;

  panel.querySelectorAll(".card").forEach((card) => {
    const coincide = consulta === "" || (card.dataset.buscar || "").includes(consulta);
    card.hidden = !coincide;
    if (coincide) visibles++;
  });

  // Ocultar categorías que quedaron sin tarjetas visibles
  panel.querySelectorAll(".categoria").forEach((cat) => {
    const algunaVisible = cat.querySelector(".card:not([hidden])") !== null;
    cat.hidden = !algunaVisible;
  });

  if (vacio) vacio.hidden = !(consulta !== "" && visibles === 0);

  if (info) {
    info.textContent = consulta === ""
      ? ""
      : visibles + (visibles === 1 ? " paquete encontrado" : " paquetes encontrados");
  }
}

function initBuscador() {
  inputBusqueda = document.getElementById("buscador");
  const limpiar = document.getElementById("limpiar-busqueda");
  if (!inputBusqueda) return;

  inputBusqueda.addEventListener("input", aplicarBusqueda);
  inputBusqueda.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      inputBusqueda.value = "";
      aplicarBusqueda();
    }
  });

  if (limpiar) {
    limpiar.addEventListener("click", () => {
      inputBusqueda.value = "";
      inputBusqueda.focus();
      aplicarBusqueda();
    });
  }
}

/* ============================================
   VARIOS
   ============================================ */

function initAnio() {
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = String(new Date().getFullYear());
}

/* ============================================
   INICIO
   ============================================ */

function init() {
  renderizarCatalogo();
  initBuscador();
  initTabs();
  initAnio();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
