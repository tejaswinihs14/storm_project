<template>
  <div class="header-row">
    <span class="products-label"> Products </span>
    <span class="results-count"
      >{{ filteredProducts.length }} of {{ products.length }} results</span
    >
  </div>
  <div class="products-table-container">
    <table class="products-table">
      <!-- <th class="column-border"></th> -->
      <thead class="products-table-header">
        <tr class="products-table-header-row">
          <th class="products-table-header-cell border-left-col">ID</th>
          <th class="products-table-header-cell">Status</th>
          <th
            class="products-table-header-cell sortable"
            @click="sortBy('quantity')"
          >
            Quantity
            <span class="sort-arrow" v-if="sortKey === 'quantity'">
              <svg
                v-if="sortOrder === 'asc'"
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
              <svg v-else width="12" height="12" viewBox="0 0 24 24">
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
            class="products-table-header-cell border-right-col sortable"
            @click="sortBy('product')"
          >
            Product name
            <span class="sort-arrow" v-if="sortKey === 'product'">
              <svg
                v-if="sortOrder === 'asc'"
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
              <svg v-else width="12" height="12" viewBox="0 0 24 24">
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
            class="products-table-header-cell sortable"
            style="text-align: right"
            @click="sortBy('total')"
          >
            Prices
            <span class="sort-arrow" v-if="sortKey === 'total'">
              <svg
                v-if="sortOrder === 'asc'"
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
              <svg v-else width="12" height="12" viewBox="0 0 24 24">
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
      <tbody class="products-table-body">
        <template v-if="filteredProducts.length > 0">
          <tr
            class="products-table-body-row"
            v-for="(product, idx) in filteredProducts"
            :key="product.id"
            @click="openModal(product)"
            style="cursor: pointer"
          >
            <td class="products-table-body-cell border-left-col">
              {{ product.id }}
            </td>
            <td class="status-table products-table-body-cell">
              <span :class="['status-badge', statusClass(idx)]">Status</span>
            </td>
            <td class="products-table-body-cell">{{ product.quantity }}</td>
            <td class="border-right-col products-table-body-cell">
              <div class="'product-wrapper'">
                <div class="product-title">{{ product.product }}</div>
                <div class="product-serial">{{ product.serial }}</div>
              </div>
            </td>
            <td
              style="text-align: right"
              class="product-price products-table-body-cell"
            >
              ${{ product.total.toFixed(2) }}
            </td>
          </tr>
        </template>
        <tr v-else>
          <td
            colspan="5"
            style="text-align: center; padding: 32px; color: #aaa"
          >
            Item not found
          </td>
        </tr>
      </tbody>
    </table>
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
  const classes = [
    "status-blue",
    "status-green",
    "status-orange",
    "status-red",
  ];
  return classes[idx % 4];
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
.header-row {
  width: 163px;
  height: 24px;
  margin-top: 76px;
  margin-left: 128px;

  .products-label {
    width: 67px;
    height: 20px;
    font-family: Nunito Sans;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0%;
    vertical-align: middle;
    color: #1a1a1a;
  }
  .results-count {
    width: 86px;
    height: 20px;
    gap: 10px;
    margin-left: 10px;
    font-family: Nunito Sans;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0%;
    color: #808080;
  }
}
.products-table-container {
  width: 1184px;
  height: fit-content;
  margin-left: 128px;
  margin-top: 6px;
  border-radius: 8px;
  border-width: 1px;
  border: 1px solid #e4e4ef;

  .products-table {
    width: 100%;
    height: 100%;
    gap: 10px;
    padding-right: 1px;
    border-collapse: collapse;
    /* border-collapse: separate; */
    /* border-spacing: 0; */
    /* font-size: 15px; */
    /* background: #fff;
  border-radius: 12px;
  overflow: hidden; */
    .column-border {
      width: 1px;
      height: 100%;
      border: 1px solid #e4e4ef;
      padding-right: 10px;
    }

    .products-table-header {
      /* border-bottom: 1px solid #e4e4ef; */
      .products-table-header-row {
        border-bottom: 1px solid #e4e4ef;
        width: 70px;
        height: 56px;
        gap: 10px;
        padding-top: 18px;
        padding-right: 16px;
        padding-bottom: 18px;
        padding-left: 16px;
        background: #ffffff;
        /* border-bottom: 1px solid #e4e4ef; */
        .products-table-header-cell {
          width: 38;
          height: 20;
          font-family: Nunito Sans;
          font-weight: 700;
          font-size: 16px;
          line-height: 20px;
          letter-spacing: 0%;
          vertical-align: middle;
          color: #1a1a1a;
        }
      }
    }

    .products-table-body {
      .products-table-body-row {
        width: 70px;
        height: 56px;
        gap: 10px;
        padding-top: 18px;
        padding-right: 16px;
        padding-bottom: 18px;
        padding-left: 16px;
        background: #ffffff;

        .products-table-body-cell {
          font-family: Nunito Sans;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0%;
          vertical-align: middle;
          width: 38px;
          height: 20px;
          border-bottom: 1px solid #e4e4ef;

          .status-table {
            width: 83;
            height: 28;
            border-radius: 12px;
            padding-top: 4px;
            padding-right: 24px;
            padding-bottom: 4px;
            padding-left: 24px;
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
            font-family: Nunito Sans;
            font-weight: 400;
            font-size: 12px;
            line-height: 20px;
            letter-spacing: 0%;
            text-align: center;
            vertical-align: middle;
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

          .product-wrapper {
            width: 637px;
            height: 40px;
            .product-title {
              width: 236;
              height: 20;
              font-family: Nunito Sans;
              font-weight: 400;
              font-size: 14px;
              line-height: 20px;
              letter-spacing: 0%;
              vertical-align: middle;
            }
            .product-serial {
              width: 68;
              height: 20;
              font-family: Nunito Sans;
              font-weight: 400;
              font-size: 12px;
              line-height: 20px;
              letter-spacing: 0%;
              vertical-align: middle;
            }
          }

          .product-price {
            width: 139px;
            height: 20px;
            text-align: right;
            font-family: Nunito Sans;
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            letter-spacing: 0%;
            vertical-align: middle;
          }
          .products-table-body-row:last-child td {
            border-bottom: none !important;
          }
        }
      }
    }

    .border-right-col {
      border-right: 1px solid #e4e4ef;
    }
    .border-left-col {
      border-left: 1px solid #e4e4ef;
    }
  }
}
/* 
.products-table th,
.products-table td {
  padding: 16px 18px;
  text-align: left;
  border: none;
  font-weight: 500;
  background: #fff;
}

.products-table tr:last-child td {
  border-bottom: none;
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
} */

.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-arrow {
  display: inline-block;
  margin-left: 6px;
  vertical-align: middle;
  transition: opacity 0.2s, transform 0.2s;
  opacity: 1;
}
.sortable:not(:hover) .sort-arrow {
  opacity: 0.7;
}
.sortable:active .sort-arrow {
  transform: scale(1.2);
}
</style>
