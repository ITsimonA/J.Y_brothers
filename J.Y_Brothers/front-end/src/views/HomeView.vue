<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import MetricCard from '@/Components/MetricCard.vue'
import { fetchHealth, fetchInfo, type ApiHealth, type ApiInfo } from '@/services/api'
import { fetchTasks } from '@/services/tasks'
import type { Task } from '@/types/task'

const health = ref<ApiHealth | null>(null)
const info = ref<ApiInfo | null>(null)
const tasks = ref<Task[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const completedTasks = computed(() => tasks.value.filter((task) => task.completed).length)
const pendingTasks = computed(() => tasks.value.length - completedTasks.value)

onMounted(async () => {
    loading.value = true

    try {
        const [healthResponse, infoResponse, tasksResponse] = await Promise.all([
            fetchHealth(),
            fetchInfo(),
            fetchTasks(),
        ])

        health.value = healthResponse
        info.value = infoResponse
        tasks.value = tasksResponse
    } catch (caughtError) {
        error.value =
            caughtError instanceof Error
                ? caughtError.message
                : 'Unexpected error while loading dashboard data.'
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <section class="home-page">
        <div class="hero-card">
            <div>
                <p class="label">Live API status</p>
                <h2>Backend data is loading into the Vue app.</h2>
                <p class="summary">
                    The front end now talks to the Node.js backend through the Vite proxy at
                    <strong>/api</strong>.
                </p>
            </div>

            <RouterLink class="cta" to="/tasks">Go to CRUD workspace</RouterLink>
        </div>

        <div v-if="loading" class="status-panel muted">Loading dashboard data...</div>

        <div v-else-if="error" class="status-panel error">{{ error }}</div>

        <div v-else class="grid">
            <MetricCard label="Backend status" :value="health?.status ?? 'unknown'" detail="From /api/health" />

            <MetricCard label="Environment" :value="info?.environment ?? 'unknown'" detail="From /api/info"
                tone="accent" />

            <MetricCard label="Total tasks" :value="tasks.length" detail="Rows in the MySQL database" />

            <MetricCard label="Completed" :value="completedTasks" :detail="`${pendingTasks} pending`" tone="success" />
        </div>
    </section>
</template>

<style scoped>
.home-page {
    display: grid;
    gap: 20px;
}

.hero-card,
.status-panel {
    border-radius: 28px;
    background: rgba(11, 21, 32, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.09);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(18px);
}

.hero-card {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    padding: 28px;
}

.label {
    margin: 0 0 10px;
    color: #f6c177;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.78rem;
    font-weight: 700;
}

h2 {
    margin: 0;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
}

.summary {
    margin: 14px 0 0;
    max-width: 62ch;
    color: rgba(238, 245, 255, 0.82);
    line-height: 1.65;
}

.cta {
    align-self: center;
    border-radius: 999px;
    padding: 0.95rem 1.25rem;
    background: linear-gradient(135deg, #f6c177, #ffd9a2);
    color: #0b1520;
    font-weight: 700;
    white-space: nowrap;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
}

.status-panel {
    padding: 18px;
}

.muted {
    color: rgba(238, 245, 255, 0.75);
}

.error {
    color: #ffb4b4;
    border-color: rgba(255, 132, 132, 0.4);
    background: rgba(255, 80, 80, 0.09);
}

@media (max-width: 860px) {
    .hero-card {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>