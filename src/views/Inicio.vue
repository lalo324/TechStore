
<template>
  <main class="home-page">

    <!-- HERO PRINCIPAL -->
    <section class="hero-section">
      <div class="hero-content">
        <span class="hero-label">
          <span class="live-dot"></span>
          BIENVENIDO A TECHSTORE
        </span>

        <h1>
          La tecnología que
          <span>impulsa tu mundo.</span>
        </h1>

        <p>
          Descubre dispositivos, accesorios y soluciones tecnológicas
          diseñadas para llevar tu experiencia al siguiente nivel.
        </p>

        <div class="hero-actions">
          <RouterLink to="/productos" class="hero-primary">
            Explorar productos <span>→</span>
          </RouterLink>

          <RouterLink to="/productos/crear" class="hero-secondary">
            Publicar producto
          </RouterLink>
        </div>

        <div class="hero-note">
          <span>✦</span>
          Innovación, calidad y tecnología en un solo lugar.
        </div>
      </div>

      <div class="hero-visual">
        <div class="visual-glow"></div>
        <div class="visual-circle circle-one"></div>
        <div class="visual-circle circle-two"></div>

        <div class="floating-card card-top">
          <span class="floating-icon">⚡</span>
          <div>
            <strong>Alto rendimiento</strong>
            <small>Tecnología actual</small>
          </div>
        </div>

        <div class="tech-illustration">
          <div class="laptop-screen">
            <div class="screen-camera"></div>
            <div class="screen-content">
              <span class="screen-logo">T</span>
              <strong>TECHSTORE</strong>
              <small>TECHNOLOGY EXPERIENCE</small>
              <div class="screen-line"></div>
              <div class="screen-line short"></div>
            </div>
          </div>
          <div class="laptop-base"></div>
        </div>

        <div class="floating-card card-bottom">
          <span class="floating-icon">✦</span>
          <div>
            <strong>Explora lo nuevo</strong>
            <small>Encuentra tu próximo equipo</small>
          </div>
        </div>

        <div class="visual-caption">TECHNOLOGY / 2026</div>
      </div>

      <div class="hero-decoration">TECH</div>
    </section>

    <!-- BENEFICIOS -->
    <section class="benefits-section">
      <article class="benefit-card">
        <div class="benefit-icon">🚀</div>
        <div>
          <strong>Todo en un solo lugar</strong>
          <p>Encuentra tecnología para cada necesidad.</p>
        </div>
      </article>

      <article class="benefit-card">
        <div class="benefit-icon">🛡️</div>
        <div>
          <strong>Compra con confianza</strong>
          <p>Consulta los detalles de cada producto.</p>
        </div>
      </article>

      <article class="benefit-card">
        <div class="benefit-icon">💎</div>
        <div>
          <strong>Calidad tecnológica</strong>
          <p>Descubre opciones para tu día a día.</p>
        </div>
      </article>

      <article class="benefit-card">
        <div class="benefit-icon">🎯</div>
        <div>
          <strong>Fácil de explorar</strong>
          <p>Encuentra rápidamente lo que buscas.</p>
        </div>
      </article>
    </section>

    <!-- CATEGORÍAS -->
    <section class="categories-section">
      <div class="section-title">
        <div>
          <span class="eyebrow">EXPLORA TECHSTORE</span>
          <h2>Encuentra tu categoría</h2>
          <p>Todo lo que necesitas para conectarte con la tecnología.</p>
        </div>

        <RouterLink to="/productos" class="view-all">
          Ver catálogo <span>→</span>
        </RouterLink>
      </div>

      <div class="categories-grid">
        <RouterLink
          v-for="categoria in categorias"
          :key="categoria.nombre"
          to="/productos"
          class="category-card"
        >
          <div class="category-icon">{{ categoria.icono }}</div>
          <strong>{{ categoria.nombre }}</strong>
          <small>{{ categoria.total }} productos</small>
          <span class="category-arrow">↗</span>
        </RouterLink>

        <RouterLink to="/productos" class="category-card all-category">
          <div class="category-icon">✦</div>
          <strong>Ver todo</strong>
          <small>{{ tienda.productos.length }} productos</small>
          <span class="category-arrow">↗</span>
        </RouterLink>
      </div>
    </section>

    <!-- PRODUCTOS DESTACADOS -->
    <section class="products-section">
      <div class="section-title">
        <div>
          <span class="eyebrow">SELECCIÓN TECHSTORE</span>
          <h2>Productos destacados</h2>
          <p>Descubre algunos de nuestros productos disponibles.</p>
        </div>

        <RouterLink to="/productos" class="view-all">
          Ver todos <span>→</span>
        </RouterLink>
      </div>

      <div v-if="productosDestacados.length" class="products-grid">
        <article
          v-for="producto in productosDestacados"
          :key="producto.id"
          class="product-card"
        >
          <RouterLink
            :to="`/productos/${producto.id}`"
            class="product-image"
          >
            <img
              v-if="producto.imagen"
              :src="producto.imagen"
              :alt="producto.nombre"
              @error="ocultarImagen"
            />

            <div v-else class="image-placeholder">▦</div>

            <span class="product-tag">TECHSTORE</span>
            <span class="image-overlay">Ver producto ↗</span>
          </RouterLink>

          <div class="product-details">
            <small class="product-category">
              {{ producto.categoria || 'Tecnología' }}
            </small>

            <RouterLink
              :to="`/productos/${producto.id}`"
              class="product-name"
            >
              {{ producto.nombre }}
            </RouterLink>

            <p class="product-description">
              {{ producto.descripcion || 'Descubre este producto en TechStore.' }}
            </p>

            <div class="product-bottom">
              <div>
                <small>Precio</small>
                <strong>{{ formatoPrecio(producto.precio) }}</strong>
              </div>

              <button
                class="add-cart-button"
                @click="agregarAlCarrito(producto)"
                :aria-label="`Agregar ${producto.nombre} al carrito`"
                title="Agregar al carrito"
              >
                +
              </button>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="empty-products">
        <div class="empty-icon">▦</div>
        <h3>Tu tienda está comenzando</h3>
        <p>Agrega productos para mostrarlos en esta sección.</p>

        <RouterLink to="/productos/crear" class="hero-button">
          Agregar producto →
        </RouterLink>
      </div>
    </section>

    <!-- FRASE PROMOCIONAL -->
    <section class="promo-strip">
      <div class="promo-icon">✧</div>
      <div>
        <span>EL FUTURO ESTÁ EN TUS MANOS</span>
        <h2>Actualiza tu mundo. Conecta con lo nuevo.</h2>
      </div>
      <RouterLink to="/productos" class="promo-button">
        Descubrir productos →
      </RouterLink>
    </section>

    <!-- TENDENCIAS -->
    <section class="trending-section">
      <div class="section-title">
        <div>
          <span class="eyebrow">DESCUBRE MÁS</span>
          <h2>Tendencias en TechStore</h2>
          <p>Más opciones para encontrar tu próximo favorito.</p>
        </div>

        <RouterLink to="/productos" class="view-all">
          Explorar <span>→</span>
        </RouterLink>
      </div>

      <div v-if="productosTendencia.length" class="trending-grid">
        <article
          v-for="producto in productosTendencia"
          :key="producto.id"
          class="trending-card"
        >
          <RouterLink
            :to="`/productos/${producto.id}`"
            class="trending-image"
          >
            <img
              v-if="producto.imagen"
              :src="producto.imagen"
              :alt="producto.nombre"
              @error="ocultarImagen"
            />

            <div v-else class="image-placeholder">▦</div>
          </RouterLink>

          <div class="trending-info">
            <span>{{ producto.categoria || 'Tecnología' }}</span>

            <RouterLink :to="`/productos/${producto.id}`">
              {{ producto.nombre }}
            </RouterLink>

            <strong>{{ formatoPrecio(producto.precio) }}</strong>
          </div>
        </article>
      </div>

      <div v-else class="empty-trending">
        Pronto encontrarás más productos en esta sección.
      </div>
    </section>

    <!-- BANNER FINAL -->
    <section class="final-banner">
      <div class="final-content">
        <span class="eyebrow">TU EXPERIENCIA TECNOLÓGICA COMIENZA AQUÍ</span>
        <h2>La innovación no espera.<br />¿Y tú?</h2>
        <p>
          Explora nuestro catálogo y encuentra la tecnología
          que acompaña tus ideas.
        </p>

        <RouterLink to="/productos" class="final-button">
          Explorar catálogo <span>→</span>
        </RouterLink>
      </div>

      <div class="final-decoration">
        <span>TECH</span>
        <div class="final-orbit orbit-one"></div>
        <div class="final-orbit orbit-two"></div>
        <div class="final-orbit orbit-three"></div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="home-footer">
      <div class="footer-main">
        <div class="footer-brand">
          <span class="footer-logo">💻 TECHSTORE</span>
          <p>Innovación y tecnología para tu día a día.</p>
        </div>

        <div class="footer-links">
          <RouterLink to="/inicio">Inicio</RouterLink>
          <RouterLink to="/productos">Productos</RouterLink>
          <RouterLink to="/productos/crear">Crear producto</RouterLink>
          <RouterLink to="/carrito">Carrito</RouterLink>
        </div>
      </div>

      <div class="footer-bottom">
        <small>
          © {{ new Date().getFullYear() }} TechStore.
          Todos los derechos reservados.
        </small>
        <span>DISEÑADO PARA LOS AMANTES DE LA TECNOLOGÍA ✦</span>
      </div>
    </footer>

  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductosStore } from '../stores/productos'
