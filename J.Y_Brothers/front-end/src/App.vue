<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from '@/Components/sidebar.vue'
</script>

<template>
  <div class="app-shell">
    <Sidebar />

    <main class="main-panel">
      <div class="content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  align-items: stretch;
}

.main-panel {
  flex: 1;
  padding: 32px 24px 40px;
}

.content {
  max-width: 1500px;
  margin: 0 auto;
  /* border: 1px solid black; */
}
</style>
