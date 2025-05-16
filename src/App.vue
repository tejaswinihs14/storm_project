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
  width: 100vw;
  min-width: 0;
  height: 100vh;
  min-height: 0;
  margin: 0 auto;
  background: #fff;
  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: column;
}

// Tablet and up
@media (min-width: 600px) {
  .app-dimension-container {
    max-width: 100vw;
    padding: 0 24px;
  }
}

// Desktop and up
@media (min-width: 1024px) {
  .app-dimension-container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 40px;
  }
}
</style>
