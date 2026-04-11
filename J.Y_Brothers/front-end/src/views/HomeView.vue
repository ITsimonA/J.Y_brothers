<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchHealth, fetchInfo, fetchMessage, type ApiHealth, type ApiInfo, type ApiMessage } from '@/services/api'

const health = ref<ApiHealth | null>(null)
const info = ref<ApiInfo | null>(null)
const message = ref<ApiMessage | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
        const [healthResponse, infoResponse, messageResponse] = await Promise.all([
            fetchHealth(),
            fetchInfo(),
            fetchMessage(),
        ])

        health.value = healthResponse
        info.value = infoResponse
        message.value = messageResponse
    } catch (caughtError) {
        error.value = caughtError instanceof Error ? caughtError.message : 'Unexpected error while loading data.'
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <section class="hero-card">
        <div>
            <p class="label">Live API status</p>
            <h2>Backend data is loading into the Vue app.</h2>
            <p class="summary">
                The front end now talks to the Node.js backend through the Vite proxy at <strong>/api</strong>.
            </p>
        </div>

        <div v-if="loading" class="status-panel muted">
            Loading backend data...
        </div>

        <div v-else-if="error" class="status-panel error">
            {{ error }}
        </div>

        <div v-else class="grid">
            <article class="status-panel">
                <span class="panel-title">Health</span>
                <strong>{{ health?.status }}</strong>
                <p>Uptime: {{ health?.uptime }}s</p>
                <p>Updated: {{ health?.timestamp }}</p>
            </article>

            <article class="status-panel">
                <span class="panel-title">Info</span>
                <strong>{{ info?.name }}</strong>
                <p>{{ info?.message }}</p>
                <p>Environment: {{ info?.environment }}</p>
            </article>

            <article class="status-panel accent">
                <span class="panel-title">Message</span>
                <strong>{{ message?.message }}</strong>
            </article>
        </div>
    </section>
</template>

<style scoped>
.hero-card {
    display: grid;
    gap: 24px;
    padding: 28px;
    border-radius: 28px;
    background: rgba(11, 21, 32, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.09);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(18px);
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

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
}

.status-panel {
    min-height: 150px;
    padding: 18px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.status-panel strong {
    display: block;
    margin: 8px 0 10px;
    font-size: 1.2rem;
}

.status-panel p {
    margin: 0 0 6px;
    color: rgba(238, 245, 255, 0.8);
}

.panel-title {
    display: inline-flex;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    background: rgba(246, 193, 119, 0.12);
    color: #f6c177;
    font-size: 0.8rem;
    font-weight: 700;
}

.accent {
    background: linear-gradient(135deg, rgba(63, 150, 255, 0.18), rgba(246, 193, 119, 0.12));
}

.muted {
    color: rgba(238, 245, 255, 0.75);
}

.error {
    color: #ffb4b4;
    border-color: rgba(255, 132, 132, 0.4);
    background: rgba(255, 80, 80, 0.09);
}
</style>