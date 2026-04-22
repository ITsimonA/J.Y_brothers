import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/auth'
import LoginPage from '@/Pages/login.vue'
import DashboardPage from '@/Pages/dashboard.vue'
import CustomerPage from '@/Pages/costumer.vue'
import DeliveriesPage from '@/Pages/deliveries.vue'
import EmployeesPage from '@/Pages/employees.vue'
import InventoryPage from '@/Pages/inventory.vue'
import NewOrderPage from '@/Pages/new-order.vue'
import OrderPage from '@/Pages/order.vue'
import ProductsPage from '@/Pages/products.vue'
import SignupPage from '@/Pages/signup.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: SignupPage,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrderPage,
  },
  {
    path: '/new-order',
    name: 'new-order',
    component: NewOrderPage,
  },
  {
    path: '/customers',
    name: 'customers',
    component: CustomerPage,
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsPage,
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: InventoryPage,
  },
  {
    path: '/deliveries',
    name: 'deliveries',
    component: DeliveriesPage,
  },
  {
    path: '/employees',
    name: 'employees',
    component: EmployeesPage,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authenticated = isAuthenticated()
  const isAuthRoute = to.path === '/login' || to.path === '/register'

  if (isAuthRoute && authenticated) {
    return '/dashboard'
  }

  if (!isAuthRoute && !authenticated) {
    return '/login'
  }

  return true
})

export default router
