
<template>
  <main class="catalog-page">

    <!-- ENCABEZADO -->
    <section class="catalog-hero">
      <div>
        <span class="eyebrow">EXPLORA NUESTRA COLECCIÓN</span>
        <h1>Encuentra tu próxima <span>tecnología.</span></h1>
        <p>
          Descubre dispositivos y accesorios para llevar
          tu experiencia tecnológica al siguiente nivel.
        </p>
      </div>

      <router-link to="/productos/crear" class="add-button">
        <span>＋</span> Nuevo producto
      </router-link>
    </section>

    <!-- INDICADORES -->
    <section class="catalog-stats">
      <div class="stat-card">
        <span class="stat-icon">▦</span>
        <div>
          <strong>{{ tienda.productos.length }}</strong>
          <small>Productos registrados</small>
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-icon blue">⌕</span>
        <div>
          <strong>{{ productosFiltrados.length }}</strong>
          <small>Resultados encontrados</small>
        </div>
      </div>
    </section>

    <!-- BARRA DE BÚSQUEDA Y FILTROS -->
    <section class="toolbar">
      <div class="search-box">
        <span>⌕</span>
        <input
          v-model="busqueda"
          type="search"
          placeholder="Buscar laptops, mouse, teclados..."
          aria-label="Buscar productos"
        />
        <button
          v-if="busqueda"
          class="clear-search"
          @click="busqueda = ''"
          aria-label="Limpiar búsqueda"
        >
          ×
        </button>
      </div>

      <div class="filter-controls">
        <select v-model="categoriaSeleccionada" aria-label="Filtrar por categoría">
          <option value="Todas">Todas las categorías</option>
          <option
            v-for="categoria in categorias"
            :key="categoria"
            :value="categoria"
          >
            {{ categoria }}
          </option>
        </select>

        <select v-model="orden" aria-label="Ordenar productos">
          <option value="recientes">Más recientes</option>
          <option value="menor">Precio: menor a mayor</option>
          <option value="mayor">Precio: mayor a menor</option>
          <option value="nombre">Nombre: A-Z</option>
        </select>
      </div>
    </section>

    <!-- CATEGORÍAS RÁPIDAS -->
    <section class="category-section">
      <span class="category-label">CATEGORÍAS</span>

      <div class="category-list">
        <button
          class="category-chip"
          :class="{ active: categoriaSeleccionada === 'Todas' }"
          @click="categoriaSeleccionada = 'Todas'"
        >
          Todos
        </button>

        <button
          v-for="categoria in categorias"
          :key="categoria"
          class="category-chip"
          :class="{ active: categoriaSeleccionada === categoria }"
          @click="categoriaSeleccionada = categoria"
        >
          {{ categoria }}
        </button>
      </div>
    </section>

    <!-- TÍTULO DE RESULTADOS -->
    <section class="results-heading">
      <div>
        <h2>Catálogo de productos</h2>
        <p>
          Mostrando {{ productosFiltrados.length }}
          de {{ tienda.productos.length }} productos
        </p>
      </div>

      <button
        class="reset-button"
        @click="limpiarFiltros"
      >
        Limpiar filtros ↺
      </button>
    </section>

    <!-- PRODUCTOS -->
    <section
      v-if="productosFiltrados.length > 0"
      class="productos-grid"
    >
      <ProductCard
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :producto="producto"
        @agregar="agregarAlCarrito"
        @editar="editarProducto"
        @eliminar="eliminarProducto"
      />
    </section>

    <!-- SIN RESULTADOS -->
    <section
      v-else-if="tienda.productos.length > 0"
      class="empty-state"
    >
      <div class="empty-icon">⌕</div>
      <h2>No encontramos productos</h2>
      <p>
        Prueba con otro nombre o selecciona una categoría diferente.
      </p>
      <button class="add-button" @click="limpiarFiltros">
        Mostrar todos los productos
      </button>
    </section>

    <!-- CATÁLOGO VACÍO -->
    <section v-else class="empty-state">
      <div class="empty-icon">▦</div>
      <h2>Tu catálogo está esperando productos</h2>
      <p>
        Agrega tu primer producto para comenzar a construir tu tienda.
      </p>
      <router-link to="/productos/crear" class="add-button">
        ＋ Agregar primer producto
      </router-link>
    </section>

    <!-- BANNER INFERIOR -->
    <section class="catalog-footer">
      <div>
        <span>TECHSTORE</span>
        <h2>La tecnología está en tus manos.</h2>
        <p>Encuentra lo que necesitas en un solo lugar.</p>
      </div>
      <div class="footer-symbol">⌘</div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productos'
