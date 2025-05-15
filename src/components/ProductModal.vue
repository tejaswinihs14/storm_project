<template>
  <div class="modal" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="modal-close" @click="$emit('close')">
        <img src="../assets/Close.png" alt="Close Icon" class="close-Icon" />
      </button>
      <div class="modal-header">
        <span class="modal-title">{{ product.product }}</span>
      </div>
      <div class="modal-main-content">
        <div class="modal-image-container">
          <div v-if="isImageLoading && product.image" class="image-loading">
            <span class="spinner"></span>
          </div>
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.product"
            class="modal-image"
            @load="isImageLoading = false"
            @error="handleImageError"
          />
          <NoImagePlaceholder v-else />
        </div>
        <div class="modal-features-desc">
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
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-close-btn" @click="$emit('close')">Close</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import NoImagePlaceholder from "./NoImagePlaceholder.vue";

const props = defineProps({ product: { type: Object, required: true } });
const isImageLoading = ref(true);

function handleImageError() {
  isImageLoading.value = false;
  if (props.product.image) {
    props.product.image = null;
  }
}
</script>
<style scoped lang="scss">
.modal {
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
  width: 684px;
  height: 616px;
  background: #ffffff;
  border-radius: 8px;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.12);
}
.modal-close {
  position: absolute;
  top: 22px;
  right: 20px;
  min-width: 40px;
  min-height: 40px;
  background: none;
  border: none;
  padding: 8px;
  gap: 10px;
}

.close-Icon {
  cursor: pointer;
  z-index: 2;
}
.modal-header {
  min-width: 400px;
  min-height: 24px;
}
.modal-title {
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0%;
  color: #1a1a1a;
  width: 400px;
  height: 24px;
  text-align: left;
}
.modal-main-content {
  width: 604px;
  height: 456px;
  display: flex;
  flex-direction: row;
  gap: 16px;
}
.modal-image-container {
  width: 314px;
  height: 303px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
}
.modal-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #ffffff;
  transition: opacity 0.3s ease;
}
.modal-features-desc {
  width: 273px;
  height: 365px;
  margin-top: 20px;
  padding-bottom: 0px;
  font-family: "Nunito Sans", sans-serif;
  line-height: 25px;
  letter-spacing: 0%;
  color: #000;
  display: flex;
  flex-direction: column;
  font-size: 12px;
}
.modal-features {
  text-align: left;
  width: fit-content;
  height: fit-content;
  font-weight: 600;
}
.modal-description {
  text-align: left;
  font-weight: 400;
  width: fit-content;
  height: fit-content;
}
.modal-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: auto;
}
.modal-close-btn {
  width: 88px;
  height: 44px;
  border-radius: 4px;
  padding: 12px 24px;
  gap: 4px;
  background: #f9f9fb;
  color: #1a1a1a;
  border: none;
  font-size: 14px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: none;
}

.image-loading {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9fb;
  border-radius: 8px;
}

.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid #e4e4ef;
  border-top: 4px solid #605dec;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
  .modal-content {
    width: 95vw;
    max-width: 98vw;
    min-width: unset;
    height: auto;
    min-height: unset;
    padding: 16px 8px 16px 8px;
    border-radius: 8px;
    gap: 8px;
  }
  .modal-header {
    min-width: unset;
    min-height: 20px;
  }
  .modal-title {
    font-size: 16px;
    width: 100%;
    height: auto;
  }
  .modal-main-content {
    width: 100%;
    height: auto;
    flex-direction: column;
    gap: 8px;
  }
  .modal-image-container {
    width: 100%;
    height: 180px;
    margin-top: 8px;
  }
  .modal-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .modal-features-desc {
    width: 100%;
    height: auto;
    margin-top: 8px;
    padding: 0 8px;
  }
  .modal-footer {
    padding: 0 8px;
  }
  .modal-close {
    top: 8px;
    right: 8px;
    min-width: 32px;
    min-height: 32px;
    padding: 4px;
  }
  .modal-close-btn {
    width: 80px;
    height: 36px;
    font-size: 13px;
    padding: 8px 16px;
  }
}

/* Small Mobile: below 340px */
@media screen and (max-width: 339px) {
  .modal-content {
    width: 100%;
    max-width: 100%;
    height: 100vh;
    border-radius: 0;
    padding: 12px;
    margin: 0;
  }

  .modal-close {
    top: 12px;
    right: 12px;
    min-width: 32px;
    min-height: 32px;
    padding: 4px;
  }

  .close-Icon {
    width: 24px;
    height: 24px;
  }

  .modal-header {
    padding-right: 32px;
  }

  .modal-title {
    font-size: 14px;
    line-height: 1.2;
  }

  .modal-main-content {
    gap: 12px;
  }

  .modal-image-container {
    height: 160px;
    margin-top: 4px;
  }

  .modal-features-desc {
    padding: 0 4px;
    font-size: 11px;
    line-height: 1.4;
  }

  .modal-features {
    margin-bottom: 8px;
  }

  .modal-features ul {
    padding-left: 16px;
    margin: 4px 0;
  }

  .modal-description {
    font-size: 11px;
    line-height: 1.4;
  }

  .modal-footer {
    padding: 0 4px;
    margin-top: 12px;
  }

  .modal-close-btn {
    width: 80px;
    height: 36px;
    padding: 8px 16px;
    font-size: 13px;
  }

  .spinner {
    width: 32px;
    height: 32px;
    border-width: 3px;
  }
}
</style>