import { useCarritoStore } from '../stores/carrito'

const tienda = useProductosStore()
const carrito = useCarritoStore()

const productosDestacados = computed(() =>
  tienda.productos.slice(0, 5)
)

const productosTendencia = computed(() =>
  tienda.productos.slice(-5).reverse()
)

const categorias = computed(() => {
  const iconos = {
    Computadoras: '💻',
    Laptops: '💻',
    Accesorios: '🎧',
    Celulares: '📱',
    Smartphones: '📱',
    Audio: '🎧',
    Periféricos: '⌨️',
    Tablets: '📱',
    General: '✦'
  }

  const grupos = {}

  tienda.productos.forEach(producto => {
    const nombre = producto.categoria || 'General'
    grupos[nombre] = (grupos[nombre] || 0) + 1
  })

  return Object.entries(grupos)
    .slice(0, 7)
    .map(([nombre, total]) => ({
      nombre,
      total,
      icono: iconos[nombre] || '▦'
    }))
})

function formatoPrecio(precio) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2
  }).format(Number(precio) || 0)
}

function agregarAlCarrito(producto) {
  carrito.agregarAlCarrito(producto)
  alert(`${producto.nombre} se agregó al carrito.`)
}

function ocultarImagen(evento) {
  evento.target.style.display = 'none'
}
</script>

