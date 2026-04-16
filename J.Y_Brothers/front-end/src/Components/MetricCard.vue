<script setup lang="ts">
withDefaults(
    defineProps<{
        label: string
        value: string | number
        detail?: string
        tone?: 'default' | 'accent' | 'success'
    }>(),
    {
        tone: 'default',
    },
)
</script>

<template>
    <article class="metric-card" :class="tone">
        <p class="label">{{ label }}</p>
        <strong>{{ value }}</strong>
        <p v-if="detail" class="detail">{{ detail }}</p>
    </article>
</template>

<style scoped>
.metric-card {
    min-height: 148px;
    padding: 18px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
}

.metric-card strong {
    display: block;
    margin: 8px 0 10px;
    font-size: 1.35rem;
}

.label {
    margin: 0;
    color: #f6c177;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
}

.detail {
    margin: 0;
    color: rgba(238, 245, 255, 0.78);
    line-height: 1.6;
}

.accent {
    background: linear-gradient(135deg, rgba(63, 150, 255, 0.18), rgba(246, 193, 119, 0.12));
}

.success {
    background: linear-gradient(135deg, rgba(45, 175, 121, 0.18), rgba(246, 193, 119, 0.1));
}
</style>