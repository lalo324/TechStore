
<template>
  <header class="navbar">
    <div class="nav-container">

      <!-- LOGOTIPO -->
      <RouterLink to="/inicio" class="logo">
        💻 TechStore
      </RouterLink>

      <!-- MENÚ DE NAVEGACIÓN -->
      <nav class="nav-links">
        <RouterLink to="/inicio" class="nav-link">
          Inicio
        </RouterLink>

        <RouterLink to="/productos" class="nav-link">
          Productos
        </RouterLink>

        <RouterLink to="/productos/crear" class="nav-link">
          Crear producto
        </RouterLink>

        <RouterLink to="/carrito" class="cart-link">
          🛒 Carrito
          <span class="cart-count">
            {{ carrito.cantidadProductos }}
          </span>
        </RouterLink>
      </nav>

    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useCarritoStore } from '../stores/carrito'

const carrito = useCarritoStore()
</script>
