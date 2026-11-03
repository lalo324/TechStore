
import { defineStore } from 'pinia'

const STORAGE_KEY = 'techstore_productos'

function cargarProductos() {
  try {
    const guardados = localStorage.getItem(STORAGE_KEY)

    if (guardados !== null) {
      return JSON.parse(guardados)
    }
  } catch (error) {
    console.error('Error leyendo productos:', error)
  }

  return [
    {
      id: 1,
      nombre: 'Laptop HP',
      descripcion: 'Laptop ideal para trabajo, estudio y uso diario.',
      precio: 12500,
      categoria: 'Computadoras',
      imagen: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700'
    }
  ]
}

export const useTiendaStore = defineStore('tienda', {
  state: () => ({
    productos: cargarProductos()
  }),

  actions: {
    guardarEnStorage() {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(this.productos)
        )
        console.log('Productos guardados:', this.productos)
      } catch (error) {
        console.error('Error guardando productos:', error)
      }
    },

    agregarProducto(producto) {
      const nuevoId = this.productos.length
        ? Math.max(...this.productos.map(p => Number(p.id))) + 1
        : 1

      this.productos.push({
        ...producto,
        id: nuevoId,
        precio: Number(producto.precio),
        categoria: producto.categoria || 'General'
      })

      this.guardarEnStorage()
    },

    editarProducto(id, datos) {
      const indice = this.productos.findIndex(
        p => p.id === Number(id)
      )

      if (indice !== -1) {
        this.productos[indice] = {
          ...this.productos[indice],
          ...datos,
          precio: Number(datos.precio)
        }

        this.guardarEnStorage()
      }
    },

    eliminarProducto(id) {
      this.productos = this.productos.filter(
        p => p.id !== Number(id)
      )

      this.guardarEnStorage()
    },

    obtenerProducto(id) {
      return this.productos.find(
        p => p.id === Number(id)
      )
    }
  }
})

export const useProductosStore = useTiendaStore
