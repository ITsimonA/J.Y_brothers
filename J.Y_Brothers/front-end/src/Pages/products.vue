<script setup>
import { computed, reactive, ref } from 'vue'

const isDialogOpen = ref(false)
const editingProductId = ref(null)
const products = ref([])

const form = reactive({
    productName: '',
    category: '',
    unit: '',
    price: '',
    stockQuantity: '',
    lowStockAlert: '',
    sku: '',
    supplier: '',
})

const totalProducts = computed(() => products.value.length)
const totalCategories = computed(() => new Set(products.value.map((product) => product.category).filter(Boolean)).size)

function resetForm() {
    form.productName = ''
    form.category = ''
    form.unit = ''
    form.price = ''
    form.stockQuantity = ''
    form.lowStockAlert = ''
    form.sku = ''
    form.supplier = ''
}

function openDialog(product = null) {
    if (product) {
        editingProductId.value = product.id
        form.productName = product.productName
        form.category = product.category
        form.unit = product.unit
        form.price = product.price
        form.stockQuantity = product.stockQuantity
        form.lowStockAlert = product.lowStockAlert
        form.sku = product.sku
        form.supplier = product.supplier
    } else {
        editingProductId.value = null
        resetForm()
    }

    isDialogOpen.value = true
}

function closeDialog() {
    isDialogOpen.value = false
    editingProductId.value = null
    resetForm()
}

function saveProduct() {
    const product = {
        id: editingProductId.value ?? Date.now(),
        productName: form.productName.trim(),
        category: form.category.trim(),
        unit: form.unit.trim(),
        price: form.price.trim(),
        stockQuantity: form.stockQuantity.trim(),
        lowStockAlert: form.lowStockAlert.trim(),
        sku: form.sku.trim(),
        supplier: form.supplier.trim(),
    }

    if (!product.productName) {
        return
    }

    if (editingProductId.value !== null) {
        products.value = products.value.map((existingProduct) =>
            existingProduct.id === editingProductId.value ? product : existingProduct,
        )
    } else {
        products.value.unshift(product)
    }

    closeDialog()
}

function editProduct(product) {
    openDialog(product)
}

function deleteProduct(productId) {
    const confirmed = window.confirm('Delete this product?')

    if (!confirmed) {
        return
    }

    products.value = products.value.filter((product) => product.id !== productId)
}

function formatPrice(value) {
    const numericValue = Number(value)

    if (Number.isNaN(numericValue)) {
        return `₱${value || '0'}`
    }

    return `₱${numericValue.toLocaleString()}`
}
</script>

<template>
    <div class="order-title">
        <div class="content-left">
            <h1>Products</h1>
            <p><span>{{ totalProducts }}</span> products across <span>{{ totalCategories }}</span> categories</p>
        </div>
        <button type="button" class="content-right" @click="openDialog()">
            <p>+</p>
            <h1>Add Product</h1>
        </button>
    </div>
    <div class="search-bar">
        <div class="search">
            <i class="fas fa-search"></i><input type="text" placeholder="Search orders...">
        </div>
        <div class="status">
            <p>Status</p>
            <i class="fas fa-chevron-down"></i>
        </div>
    </div>
    <div v-if="products.length > 0" class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
            <div class="product-main">
                <div class="product-header">
                    <div class="product-heading">
                        <h3>{{ product.productName }}</h3>
                    </div>
                    <div class="product-actions">
                        <button type="button" class="icon-button edit-button" @click="editProduct(product)"
                            aria-label="Edit product">
                            <i class="fas fa-pen-to-square"></i>
                        </button>
                        <button type="button" class="icon-button delete-button" @click="deleteProduct(product.id)"
                            aria-label="Delete product">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                <div class="product-tags">
                    <span class="tag tag-category">{{ product.category }}</span>
                    <span class="tag tag-alert" v-if="product.lowStockAlert">Low</span>
                </div>

                <div class="product-bottom">
                    <div class="product-price-block">
                        <strong>{{ formatPrice(product.price) }}</strong>
                        <p>per {{ product.unit }}</p>
                    </div>

                    <div class="product-meta">
                        <div class="meta-item">
                            <span class="meta-value">{{ product.stockQuantity }}</span>
                            <span class="meta-unit">{{ product.unit }}</span>
                        </div>
                        <div class="meta-item muted">
                            <span class="meta-value">{{ product.sku }}</span>
                            <span class="meta-unit">SKU</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <div v-if="isDialogOpen" class="dialog-backdrop" @click.self="closeDialog">
            <div class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="add-product-title">
                <div class="dialog-header">
                    <div>
                        <p class="dialog-kicker">Products</p>
                        <h2 id="add-product-title">{{ editingProductId === null ? 'Add Product' : 'Edit Product' }}</h2>
                    </div>
                    <button type="button" class="close-button" @click="closeDialog" aria-label="Close dialog">
                        &times;
                    </button>
                </div>

                <div class="dialog-grid">
                    <div class="field field-full">
                        <label for="product-name">Product Name</label>
                        <input id="product-name" v-model="form.productName" type="text"
                            placeholder="Enter product name">
                    </div>
                    <div class="field">
                        <label for="category">Category</label>
                        <input id="category" v-model="form.category" type="text" placeholder="Enter category">
                    </div>
                    <div class="field">
                        <label for="unit">Unit</label>
                        <input id="unit" v-model="form.unit" type="text" placeholder="Enter unit">
                    </div>
                    <div class="field">
                        <label for="price">Price (₱)</label>
                        <input id="price" v-model="form.price" type="text" placeholder="Enter price">
                    </div>
                    <div class="field">
                        <label for="stock-quantity">Stock Quantity</label>
                        <input id="stock-quantity" v-model="form.stockQuantity" type="text"
                            placeholder="Enter stock quantity">
                    </div>
                    <div class="field">
                        <label for="low-stock-alert">Low Stock Alert</label>
                        <input id="low-stock-alert" v-model="form.lowStockAlert" type="text"
                            placeholder="Enter low stock alert">
                    </div>
                    <div class="field">
                        <label for="sku">SKU</label>
                        <input id="sku" v-model="form.sku" type="text" placeholder="Enter SKU">
                    </div>
                    <div class="field field-full">
                        <label for="supplier">Supplier</label>
                        <input id="supplier" v-model="form.supplier" type="text" placeholder="Enter supplier">
                    </div>
                </div>

                <div class="dialog-actions">
                    <button type="button" class="cancel-button" @click="closeDialog">Cancel</button>
                    <button type="button" class="save-button" @click="saveProduct">Save Product</button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.order-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    font-family: var(--font-family-secondary);
}

