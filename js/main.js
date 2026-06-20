/* ============================================================
   Antümalen — tienda + restaurante (toggle), carrito, animaciones
   ============================================================ */

const WHATSAPP_NUMERO = "56987199748"; // +56 9 8719 9748
const PH_LOGO = '<img class="ph-logo" src="imagenes/logo/Antumalen_logo_nobg.png" alt="">';

const CLP = n => "$" + n.toLocaleString("es-CL");
const $   = sel => document.querySelector(sel);
const $$  = sel => document.querySelectorAll(sel);

// ---------- Estado ----------
let modo = localStorage.getItem("antumalen_modo") || "tienda";
let filtroTienda = "todos";
let filtroMenu = "todos";
let carritos = cargarCarritos();

function cargarCarritos(){
  try { return JSON.parse(localStorage.getItem("antumalen_carritos")) || { tienda:{}, restaurante:{} }; }
  catch { return { tienda:{}, restaurante:{} }; }
}
function guardarCarritos(){ localStorage.setItem("antumalen_carritos", JSON.stringify(carritos)); }

const carritoActivo = () => carritos[modo];
const findItem = id => PRODUCTOS.find(p => p.id === id) || MENU.find(m => m.id === id);
const estrellas = r => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

// ---------- Modo (tienda / restaurante) ----------
function setMode(m){
  modo = (m === "restaurante") ? "restaurante" : "tienda";
  document.body.setAttribute("data-mode", modo);
  localStorage.setItem("antumalen_modo", modo);
  $$(".ms-btn").forEach(b => b.classList.toggle("active", b.dataset.setMode === modo));
  $("#cartTitle").textContent = modo === "restaurante" ? "Tu pedido" : "Tu pedido";
  actualizarCarrito();
  observarReveal();
}

// ---------- Categorías destacadas (tienda) ----------
function renderCategorias(){
  const grid = $("#catGrid");
  if(!grid) return;
  grid.innerHTML = CATEGORIAS.filter(c => c.id !== "todos").map(c => {
    const n = PRODUCTOS.filter(p => p.categoria === c.id).length;
    return `<div class="cat-card reveal" data-cat="${c.id}">
      <div class="cat-ico">${c.icono}</div>
      <h3>${c.nombre}</h3><span>${n} producto${n === 1 ? "" : "s"}</span></div>`;
  }).join("");
  grid.querySelectorAll(".cat-card").forEach(card => card.addEventListener("click", () => {
    filtroTienda = card.dataset.cat;
    renderFiltros(); renderProductos();
    $("#productos").scrollIntoView({ behavior:"smooth" });
  }));
  observarReveal();
}

// ---------- Filtros ----------
function chipsHTML(cats, activo){
  return cats.map(c => `<button class="filter-chip${c.id === activo ? " active" : ""}" data-cat="${c.id}">${c.icono}<span>${c.nombre}</span></button>`).join("");
}
function renderFiltros(){
  const cont = $("#filters"); if(!cont) return;
  cont.innerHTML = chipsHTML(CATEGORIAS, filtroTienda);
  cont.querySelectorAll(".filter-chip").forEach(b => b.addEventListener("click", () => {
    filtroTienda = b.dataset.cat; renderFiltros(); renderProductos();
  }));
}
function renderMenuFiltros(){
  const cont = $("#menuFilters"); if(!cont) return;
  cont.innerHTML = chipsHTML(MENU_CATEGORIAS, filtroMenu);
  cont.querySelectorAll(".filter-chip").forEach(b => b.addEventListener("click", () => {
    filtroMenu = b.dataset.cat; renderMenuFiltros(); renderMenu();
  }));
}

// ---------- Grilla genérica de items ----------
function cardHTML(p, conRating){
  const rating = conRating ? `<div class="rating"><span class="stars">${estrellas(p.rating)}</span> ${p.rating.toFixed(1)}</div>` : "";
  return `<article class="product-card reveal">
    <div class="product-img"><span class="cat-tag">${p.categoria}</span>${p.img ? `<img src="${p.img}" alt="${p.nombre}" loading="lazy">` : PH_LOGO}</div>
    <div class="product-body">
      <h3>${p.nombre}</h3>${rating}
      <p class="p-desc">${p.desc || ""}</p>
      <div class="product-foot"><span class="price">${CLP(p.precio)}</span><button class="add-btn" data-id="${p.id}">Agregar +</button></div>
    </div></article>`;
}
function wireAddButtons(grid){
  grid.querySelectorAll(".add-btn").forEach(btn => btn.addEventListener("click", () => {
    agregarAlCarrito(btn.dataset.id);
    btn.textContent = "Agregado ✓";
    setTimeout(() => { btn.textContent = "Agregar +"; }, 900);
  }));
  observarReveal();
}
function renderProductos(){
  const grid = $("#productGrid"); if(!grid) return;
  const lista = PRODUCTOS.filter(p => filtroTienda === "todos" || p.categoria === filtroTienda);
  grid.innerHTML = lista.length ? lista.map(p => cardHTML(p, true)).join("")
    : `<p style="grid-column:1/-1;text-align:center;color:var(--gris)">No hay productos en esta categoría.</p>`;
  wireAddButtons(grid);
}
function renderMenu(){
  const grid = $("#menuGrid"); if(!grid) return;
  const lista = MENU.filter(p => filtroMenu === "todos" || p.categoria === filtroMenu);
  grid.innerHTML = lista.length ? lista.map(p => cardHTML(p, false)).join("")
    : `<p style="grid-column:1/-1;text-align:center;color:var(--gris)">No hay platos en esta categoría.</p>`;
  wireAddButtons(grid);
}

