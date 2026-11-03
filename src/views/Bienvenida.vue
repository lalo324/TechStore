
<template>
  <Teleport to="body">
    <div class="welcome-page">

      <div class="image-container">
        <img
          src="/banner-techstore.png"
          alt="Bienvenido a TechStore"
          class="welcome-image"
        />
      </div>

      <div class="welcome-actions">
        <p>Todo lo que necesitas en tecnología, en un solo lugar.</p>

        <RouterLink to="/inicio" class="enter-button">
          ENTRAR A TECHSTORE
          <span>→</span>
        </RouterLink>

        <footer class="welcome-footer">
          © 2026 TechStore · Tecnología para todos
        </footer>
      </div>

    </div>
  </Teleport>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style>
/* PORTADA INDEPENDIENTE DE LOS ESTILOS GENERALES */
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  min-width: 0 !important;
  min-height: 100% !important;
  overflow-x: hidden !important;
  background: #080b14 !important;
}

.welcome-page {
  position: fixed !important;
  inset: 0 !important;
  z-index: 2147483647 !important;

  width: 100vw !important;
  height: 100vh !important;
  height: 100dvh !important;
  max-width: none !important;
  min-width: 0 !important;

  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;

  display: flex !important;
  flex-direction: column !important;

  overflow-x: hidden !important;
  overflow-y: auto !important;
  background: #080b14 !important;
}

/* IMAGEN A TODO EL ANCHO */
.welcome-page .image-container {
  display: block !important;
  flex: 0 0 auto !important;

  width: 100vw !important;
  max-width: none !important;
  min-width: 0 !important;

  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  line-height: 0 !important;
  box-sizing: border-box !important;
}

.welcome-page img.welcome-image {
  display: block !important;

  width: 100vw !important;
  max-width: none !important;
  height: auto !important;

  margin: 0 !important;
  padding: 0 !important;

  object-fit: contain !important;
  object-position: center !important;
}

/* BOTÓN Y TEXTO */
.welcome-page .welcome-actions {
  flex: 1 0 auto !important;

  width: 100vw !important;
  max-width: none !important;

  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 15px !important;

  margin: 0 !important;
  padding: 24px 20px !important;
  box-sizing: border-box !important;

  background: #080b14 !important;
  border-top: 1px solid rgba(96, 165, 250, .25);
}

.welcome-page .welcome-actions p {
  margin: 0 !important;
  color: #dbeafe !important;
  font-size: 15px !important;
  text-align: center !important;
}

.welcome-page .enter-button {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 25px !important;

  min-width: 280px;
  padding: 17px 28px !important;

  color: white !important;
  background: linear-gradient(110deg, #0875ed, #174fc0) !important;
  border: 1px solid #60a5fa !important;
  border-radius: 9px !important;

  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  text-decoration: none !important;

  box-shadow: 0 8px 28px rgba(0, 105, 255, .25);
  transition: .25s ease;
}

.welcome-page .enter-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 105, 255, .4);
}

.welcome-page .enter-button span {
  font-size: 22px;
}

.welcome-page .welcome-footer {
  width: 100% !important;
  margin: 0 !important;
  padding: 8px !important;
  color: #7186a8 !important;
  background: transparent !important;
  font-size: 11px !important;
  text-align: center !important;
}

@media (max-width: 650px) {
  .welcome-page .welcome-actions {
    padding: 20px 15px !important;
  }

  .welcome-page .welcome-actions p {
    font-size: 12px !important;
  }

  .welcome-page .enter-button {
    width: 100%;
    max-width: 320px;
    min-width: 0;
  }
}
</style>
