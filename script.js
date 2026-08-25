/* ===== NINJA GAMERS — script.js ===== */

// Números de WhatsApp (formato internacional sin +)
const WA1 = "59160103641";
const WA2 = "59177102832";

/* ===== DATOS DE CATÁLOGOS =====
   Cada pack: { nombre: "78 + 8 💎", precio: "16" , juego: "Mobile Legends" }  */
const cat = {
  ffDiamantes: [
    { nombre: "100 + 10 💎", precio: "10" }, { nombre: "310 + 31 💎", precio: "29" },
    { nombre: "520 + 52 💎", precio: "47" }, { nombre: "1060 + 106 💎", precio: "84" },
    { nombre: "2180 + 218 💎", precio: "164" }, { nombre: "5600 + 560 💎", precio: "410" }
  ],
  ffPases: [
    { nombre: "120 💎 — Pase", precio: "3.50", nota: "Solo 1 vez por cuenta" },
    { nombre: "200 💎 — Pase", precio: "4.50", nota: "Solo 1 vez por cuenta" },
    { nombre: "350 💎 — Pase", precio: "6.50", nota: "Solo 1 vez por cuenta" },
    { nombre: "Pase Completo (1270 💎)", precio: "26.50", nota: "Solo 1 vez por cuenta" }
  ],
  mlDiamantes: [
    { nombre: "78 + 8 💎", precio: "16" }, { nombre: "156 + 16 💎", precio: "30" },
    { nombre: "312 + 32 💎", precio: "60" }, { nombre: "468 + 46 💎", precio: "88" },
    { nombre: "625 + 81 💎", precio: "118" }, { nombre: "859 + 104 💎", precio: "162" },
    { nombre: "937 + 113 💎", precio: "178" }, { nombre: "1296 + 150 💎", precio: "250" },
    { nombre: "1589 + 181 💎", precio: "309" }, { nombre: "1860 + 335 💎", precio: "358" },
    { nombre: "2172 + 367 💎", precio: "418" }, { nombre: "2485 + 416 💎", precio: "477" }
  ],
  mlGigantes: [
    { nombre: "2655 + 321 💎", precio: "503" }, { nombre: "3099 + 589 💎", precio: "598" },
    { nombre: "3527 + 635 💎", precio: "686" }, { nombre: "3724 + 670 💎", precio: "716" },
    { nombre: "4649 + 883 💎", precio: "903" }, { nombre: "5117 + 929 💎", precio: "990" },
    { nombre: "5274 + 964 💎", precio: "1021" }, { nombre: "6132 + 1050 💎", precio: "1184" },
    { nombre: "6429 + 1073 💎", precio: "1238" }, { nombre: "6509 + 1218 💎", precio: "1261" },
    { nombre: "7740 + 1548 💎", precio: "1500" }
  ],
  mlPases: [
    { nombre: "Pase Semanal", precio: "19" }, { nombre: "Pase Crepuscular", precio: "99" }
  ],
  mlEspeciales: [
    { nombre: "50 + 5 💎", precio: "10" }, { nombre: "150 + 15 💎", precio: "29" },
    { nombre: "250 + 25 💎", precio: "47" }, { nombre: "500 + 65 💎", precio: "95" }
  ],
  mcDiamantes: [
    { nombre: "77 + 8 💎", precio: "18" }, { nombre: "102 + 10 💎", precio: "20" },
    { nombre: "154 + 16 💎", precio: "33" }, { nombre: "203 + 20 💎", precio: "40" },
    { nombre: "217 + 23 💎", precio: "47" }, { nombre: "256 + 40 💎", precio: "58" },
    { nombre: "303 + 33 💎", precio: "60" }, { nombre: "367 + 41 💎", precio: "78" },
    { nombre: "504 + 66 💎", precio: "100" }, { nombre: "503 + 65 💎", precio: "109" },
    { nombre: "774 + 101 💎", precio: "164" }, { nombre: "1007 + 156 💎", precio: "200" },
    { nombre: "1708 + 302 💎", precio: "370" }, { nombre: "2015 + 383 💎", precio: "399" },
    { nombre: "4003 + 827 💎", precio: "859" }, { nombre: "5035 + 1007 💎", precio: "999" }
  ]
};

// Nombre visible de cada juego
const juegoNombre = {
  ffDiamantes: "Free Fire", ffPases: "Free Fire",
  mlDiamantes: "Mobile Legends", mlGigantes: "Mobile Legends",
  mlPases: "Mobile Legends", mlEspeciales: "Mobile Legends",
  mcDiamantes: "Magic Chess: Go Go"
};

// Relación sección -> elemento HTML
const secciones = {
  ffDiamantes: "ff-diamantes", ffPases: "ff-pases",
  mlDiamantes: "ml-diamantes", mlGigantes: "ml-gigantes",
  mlPases: "ml-pases", mlEspeciales: "ml-especiales",
  mcDiamantes: "mc-diamantes"
};

/* ===== Construir tarjetas ===== */
function construirTarjeta(pack, seccion) {
  const div = document.createElement("div");
  div.className = "card";

  const cant = document.createElement("div");
  cant.className = "cantidad";
  cant.innerHTML = pack.nombre;
  // detectar si es pase (sin 💎 en nombre) para subrayar
  if (!pack.nombre.includes("💎")) {
    cant.innerHTML = "🎫 " + pack.nombre;
  }

  const precio = document.createElement("div");
  precio.className = "precio";
  precio.innerHTML = "Bs " + pack.precio + " <span>Bs</span>";

  const btn = document.createElement("button");
  btn.className = "btn-pedir";
  btn.textContent = "Pedir por WhatsApp";
  btn.addEventListener("click", () => pedirWhatsApp(seccion, pack));

  div.appendChild(cant);
  div.appendChild(precio);
  // nota opcional (ej. "Solo 1 vez por cuenta")
  if (pack.nota) {
    const nota = document.createElement("div");
    nota.className = "nota";
    nota.textContent = pack.nota;
    div.appendChild(nota);
  }
  div.appendChild(btn);
  return div;
}

/* ===== Llenar todas las secciones ===== */
Object.keys(cat).forEach(function (seccion) {
  const cont = document.getElementById(secciones[seccion]);
  if (!cont) return;
  cat[seccion].forEach(function (pack) {
    cont.appendChild(construirTarjeta(pack, seccion));
  });
});

/* ===== Mensaje de WhatsApp prellenado ===== */
function pedirWhatsApp(seccion, pack) {
  const juego = juegoNombre[seccion];
  const msg = "Hola Ninja Gamers 🥷, quiero el paquete " +
    pack.nombre + " de " + juego + " (Bs " + pack.precio + ").";
  const url = "https://wa.me/" + WA1 + "?text=" + encodeURIComponent(msg);
  window.open(url, "_blank");
}

/* ===== Tabs sin recargar ===== */
document.querySelectorAll(".tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
    document.querySelectorAll(".panel").forEach(function (p) { p.classList.remove("active"); });
    tab.classList.add("active");
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add("active");
  });
});
