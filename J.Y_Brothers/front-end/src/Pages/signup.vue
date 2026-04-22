<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { signup } from '@/services/auth'

const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

async function handleSignup(): Promise<void> {
    errorMessage.value = ''
    isSubmitting.value = true

    try {
        await signup({
            fullName: fullName.value,
            email: email.value,
            password: password.value,
        })

        await router.replace({ path: '/login', query: { registered: '1' } })
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Unable to create account.'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section class="auth-card">
        <p class="eyebrow">02</p>
        <h1>Create account</h1>
        <p class="subtitle">Register a new account to continue</p>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <form class="login-form" @submit.prevent="handleSignup">
            <label>
                <span>Full name</span>
                <input v-model="fullName" type="text" placeholder="Enter your name" />
            </label>

            <label>
                <span>Email</span>
                <input v-model="email" type="email" placeholder="Enter your email" />
            </label>

            <label>
                <span>Password</span>
                <input v-model="password" type="password" placeholder="Create a password" />
            </label>

            <button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Creating account...' : 'Create account' }}
            </button>
        </form>

        <footer class="auth-footer">
            <p>Already have an account? <RouterLink to="/login">Login here</RouterLink>
            </p>
        </footer>
    </section>
</template>

<style scoped>
.auth-card {
    width: min(100%, 420px);
    padding: 32px;
    border-radius: 24px;
    background: rgba(15, 23, 42, 0.92);
    color: #f8fafc;
    box-shadow: 0 24px 80px rgba(15, 23, 42, 0.35);
    border: 1px solid rgba(148, 163, 184, 0.15);
}

.eyebrow {
    margin: 0 0 12px;
    letter-spacing: 0.28em;
    font-size: 0.72rem;
    color: #94a3b8;
}

h1 {
    margin: 0;
    font-size: 2.2rem;
}

.subtitle {
    margin: 8px 0 24px;
    color: #cbd5e1;
}

.error-message {
    margin-bottom: 16px;
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 0.95rem;
    background: rgba(239, 68, 68, 0.12);
    color: #fca5a5;
    border: 1px solid rgba(239, 68, 68, 0.2);
}

.login-form {
    display: grid;
    gap: 16px;
}

label {
    display: grid;
    gap: 8px;
    font-size: 0.95rem;
    color: #cbd5e1;
}

input {
    width: 100%;
    border: 1px solid rgba(148, 163, 184, 0.24);
    border-radius: 14px;
    padding: 14px 16px;
    background: rgba(30, 41, 59, 0.88);
    color: #f8fafc;
    outline: none;
}

input::placeholder {
    color: #64748b;
}

input:focus {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
}

button {
    margin-top: 8px;
    border: 0;
    border-radius: 14px;
    padding: 14px 16px;
    background: linear-gradient(135deg, #38bdf8, #0ea5e9);
    color: white;
    font-weight: 700;
    cursor: pointer;
}

button:disabled {
    cursor: wait;
    opacity: 0.7;
}

.auth-footer {
    margin-top: 20px;
    color: #cbd5e1;
}

.auth-footer a {
    color: #7dd3fc;
    text-decoration: none;
}
</style>
