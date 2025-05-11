<template>
  <div class="app-dimension-container">
    <Navbar />
    <ProductsTable />
  </div>
</template>
<script setup>
import { provide, onMounted } from "vue";
import Navbar from "./components/Navbar.vue";
import ProductsTable from "./components/ProductsTable.vue";
import { useProducts } from "./composables/useProducts.js";

const productsStore = useProducts();
provide("productsStore", productsStore);
provide("search", productsStore.search);

onMounted(productsStore.fetchProducts);
</script>
<style scoped lang="scss">
.app-dimension-container {
  width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  /* position: relative; */
  display: flex;
  /* flex-direction: column; */
}
@media (max-width: 900px) {
  .app-dimension-container {
    width: 100vw;
    min-width: 0;
    padding: 0;
  }
}
</style>
