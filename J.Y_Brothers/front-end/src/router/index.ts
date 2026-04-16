import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import TasksView from '@/views/TasksView.vue'
import sidebar from '@/Components/sidebar.vue'
import dashboard from '@/Pages/dashboard.vue'
import costumer from '@/Pages/costumer.vue'
import deliveries from '@/Pages/deliveries.vue'
import employees from '@/Pages/employees.vue'
import inventory from '@/Pages/inventory.vue'
import order from '@/Pages/order.vue'
import newOrder from '@/Pages/new-order.vue'
import products from '@/Pages/products.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
  },
  {
    path: '/orders',
    name: 'orders',
    component: order,
  },
  {
    path: '/new-order',
    name: 'new-order',
    component: newOrder,
  },
  {
    path: '/customers',
    name: 'customers',
    component: costumer,
  },
  {
    path: '/products',
    name: 'products',
    component: products,
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: inventory,
  },
  {
    path: '/deliveries',
    name: 'deliveries',
    component: deliveries,
  },
  {
    path: '/employees',
    name: 'employees',
    component: employees,
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    component: sidebar,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
