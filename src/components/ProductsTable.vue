<template>
  <div class="products-table-container">
    <div class="header-row">
      <h3>
        Products
        <span class="results-count"
          >{{ filteredProducts.length }} of {{ products.length }} results</span
        >
      </h3>
    </div>
    <table class="products-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Quantity</th>
          <th>Product name</th>
          <th style="text-align: right">Prices</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, idx) in filteredProducts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>
            <span :class="['status-badge', statusClass(idx)]">Status</span>
          </td>
          <td>{{ product.quantity }}</td>
          <td>
            <div>
              <div class="product-title">{{ product.product }}</div>
              <div class="product-serial">{{ product.serial }}</div>
            </div>
          </td>
          <td class="product-price">${{ product.total.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
    <ProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
    />
  </div>
</template>
<script setup>
import { inject } from "vue";
import ProductModal from "./ProductModal.vue";
const {
  products,
  sortKey,
  sortOrder,
  sortBy,
  filteredProducts,
  selectedProduct,
} = inject("productsStore");
function openModal(product) {
  selectedProduct.value = product;
}
function statusClass(idx) {
  const classes = [
    "status-blue",
    "status-green",
    "status-orange",
    "status-red",
  ];
  return classes[idx % 4];
}
</script>
<style scoped lang="scss">
.products-table-container {
  background: #fff;
  border-radius: 12px;
  padding: 0;
  margin-top: 200px;
  margin-left: 32px;
  max-width: 100%;
  box-shadow: none;
  border: 1px solid #ececec;
}

.products-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 15px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.products-table th,
.products-table td {
  padding: 16px 18px;
  text-align: left;
  border: none;
  font-weight: 500;
  background: #fff;
}

.products-table th {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  background: #fff;
  border-bottom: 1px solid #ececec;
}

.products-table td {
  font-size: 15px;
  font-weight: 400;
  color: #222;
  border-bottom: 1px solid #ececec;
}

.products-table tr:last-child td {
  border-bottom: none;
}

.products-table thead tr {
  border-radius: 12px 12px 0 0;
}

.products-table tbody tr:first-child td:first-child {
  border-top-left-radius: 12px;
}
.products-table tbody tr:first-child td:last-child {
  border-top-right-radius: 12px;
}
.products-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}
.products-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

.status-badge {
  display: inline-block;
  border-radius: 999px;
  padding: 2px 18px;
  font-size: 14px;
  font-weight: 500;
  background: #e0e7ff;
  color: #6366f1;
  text-align: center;
  min-width: 70px;
}

.status-green {
  background: #d1fae5;
  color: #10b981;
}
.status-orange {
  background: #fef3c7;
  color: #f59e42;
}
.status-red {
  background: #fee2e2;
  color: #ef4444;
}

.product-title {
  font-weight: 600;
  font-size: 15px;
  color: #222;
}
.product-serial {
  color: #888;
  font-size: 13px;
  font-weight: 400;
  margin-top: 2px;
}

.product-price {
  font-weight: 500;
  text-align: right;
}
</style>
