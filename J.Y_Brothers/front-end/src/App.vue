<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import Sidebar from '@/Components/sidebar.vue'

const route = useRoute()
const showSidebar = computed(() => route.meta.layout !== 'auth')
</script>

<template>
  <div class="app-shell" :class="{ 'auth-shell': !showSidebar }">
    <Sidebar v-if="showSidebar" />

    <main class="main-panel" :class="{ 'auth-panel': !showSidebar }">
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

.auth-shell {
  justify-content: center;
  background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f172a 100%);
}

.main-panel {
  flex: 1;
  padding: 32px 24px 40px;
}

.auth-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.content {
  max-width: 1500px;
  margin: 0 auto;
  /* border: 1px solid black; */
}

.auth-panel .content {
  width: 100%;
  max-width: 440px;
  margin: 0;
}
</style>