<style scoped>
/* BASE */
.home-page {
  --blue: #3185ff;
  --blue-light: #78b4ff;
  --panel: #202433;
  --panel-light: #252b3d;
  --line: rgba(148, 163, 184, .14);

  width: 100%;
  min-height: 100vh;
  padding: 35px 0 0;
  overflow: hidden;
  color: #f8fafc;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(35, 92, 180, .13), transparent 40%),
    #191a24;
}

.home-page,
.home-page * {
  box-sizing: border-box;
}

.home-page section {
  width: 100%;
  max-width: 1400px;
  margin-right: auto;
  margin-left: auto;
  padding-right: clamp(20px, 4vw, 65px);
  padding-left: clamp(20px, 4vw, 65px);
  margin-bottom: 0;
}

/* HERO */
.hero-section {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  align-items: center;
  min-height: 440px;
  margin-bottom: 30px !important;
  overflow: hidden;
  border: 1px solid rgba(89, 145, 255, .18);
  border-radius: 20px;
  background:
    radial-gradient(circle at 78% 48%, rgba(29, 105, 226, .28), transparent 34%),
    linear-gradient(115deg, #101725 0%, #111d35 58%, #102c5a 100%);
  box-shadow: 0 25px 65px rgba(0, 0, 0, .2);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 45px 0 45px 35px;
}

.hero-label {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #8dbdff;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.live-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #45a4ff;
  box-shadow: 0 0 12px #3185ff;
}

.hero-content h1 {
  max-width: 590px;
  margin: 23px 0 16px;
  color: #fff;
  font-size: clamp(38px, 4.5vw, 62px);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: -2.5px;
}

.hero-content h1 span {
  display: block;
  color: #66aaff;
}

.hero-content > p {
  max-width: 480px;
  margin: 0;
  color: #b8c7dc;
  font-size: 14px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 27px;
}

.hero-primary,
.hero-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 45px;
  padding: 0 20px;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 850;
  text-decoration: none;
  transition: .25s;
}

