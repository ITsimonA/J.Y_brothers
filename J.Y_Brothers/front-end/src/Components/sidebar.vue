<script setup>

</script>

<template>
<div class="sidebar">
    <div class="profile">
        <img src="../assets/Profile.jpg" alt="Profile Picture">
        <div>
            <h1>Simon Antonio Almero</h1>
            <p>Admin</p>
        </div>
    </div>
    <nav>
        <div class="icon"><i class="fa-regular fa-house"></i> <h1>Dashboard</h1></div>
        <div class="icon"><img src="../Assets/shopping-cart.png" alt="Orders"><h1>Orders</h1></div>
        <div class="icon"><img src="../Assets/users.png" alt="Customers"> <h1>Customers</h1></div>
        <div class="icon product"><img src="../Assets/box-open-full.png" alt="Products"> <h1>Products</h1></div>
        <div class="icon inventory"><img src="../Assets/inventory-alt.png" alt="Inventory"> <h1>Inventory</h1></div>
        <div class="icon"><img src="../Assets/delivery-truck.png" alt="Deliveries"> <h1>Deliveries</h1></div>
        <div class="icon"><img src="../Assets/people.png" alt="Employees"> <h1>Employees</h1></div>
    </nav>
</div>
</template>

<style scoped>
    .sidebar {
        display: flex;
        flex-direction: column;
        width: 300px;
        background-color: #101f2d;
    }

    nav div {
        display: flex;
        align-items: center;
        gap: 15px;
        margin: 12px 0;
        padding: 15px;
        color: #fff;
        cursor: pointer;
    }
    nav div h1 {
        font-size: 18px;
        margin-left: 10px;
        font-family: var(--font-family-secondary);
        font-weight: 200;
    }
    .icon img {
        width: 20px;
        height: 20px;

    }

    .inventory img {
        width: 20px;
        height: 20px;
    }

     .product img {
        width: 20px;
        height: 20px;
    }

    .profile {
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 20px 0;
        margin-left: 15px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    }   

    .profile img {
        width: 45px;
        height: 45px;
        border-radius: 9999px;
    }

    .profile h1, p{
        font-size: 16px;
        color: #fff;
        font-family: var(--font-family-secondary);
        font-weight: 300;
    }
</style>                                                  