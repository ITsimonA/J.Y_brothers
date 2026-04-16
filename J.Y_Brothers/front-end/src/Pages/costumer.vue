<script setup>
import { computed, reactive, ref } from 'vue'

const isDialogOpen = ref(false)
const editingCustomerId = ref(null)
const customers = ref([])

const form = reactive({
    businessName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    contactNo: '',
    creditLimit: '',
    address: '',
    province: '',
    zipCode: '',
    notes: '',
})

const totalCustomers = computed(() => customers.value.length)

function resetForm() {
    form.businessName = ''
    form.firstName = ''
    form.middleName = ''
    form.lastName = ''
    form.contactNo = ''
    form.creditLimit = ''
    form.address = ''
    form.province = ''
    form.zipCode = ''
    form.notes = ''
}

function openDialog(customer = null) {
    if (customer) {
        editingCustomerId.value = customer.id
        form.businessName = customer.businessName
        form.firstName = customer.firstName
        form.middleName = customer.middleName
        form.lastName = customer.lastName
        form.contactNo = customer.contactNo
        form.creditLimit = customer.creditLimit
        form.address = customer.address
        form.province = customer.province
        form.zipCode = customer.zipCode
        form.notes = customer.notes
    } else {
        editingCustomerId.value = null
        resetForm()
    }

    isDialogOpen.value = true
}

function closeDialog() {
    isDialogOpen.value = false
    editingCustomerId.value = null
    resetForm()
}

function saveCustomer() {
    const customer = {
        id: editingCustomerId.value ?? Date.now(),
        businessName: form.businessName.trim(),
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim(),
        lastName: form.lastName.trim(),
        contactNo: form.contactNo.trim(),
        creditLimit: form.creditLimit.trim(),
        address: form.address.trim(),
        province: form.province.trim(),
        zipCode: form.zipCode.trim(),
        notes: form.notes.trim(),
    }

    if (!customer.businessName) {
        return
    }

    if (editingCustomerId.value !== null) {
        customers.value = customers.value.map((existingCustomer) =>
            existingCustomer.id === editingCustomerId.value ? customer : existingCustomer,
        )
    } else {
        customers.value.unshift(customer)
    }

    closeDialog()
}

function editCustomer(customer) {
    openDialog(customer)
}

function deleteCustomer(customerId) {
    const confirmed = window.confirm('Delete this customer?')

    if (!confirmed) {
        return
    }

    customers.value = customers.value.filter((customer) => customer.id !== customerId)
}

function formatCreditLimit(value) {
    const numericValue = Number(value)

    if (Number.isNaN(numericValue)) {
        return `₱${value || '0'}`
    }

    return `₱${numericValue.toLocaleString()}`
}

function fullName(customer) {
    return [customer.firstName, customer.middleName, customer.lastName].filter(Boolean).join(' ')
}
</script>