.hero-primary {
  color: white;
  background: linear-gradient(110deg, #278bff, #1557c9);
  box-shadow: 0 7px 20px rgba(27, 112, 240, .23);
}

.hero-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(27, 112, 240, .35);
}

.hero-primary span {
  font-size: 19px;
}

.hero-secondary {
  color: #dceaff;
  border: 1px solid rgba(180, 208, 255, .4);
  background: rgba(255, 255, 255, .04);
}

.hero-secondary:hover {
  border-color: #70adff;
  background: rgba(55, 125, 230, .15);
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 32px;
  color: #91a6c5;
  font-size: 10px;
}

.hero-note span {
  color: #60a5fa;
  font-size: 17px;
}

.hero-visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 410px;
}

.visual-glow {
  position: absolute;
  width: 310px;
  height: 310px;
  border-radius: 50%;
  background: rgba(30, 112, 255, .18);
  filter: blur(65px);
}

.visual-circle {
  position: absolute;
  border: 1px solid rgba(114, 174, 255, .2);
  border-radius: 50%;
}

.circle-one {
  width: 330px;
  height: 330px;
}

.circle-two {
  width: 260px;
  height: 260px;
}

.tech-illustration {
  position: relative;
  z-index: 1;
  width: min(85%, 420px);
  transform: perspective(800px) rotateY(-13deg) rotateX(3deg);
  filter: drop-shadow(0 25px 22px rgba(0, 0, 0, .4));
}

.laptop-screen {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1.45;
  padding: 12px;
  border: 7px solid #9ba9bb;
  border-bottom-width: 10px;
  border-radius: 13px 13px 5px 5px;
  background: #080d19;
  box-shadow: inset 0 0 0 2px #26384d;
}

.screen-camera {
  position: absolute;
  top: 3px;
  left: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #64748b;
}

.screen-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background:
    radial-gradient(circle at 50% 40%, rgba(42, 132, 255, .4), transparent 45%),
    linear-gradient(140deg, #071a39, #0d3473 55%, #07152d);
}

.screen-logo {
  display: grid;
  width: 57px;
  height: 57px;
  margin-bottom: 12px;
  place-items: center;
  border: 2px solid #79b5ff;
  border-radius: 15px;
  color: white;
  font-size: 32px;
  font-weight: 900;
  box-shadow: 0 0 28px rgba(53, 141, 255, .45);
}

.screen-content strong {
  color: white;
  font-size: 18px;
  letter-spacing: 3px;
}

.screen-content small {
  margin-top: 7px;
  color: #91bdff;
  font-size: 7px;
  letter-spacing: 2px;
}

.screen-line {
  width: 65px;
  height: 3px;
  margin-top: 17px;
  border-radius: 10px;
  background: #328dff;
}

.screen-line.short {
  width: 35px;
  margin-top: 7px;
  opacity: .5;
}

