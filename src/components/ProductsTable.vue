<template>
  <div style="padding-bottom: 170px">
    <div class="table-title">
      <span class="products-label">Products</span>
      <span class="results-count">
        {{ filteredProducts.length }} of {{ products.length }} results
      </span>
    </div>
    <div class="products-table-container">
      <table class="products-table">
        <thead>
          <tr>
            <th
              class="cell-id with-right-border sortable"
              @click="sortBy('id')"
            >
              ID
            </th>
            <th class="cell-status with-right-border">Status</th>
            <th
              class="cell-quantity with-right-border sortable"
              @click="sortBy('quantity')"
            >
              Quantity
              <span
                class="sort-arrow"
                :class="{ invisible: sortKey !== 'quantity' }"
              >
                <svg
                  v-if="sortOrder === 'asc' && sortKey === 'quantity'"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 14l5-5 5 5"
                    stroke="#605dec"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else-if="sortKey === 'quantity'"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#605dec"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </th>
            <th
              class="cell-product border-right sortable"
              @click="sortBy('product')"
            >
              Product name
              <span
                class="sort-arrow"
                :class="{ invisible: sortKey !== 'product' }"
              >
                <svg
                  v-if="sortOrder === 'asc' && sortKey === 'product'"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 14l5-5 5 5"
                    stroke="#605dec"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else-if="sortKey === 'product'"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#605dec"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </th>
            <th class="cell-prices sortable" @click="sortBy('total')">
              Prices
              <span
                class="sort-arrow"
                :class="{ invisible: sortKey !== 'total' }"
              >
                <svg
                  v-if="sortOrder === 'asc' && sortKey === 'total'"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 14l5-5 5 5"
                    stroke="#605dec"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else-if="sortKey === 'total'"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#605dec"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, idx) in filteredProducts"
            :key="product.id"
            style="cursor: default"
          >
            <td class="cell-id with-right-border">{{ product.id }}</td>
            <td class="cell-status with-right-border">
              <div :class="['status-badge', statusClass(idx)]">Status</div>
            </td>
            <td class="cell-quantity with-right-border">
              {{ product.quantity }}
            </td>
            <td
              class="cell-product border-right clickable-cell"
              style="text-align: left"
              @click="openModal(product)"
            >
              <div class="product-title">{{ product.product }}</div>
              <div class="product-serial">{{ product.serial }}</div>
            </td>
            <td class="cell-prices">${{ product.total.toFixed(2) }}</td>
          </tr>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="5" class="not-found-message">Item not found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <ProductModal
    v-if="selectedProduct"
    :product="selectedProduct"
    @close="closeModal"
  />
</template>
<script setup>
import { ref, onMounted, inject, computed } from "vue";
import ProductModal from "./ProductModal.vue";
const searchTerm = inject("searchTerm", ref(""));

const products = ref([]);
// const filteredProducts = ref([]);
const selectedProduct = ref(null);
const sortKey = ref("");
const sortOrder = ref("asc");

onMounted(async () => {
  const res = await fetch("/products.json");
  products.value = await res.json();
  // filteredProducts.value = products.value;
});

function openModal(product) {
  selectedProduct.value = product;
}

function closeModal() {
  selectedProduct.value = null;
}
function statusClass(idx) {
  // Order: 1st,3rd,7th,8th,10th - violet; 2nd,5th,9th - green; 4th - orange; 6th - red
  const order = [
    "status-blue", // 1
    "status-green", // 2
    "status-blue", // 3
    "status-orange", // 4
    "status-green", // 5
    "status-red", // 6
    "status-blue", // 7
    "status-blue", // 8
    "status-green", // 9
    "status-blue", // 10
  ];
  // Repeat the pattern if more rows
  return order[idx % order.length];
}

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
}

const filteredProducts = computed(() => {
  let result = products.value;
  if (searchTerm.value) {
    const term = searchTerm.value.toLowerCase();
    result = result.filter(
      (p) =>
        p.product.toLowerCase().includes(term) ||
        p.serial.toLowerCase().includes(term) ||
        String(p.id).includes(term)
    );
  }
  if (sortKey.value) {
    result = [...result].sort((a, b) => {
      let aVal = a[sortKey.value];
      let bVal = b[sortKey.value];
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortOrder.value === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  }
  return result;
});
</script>

<style scoped lang="scss">
.products-table-container {
  width: 1184px;
  min-height: 616px;
  margin-top: 6px;
  margin-left: 128px;
  border-radius: 8px;
  border: 1px solid #e4e4ef;
  background: #fff;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.products-table {
  width: 100%;
  height: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #fff;
}

th,
td {
  background: #fff;
  box-shadow: 0px -1px 0px 0px #e4e4ef inset;
  border: none;
  padding: 0;
  font-family: Nunito Sans, sans-serif;
  vertical-align: middle;
}

th {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #1a1a1a;
  height: 56px;
}

td {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1a1a1a;
  height: 56px;
}

.cell-id {
  width: 70px;
  text-align: center;
  padding: 18px 16px;
}

.cell-status {
  width: 144px;
  text-align: center;
  padding: 18px 16px;
}

.cell-quantity {
  width: 125px;
  text-align: center;
  padding: 18px 16px;
}

.cell-product {
  width: 671px;
  text-align: center;
  padding: 18px 16px;
}

.cell-prices {
  width: 171px;
  text-align: right;
  padding: 18px 16px;
}

.product-title {
  font-weight: 400;
  font-size: 14px;
  color: #1a1a1a;
  line-height: 20px;
}

.product-serial {
  font-weight: 400;
  font-size: 12px;
  color: #808080;
  line-height: 20px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 8px 24px;
  font-size: 16px;
  font-weight: 700;
  min-width: 83px;
  min-height: 20px;
  font-family: Nunito Sans, sans-serif;
  text-align: center;
}

.status-green {
  background: #ebf6eb;
  color: #31aa27;
}
.status-orange {
  background: #fff4e4;
  color: #e99518;
}
.status-red {
  background: #fff0f0;
  color: #f93232;
}
.status-blue {
  background: #ededfe;
  color: #605dec;
}

.table-title {
  width: 163px;
  height: 24px;
  margin-top: 73px;
  margin-left: 128px;
  text-align: center;
  gap: 10px;
}

.products-label {
  width: 67px;
  height: 20px;
  font-family: Nunito Sans, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #1a1a1a;
}

.results-count {
  width: 86px;
  height: 20px;
  font-family: Nunito Sans, sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #808080;
  margin-left: 10px;
}

.not-found-message {
  text-align: center;
  color: #aaa;
  font-size: 18px;
  font-family: Nunito Sans;
  height: 56px;
}

.border-right {
  border-right: 1px solid #e4e4ef !important;
}

.sortable {
  cursor: pointer;
  user-select: none;
}
.sort-arrow {
  margin-left: 6px;
  vertical-align: middle;
  opacity: 1;
  transition: opacity 0.2s;
}
.sort-arrow.invisible {
  opacity: 0;
  pointer-events: none;
}
.clickable-cell {
  cursor: pointer;
  transition: background 0.15s;
}
.clickable-cell:hover {
  background: #f7f7fd;
}
</style>
