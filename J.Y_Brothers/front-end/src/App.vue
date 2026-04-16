<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/Components/AppHeader.vue'
import Sidebar from '@/Components/sidebar.vue'
</script>

<template>
  <div class="app-shell">
    <Sidebar />
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
  max-width: 1120px;
  margin: 0 auto;
}
</style>
