import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '@/Pages/dashboard.vue'
import CustomerPage from '@/Pages/costumer.vue'
import DeliveriesPage from '@/Pages/deliveries.vue'
import EmployeesPage from '@/Pages/employees.vue'
import InventoryPage from '@/Pages/inventory.vue'
import NewOrderPage from '@/Pages/new-order.vue'
import OrderPage from '@/Pages/order.vue'
import ProductsPage from '@/Pages/products.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
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

export default router
