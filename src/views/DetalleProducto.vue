
<template>
  <main class="editar-page">
    <section v-if="productoEncontrado" class="form-container">

      <!-- ENCABEZADO -->
      <div class="form-header">
        <span class="eyebrow">ADMINISTRACIÓN TECHSTORE</span>
        <h1>Editar <span>producto.</span></h1>
        <p>
          Modifica la información del producto seleccionado.
        </p>
      </div>

      <!-- FORMULARIO -->
      <form @submit.prevent="guardarCambios">

        <div class="campo">
          <label for="nombre">Nombre del producto</label>
          <input
            id="nombre"
            v-model.trim="formulario.nombre"
            type="text"
            placeholder="Ej. Laptop Lenovo"
            required
          />
        </div>

        <div class="campo">
          <label for="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            v-model.trim="formulario.descripcion"
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
              v-model.number="formulario.precio"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Ej. 12500"
              required
            />
          </div>

          <div class="campo">
            <label for="categoria">Categoría</label>
            <input
              id="categoria"
              v-model.trim="formulario.categoria"
              type="text"
              placeholder="Ej. Computadoras"
              required
            />
          </div>
        </div>

        <div class="campo">
          <label for="imagen">URL de la imagen</label>
          <input
            id="imagen"
            v-model.trim="formulario.imagen"
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          <small>Este campo es opcional.</small>
        </div>

        <!-- BOTONES -->
        <div class="form-actions">
          <button
            type="button"
            class="cancelar"
            @click="router.push('/productos')"
          >
            Cancelar
          </button>

          <button type="submit" class="guardar">
            Guardar cambios
          </button>
        </div>

      </form>
    </section>

    <!-- PRODUCTO NO ENCONTRADO -->
    <section v-else class="not-found">
      <div class="empty-icon">!</div>
      <h2>Producto no encontrado</h2>
      <p>El producto que intentas editar no existe en el catálogo.</p>

      <button
        class="guardar"
        @click="router.push('/productos')"
      >
        Volver al catálogo
      </button>
    </section>
  </main>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTiendaStore } from '../stores/productos'

const route = useRoute()
const router = useRouter()
const tienda = useTiendaStore()

const id = Number(route.params.id)

const producto = computed(() => tienda.obtenerProducto(id))

const productoEncontrado = computed(() => Boolean(producto.value))

const formulario = reactive({
  nombre: producto.value?.nombre || '',
  descripcion: producto.value?.descripcion || '',
  precio: producto.value?.precio || 0,
  categoria: producto.value?.categoria || '',
  imagen: producto.value?.imagen || ''
})

// GUARDAR CAMBIOS
function guardarCambios() {
  if (
    !formulario.nombre.trim() ||
    !formulario.descripcion.trim() ||
    !formulario.categoria.trim() ||
    !formulario.precio ||
    Number(formulario.precio) <= 0
  ) {
    alert('Completa los campos correctamente.')
    return
  }

  tienda.editarProducto(id, {
    nombre: formulario.nombre,
    descripcion: formulario.descripcion,
    precio: Number(formulario.precio),
    categoria: formulario.categoria,
    imagen: formulario.imagen
  })

  alert('¡Producto actualizado correctamente!')

  router.push('/productos')
}
</script>

<style scoped>
/* PÁGINA GENERAL */
.editar-page {
  min-height: 80vh;
  padding: 45px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
}

/* CONTENEDOR PRINCIPAL */
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

/* ENCABEZADO */
.form-header .eyebrow {
  color: #60a5fa;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 2px;
}

.form-header h1 {
  margin: 12px 0;
  color: #ffffff;
  font-size: clamp(30px, 5vw, 42px);
  font-weight: 900;
}

.form-header h1 span {
  color: #60a5fa;
}

.form-header p {
  color: #cbd5e1;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 30px;
}

/* FORMULARIO BLANCO */
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-sizing: border-box;
}

/* CAMPOS */
.campo {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 12px;
  flex: 1;
  min-width: 0;
}

.campo label {
  color: #111827;
  font-size: 13px;
  font-weight: 900;
}

.campo input,
.campo textarea {
  width: 100%;
  padding: 13px 14px;
  box-sizing: border-box;
  color: #ffffff;
  background: #191d29;
  border: 1px solid #3a4152;
  border-radius: 9px;
  outline: none;
  font-family: inherit;
  font-size: 13px;
}

.campo input {
  min-height: 46px;
}

.campo textarea {
  min-height: 100px;
  resize: vertical;
}

.campo input:focus,
.campo textarea:focus {
  border-color: #347cf0;
  box-shadow: 0 0 0 3px rgba(52, 124, 240, .15);
}

.campo input::placeholder,
.campo textarea::placeholder {
  color: #94a3b8;
}

.campo small {
  color: #64748b;
  font-size: 11px;
}

/* PRECIO Y CATEGORÍA */
.form-row {
  display: flex;
  gap: 18px;
}

/* BOTONES */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 15px;
  padding-top: 23px;
  border-top: 1px solid #d1d5db;
}

.form-actions button,
.not-found button {
  padding: 13px 20px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: .2s;
}

.cancelar {
  color: #111827;
  background: #ffffff;
  border: 1px solid #64748b;
}

.cancelar:hover {
  background: #e5e7eb;
}

.guardar {
  color: #ffffff;
  background: #347cf0;
  border: 1px solid #347cf0;
}

.guardar:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

/* PRODUCTO NO ENCONTRADO */
.not-found {
  width: 100%;
  max-width: 760px;
  padding: 45px 30px;
  background: #ffffff;
  border-radius: 20px;
  text-align: center;
  box-sizing: border-box;
}

.not-found h2 {
  color: #111827;
}

.not-found p {
  color: #64748b;
  margin-bottom: 25px;
}

.empty-icon {
  width: 65px;
  height: 65px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  color: #2563eb;
  background: #dbeafe;
  border-radius: 16px;
  font-size: 30px;
  font-weight: 900;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .editar-page {
    padding: 25px 14px;
  }

  .form-container {
    padding: 25px 18px;
  }

  form {
    padding: 22px 17px;
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
