<template>
  <div class="products-container">
    <div class="table-wrapper">
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
              </th>
              <th
                class="cell-product border-right sortable"
                @click="sortBy('product')"
              >
                Product name
              </th>
              <th class="cell-prices sortable" @click="sortBy('total')">
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                  "
                >
                  <span style="flex: 1; text-align: center">Prices</span>
                  <span
                    class="sort-arrow"
                    style="
                      margin-left: 10px;
                      min-width: 18px;
                      display: flex;
                      align-items: center;
                      justify-content: flex-end;
                    "
                  >
                    <svg
                      v-if="sortKey === 'total' && sortOrder === 'desc'"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7 10l5 5 5-5"
                        stroke="#1a1a1a"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      v-else-if="sortKey === 'total' && sortOrder === 'asc'"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M7 14l5-5 5 5"
                        stroke="#1a1a1a"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24">
                      <path
                        d="M7 10l5 5 5-5"
                        stroke="#1a1a1a"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="5" class="loading-message">
                <span class="spinner"></span>
              </td>
            </tr>
            <tr
              v-for="(product, idx) in filteredProducts"
              :key="product.id"
              style="cursor: default"
            >
              <td
                class="cell-id with-right-border clickable-cell"
                @click="openModal(product)"
                tabindex="0"
                role="button"
                aria-label="Open product details by ID"
                @keydown.enter="openModal(product)"
              >
                {{ product.id }}
              </td>
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
                tabindex="0"
                role="button"
                aria-label="Open product details by name"
                @keydown.enter="openModal(product)"
              >
                <div class="product-title">{{ product.product }}</div>
                <div class="product-serial">{{ product.serial }}</div>
              </td>
              <td class="cell-prices">${{ product.total.toFixed(2) }}</td>
            </tr>
            <tr v-if="!isLoading && filteredProducts.length === 0">
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
  </div>
</template>
<script setup>
import { ref, onMounted, inject, computed } from "vue";
import ProductModal from "./ProductModal.vue";
const isLoading = ref(true);
const searchTerm = inject("searchTerm", ref(""));

const products = ref([]);
// const filteredProducts = ref([]);
const selectedProduct = ref(null);
const sortKey = ref("total");
const sortOrder = ref("desc");

// Add image preloading function
async function preloadImages(products) {
  products.forEach((product) => {
    if (product.image) {
      const img = new Image();
      img.src = product.image;
    }
  });
}

