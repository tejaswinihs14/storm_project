<script setup>
import ProductsTable from "./components/ProductsTable.vue";
</script>

<template>
  <div class="app-dimension-container">
    <ProductsTable />
  </div>
</template>

<style scoped lang="scss">
.app-dimension-container {
  width: 1440px;
  height: 1024px;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  /* Optionally add overflow hidden or auto if needed */
}
</style>
