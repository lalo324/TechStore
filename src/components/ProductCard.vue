
<template>
  <article class="product-card">

    <!-- IMAGEN -->
    <div class="product-image">
      <img
        v-if="producto.imagen"
        :src="producto.imagen"
        :alt="producto.nombre"
      />

      <div v-else class="image-placeholder">
        <span>📦</span>
        <small>Sin imagen disponible</small>
      </div>

      <span class="category">
        {{ producto.categoria || 'General' }}
      </span>
    </div>

    <!-- INFORMACIÓN -->
    <div class="product-info">

      <div class="product-top">
        <span class="product-type">TECHSTORE / PRODUCTO</span>
        <span class="availability">
          <i></i> Disponible
        </span>
      </div>

      <h3>{{ producto.nombre }}</h3>

      <p class="description">
        {{ producto.descripcion || 'Descubre este producto en TechStore.' }}
      </p>

      <!-- PRECIO -->
      <div class="price-area">
        <div>
          <span class="price-label">PRECIO DE VENTA</span>
          <h2>
            ${{ Number(producto.precio).toLocaleString('es-MX') }}
          </h2>
        </div>
        <span class="price-icon">✦</span>
      </div>

      <!-- ACCIONES -->
      <div class="actions">
        <button
          class="add-button"
          @click="emit('agregar', producto)"
        >
          <span>🛒</span>
          Agregar al carrito
        </button>

        <button
          class="edit-button"
          @click="emit('editar', producto.id)"
          title="Editar producto"
        >
          ✎
        </button>

        <button
          class="delete-button"
          @click="emit('eliminar', producto.id)"
          title="Eliminar producto"
        >
          ×
        </button>
      </div>

    </div>
  </article>
</template>

<script setup>
defineProps({
  producto: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'agregar',
  'editar',
  'eliminar'
])
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e8edf5;
  border-radius: 18px;
  box-shadow: 0 5px 20px rgba(15, 23, 42, .045);
  transition: transform .3s ease, box-shadow .3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 35px rgba(15, 23, 42, .11);
}

/* IMAGEN */
.product-image {
  height: 245px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(145deg, #f8fafc, #edf3fb);
}

.product-image img {
  width: 100%;
  height: 100%;
  padding: 22px;
  object-fit: contain;
  mix-blend-mode: multiply;
  transition: transform .4s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.07);
}

.category {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 7px 12px;
  color: #1d4ed8;
  background: rgba(255, 255, 255, .95);
  border: 1px solid #dbeafe;
  border-radius: 30px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
}

.image-placeholder span {
  font-size: 60px;
}

.image-placeholder small {
  font-size: 11px;
}

/* INFORMACIÓN */
.product-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
}

.product-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.product-type {
  color: #94a3b8;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1px;
}

.availability {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #15803d;
  font-size: 10px;
  font-weight: 700;
}

.availability i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
}

.product-info h3 {
  margin: 13px 0 8px;
  color: #111c32;
  font-size: 19px;
  font-weight: 850;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.description {
  min-height: 42px;
  margin: 0 0 18px;
  color: #64748b;
  font-size: 12px;
  line-height: 1.7;
}

/* PRECIO */
.price-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-top: auto;
  border-top: 1px solid #edf0f5;
}

.price-label {
  color: #94a3b8;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 1px;
}

.price-area h2 {
  margin: 5px 0 0;
  color: #2563eb;
  font-size: 27px;
  font-weight: 900;
  letter-spacing: -1px;
}

.price-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  color: #2563eb;
  background: #eff6ff;
  border-radius: 11px;
  font-size: 20px;
}

/* BOTONES */
.actions {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 42px 42px;
  gap: 8px;
}

.actions button {
  min-height: 43px;
  border: none;
  border-radius: 9px;
  cursor: pointer;
  font-weight: 800;
  transition: .2s ease;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: white;
  background: #2563eb;
  font-size: 12px;
}

.add-button:hover {
  background: #1d4ed8;
}

.edit-button {
  color: #b45309;
  background: #fef3c7;
  font-size: 19px;
}

.edit-button:hover {
  background: #fde68a;
}

.delete-button {
  color: #dc2626;
  background: #fee2e2;
  font-size: 23px;
}

.delete-button:hover {
  background: #fecaca;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .product-image {
    height: 220px;
  }

  .product-info {
    padding: 17px;
  }
}
</style>