.laptop-base {
  width: 112%;
  height: 17px;
  margin-left: -6%;
  border-radius: 2px 2px 18px 18px;
  background: linear-gradient(#dce5f0, #75879d 65%, #39485b);
  box-shadow: 0 12px 12px rgba(0, 0, 0, .3);
}

.floating-card {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid rgba(135, 183, 255, .25);
  border-radius: 9px;
  background: rgba(20, 33, 57, .9);
  box-shadow: 0 10px 30px rgba(0, 0, 0, .2);
  backdrop-filter: blur(10px);
}

.card-top {
  top: 65px;
  right: 5px;
}

.card-bottom {
  bottom: 55px;
  left: 0;
}

.floating-icon {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 8px;
  color: #a6ceff;
  background: #203c68;
  font-size: 18px;
}

.floating-card strong,
.floating-card small {
  display: block;
}

.floating-card strong {
  color: white;
  font-size: 10px;
}

.floating-card small {
  margin-top: 4px;
  color: #91a5c2;
  font-size: 8px;
}

.visual-caption {
  position: absolute;
  right: 15px;
  bottom: 20px;
  color: rgba(173, 202, 242, .5);
  font-size: 8px;
  letter-spacing: 2px;
}

.hero-decoration {
  position: absolute;
  right: 15px;
  bottom: -42px;
  color: rgba(255, 255, 255, .025);
  font-size: 100px;
  font-weight: 900;
  letter-spacing: -7px;
  pointer-events: none;
}

/* BENEFICIOS */
.benefits-section {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 13px;
  margin-bottom: 65px !important;
}

.benefit-card {
  display: flex;
  align-items: center;
  gap: 13px;
  min-height: 85px;
  padding: 17px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: linear-gradient(145deg, #222a3b, #1e2230);
  transition: .25s;
}

.benefit-card:hover {
  transform: translateY(-4px);
  border-color: rgba(72, 146, 255, .5);
}

.benefit-icon {
  display: grid;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 10px;
  color: #8ec0ff;
  background: rgba(51, 119, 211, .17);
  font-size: 20px;
}

.benefit-card strong {
  display: block;
  color: #f1f5fb;
  font-size: 10px;
}

.benefit-card p {
  margin: 5px 0 0;
  color: #929fb5;
  font-size: 9px;
  line-height: 1.5;
}

/* ENCABEZADOS */
.eyebrow {
  color: #69aaff;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 2px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 23px;
}

.section-title h2 {
  margin: 8px 0 0;
  color: #f8fafc;
  font-size: 26px;
  font-weight: 850;
  letter-spacing: -.8px;
}

.section-title p {
  margin: 8px 0 0;
  color: #909db2;
  font-size: 11px;
}

.view-all {
  flex-shrink: 0;
  color: #9bc4ff;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
  transition: .2s;
}

.view-all:hover {
  color: white;
}

/* CATEGORÍAS */
.categories-section,
.products-section,
.trending-section {
  margin-bottom: 65px !important;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
}

.category-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 145px;
  padding: 20px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 11px;
  background: linear-gradient(145deg, #242b3b, #202331);
  text-decoration: none;
  transition: .25s;
}

.category-card:hover {
  transform: translateY(-5px);
  border-color: #367fe2;
  background: linear-gradient(145deg, #293b59, #222a3b);
}

.category-icon {
  display: grid;
  width: 43px;
  height: 43px;
  margin-bottom: 15px;
  place-items: center;
  border-radius: 11px;
  color: #91c2ff;
  background: rgba(50, 119, 215, .18);
  font-size: 22px;
}

.category-card strong {
  color: white;
  font-size: 11px;
}

.category-card small {
  margin-top: 6px;
  color: #8998b1;
  font-size: 9px;
}

.category-arrow {
  position: absolute;
  top: 19px;
  right: 18px;
  color: #6daaff;
  font-size: 17px;
}

/* PRODUCTOS */
.products-grid,
.trending-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 15px;
}

.product-card,
.trending-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 11px;
  background: #222635;
  transition: .25s;
}

.product-card:hover,
.trending-card:hover {
  transform: translateY(-5px);
  border-color: rgba(72, 146, 255, .7);
  box-shadow: 0 12px 30px rgba(0, 0, 0, .2);
}

.product-image,
.trending-image {
  position: relative;
  display: block;
  height: 185px;
  overflow: hidden;
  background: #2b3140;
}

.product-image img,
.trending-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .4s;
}

.product-card:hover img,
.trending-card:hover img {
  transform: scale(1.06);
}

.product-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 8px;
  border-radius: 4px;
  color: white;
  background: rgba(12, 27, 49, .9);
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .5px;
}

.image-overlay {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 7px 10px;
  border-radius: 5px;
  color: white;
  background: rgba(17, 74, 145, .9);
  font-size: 9px;
  font-weight: 800;
  opacity: 0;
  transform: translateY(5px);
  transition: .25s;
}

.product-card:hover .image-overlay {
  opacity: 1;
  transform: translateY(0);
}

.product-details,
.trending-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
}

.product-category,
.trending-info > span {
  color: #8da4c4;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: .6px;
}

.product-name,
.trending-info a {
  display: block;
  min-height: 32px;
  color: #f1f5f9;
  font-size: 12px;
  font-weight: 800;
  text-decoration: none;
}

.product-name:hover,
.trending-info a:hover {
  color: #83baff;
}

.product-description {
  display: -webkit-box;
  min-height: 32px;
  overflow: hidden;
  margin: 0;
  color: #8997ac;
  font-size: 9px;
  line-height: 1.6;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}

