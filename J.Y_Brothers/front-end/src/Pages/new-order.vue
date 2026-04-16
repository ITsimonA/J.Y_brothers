<template>
    <section class="body">
        <div class="top">
            <div class="title">
                <h1>New Order</h1>
                <p>Create a new customer order</p>
            </div>
        </div>
        <div class="costumer">
            <div class="title">
                <p>1</p>
                <p>Select Customer</p>
            </div>
            <div class="search">
                <i class="fas fa-search"></i><input type="text" placeholder="Type customer name or business name...">
            </div>
        </div>

        <div class="costumer products">
            <div class="title">
                <p>2</p>
                <p>Add Products</p>
            </div>
            <div class="search">
                <i class="fas fa-search"></i><input type="text" placeholder="Search products to add...">
            </div>
            <div class="product-empty-state">
                <img src="../Assets/shopping-cart.svg" alt="Cart">
                <p>Search and add products above</p>
            </div>
        </div>

        <div class="costumer payment">
            <div class="title">
                <p>3</p>
                <p>Payment & Notes</p>
            </div>
            <div class="payment-fields">
                <div class="field">
                    <label for="payment-method">Payment Method</label>
                    <select id="payment-method">
                        <option value="cash">Cash</option>
                        <option value="bank-transfer">Bank transfer</option>
                        <option value="check">Check</option>
                        <option value="credit">Credit</option>
                    </select>
                </div>
                <div class="field notes-field">
                    <label for="payment-notes">Notes</label>
                    <textarea id="payment-notes" rows="4" placeholder="Add payment notes..."></textarea>
                </div>
            </div>
        </div>
        <div class="payment-actions">
            <button type="button" class="create-order-button">Create Order · ₱0</button>
            <router-link to="/orders" class="cancel-button">Cancel</router-link>
        </div>
    </section>
</template>

<style scoped>
.body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.top {
    width: 69rem;

}

.costumer {
    border: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
    width: 69rem;
    height: 10rem;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 20px;
    margin-top: 30px;
}

.costumer.products {
    height: 20rem;
    /* background-color: red; */
}

.costumer.payment {
    height: auto;
}

.costumer .title {
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: var(--font-family-secondary);
}

/* .costumer .title {
    margin-bottom: 20px;
} */

.costumer .title p:first-child {
    width: 28px;
    height: 28px;
    margin: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #007bff;
    color: #fff;
    flex-shrink: 0;
    font-weight: 300;
}

.search {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 100%;
    border: .5px solid #ccc;
    border-radius: 4px;
    padding: 7px 15px;
    color: #666;
    cursor: text;
}

.search input {
    flex: 1;
    min-width: 0;
    background-color: transparent;
    border: none;
    outline: none;
}

.search i {
    flex-shrink: 0;
    pointer-events: none;
}

.product-empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    flex: 1;
    min-height: 0;
    color: #666;
    text-align: center;
}

.product-empty-state img {
    width: 50px;
    height: 50px;
    opacity: 0.5;
}

.product-empty-state p {
    margin: 0;
    font-family: var(--font-family-secondary);
    font-size: 14px;
}

.payment-fields {
    display: flex;
    gap: 20px;
    width: 100%;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    font-family: var(--font-family-secondary);
}

.field label {
    font-size: 14px;
    color: #444;
}

.field select,
.field textarea {
    width: 100%;
    border: .5px solid #ccc;
    border-radius: 4px;
    padding: 10px 12px;
    background-color: #fff;
    color: #333;
    font: inherit;
    outline: none;
}

.field select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-right: 44px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2.5 4.5L6 8l3.5-3.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 20px center;
    background-size: 12px;
}

.field textarea {
    resize: vertical;
    min-height: 112px;
}

.notes-field {
    flex: 1.5;
}

.payment-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
    width: 69rem;
}

.create-order-button,
.cancel-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0 18px;
    border-radius: 6px;
    font-family: var(--font-family-secondary);
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.create-order-button {
    border: none;
    background-color: #007bff;
    color: #fff;
}

.create-order-button:hover {
    background-color: #0069d9;
}

.cancel-button {
    border: 1px solid #ccc;
    background-color: #fff;
    color: #444;
}

.cancel-button:hover {
    border-color: #999;
    color: #111;
}
</style>
