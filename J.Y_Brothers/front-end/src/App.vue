<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">J.Y Brothers</p>
        <h1>Front end and backend are connected</h1>
      </div>

      <RouterLink class="nav-pill" to="/">Home</RouterLink>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background:
    radial-gradient(circle at top, rgba(255, 214, 170, 0.24), transparent 28%),
    linear-gradient(180deg, #10212f 0%, #0b1520 100%);
  color: #eef5ff;
}

:global(a) {
  color: inherit;
  text-decoration: none;
}

.app-shell {
  min-height: 100vh;
  padding: 32px;
}

.topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  max-width: 1120px;
  margin: 0 auto 32px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #f6c177;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.05;
  max-width: 12ch;
}

.nav-pill {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  border-radius: 999px;
  padding: 0.8rem 1.1rem;
  font-weight: 600;
}

.content {
  max-width: 1120px;
  margin: 0 auto;
}
</style>
