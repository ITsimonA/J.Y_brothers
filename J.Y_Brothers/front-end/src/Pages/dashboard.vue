<script setup lang="ts">
const sections = [
    {
        title: 'Orders',
        description: 'Review active orders and open the order workspace.',
        to: '/orders',
    },
    {
        title: 'Customers',
        description: 'Manage customer records and credit information.',
        to: '/customers',
    },
    {
        title: 'Products',
        description: 'Track catalog items, pricing, and stock information.',
        to: '/products',
    },
    {
        title: 'Inventory',
        description: 'Check stock levels and low-stock alerts.',
        to: '/inventory',
    },
]
</script>

<template>
    <section class="dashboard-page">
        <header class="hero">
            <div>
                <p class="eyebrow">Operations hub</p>
                <h1>Dashboard</h1>
                <p class="lead">
                    Use the pages you built to manage orders, customers, products, inventory, deliveries, and employees.
                </p>
            </div>

            <div class="hero-card">
                <p class="hero-label">Quick start</p>
                <p class="hero-copy">Pick a section from the sidebar or jump into the cards below.</p>
            </div>
        </header>

        <div class="section-grid">
            <RouterLink v-for="section in sections" :key="section.title" :to="section.to" class="section-card">
                <h2>{{ section.title }}</h2>
                <p>{{ section.description }}</p>
            </RouterLink>
        </div>
    </section>
</template>

<style scoped>
.dashboard-page {
    display: flex;
    flex-direction: column;
    gap: 28px;
}

.hero {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(280px, 0.8fr);
    gap: 20px;
    align-items: stretch;
}

.eyebrow {
    margin: 0 0 10px;
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #64748b;
    font-family: var(--font-family-secondary);
}

h1 {
    margin: 0;
    font-size: clamp(2.2rem, 4vw, 3.6rem);
    line-height: 1;
    color: #0f172a;
}

.lead {
    margin: 16px 0 0;
    max-width: 58ch;
    font-size: 1rem;
    line-height: 1.7;
    color: #475569;
}

.hero-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 24px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.04), rgba(15, 23, 42, 0.02));
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.hero-label {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #0f172a;
}

.hero-copy {
    margin: 0;
    color: #475569;
    line-height: 1.6;
}

.section-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
}

.section-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 160px;
    padding: 22px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
    text-decoration: none;
    color: inherit;
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.section-card:hover {
    transform: translateY(-2px);
    border-color: rgba(37, 99, 235, 0.2);
    box-shadow: 0 18px 34px rgba(15, 23, 42, 0.1);
}

.section-card h2 {
    margin: 0;
    font-size: 1.1rem;
    color: #0f172a;
}

.section-card p {
    margin: 0;
    color: #475569;
    line-height: 1.6;
}

@media (max-width: 900px) {

    .hero,
    .section-grid {
        grid-template-columns: 1fr;
    }
}
</style>