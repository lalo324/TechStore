
<template>
  <main class="crear-page">
    <section class="form-container">
      <div class="form-header">
        <span class="eyebrow">ADMINISTRACIÓN TECHSTORE</span>
        <h1>Agregar <span>producto.</span></h1>
        <p>Completa los siguientes datos para agregar un nuevo producto a tu catálogo.</p>
      </div>

      <form @submit.prevent="guardarProducto">
        <div class="campo">
          <label for="nombre">Nombre del producto</label>
          <input
            id="nombre"
            v-model.trim="producto.nombre"
            type="text"
            placeholder="Ej. Laptop Lenovo"
            required
          />
        </div>

        <div class="campo">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model.trim="producto.descripcion"
            placeholder="Describe las características del producto..."
            rows="4"
            required
          ></textarea>
        </div>

        <div class="form-row">
          <div class="campo">
            <label for="precio">Precio (MXN)</label>
            <input
              id="precio"
              v-model.number="producto.precio"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Ej. 12500"
              required
            />
          </div>

          <div class="campo">
            <label for="categoria">Categoría</label>
            <select
              id="categoria"
              v-model="producto.categoria"
              required
            >
              <option disabled value="">Selecciona una categoría</option>
              <option value="Computadoras">Computadoras</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Celulares">Celulares</option>
              <option value="Audio">Audio</option>
              <option value="Videojuegos">Videojuegos</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div class="campo">
          <label for="imagen">URL de la imagen</label>
          <input
            id="imagen"
            v-model.trim="producto.imagen"
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          <small>Este campo es opcional.</small>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="cancelar"
            @click="router.push('/productos')"
          >
            Cancelar
          </button>

          <button type="submit" class="guardar">
            Guardar producto
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useProductosStore } from '../stores/productos'

const router = useRouter()
const tienda = useProductosStore()

const producto = reactive({
  nombre: '',
  descripcion: '',
  precio: null,
  categoria: '',
  imagen: ''
})

function guardarProducto() {
  if (
    !producto.nombre ||
    !producto.descripcion ||
    !producto.categoria ||
    !producto.precio ||
    Number(producto.precio) <= 0
  ) {
    alert('Completa todos los campos obligatorios y verifica el precio.')
    return
  }

  try {
    tienda.agregarProducto({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      categoria: producto.categoria,
      imagen: producto.imagen
    })

    alert('¡Producto agregado correctamente!')

    router.push('/productos')
  } catch (error) {
    console.error('Error al guardar el producto:', error)
    alert('No se pudo guardar el producto.')
  }
}
</script>

<style scoped>
.crear-page {
  min-height: 80vh;
  padding: 45px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  color: #f8fafc;
}

.form-container {
  width: 100%;
  max-width: 760px;
  padding: 38px;
  background: #222531;
  border: 1px solid #303545;
  border-radius: 20px;
  box-sizing: border-box;
  box-shadow: 0 15px 40px rgba(0, 0, 0, .18);
}

.eyebrow {
  color: #60a5fa;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
}

.form-header h1 {
  margin: 12px 0;
  color: #f8fafc;
  font-size: clamp(30px, 5vw, 42px);
  font-weight: 900;
}

.form-header h1 span {
  color: #60a5fa;
}

.form-header p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 30px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 22px;
  flex: 1;
  min-width: 0;
}

.campo label {
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 800;
}

.campo input,
.campo textarea,
.campo select {
  width: 100%;
  padding: 13px 14px;
  box-sizing: border-box;
  color: #f8fafc;
  background: #191d29;
  border: 1px solid #3a4152;
  border-radius: 9px;
  outline: none;
  font-family: inherit;
  font-size: 13px;
}

.campo input,
.campo select {
  min-height: 46px;
}

.campo textarea {
  resize: vertical;
}

.campo input:focus,
.campo textarea:focus,
.campo select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, .12);
}

.campo input::placeholder,
.campo textarea::placeholder {
  color: #718096;
}

.campo select option {
  background: #222531;
  color: #f8fafc;
}

.campo small {
  color: #94a3b8;
  font-size: 11px;
}

.form-row {
  display: flex;
  gap: 18px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 23px;
  border-top: 1px solid #303545;
}

.form-actions button {
  padding: 13px 20px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: .2s;
}

.cancelar {
  color: #cbd5e1;
  background: transparent;
  border: 1px solid #475569;
}

.cancelar:hover {
  background: #303545;
}

.guardar {
  color: white;
  background: #347cf0;
  border: 1px solid #347cf0;
}

.guardar:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  .crear-page {
    padding: 25px 14px;
  }

  .form-container {
    padding: 25px 18px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }
}
</style>