onMounted(async () => {
  isLoading.value = true;
  const res = await fetch(`${import.meta.env.BASE_URL}products.json`);
  const data = await res.json();
  products.value = data;
  // Preload images after fetching products
  await preloadImages(data);
  isLoading.value = false;
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
@import "../styles/_variables.scss";

.products-container {
  position: relative;
  width: 100%;
}

.table-wrapper {
  padding-bottom: 170px;

  @media (max-width: 600px) {
    padding-bottom: 100px;
  }
}
.products-table-container {
  width: 100%;
  max-width: 1184px;
  margin-top: 6px;
  margin-left: auto;
  margin-right: auto;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid $color-border;
  background: $color-bg;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.products-table {
  width: 100%;
  min-width: 360px;
  height: auto;
  border-collapse: separate;
  border-spacing: 0;
  background: $color-bg;
  table-layout: fixed;
  box-sizing: border-box;
  border-radius: 8px;
  border: none;
  overflow: hidden;
}

th,
td {
  background: $color-bg;
  box-shadow: 0px -1px 0px 0px $color-border inset;
  border: none;
  padding: 0;
  vertical-align: middle;
  font-family: $font-main;
}

th {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: $color-text;
  height: 56px;
  text-align: center;
  vertical-align: middle;
}

td {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: $color-text;
  height: 56px;
  font-family: $font-main;
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
  color: $color-text;
  line-height: 20px;
  font-family: $font-main;
}

.product-serial {
  font-weight: 400;
  font-size: 12px;
  color: $color-table-secondary-text;
  line-height: 20px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 4px 24px;
  font-size: 12px;
  font-weight: 400;
  min-width: 83px;
  min-height: 28px;
  text-align: center;
  font-family: $font-main;
}

.status-green {
  background: $color-status-green-bg;
  color: $color-status-green-text;
}
.status-orange {
  background: $color-status-orange-bg;
  color: $color-status-orange-text;
}
.status-red {
  background: $color-status-red-bg;
  color: $color-status-red-text;
}
.status-blue {
  background: $color-status-blue-bg;
  color: $color-primary;
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
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: $color-text;
}

.results-count {
  width: 86px;
  height: 20px;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: $color-table-secondary-text;
  margin-left: 10px;
}

.loading-message {
  text-align: center;
  color: $color-primary;
  font-size: 18px;
  height: 56px;
  vertical-align: middle;
  padding: 16px 8px;
}

.not-found-message {
  text-align: center;
  color: $color-table-muted-text;
  font-size: 18px;
  height: 56px;
  padding: 16px 8px;
  font-family: $font-main;
}

.border-right {
  border-right: 1px solid $color-border !important;
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

/* MOBILE: below 600px */
@media screen and (max-width: 599px) {
  .products-table-container {
    width: 320px;
    margin: 0 auto;
    padding: 0;
    overflow-x: auto;
    overflow-y: visible;
  }
  .products-table {
    width: 100%;
    min-width: 0;
    font-size: 14px;
  }

  .table-title {
    width: 163px;
    height: 24px;
    margin-top: 18px;
    margin-left: 26px;
    text-align: center;
    gap: 10px;
  }

  .cell-id,
  .cell-status,
  .cell-quantity,
  .cell-prices {
    display: none;
  }

  .cell-product {
    width: 100%;
    text-align: left;
    font-size: 14px;
    padding: 12px 8px;
  }

  th.cell-product {
    text-align: center;
    font-size: 15px;
    padding: 12px 8px;
  }

  th:not(.cell-product),
  td:not(.cell-product) {
    display: none;
  }

  .not-found-message-outer,
  .loading-message {
    font-size: 14px;
    padding: 24px 4px 32px 4px;
    height: auto;
    min-height: 48px;
  }
}

/* Small Mobile: below 340px */
@media screen and (max-width: 339px) {
  .products-table-container {
    width: 280px;
    margin: 0 auto;
    padding: 0;
    overflow-x: auto;
    overflow-y: visible;
  }
  .products-table {
    width: 100%;
    min-width: 0;
  }

  .cell-product {
    font-size: 14px;
    padding: 10px 6px;
  }

  .product-title {
    font-size: 14px;
    line-height: 16px;
  }

  .product-serial {
    font-size: 12px;
    line-height: 14px;
  }

  th.cell-product {
    font-size: 14px;
    padding: 10px 6px;
    text-align: center;
  }
}

/* TABLET, DESKTOP, MONITOR: 600px and above */
@media screen and (min-width: 600px) {
  .products-table-container {
    margin-left: 128px;
    margin-right: 32px;
    max-width: 1184px;
  }
  .products-table {
    min-width: 900px;
    font-size: 15px;
    overflow-x: auto;
  }
  .cell-id,
  .cell-status,
  .cell-quantity,
  .cell-product,
  .cell-prices {
    display: table-cell;
  }
  .cell-id {
    width: 70px;
    text-align: center;
    font-size: 15px;
    padding: 16px 8px;
  }
  .cell-status {
    width: 144px;
    text-align: center;
    font-size: 15px;
    padding: 16px 8px;
  }
  .cell-quantity {
    width: 125px;
    text-align: center;
    font-size: 15px;
    padding: 16px 8px;
  }
  .cell-product {
    width: auto;
    text-align: left;
    font-size: 16px;
    padding: 16px 8px;
  }
  th.cell-product {
    text-align: center;
    font-size: 16px;
    padding: 16px 8px;
  }
  .cell-prices {
    width: 171px;
    text-align: right;
    font-size: 15px;
    padding: 16px 8px;
  }
  th {
    text-align: center;
  }
  .not-found-message-outer,
  .loading-message {
    font-size: 18px;
    padding: 24px 8px 32px 8px;
    min-height: 56px;
  }
}

th.cell-product {
  text-align: center;
}

.spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid $color-border;
  border-top: 3px solid $color-primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;
  vertical-align: middle;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
