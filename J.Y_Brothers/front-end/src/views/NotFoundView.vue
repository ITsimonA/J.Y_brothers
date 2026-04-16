<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <section class="not-found">
        <p class="eyebrow">404</p>
        <h2>That page does not exist.</h2>
        <p class="summary">
            Use the navigation to go back to the dashboard or open the task manager.
        </p>

        <div class="actions">
            <RouterLink class="primary" to="/">Back home</RouterLink>
            <RouterLink class="secondary" to="/tasks">Open tasks</RouterLink>
        </div>
    </section>
</template>

<style scoped>
.not-found {
    display: grid;
    gap: 18px;
    padding: 28px;
    border-radius: 28px;
    background: rgba(11, 21, 32, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.09);
}

.eyebrow {
    margin: 0;
    color: #f6c177;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
}

h2 {
    margin: 0;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
}

.summary {
    margin: 0;
    color: rgba(238, 245, 255, 0.8);
    line-height: 1.65;
}

.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

a {
    border-radius: 999px;
    padding: 0.85rem 1.15rem;
    font-weight: 700;
}

.primary {
    background: linear-gradient(135deg, #f6c177, #ffd9a2);
    color: #0b1520;
}

.secondary {
    background: rgba(255, 255, 255, 0.08);
    color: #eef5ff;
}
</style>