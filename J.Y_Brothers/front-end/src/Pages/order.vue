<script setup>


</script>

<template>
    <div class="order-title">
        <div class="content-left">
            <h1>Orders</h1>
            <p>1 Total of orders</p>
        </div>
        <router-link to="/new-order" class="content-right">
            <p>+</p>
            <h1>New Order</h1>
        </router-link>
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
    <div>

    </div>
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
    text-decoration: none;
    color: inherit;
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
</style>