<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTask } from '@/services/tasks'
import type { Task, TaskInput } from '@/types/task'

const tasks = ref<Task[]>([])
const loading = ref(true)
const saving = ref(false)
const error = ref<string | null>(null)
const editingTask = ref<Task | null>(null)

const form = reactive<TaskInput>({
    title: '',
    description: '',
    completed: false,
})

const totalTasks = computed(() => tasks.value.length)
const completedTasks = computed(() => tasks.value.filter((task) => task.completed).length)
const pendingTasks = computed(() => totalTasks.value - completedTasks.value)

function resetForm() {
    form.title = ''
    form.description = ''
    form.completed = false
    editingTask.value = null
}

function fillForm(task: Task) {
    editingTask.value = task
    form.title = task.title
    form.description = task.description
    form.completed = task.completed
}

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

async function handleSubmit() {
    if (!form.title.trim()) {
        error.value = 'Task title is required.'
        return
    }

    saving.value = true
    error.value = null

    try {
        const payload: TaskInput = {
            title: form.title.trim(),
            description: form.description.trim(),
            completed: form.completed,
        }

        if (editingTask.value) {
            await updateTask(editingTask.value.id, payload)
        } else {
            await createTask(payload)
        }

        resetForm()
        await loadTasks()
    } catch (caughtError) {
        error.value = caughtError instanceof Error ? caughtError.message : 'Failed to save task.'
    } finally {
        saving.value = false
    }
}

function handleCancel() {
    resetForm()
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
            resetForm()
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
                    Every action here talks directly to the task API on the Node server.
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
            <form class="task-form" @submit.prevent="handleSubmit">
                <div class="field">
                    <label for="task-title">Title</label>
                    <input id="task-title" v-model="form.title" type="text" placeholder="Task title" required />
                </div>

                <div class="field">
                    <label for="task-description">Description</label>
                    <textarea id="task-description" v-model="form.description" rows="6" placeholder="Task details" />
                </div>

                <label class="checkbox">
                    <input v-model="form.completed" type="checkbox" />
                    Completed
                </label>

                <div class="form-actions">
                    <button type="submit" :disabled="saving">
                        {{ editingTask ? 'Update task' : 'Create task' }}
                    </button>
                    <button v-if="editingTask" type="button" class="secondary" @click="handleCancel" :disabled="saving">
                        Cancel
                    </button>
                </div>
            </form>

            <section class="task-list">
                <div v-if="loading" class="empty-state">Loading tasks...</div>

                <div v-else-if="tasks.length === 0" class="empty-state">
                    No tasks yet. Create the first one on the left.
                </div>

                <article v-for="task in tasks" :key="task.id" class="task-card" :class="{ completed: task.completed }">
                    <div class="task-copy">
                        <div class="task-meta">
                            <span>Task #{{ task.id }}</span>
                            <span>{{ task.completed ? 'Completed' : 'Pending' }}</span>
                        </div>
                        <h3>{{ task.title }}</h3>
                        <p>{{ task.description || 'No description provided.' }}</p>
                    </div>

                    <div class="task-actions">
                        <button type="button" @click="fillForm(task)" :disabled="saving">Edit</button>
                        <button type="button" class="secondary" @click="handleToggle(task)" :disabled="saving">
                            {{ task.completed ? 'Mark pending' : 'Mark done' }}
                        </button>
                        <button type="button" class="danger" @click="handleDelete(task)"
                            :disabled="saving">Delete</button>
                    </div>
                </article>
            </section>
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
    grid-template-columns: minmax(300px, 0.9fr) minmax(320px, 1.1fr);
    gap: 20px;
    align-items: start;
}

.task-form,
.task-list {
    padding: 20px;
    border-radius: 24px;
    background: rgba(11, 21, 32, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
    backdrop-filter: blur(18px);
}

.task-form {
    display: grid;
    gap: 16px;
}

.field {
    display: grid;
    gap: 8px;
}

.field label,
.checkbox {
    color: rgba(238, 245, 255, 0.8);
    font-weight: 600;
}

input,
textarea {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.05);
    color: #eef5ff;
    font: inherit;
}

textarea {
    resize: vertical;
}

.checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
}

.checkbox input {
    width: auto;
}

.form-actions,
.task-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

button {
    border: 0;
    border-radius: 999px;
    padding: 12px 16px;
    background: linear-gradient(135deg, #f6c177, #ff8a65);
    color: #101f2d;
    font-weight: 700;
    cursor: pointer;
}

button.secondary {
    background: rgba(255, 255, 255, 0.09);
    color: #eef5ff;
}

button.danger {
    background: rgba(255, 80, 80, 0.18);
    color: #ffb4b4;
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.task-list {
    display: grid;
    gap: 14px;
}

.empty-state {
    padding: 24px;
    border-radius: 18px;
    color: rgba(238, 245, 255, 0.72);
    background: rgba(255, 255, 255, 0.04);
}

.task-card {
    padding: 18px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.07);
    display: grid;
    gap: 14px;
}

.task-card.completed {
    border-color: rgba(142, 227, 164, 0.26);
}

.task-meta {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    color: rgba(238, 245, 255, 0.72);
    font-size: 0.9rem;
}

.task-card h3 {
    margin: 8px 0 10px;
}

.task-card p {
    margin: 0;
    color: rgba(238, 245, 255, 0.8);
    line-height: 1.6;
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