import { useCarritoStore } from '../stores/carrito'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const tienda = useProductosStore()
const carrito = useCarritoStore()

// Estado de búsqueda y filtros
const busqueda = ref('')
const categoriaSeleccionada = ref('Todas')
const orden = ref('recientes')

// Obtener categorías existentes en los productos
const categorias = computed(() => {
  return [
    ...new Set(
      tienda.productos
        .map(producto => producto.categoria)
        .filter(categoria => categoria && categoria.trim() !== '')
    )
  ].sort((a, b) => a.localeCompare(b))
})

// Buscar, filtrar y ordenar
const productosFiltrados = computed(() => {
  let resultado = [...tienda.productos]

  // Búsqueda por nombre, descripción o categoría
  if (busqueda.value.trim()) {
    const termino = busqueda.value.toLowerCase().trim()

    resultado = resultado.filter(producto =>
      [
        producto.nombre,
        producto.descripcion,
        producto.categoria
      ]
        .filter(Boolean)
        .some(valor => valor.toLowerCase().includes(termino))
    )
  }

  // Filtro por categoría
  if (categoriaSeleccionada.value !== 'Todas') {
    resultado = resultado.filter(
      producto => producto.categoria === categoriaSeleccionada.value
    )
  }

  // Ordenamiento
  switch (orden.value) {
    case 'menor':
      resultado.sort((a, b) => Number(a.precio) - Number(b.precio))
      break

    case 'mayor':
      resultado.sort((a, b) => Number(b.precio) - Number(a.precio))
      break

    case 'nombre':
      resultado.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      )
      break

    case 'recientes':
    default:
      resultado.sort((a, b) => Number(b.id) - Number(a.id))
      break
  }

  return resultado
})

// Agregar al carrito
function agregarAlCarrito(producto) {
  carrito.agregarAlCarrito(producto)
  alert(`${producto.nombre} se agregó al carrito.`)
}

// Editar producto
function editarProducto(id) {
  router.push(`/productos/${id}`)
}

// Eliminar producto
function eliminarProducto(id) {
  const confirmar = window.confirm(
    '¿Estás seguro de que deseas eliminar este producto?'
  )

  if (confirmar) {
    tienda.eliminarProducto(id)
    carrito.eliminarDelCarrito(id)
  }
}

// Restablecer filtros
function limpiarFiltros() {
  busqueda.value = ''
  categoriaSeleccionada.value = 'Todas'
  orden.value = 'recientes'
}
</script>

<style scoped>
.catalog-page {
  max-width: 1350px;
  width: 100%;
  margin: auto;
  padding: 45px 35px 35px;
}

/* ENCABEZADO */
.catalog-hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  padding: 42px;
  margin-bottom: 25px;
  border-radius: 23px;
  background: linear-gradient(120deg, #101a32, #1d3c70);
  box-shadow: 0 15px 35px rgba(15, 23, 42, .12);
}

.eyebrow {
  color: #93c5fd;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
}

.catalog-hero h1 {
  color: white;
  font-size: clamp(30px, 4vw, 43px);
  font-weight: 900;
  letter-spacing: -1.5px;
  margin: 13px 0;
}

.catalog-hero h1 span {
  color: #60a5fa;
}

.catalog-hero p {
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.7;
  max-width: 570px;
  margin: 0;
}

.add-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 14px 19px;
  color: white;
  background: #347cf0;
  border: 0;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: .25s;
}

.add-button:hover {
  color: white;
  background: #2563eb;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(37, 99, 235, .25);
}

.add-button span {
  font-size: 19px;
}

/* ESTADÍSTICAS */
.catalog-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 17px;
  margin-bottom: 28px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: white;
  border: 1px solid #e7edf5;
  border-radius: 15px;
  box-shadow: 0 5px 18px rgba(15, 23, 42, .035);
}

.stat-icon {
  width: 47px;
  height: 47px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 25px;
}

.stat-icon.blue {
  background: #e0f2fe;
  color: #0284c7;
}

.stat-card div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-card strong {
  color: #0f172a;
  font-size: 23px;
}

.stat-card small {
  color: #64748b;
  font-size: 12px;
}