.product-bottom > div small {
  display: block;
  margin-bottom: 4px;
  color: #8593a9;
  font-size: 8px;
}

.product-bottom strong,
.trending-info strong {
  color: white;
  font-size: 13px;
}

.add-cart-button {
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  place-items: center;
  border: 0;
  border-radius: 7px;
  color: white;
  background: linear-gradient(135deg, #368eff, #1761d1);
  font-size: 23px;
  cursor: pointer;
  transition: .2s;
}

.add-cart-button:hover {
  transform: scale(1.08);
  background: #4a9cff;
}

.image-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: #7faeff;
  background: #292d3b;
  font-size: 40px;
}

/* SIN PRODUCTOS */
.empty-products,
.empty-trending {
  padding: 50px 20px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #222635;
  text-align: center;
}

.empty-icon {
  color: #75aaff;
  font-size: 42px;
}

.empty-products h3 {
  color: white;
}

.empty-products p,
.empty-trending {
  color: #9ca9bd;
  font-size: 12px;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  padding: 12px 18px;
  border-radius: 6px;
  color: white;
  background: #2782ec;
  font-size: 11px;
  font-weight: 800;
  text-decoration: none;
}

/* FRANJA PROMOCIONAL */
.promo-strip {
  display: flex;
  align-items: center;
  gap: 20px;
  min-height: 115px;
  margin-bottom: 65px !important;
  padding-top: 22px;
  padding-bottom: 22px;
  border: 1px solid rgba(86, 151, 255, .22);
  border-radius: 12px;
  background:
    radial-gradient(circle at 5% 50%, rgba(52, 133, 255, .2), transparent 35%),
    linear-gradient(100deg, #142744, #172c4b);
}

.promo-icon {
  display: grid;
  flex: 0 0 48px;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 12px;
  color: #b2d4ff;
  background: rgba(57, 132, 241, .18);
  font-size: 27px;
}

.promo-strip > div:nth-child(2) {
  flex: 1;
}

.promo-strip > div:nth-child(2) span {
  color: #82baff;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.promo-strip h2 {
  margin: 7px 0 0;
  color: white;
  font-size: 18px;
}

.promo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 17px;
  border: 1px solid rgba(183, 211, 255, .4);
  border-radius: 6px;
  color: white;
  font-size: 10px;
  font-weight: 800;
  text-decoration: none;
  transition: .2s;
}

.promo-button:hover {
  background: #2879df;
}

/* TENDENCIAS */
.trending-image {
  height: 180px;
}

.trending-info strong {
  margin-top: 5px;
  color: #a9c9ff;
}

/* BANNER FINAL */
.final-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 260px;
  margin-bottom: 55px !important;
  overflow: hidden;
  border: 1px solid rgba(86, 151, 255, .22);
  border-radius: 14px;
  background:
    radial-gradient(circle at 85% 40%, rgba(48, 126, 238, .3), transparent 28%),
    linear-gradient(110deg, #102544, #1a4582);
}

.final-content {
  position: relative;
  z-index: 2;
  padding-top: 30px;
  padding-bottom: 30px;
}

.final-banner h2 {
  margin: 12px 0;
  color: white;
  font-size: clamp(25px, 3vw, 35px);
  line-height: 1.2;
}

.final-banner p {
  max-width: 480px;
  color: #c5d8f1;
  font-size: 12px;
  line-height: 1.7;
}

.final-button {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  margin-top: 13px;
  padding: 12px 17px;
  border-radius: 6px;
  color: #12315a;
  background: white;
  font-size: 10px;
  font-weight: 900;
  text-decoration: none;
  transition: .2s;
}

.final-button:hover {
  transform: translateY(-3px);
  background: #e2efff;
}

.final-button span {
  font-size: 17px;
}

.final-decoration {
  position: relative;
  display: grid;
  width: 280px;
  height: 220px;
  flex: 0 0 280px;
  place-items: center;
}

.final-decoration > span {
  z-index: 2;
  color: rgba(255, 255, 255, .9);
  font-size: 46px;
  font-weight: 900;
  letter-spacing: -3px;
}

.final-orbit {
  position: absolute;
  border: 1px solid rgba(175, 211, 255, .25);
  border-radius: 50%;
}

.orbit-one {
  width: 170px;
  height: 170px;
}

