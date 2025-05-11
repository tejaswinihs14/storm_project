<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="modal-close" @click="$emit('close')">&times;</button>
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.product"
        class="modal-image"
      />
      <NoImagePlaceholder v-else />
      <h2 class="modal-title">{{ product.product }}</h2>
      <div
        v-if="product.features && product.features.length"
        class="modal-features"
      >
        <strong>Key Features</strong>
        <ul>
          <li v-for="(feature, i) in product.features" :key="i">
            {{ feature }}
          </li>
        </ul>
      </div>
      <p class="modal-description">
        {{ product.description || "No description available." }}
      </p>
      <button class="modal-close-btn" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>
<script setup>
import NoImagePlaceholder from "./NoImagePlaceholder.vue";
const props = defineProps({ product: { type: Object, required: true } });
</script>
<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px 24px 24px;
  min-width: 320px;
  max-width: 90vw;
  min-height: 320px;
  max-height: 90vh;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-close {
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
}
.modal-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 16px;
  background: #f3f3f3;
}
.modal-no-image {
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  color: #aaa;
  font-size: 1.2rem;
  border-radius: 8px;
  margin-bottom: 16px;
}
.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}
.modal-features {
  margin-bottom: 12px;
  text-align: left;
  width: 100%;
  max-width: 400px;
  ul {
    margin: 0 0 0 18px;
    padding: 0;
    li {
      font-size: 1rem;
      margin-bottom: 4px;
    }
  }
}
.modal-description {
  color: #555;
  text-align: left;
  max-width: 400px;
}
.modal-close-btn {
  margin-top: 18px;
  background: #6366f1;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 32px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #4f46e5;
  }
}
</style>