// ---------- Carrito (por modo) ----------
function agregarAlCarrito(id){ const c = carritoActivo(); c[id] = (c[id] || 0) + 1; guardarCarritos(); actualizarCarrito(); }
function cambiarCantidad(id, d){ const c = carritoActivo(); c[id] = (c[id] || 0) + d; if(c[id] <= 0) delete c[id]; guardarCarritos(); actualizarCarrito(); }
function eliminarItem(id){ delete carritoActivo()[id]; guardarCarritos(); actualizarCarrito(); }

function itemsCarrito(){
  const c = carritoActivo();
  return Object.keys(c).map(id => { const p = findItem(id); return p ? { ...p, cantidad: c[id] } : null; }).filter(Boolean);
}
const totalCarrito = () => itemsCarrito().reduce((t, i) => t + i.precio * i.cantidad, 0);
const cantidadTotal = () => Object.values(carritoActivo()).reduce((t, n) => t + n, 0);

function actualizarCarrito(){
  const items = itemsCarrito();
  $("#cartCount").textContent = cantidadTotal();
  $("#cartTotal").textContent = CLP(totalCarrito());
  const cont = $("#cartItems");
  if(!items.length){
    const vacio = modo === "restaurante" ? "Agrega platos del menú." : "Agrega productos del catálogo.";
    cont.innerHTML = `<p class="cart-empty">Tu carrito está vacío.<br>${vacio}</p>`;
  } else {
    cont.innerHTML = items.map(i => `
      <div class="cart-item">
        <div class="ci-thumb">${i.img ? `<img src="${i.img}" alt="">` : PH_LOGO}</div>
        <div class="ci-info">
          <h4>${i.nombre}</h4>
          <span class="ci-price">${CLP(i.precio)} c/u</span>
          <div class="qty"><button data-dec="${i.id}" aria-label="Quitar uno">−</button><span>${i.cantidad}</span><button data-inc="${i.id}" aria-label="Agregar uno">+</button></div>
        </div>
        <button class="ci-remove" data-rem="${i.id}">Quitar</button>
      </div>`).join("");
    cont.querySelectorAll("[data-inc]").forEach(b => b.onclick = () => cambiarCantidad(b.dataset.inc, 1));
    cont.querySelectorAll("[data-dec]").forEach(b => b.onclick = () => cambiarCantidad(b.dataset.dec, -1));
    cont.querySelectorAll("[data-rem]").forEach(b => b.onclick = () => eliminarItem(b.dataset.rem));
  }
  actualizarLinkWhatsapp();
}

function actualizarLinkWhatsapp(){
  const items = itemsCarrito();
  const esResto = modo === "restaurante";
  let texto;
  if(!items.length){
    texto = esResto ? "Hola Antümalen, quiero hacer un pedido al restaurante." : "Hola Antümalen, quiero hacer un pedido en la tienda.";
  } else {
    const lineas = items.map(i => `• ${i.cantidad}x ${i.nombre} — ${CLP(i.precio * i.cantidad)}`);
    const cab = esResto ? "¡Hola Antümalen! 🍽️ Quiero pedir del restaurante:" : "¡Hola Antümalen! 🐾 Quiero pedir de la tienda:";
    texto = `${cab}\n\n${lineas.join("\n")}\n\nTotal aprox: ${CLP(totalCarrito())}\n\n¿Me confirman disponibilidad y entrega? 🙂`;
  }
  $("#cartWhatsapp").href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

// ---------- Abrir / cerrar carrito ----------
function abrirCarrito(){ $("#cartDrawer").classList.add("open"); $("#cartDrawer").setAttribute("aria-hidden","false"); $("#cartOverlay").hidden = false; document.body.style.overflow = "hidden"; }
function cerrarCarrito(){ $("#cartDrawer").classList.remove("open"); $("#cartDrawer").setAttribute("aria-hidden","true"); $("#cartOverlay").hidden = true; document.body.style.overflow = ""; }

// ---------- Reveal al hacer scroll ----------
let revealObserver;
function observarReveal(){
  if(!revealObserver){
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); revealObserver.unobserve(e.target); } });
    }, { threshold:.12 });
  }
  $$(".reveal:not(.in)").forEach(el => revealObserver.observe(el));
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderCategorias();
  renderFiltros(); renderProductos();
  renderMenuFiltros(); renderMenu();

  // Botones de cambio de modo (header + footer)
  $$("[data-set-mode]").forEach(b => b.addEventListener("click", e => {
    e.preventDefault();
    setMode(b.dataset.setMode);
    window.scrollTo({ top:0, behavior:"smooth" });
  }));

  setMode(modo); // aplica modo guardado + pinta carrito

  $("#cartBtn").addEventListener("click", abrirCarrito);
  $("#cartClose").addEventListener("click", cerrarCarrito);
  $("#cartOverlay").addEventListener("click", cerrarCarrito);
  document.addEventListener("keydown", e => { if(e.key === "Escape") cerrarCarrito(); });

  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  $("#year").textContent = new Date().getFullYear();
  observarReveal();
});
