/* ============================================
   NINJA GAMERS — script.js (v2 Glassmorphism)
   ============================================ */

/* ---- Números WhatsApp ---- */
const WA_PRINCIPAL = "59160103641";
const WA_SECUNDARIO = "59177102832";

/* ---- Catálogo (datos como JSON limpio) ---- */
const CATALOGO = {
  ffDiamantes: [
    { nombre: "100 + 10", precio: "10" }, { nombre: "310 + 31", precio: "29" },
    { nombre: "520 + 52", precio: "47" }, { nombre: "1060 + 106", precio: "84" },
    { nombre: "2180 + 218", precio: "164" }, { nombre: "5600 + 560", precio: "410" }
  ],
  ffPases: [
    { nombre: "Pase 120", precio: "3.50", nota: "Solo 1 vez por cuenta", esPase: true },
    { nombre: "Pase 200", precio: "4.50", nota: "Solo 1 vez por cuenta", esPase: true },
    { nombre: "Pase 350", precio: "6.50", nota: "Solo 1 vez por cuenta", esPase: true },
    { nombre: "Pase Completo", precio: "26.50", extra: "(1270 💎)", nota: "Solo 1 vez por cuenta", esPase: true }
  ],
  mlDiamantes: [
    { nombre: "78 + 8", precio: "16" }, { nombre: "156 + 16", precio: "30" },
    { nombre: "312 + 32", precio: "60" }, { nombre: "468 + 46", precio: "88" },
    { nombre: "625 + 81", precio: "118" }, { nombre: "859 + 104", precio: "162" },
    { nombre: "937 + 113", precio: "178" }, { nombre: "1296 + 150", precio: "250" },
    { nombre: "1589 + 181", precio: "309" }, { nombre: "1860 + 335", precio: "358" },
    { nombre: "2172 + 367", precio: "418" }, { nombre: "2485 + 416", precio: "477" }
  ],
  mlGigantes: [
    { nombre: "2655 + 321", precio: "503" }, { nombre: "3099 + 589", precio: "598" },
    { nombre: "3527 + 635", precio: "686" }, { nombre: "3724 + 670", precio: "716" },
    { nombre: "4649 + 883", precio: "903" }, { nombre: "5117 + 929", precio: "990" },
    { nombre: "5274 + 964", precio: "1021" }, { nombre: "6132 + 1050", precio: "1184" },
    { nombre: "6429 + 1073", precio: "1238" }, { nombre: "6509 + 1218", precio: "1261" },
    { nombre: "7740 + 1548", precio: "1500" }
  ],
  mlPases: [
    { nombre: "Pase Semanal", precio: "19", esPase: true },
    { nombre: "Pase Crepuscular", precio: "99", esPase: true }
  ],
  mlEspeciales: [
    { nombre: "50 + 5", precio: "10" }, { nombre: "150 + 15", precio: "29" },
    { nombre: "250 + 25", precio: "47" }, { nombre: "500 + 65", precio: "95" }
  ],
  mcDiamantes: [
    { nombre: "77 + 8", precio: "18" }, { nombre: "102 + 10", precio: "20" },
    { nombre: "154 + 16", precio: "33" }, { nombre: "203 + 20", precio: "40" },
    { nombre: "217 + 23", precio: "47" }, { nombre: "256 + 40", precio: "58" },
    { nombre: "303 + 33", precio: "60" }, { nombre: "367 + 41", precio: "78" },
    { nombre: "504 + 66", precio: "100" }, { nombre: "503 + 65", precio: "109" },
    { nombre: "774 + 101", precio: "164" }, { nombre: "1007 + 156", precio: "200" },
    { nombre: "1708 + 302", precio: "370" }, { nombre: "2015 + 383", precio: "399" },
    { nombre: "4003 + 827", precio: "859" }, { nombre: "5035 + 1007", precio: "999" }
  ]
};

/* ---- metadatos: juego visible por sección ---- */
const JUEGO = {
  ffDiamantes: "Free Fire", ffPases: "Free Fire",
  mlDiamantes: "Mobile Legends", mlGigantes: "Mobile Legends",
  mlPases: "Mobile Legends", mlEspeciales: "Mobile Legends",
  mcDiamantes: "Magic Chess: Go Go"
};

/* ---- mapeo sección -> id contenedor ---- */
const SECCIONES = {
  ffDiamantes: "ff-diamantes", ffPases: "ff-pases",
  mlDiamantes: "ml-diamantes", mlGigantes: "ml-gigantes",
  mlPases: "ml-pases", mlEspeciales: "ml-especiales",
  mcDiamantes: "mc-diamantes"
};

/* ---- construir tarjeta ---- */
function crearTarjeta(pack) {
  const card = document.createElement("div");
  card.className = "card";

  const cantidad = document.createElement("div");
  cantidad.className = "cantidad";
  let texto = "💎 " + pack.nombre;
  if (pack.esPase) texto = '<span class="pase-ico">🎫</span>' + pack.nombre;
  if (pack.extra) texto += " <small>" + pack.extra + "</small>";
  cantidad.innerHTML = texto;

  const precio = document.createElement("div");
  precio.className = "precio";
  precio.innerHTML = '<span class="simbolo">Bs</span> ' + pack.precio;

  const boton = document.createElement("button");
  boton.className = "btn-pedir";
  boton.textContent = "Pedir por WhatsApp";
  boton.addEventListener("click", () => pedirWhatsApp(pack));

  card.appendChild(cantidad);
  card.appendChild(precio);

  if (pack.nota) {
    const nota = document.createElement("div");
    nota.className = "nota";
    nota.textContent = pack.nota;
    card.appendChild(nota);
  }

  card.appendChild(boton);
  return card;
}

/* ---- renderizar todo el catálogo ---- */
function renderizarCatalogo() {
  Object.keys(CATALOGO).forEach(function (seccion) {
    const contenedor = document.getElementById(SECCIONES[seccion]);
    if (!contenedor) return;
    CATALOGO[seccion].forEach(function (pack) {
      contenedor.appendChild(crearTarjeta(pack));
    });
  });
}

/* ---- WhatsApp con mensaje prellenado ---- */
function pedirWhatsApp(pack) {
  const nombre = pack.extra ? pack.nombre + " (" + pack.extra + ")" : pack.nombre;
  const mensaje = "Hola Ninja Gamers 🥷, quiero el paquete " + nombre +
    " de " + JUEGO[seccionActualDe(pack)] + " (Bs " + pack.precio + ").";
  const url = "https://wa.me/" + WA_PRINCIPAL + "?text=" + encodeURIComponent(mensaje);
  window.open(url, "_blank");
}

/* ---- resolver a qué sección pertenece un pack ---- */
function seccionActualDe(pack) {
  return Object.keys(CATALOGO).find(function (s) {
    return CATALOGO[s].indexOf(pack) !== -1;
  });
}

/* ---- TABS sin recargar (selectores SIN espacios en blanco) ---- */
function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const paneles = document.querySelectorAll(".panel");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      // quita active de todos
      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      paneles.forEach(function (p) {
        p.classList.remove("active");
      });
      // activa el seleccionado
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const target = document.getElementById(tab.dataset.tab);
      if (target) target.classList.add("active");
    });
  });
}

/* ---- iniciar ---- */
renderizarCatalogo();
initTabs();
