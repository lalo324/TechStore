import { defineStore } from 'pinia'

const STORAGE_KEY = 'techstore_carrito'

function cargarCarrito() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    return guardado ? JSON.parse(guardado) : []
  } catch (error) {
    console.error('Error al cargar el carrito:', error)
    return []
  }
}

export const useCarritoStore = defineStore('carrito', {
  state: () => ({
    items: cargarCarrito()
  }),

  getters: {
    total: (state) =>
      state.items.reduce(
        (acumulado, item) => acumulado + item.precio * item.cantidad,
        0
      ),

    cantidadProductos: (state) =>
      state.items.reduce(
        (acumulado, item) => acumulado + item.cantidad,
        0
      )
  },

  actions: {
    guardarEnStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
    },

    agregarAlCarrito(producto) {
      const existente = this.items.find(item => item.id === producto.id)

      if (existente) {
        existente.cantidad++
      } else {
        this.items.push({ ...producto, cantidad: 1 })
      }

      this.guardarEnStorage()
    },

    eliminarDelCarrito(id) {
      this.items = this.items.filter(item => item.id !== id)
      this.guardarEnStorage()
    },

    vaciarCarrito() {
      this.items = []
      this.guardarEnStorage()
    }
  }
})