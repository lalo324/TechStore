
import { createRouter, createWebHashHistory } from 'vue-router'

import Bienvenida from '../views/Bienvenida.vue'
import Inicio from '../views/Inicio.vue'
import Productos from '../views/Productos.vue'
import CrearProducto from '../views/CrearProducto.vue'
import DetalleProducto from '../views/DetalleProducto.vue'
import Carrito from '../views/Carrito.vue'

const routes = [
  {
    path: '/',
    name: 'bienvenida',
    component: Bienvenida
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: Inicio
  },
  {
    path: '/productos',
    name: 'productos',
    component: Productos
  },
  {
    path: '/productos/crear',
    name: 'crear-producto',
    component: CrearProducto
  },
  {
    path: '/productos/:id',
    name: 'detalle-producto',
    component: DetalleProducto
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: Carrito
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
