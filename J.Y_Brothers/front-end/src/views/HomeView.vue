                                                                                                                WWWWWWWWWWW<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
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
            <article class="metric-card">
                <span>Backend status</span>
                <strong>{{ health?.status ?? 'unknown' }}</strong>
                <small>From /api/health</small>
            </article>

            <article class="metric-card accent">
                <span>Environment</span>
                <strong>{{ info?.environment ?? 'unknown' }}</strong>
                <small>From /api/info</small>
            </article>

            <article class="metric-card">
                <span>Total tasks</span>
                <strong>{{ tasks.length }}</strong>
                <small>Rows in the MySQL database</small>
            </article>

            <article class="metric-card success">
                <span>Completed</span>
                <strong>{{ completedTasks }}</strong>
                <small>{{ pendingTasks }} pending</small>
            </article>
        </div>
    </section>
</template>

<style scoped>
.home-page {
    display: grid;
    gap: 20px;
}

.hero-card,
.status-panel,
.metric-card {
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
    padding: 14px 20px;
    background: linear-gradient(135deg, #f6c177, #ff8a65);
    color: #101f2d;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 16px 30px rgba(246, 193, 119, 0.24);
}

.status-panel {
    padding: 22px 24px;
}

.status-panel.muted {
    color: rgba(238, 245, 255, 0.72);
}

.status-panel.error {
    color: #ffb4b4;
    border-color: rgba(255, 132, 132, 0.25);
    background: rgba(255, 80, 80, 0.08);
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
}

.metric-card {
    padding: 20px;
}

.metric-card span,
.metric-card small {
    display: block;
    color: rgba(238, 245, 255, 0.74);
}

.metric-card strong {
    display: block;
    margin: 12px 0 10px;
    font-size: 1.6rem;
}

.metric-card.accent strong {
    color: #f6c177;
}

.metric-card.success strong {
    color: #8ee3a4;
}

@media (max-width: 920px) {
    .hero-card {
        flex-direction: column;
        align-items: flex-start;
    }

    .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>