<template>
    <div class="order-title">
        <div class="content-left">
            <h1>Customers</h1>
            <p><span>{{ totalCustomers }}</span> total · <span>{{ totalCustomers }}</span> shown</p>
        </div>
        <button type="button" class="content-right" @click="openDialog()">
            <p>+</p>
            <h1>Add Customer</h1>
        </button>
    </div>
    <div class="search-bar">
        <div class="search">
            <i class="fas fa-search"></i><input type="text" placeholder="Search by name, business, or contract...">
        </div>
    </div>
    <div v-if="customers.length === 0" class="no-com">
        <img src="../Assets/person_search.svg" alt="No customers">
        <p>No customers found</p>
    </div>

    <div v-else class="customer-list">
        <div v-for="customer in customers" :key="customer.id" class="customer-card">
            <div class="customer-main">
                <div class="customer-heading">
                    <h3>{{ customer.businessName }}</h3>
                    <p>{{ fullName(customer) }}</p>
                </div>

                <div class="customer-details">
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>{{ customer.address }}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span>{{ customer.contactNo }}</span>
                    </div>
                </div>
            </div>

            <div class="customer-side">
                <div class="credit-block">
                    <p>Credit</p>
                    <strong>{{ formatCreditLimit(customer.creditLimit) }}</strong>
                </div>
                <div class="customer-actions">
                    <button type="button" class="icon-button edit-button" @click="editCustomer(customer)"
                        aria-label="Edit customer">
                        <i class="fas fa-pen-to-square"></i>
                    </button>
                    <button type="button" class="icon-button delete-button" @click="deleteCustomer(customer.id)"
                        aria-label="Delete customer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <div v-if="isDialogOpen" class="dialog-backdrop" @click.self="closeDialog">
            <div class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="add-customer-title">
                <div class="dialog-header">
                    <div>
                        <p class="dialog-kicker">Customers</p>
                        <h2 id="add-customer-title">{{ editingCustomerId === null ? 'Add Customer' : 'Edit Customer' }}
                        </h2>
                    </div>
                    <button type="button" class="close-button" @click="closeDialog" aria-label="Close dialog">
                        &times;
                    </button>
                </div>

                <div class="dialog-grid">
                    <div class="field field-full">
                        <label for="business-name">Business Name</label>
                        <input id="business-name" v-model="form.businessName" type="text"
                            placeholder="Enter business name">
                    </div>
                    <div class="field">
                        <label for="first-name">First name</label>
                        <input id="first-name" v-model="form.firstName" type="text" placeholder="Enter first name">
                    </div>
                    <div class="field">
                        <label for="middle-name">Middle name</label>
                        <input id="middle-name" v-model="form.middleName" type="text" placeholder="Enter middle name">
                    </div>
                    <div class="field">
                        <label for="last-name">Last name</label>
                        <input id="last-name" v-model="form.lastName" type="text" placeholder="Enter last name">
                    </div>
                    <div class="field">
                        <label for="contact-no">Contact No</label>
                        <input id="contact-no" v-model="form.contactNo" type="text" placeholder="Enter contact number">
                    </div>
                    <div class="field">
                        <label for="credit-limit">Credit Limit</label>
                        <input id="credit-limit" v-model="form.creditLimit" type="text"
                            placeholder="Enter credit limit">
                    </div>
                    <div class="field field-full">
                        <label for="address">Address</label>
                        <input id="address" v-model="form.address" type="text" placeholder="Enter address">
                    </div>
                    <div class="field">
                        <label for="province">Province</label>
                        <input id="province" v-model="form.province" type="text" placeholder="Enter province">
                    </div>
                    <div class="field">
                        <label for="zip-code">ZIP Code</label>
                        <input id="zip-code" v-model="form.zipCode" type="text" placeholder="Enter ZIP code">
                    </div>
                    <div class="field field-full">
                        <label for="notes">Notes</label>
                        <textarea id="notes" v-model="form.notes" rows="4" placeholder="Add notes..."></textarea>
                    </div>
                </div>

                <div class="dialog-actions">
                    <button type="button" class="cancel-button" @click="closeDialog">Cancel</button>
                    <button type="button" class="save-button" @click="saveCustomer">Save Customer</button>
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

.no-com {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 220px;
    width: 100%;
    margin-top: 24px;
    padding: 28px 20px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 10px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    text-align: center;
    color: #666;
}

.no-com img {
    width: 64px;
    height: 64px;
}

.no-com p {
    margin: 0;
    font-family: var(--font-family-secondary);
    font-size: 14px;
}

.customer-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    margin-top: 24px;
}

.customer-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    width: 100%;
    padding: 20px 22px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.customer-main {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    flex: 1;
}

.customer-heading h3 {
    margin: 0;
    font-size: 18px;
    color: #0f172a;
}

.customer-heading p {
    margin: 4px 0 0;
    color: #64748b;
    font-size: 14px;
}

.customer-details {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 22px;
}

.detail-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #475569;
    font-size: 14px;
}

.detail-item i {
    color: #64748b;
}

.customer-side {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
}

.credit-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
}

.credit-block p {
    margin: 0;
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.customer-side strong {
    font-size: 16px;
    color: #0f172a;
    white-space: nowrap;
}

.customer-actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid rgba(148, 163, 184, 0.45);
    border-radius: 10px;
    background: #fff;
    color: #334155;
    cursor: pointer;
}

.edit-button:hover {
    border-color: #3b82f6;
    color: #3b82f6;
}

.delete-button:hover {
    border-color: #ef4444;
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

.field textarea {
    resize: vertical;
    min-height: 120px;
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
    .customer-card {
        flex-direction: column;
        align-items: flex-start;
    }

    .customer-side {
        width: 100%;
        justify-content: space-between;
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