<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import TaskForm from '@/Components/TaskForm.vue'
import TaskList from '@/Components/TaskList.vue'
import { createTask, deleteTask, fetchTasks, updateTask } from '@/services/tasks'
import type { Task, TaskInput } from '@/types/task'

const tasks = ref<Task[]>([])
const loading = ref(true)
const saving = ref(false)
const error = ref<string | null>(null)
const editingTask = ref<Task | null>(null)

const totalTasks = computed(() => tasks.value.length)
const completedTasks = computed(() => tasks.value.filter((task) => task.completed).length)
const pendingTasks = computed(() => totalTasks.value - completedTasks.value)

async function loadTasks() {
    loading.value = true
    error.value = null

    try {
        tasks.value = await fetchTasks()
    } catch (caughtError) {
        error.value = caughtError instanceof Error ? caughtError.message : 'Failed to load tasks.'
    } finally {
        loading.value = false
    }
}

onMounted(loadTasks)

async function handleSubmit(payload: TaskInput) {
    saving.value = true
    error.value = null

    try {
        if (editingTask.value) {
            await updateTask(editingTask.value.id, payload)
        } else {
            await createTask(payload)
        }

        editingTask.value = null
        await loadTasks()
    } catch (caughtError) {
        error.value = caughtError instanceof Error ? caughtError.message : 'Failed to save task.'
    } finally {
        saving.value = false
    }
}

function handleEdit(task: Task) {
    editingTask.value = task
}

function handleCancel() {
    editingTask.value = null
}

async function handleDelete(task: Task) {
    const confirmed = window.confirm(`Delete "${task.title}"?`)

    if (!confirmed) {
        return
    }

    saving.value = true
    error.value = null

    try {
        await deleteTask(task.id)

        if (editingTask.value?.id === task.id) {
            editingTask.value = null
        }

        await loadTasks()
    } catch (caughtError) {
        error.value = caughtError instanceof Error ? caughtError.message : 'Failed to delete task.'
    } finally {
        saving.value = false
    }
}

async function handleToggle(task: Task) {
    saving.value = true
    error.value = null

    try {
        await updateTask(task.id, {
            title: task.title,
            description: task.description,
            completed: !task.completed,
        })

        await loadTasks()
    } catch (caughtError) {
        error.value = caughtError instanceof Error ? caughtError.message : 'Failed to update task state.'
    } finally {
        saving.value = false
    }
}
</script>

<template>
    <section class="tasks-page">
        <header class="page-header">
            <div>
                <p class="eyebrow">CRUD workspace</p>
                <h2>Manage tasks stored in MySQL.</h2>
                <p class="summary">
                    Every button here triggers a real SQL-backed API route on the Node server.
                </p>
            </div>

            <div class="summary-grid">
                <article class="summary-card">
                    <span>Total</span>
                    <strong>{{ totalTasks }}</strong>
                </article>
                <article class="summary-card">
                    <span>Completed</span>
                    <strong>{{ completedTasks }}</strong>
                </article>
                <article class="summary-card">
                    <span>Pending</span>
                    <strong>{{ pendingTasks }}</strong>
                </article>
            </div>
        </header>

        <div v-if="error" class="alert">
            {{ error }}
        </div>

        <div class="workspace">
            <TaskForm :task="editingTask" :busy="saving" :submit-label="editingTask ? 'Update task' : 'Create task'"
                @submit="handleSubmit" @cancel="handleCancel" />

            <TaskList :tasks="tasks" :loading="loading" @edit="handleEdit" @toggle="handleToggle"
                @delete="handleDelete" />
        </div>
    </section>
</template>

<style scoped>
.tasks-page {
    display: grid;
    gap: 24px;
}

.page-header {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: flex-start;
}

.eyebrow {
    margin: 0 0 10px;
    color: #f6c177;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.75rem;
    font-weight: 700;
}

h2 {
    margin: 0;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
}

.summary {
    margin: 12px 0 0;
    max-width: 60ch;
    color: rgba(238, 245, 255, 0.8);
    line-height: 1.65;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(90px, 1fr));
    gap: 12px;
}

.summary-card {
    padding: 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.summary-card span {
    display: block;
    color: rgba(238, 245, 255, 0.72);
    margin-bottom: 6px;
}

.summary-card strong {
    font-size: 1.4rem;
}

.alert {
    padding: 16px 18px;
    border-radius: 18px;
    border: 1px solid rgba(255, 132, 132, 0.32);
    background: rgba(255, 80, 80, 0.1);
    color: #ffb4b4;
}

.workspace {
    display: grid;
    grid-template-columns: minmax(300px, 0.95fr) minmax(320px, 1.05fr);
    gap: 20px;
    align-items: start;
}

@media (max-width: 920px) {

    .page-header,
    .workspace {
        grid-template-columns: 1fr;
        flex-direction: column;
    }

    .page-header {
        display: grid;
    }

    .summary-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .summary-grid {
        grid-template-columns: 1fr;
    }
}
</style>