/* BUSCADOR */
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 17px;
  background: white;
  border: 1px solid #e7edf5;
  border-radius: 15px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 11px;
  flex: 1;
  min-width: 180px;
  padding: 0 13px;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  background: #f8fafc;
}

.search-box > span {
  color: #64748b;
  font-size: 24px;
}

.search-box input {
  width: 100%;
  height: 44px;
  border: none;
  outline: none;
  background: transparent;
  color: #0f172a;
  font-size: 13px;
}

.clear-search {
  border: 0;
  background: transparent;
  color: #64748b;
  font-size: 22px;
  cursor: pointer;
}

.filter-controls {
  display: flex;
  gap: 10px;
}

.filter-controls select {
  min-height: 44px;
  padding: 0 12px;
  color: #334155;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 9px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}

/* CATEGORÍAS */
.category-section {
  padding: 27px 0;
}

.category-label {
  display: block;
  margin-bottom: 13px;
  color: #64748b;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.5px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.category-chip {
  padding: 10px 17px;
  border: 1px solid #e2e8f0;
  border-radius: 30px;
  background: white;
  color: #475569;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: .2s;
}

.category-chip:hover,
.category-chip.active {
  color: white;
  background: #2563eb;
  border-color: #2563eb;
}

/* RESULTADOS */
.results-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin: 15px 0 22px;
}

.results-heading h2 {
  color: #0f172a;
  font-size: 23px;
  margin: 0 0 5px;
}

.results-heading p {
  color: #64748b;
  font-size: 12px;
  margin: 0;
}

.reset-button {
  padding: 9px 13px;
  color: #2563eb;
  background: transparent;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
}

.reset-button:hover {
  background: #eff6ff;
}

/* CUADRÍCULA */
.productos-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 23px;
}

/* ESTADO VACÍO */
.empty-state {
  padding: 65px 20px;
  text-align: center;
  background: white;
  border: 1px solid #e7edf5;
  border-radius: 18px;
}

.empty-icon {
  width: 75px;
  height: 75px;
  display: grid;
  place-items: center;
  margin: 0 auto 20px;
  color: #2563eb;
  background: #eff6ff;
  border-radius: 20px;
  font-size: 38px;
}

.empty-state h2 {
  color: #0f172a;
  font-size: 22px;
}

.empty-state p {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 25px;
}

/* BANNER INFERIOR */
.catalog-footer {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  margin-top: 55px;
  padding: 35px 40px;
  border-radius: 19px;
  background: linear-gradient(110deg, #172554, #2563eb);
}

.catalog-footer span {
  color: #bfdbfe;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 2px;
}

.catalog-footer h2 {
  color: white;
  font-size: 24px;
  margin: 10px 0;
}

.catalog-footer p {
  color: #dbeafe;
  font-size: 13px;
  margin: 0;
}

.footer-symbol {
  color: rgba(255,255,255,.18);
  font-size: 100px;
  font-weight: 900;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .productos-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-controls select {
    flex: 1;
    min-width: 0;
  }
}

@media (max-width: 600px) {
  .catalog-page {
    padding: 25px 15px;
  }

  .catalog-hero {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 23px;
  }

  .catalog-stats {
    grid-template-columns: 1fr 1fr;
    gap: 9px;
  }

  .stat-card {
    padding: 13px 10px;
    gap: 9px;
  }

  .stat-icon {
    width: 38px;
    height: 38px;
    font-size: 20px;
  }

  .stat-card strong {
    font-size: 19px;
  }

  .stat-card small {
    font-size: 10px;
  }

  .filter-controls {
    flex-direction: column;
  }

  .productos-grid {
    grid-template-columns: 1fr;
    gap: 17px;
  }

  .results-heading h2 {
    font-size: 19px;
  }

  .catalog-footer {
    padding: 28px 22px;
  }

  .footer-symbol {
    font-size: 55px;
  }
}
/* AJUSTE DE ESPACIADO DEL CATÁLOGO */
.catalog-page > section {
  margin-bottom: 0;
}

.catalog-hero {
  margin-bottom: 25px;
}

.catalog-stats {
  margin-bottom: 25px;
}

.toolbar {
  margin-bottom: 0;
}

.category-section {
  margin-bottom: 0;
}

.results-heading {
  margin: 15px 0 22px;
}

.productos-grid {
  margin-top: 0;
}

.catalog-footer {
  margin-top: 50px;
}
</style>
