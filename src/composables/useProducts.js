import { ref, computed } from "vue";

export function useProducts() {
  const products = ref([]);
  const search = ref("");
  const sortKey = ref("");
  const sortOrder = ref("asc");
  const selectedProduct = ref(null);

  async function fetchProducts() {
    const res = await fetch("/products.json");
    products.value = await res.json();
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
    let arr = products.value;
    if (search.value) {
      arr = arr.filter(
        (p) =>
          p.product.toLowerCase().includes(search.value.toLowerCase()) ||
          (p.serial &&
            p.serial.toLowerCase().includes(search.value.toLowerCase()))
      );
    }
    if (sortKey.value) {
      arr = [...arr].sort((a, b) => {
        let aVal = a[sortKey.value];
        let bVal = b[sortKey.value];
        if (typeof aVal === "string") aVal = aVal.toLowerCase();
        if (typeof bVal === "string") bVal = bVal.toLowerCase();
        if (aVal < bVal) return sortOrder.value === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder.value === "asc" ? 1 : -1;
        return 0;
      });
    }
    return arr;
  });

  return {
    products,
    search,
    sortKey,
    sortOrder,
    selectedProduct,
    fetchProducts,
    sortBy,
    filteredProducts,
  };
}
