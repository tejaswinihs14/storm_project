<template>
  <div class="products-table-container">
    <div class="header-row">
      <h3>Products <span class="results-count">10 of 64 results</span></h3>
    </div>
    <table class="products-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Quantity</th>
          <th>Product name</th>
          <th>Prices</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, idx) in products" :key="product.id">
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const products = ref([]);

onMounted(async () => {
  const res = await fetch("/products.json");
  products.value = await res.json();
});

function statusClass(idx) {
  // Alternate status for demo: blue, green, orange, red
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
  padding: 24px;
  margin: 32px auto;
  max-width: 1100px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03);

  .header-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    h3 {
      font-weight: 600;
      margin: 0;
    }
    .results-count {
      color: #888;
      font-weight: 400;
      font-size: 14px;
      margin-left: 8px;
    }
  }

  .products-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;

    th,
    td {
      padding: 12px 8px;
      text-align: left;
    }
    thead tr {
      border-bottom: 1px solid #eee;
    }
    tbody tr {
      border-bottom: 1px solid #f3f3f3;
    }
  }

  .status-badge {
    display: inline-block;
    border-radius: 12px;
    padding: 2px 16px;
    font-size: 13px;
    font-weight: 500;
    background: #e0e7ff;
    color: #6366f1;
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
    font-weight: 500;
  }
  .product-serial {
    color: #888;
    font-size: 12px;
  }
  .product-price {
    font-weight: 500;
  }
}
</style>
