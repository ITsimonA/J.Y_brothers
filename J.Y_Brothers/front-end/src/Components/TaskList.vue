<script setup lang="ts">
import type { Task } from '@/types/task'

defineProps<{
    loading?: boolean
    tasks: Task[]
}>()

const emit = defineEmits<{
    edit: [Task]
    toggle: [Task]
    delete: [Task]
}>()

function formatDate(value: string) {
    return new Date(`${value.replace(' ', 'T')}Z`).toLocaleString()
}
</script>

<template>
    <section class="task-list">
        <div v-if="loading" class="empty-state">
            Loading tasks...
        </div>

        <div v-else-if="tasks.length === 0" class="empty-state">
            No tasks yet. Create one to populate the SQL database.
        </div>

        <article v-else v-for="task in tasks" :key="task.id" class="task-card" :class="{ completed: task.completed }">
            <div class="copy">
                <div class="topline">
                    <span class="status-badge">{{ task.completed ? 'Completed' : 'Pending' }}</span>
                    <span class="meta">#{{ task.id }}</span>
                </div>

                <h3>{{ task.title }}</h3>
                <p v-if="task.description" class="description">
                    {{ task.description }}
                </p>
                <p class="meta">Created {{ formatDate(task.createdAt) }}</p>
            </div>

            <div class="actions">
                <button type="button" @click="emit('toggle', task)">
                    {{ task.completed ? 'Mark pending' : 'Mark done' }}
                </button>
                <button type="button" class="secondary" @click="emit('edit', task)">Edit</button>
                <button type="button" class="danger" @click="emit('delete', task)">Delete</button>
            </div>
        </article>
    </section>
</template>

<style scoped>
.task-list {
    display: grid;
    gap: 14px;
}

.empty-state {
    padding: 22px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(238, 245, 255, 0.8);
}

.task-card {
    display: grid;
    gap: 18px;
    padding: 18px;
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.task-card.completed {
    background: rgba(45, 175, 121, 0.1);
}

.copy {
    display: grid;
    gap: 10px;
}

.topline {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    padding: 0.3rem 0.7rem;
    border-radius: 999px;
    background: rgba(246, 193, 119, 0.12);
    color: #f6c177;
    font-size: 0.78rem;
    font-weight: 700;
}

.meta {
    margin: 0;
    color: rgba(238, 245, 255, 0.68);
    font-size: 0.92rem;
}

h3 {
    margin: 0;
    font-size: 1.2rem;
}

.description {
    margin: 0;
    color: rgba(238, 245, 255, 0.86);
    line-height: 1.65;
}

.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

button {
    border: none;
    border-radius: 999px;
    padding: 0.8rem 1rem;
    font-weight: 700;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.08);
    color: #eef5ff;
}

.secondary {
    background: rgba(255, 255, 255, 0.08);
}

.danger {
    background: rgba(255, 100, 100, 0.16);
    color: #ffb4b4;
}
</style>