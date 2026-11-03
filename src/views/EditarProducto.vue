
<template>
  <main class="productos-page">
    <div class="productos-header">
      <h1>Nuestros productos</h1>
      <p>Encuentra la tecnología que necesitas.</p>
    </div>

    <div v-if="tienda.productos.length === 0" class="sin-productos">
      <h2>No hay productos disponibles</h2>
      <router-link to="/productos/crear">
        Agregar un producto
      </router-link>
    </div>

    <div v-else class="productos-grid">
      <ProductCard
        v-for="producto in tienda.productos"
        :key="producto.id"
        :producto="producto"
        @agregar="agregarAlCarrito"
        @editar="editarProducto"
        @eliminar="eliminarProducto"
      />
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { useTiendaStore } from '../stores/productos'
import { useCarritoStore } from '../stores/carrito'

const router = useRouter()
const tienda = useTiendaStore()
const carrito = useCarritoStore()

function agregarAlCarrito(producto) {
  carrito.agregarAlCarrito(producto)
  alert(`${producto.nombre} se agregó al carrito`)
}

function editarProducto(id) {
  router.push(`/productos/${id}`)
}

function eliminarProducto(id) {
  const confirmar = window.confirm('¿Seguro que deseas eliminar este producto?')

  if (confirmar) {
    tienda.eliminarProducto(id)
    carrito.eliminarDelCarrito(id)
  }
}
</script>

<style scoped>
.productos-page {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
}

.productos-header {
  margin-bottom: 30px;
}

.productos-header h1 {
  font-size: 2rem;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
}

.sin-productos {
  padding: 40px;
  text-align: center;
}
</style>
