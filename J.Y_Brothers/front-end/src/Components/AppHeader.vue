<script setup lang="ts">
import { RouterLink } from 'vue-router'

const links = [
    {
        label: 'Home',
        to: '/',
    },
    {
        label: 'Tasks',
        to: '/tasks',
    },
]
</script>

<template>
    <header class="app-header">
        <div class="brand">
            <p class="eyebrow">J.Y Brothers</p>
            <h1>SQL-powered front end and backend</h1>
            <p class="lede">
                The Vue app talks to a Node.js API backed by MySQL and exposes real CRUD operations.
            </p>
        </div>

        <nav class="nav">
            <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="nav-pill">
                {{ link.label }}
            </RouterLink>
        </nav>
    </header>
</template>

<style scoped>
.app-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    max-width: 1120px;
    margin: 0 auto 32px;
    border: 1px solid rgba(255, 255, 255, 0.16);
}

.brand {
    max-width: 720px;
}

.eyebrow {
    margin: 0 0 10px;
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
    max-width: 13ch;
}

.lede {
    margin: 12px 0 0;
    max-width: 60ch;
    color: rgba(238, 245, 255, 0.82);
    line-height: 1.65;
}

.nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 12px;
}

.nav-pill {
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    border-radius: 999px;
    padding: 0.8rem 1.1rem;
    font-weight: 600;
    transition:
        transform 0.2s ease,
        background 0.2s ease,
        border-color 0.2s ease;
}

.nav-pill:hover {
    transform: translateY(-1px);
    border-color: rgba(246, 193, 119, 0.55);
}

.nav-pill.router-link-exact-active {
    background: linear-gradient(135deg, #f6c177, #ffd9a2);
    border-color: transparent;
    color: #0b1520;
}

@media (max-width: 720px) {
    .app-header {
        flex-direction: column;
    }

    .nav {
        justify-content: flex-start;
    }
}
</style>