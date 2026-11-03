
<template>
  <main class="contenedor carrito">
    <h1>Mi carrito 🛒</h1>

    <div v-if="carrito.items.length === 0" class="carrito-vacio">
      <h2>Tu carrito está vacío</h2>
      <p>Agrega productos desde nuestro catálogo.</p>
      <router-link to="/productos" class="btn-volver">
        Ver productos
      </router-link>
    </div>

    <div v-else>
      <article
        v-for="producto in carrito.items"
        :key="producto.id"
        class="carrito-producto"
      >
        <div>
          <h3>{{ producto.nombre }}</h3>
          <p>Precio: ${{ Number(producto.precio).toLocaleString('es-MX') }}</p>
          <p>Cantidad: {{ producto.cantidad }}</p>
          <strong>
            Subtotal: ${{
              (Number(producto.precio) * producto.cantidad).toLocaleString('es-MX')
            }}
          </strong>
        </div>

        <button
          class="btn-eliminar"
          @click="carrito.eliminarDelCarrito(producto.id)"
        >
          Eliminar
        </button>
      </article>

      <section class="carrito-resumen">
        <h2>
          Total: ${{ carrito.total.toLocaleString('es-MX') }}
        </h2>

        <button class="btn-vaciar" @click="carrito.vaciarCarrito">
          Vaciar carrito
        </button>
      </section>
    </div>
  </main>
</template>

<script setup>
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()
</script>

<style scoped>
.carrito {
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
}

.carrito-vacio {
  text-align: center;
  padding: 50px 20px;
  background: #f5f7fb;
  border-radius: 15px;
  margin-top: 25px;
}

.carrito-producto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 22px;
  margin: 18px 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.carrito-resumen {
  text-align: right;
  padding: 20px;
  background: #f5f7fb;
  border-radius: 12px;
}

.btn-volver,
.btn-eliminar,
.btn-vaciar {
  display: inline-block;
  padding: 11px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.btn-volver {
  background: #2563eb;
  color: white;
}

.btn-eliminar {
  background: #dc2626;
  color: white;
}

.btn-vaciar {
  background: #1e293b;
  color: white;
}
</style>