.content-left h1 {
    font-size: 30px;
    /* margin: 15px 0; */
}

.content-left p {
    font-size: 14px;
    color: #666;
    margin: 4px 0 0;
}

.content-right {
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    background-color: #007bff;
    padding: 5px 30px;
    border-radius: 4px;
    border: none;
    text-decoration: none;
    color: inherit;
    font: inherit;
}

.content-right p {
    font-size: 24px;
    margin: 0;
    color: white;
    font-weight: 400;
}

.content-right h1 {
    font-size: 14px;
    margin: 0;
    color: white;
    font-weight: 400;
}

.search-bar {
    display: flex;
    align-items: center;
    gap: 20px;
}

.search-bar .status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #666;
    border: .5px solid #ccc;
    padding: 7px;
    width: 200px;
    height: 36px;
    font-size: 14px;
    border-radius: 4px;
}

.search-bar .search {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 400px;
    border: .5px solid #ccc;
    border-radius: 4px;
    padding: 7px 15px;
    color: #666;
}

.search-bar input {
    background-color: transparent;
    border: none;
    outline: none;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    width: 100%;
    margin-top: 24px;
}

.product-card {
    padding: 16px 18px 14px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.product-main {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.product-header {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
}

.product-heading h3 {
    margin: 0;
    font-size: 18px;
    color: #111827;
}

.product-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.tag {
    display: inline-flex;
    align-items: center;
    height: 28px;
    padding: 0 12px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
}

.tag-category {
    background: #eef2ff;
    color: #334155;
}

.tag-alert {
    background: #fff4cc;
    color: #9a6700;
}

.product-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 14px;
}

.product-price-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.product-price-block strong {
    font-size: 24px;
    line-height: 1;
    color: #2563eb;
}

.product-price-block p {
    margin: 0;
    font-size: 13px;
    color: #64748b;
}

.product-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    text-align: right;
}

.meta-item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.1;
}

.meta-item.muted {
    color: #94a3b8;
}

.meta-value {
    font-size: 17px;
    font-weight: 700;
    color: #f97316;
}

.meta-item.muted .meta-value {
    color: #94a3b8;
    font-size: 15px;
    font-weight: 500;
}

.meta-unit {
    font-size: 13px;
    color: #64748b;
}

.product-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
}

.icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    background: transparent;
    color: #334155;
    cursor: pointer;
}

.edit-button:hover {
    color: #3b82f6;
}

.delete-button:hover {
    color: #ef4444;
}

.dialog-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(15, 23, 42, 0.45);
    backdrop-filter: blur(4px);
}

.dialog-card {
    width: min(860px, 100%);
    max-height: calc(100vh - 48px);
    overflow: auto;
    border-radius: 18px;
    padding: 24px;
    background: #fff;
    box-shadow: 0 24px 60px rgba(15, 23, 42, 0.24);
    font-family: var(--font-family-secondary);
}

.dialog-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
}

.dialog-kicker {
    margin: 0 0 6px;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
}

.dialog-header h2 {
    margin: 0;
    font-size: 28px;
    color: #0f172a;
}

.close-button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 999px;
    background: #f1f5f9;
    color: #334155;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
}

.dialog-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field-full {
    grid-column: 1 / -1;
}

.field label {
    font-size: 14px;
    color: #334155;
}

.field input,
.field textarea {
    width: 100%;
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 10px;
    padding: 12px 14px;
    background: #fff;
    color: #0f172a;
    font: inherit;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus,
.field textarea:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.14);
}

.dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 22px;
}

.cancel-button,
.save-button {
    min-width: 140px;
    min-height: 44px;
    padding: 0 18px;
    border-radius: 10px;
    border: 1px solid transparent;
    font: inherit;
    font-weight: 500;
    cursor: pointer;
}

.cancel-button {
    background: #fff;
    border-color: rgba(148, 163, 184, 0.55);
    color: #334155;
}

.save-button {
    background: #0f172a;
    color: #fff;
}

@media (max-width: 720px) {
    .product-grid {
        grid-template-columns: 1fr;
    }

    .product-card {
        padding: 16px;
    }

    .product-actions {
        justify-content: flex-end;
    }

    .dialog-grid {
        grid-template-columns: 1fr;
    }

    .dialog-card {
        padding: 20px;
    }

    .dialog-actions {
        flex-direction: column-reverse;
    }

    .cancel-button,
    .save-button {
        width: 100%;
    }
}
</style>