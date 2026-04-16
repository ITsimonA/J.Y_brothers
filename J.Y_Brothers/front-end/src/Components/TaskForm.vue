    <script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Task, TaskInput } from '@/types/task'

const props = withDefaults(
    defineProps<{
        task: Task | null
        busy?: boolean
        submitLabel: string
    }>(),
    {
        busy: false,
    },
)

const emit = defineEmits<{
    submit: [TaskInput]
    cancel: []
}>()

const form = reactive<TaskInput>({
    title: '',
    description: '',
    completed: false,
})

watch(
    () => props.task,
    (task) => {
        form.title = task?.title ?? ''
        form.description = task?.description ?? ''
        form.completed = task?.completed ?? false
    },
    { immediate: true },
)

function handleSubmit() {
    emit('submit', {
        title: form.title.trim(),
        description: form.description.trim(),
        completed: form.completed,
    })
}
</script>

<template>
    <form class="task-form" @submit.prevent="handleSubmit">
        <div class="header">
            <div>
                <p class="eyebrow">Task editor</p>
                <h3>{{ task ? 'Update an existing task' : 'Create a new task' }}</h3>
            </div>

            <p class="hint">Stored directly in MySQL through the backend API.</p>
        </div>

        <label class="field">
            <span>Title</span>
            <input v-model="form.title" type="text" maxlength="120" placeholder="Ship the landing page" required />
        </label>

        <label class="field">
            <span>Description</span>
            <textarea v-model="form.description" rows="4" placeholder="Add optional details here"></textarea>
        </label>

        <label class="check">
            <input v-model="form.completed" type="checkbox" />
            <span>Mark as completed</span>
        </label>

        <div class="actions">
            <button type="submit" class="primary" :disabled="busy">
                {{ busy ? 'Saving...' : submitLabel }}
            </button>

            <button v-if="task" type="button" class="secondary" @click="emit('cancel')">
                Cancel edit
            </button>
        </div>
    </form>
</template>

<style scoped>
.task-form {
    display: grid;
    gap: 18px;
    padding: 22px;
    border-radius: 24px;
    background: rgba(11, 21, 32, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.09);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
}

.header {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: baseline;
}

.eyebrow {
    margin: 0 0 6px;
    color: #f6c177;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.75rem;
    font-weight: 700;
}

h3 {
    margin: 0;
    font-size: 1.35rem;
}

.hint {
    margin: 0;
    max-width: 26ch;
    color: rgba(238, 245, 255, 0.72);
    line-height: 1.5;
}

.field {
    display: grid;
    gap: 8px;
}

.field span,
.check span {
    color: rgba(238, 245, 255, 0.86);
    font-weight: 600;
}

.field input,
.field textarea {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.05);
    color: #eef5ff;
    padding: 0.95rem 1rem;
    outline: none;
    transition: border-color 0.2s ease, background 0.2s ease;
}

.field input:focus,
.field textarea:focus {
    border-color: rgba(246, 193, 119, 0.6);
    background: rgba(255, 255, 255, 0.08);
}

.check {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.check input {
    width: 18px;
    height: 18px;
    accent-color: #f6c177;
}

.actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

button {
    border: none;
    border-radius: 999px;
    padding: 0.85rem 1.15rem;
    font-weight: 700;
    cursor: pointer;
}

.primary {
    background: linear-gradient(135deg, #f6c177, #ffd9a2);
    color: #0b1520;
}

.secondary {
    background: rgba(255, 255, 255, 0.08);
    color: #eef5ff;
}

button:disabled {
    opacity: 0.65;
    cursor: wait;
}
</style>