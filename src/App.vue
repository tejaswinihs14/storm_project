<template>
  <div class="app-dimension-container">
    <Navbar />
    <ProductsTable />
  </div>
</template>

<script setup>
import { ref, watch, provide } from "vue";
import Navbar from "./components/Navbar.vue";
import ProductsTable from "./components/ProductsTable.vue";

const searchInput = ref(""); // Bound to the search bar
const searchTerm = ref(""); // Used for filtering

function doSearch() {
  searchTerm.value = searchInput.value;
}

watch(searchInput, (val) => {
  if (val === "") {
    searchTerm.value = "";
  }
});

provide("searchInput", searchInput);
provide("doSearch", doSearch);
provide("searchTerm", searchTerm);
</script>

<style scoped lang="scss">
.app-dimension-container {
  width: 1440px;
  height: 1024px;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
}
</style>