.orbit-two {
  width: 220px;
  height: 120px;
  transform: rotate(45deg);
}

.orbit-three {
  width: 250px;
  height: 90px;
  transform: rotate(-40deg);
}

/* FOOTER */
.home-footer {
  width: 100%;
  padding: 32px max(30px, calc((100% - 1270px) / 2));
  border-top: 1px solid #2a2c38;
  background: #141620;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

.footer-logo {
  color: white;
  font-size: 17px;
  font-weight: 900;
}

.footer-brand p {
  margin: 7px 0 0;
  color: #8994a8;
  font-size: 10px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}

.footer-links a {
  color: #b4bdcd;
  font-size: 10px;
  text-decoration: none;
  transition: .2s;
}

.footer-links a:hover {
  color: #73aaff;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 25px;
  padding-top: 18px;
  border-top: 1px solid #292b37;
}

.footer-bottom small,
.footer-bottom span {
  color: #758096;
  font-size: 8px;
  letter-spacing: .5px;
}

/* TABLETS */
@media (max-width: 1050px) {
  .hero-section {
    grid-template-columns: 1fr .8fr;
  }

  .hero-content h1 {
    font-size: 43px;
  }

  .benefits-section {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .categories-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .products-grid,
  .trending-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .card-top {
    right: 0;
  }
}

/* CELULARES */
@media (max-width: 650px) {
  .home-page {
    padding-top: 20px;
  }

  .hero-section {
    grid-template-columns: 1fr;
    min-height: auto;
    border-radius: 12px;
  }

  .hero-content {
    padding: 30px 22px 5px;
  }

  .hero-content h1 {
    margin-top: 17px;
    font-size: 39px;
    letter-spacing: -1.7px;
  }

  .hero-content > p {
    font-size: 12px;
  }

  .hero-note {
    margin-top: 20px;
    font-size: 9px;
  }

  .hero-visual {
    min-height: 280px;
  }

  .tech-illustration {
    width: 75%;
  }

  .card-top {
    top: 20px;
    right: 5px;
  }

  .card-bottom {
    bottom: 25px;
    left: 5px;
  }

  .floating-card {
    padding: 8px;
  }

  .floating-card strong {
    font-size: 8px;
  }

  .floating-card small {
    font-size: 7px;
  }

  .benefits-section {
    gap: 9px;
    margin-bottom: 45px !important;
  }

  .benefit-card {
    min-height: 78px;
    gap: 8px;
    padding: 10px;
  }

  .benefit-icon {
    flex-basis: 34px;
    width: 34px;
    height: 34px;
    font-size: 16px;
  }

  .benefit-card strong {
    font-size: 9px;
  }

  .benefit-card p {
    font-size: 8px;
  }

  .categories-section,
  .products-section,
  .trending-section {
    margin-bottom: 45px !important;
  }

  .section-title {
    align-items: flex-start;
  }

  .section-title h2 {
    font-size: 21px;
  }

  .section-title p {
    max-width: 260px;
    font-size: 9px;
  }

  .categories-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .category-card {
    min-height: 125px;
    padding: 14px;
  }

  .products-grid,
  .trending-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .product-image,
  .trending-image {
    height: 135px;
  }

  .product-details,
  .trending-info {
    padding: 11px;
  }

  .product-name,
  .trending-info a {
    font-size: 10px;
  }

  .product-bottom strong,
  .trending-info strong {
    font-size: 11px;
  }

  .product-description {
    font-size: 8px;
  }

  .promo-strip {
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 45px !important;
  }

  .promo-strip h2 {
    font-size: 14px;
  }

  .promo-button {
    width: 100%;
  }

  .final-banner {
    min-height: 230px;
    margin-bottom: 35px !important;
  }

  .final-decoration {
    display: none;
  }

  .final-banner h2 {
    font-size: 26px;
  }

  .footer-main,
  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-links {
    gap: 15px;
  }
}

/* ANIMACIONES Y ACCESIBILIDAD */
@keyframes heroAppear {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-content,
.hero-visual,
.benefit-card,
.category-card,
.product-card {
  animation: heroAppear .55s ease both;
}

@media (prefers-reduced-motion: reduce) {
  .home-page *,
  .home-page *::before,
  .home-page *::after {
    animation: none !important;
    transition: none !important;
  }
}
</style>
