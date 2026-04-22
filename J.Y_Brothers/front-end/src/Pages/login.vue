<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { login } from '@/services/auth'

const router = useRouter()
const route = useRoute()

const identifier = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const registered = route.query.registered === '1'

async function handleLogin(): Promise<void> {
    errorMessage.value = ''
    isSubmitting.value = true

    try {
        await login({
            identifier: identifier.value,
            password: password.value,
        })

        await router.replace('/dashboard')
    } catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Unable to log in.'
    } finally {
        isSubmitting.value = false
    }
}
</script>

<template>
    <section class="auth-card">
        <p class="eyebrow">01</p>
        <h1>Login</h1>
        <p class="subtitle">Login to your account</p>

        <p v-if="registered" class="success-message">Account created. You can log in now.</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <form class="login-form" @submit.prevent="handleLogin">
            <label>
                <span>Email or username</span>
                <input v-model="identifier" type="text" placeholder="Enter your email or username" />
            </label>

            <label>
                <span>Password</span>
                <input v-model="password" type="password" placeholder="Enter your password" />
            </label>

            <button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Logging in...' : 'Login' }}
            </button>
        </form>

        <footer class="auth-footer">
            <p>Don't have an account? <RouterLink to="/register">Register here</RouterLink>
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

.success-message,
.error-message {
    margin-bottom: 16px;
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 0.95rem;
}

.success-message {
    background: rgba(34, 197, 94, 0.12);
    color: #86efac;
    border: 1px solid rgba(34, 197, 94, 0.2);
}

.error-message {
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