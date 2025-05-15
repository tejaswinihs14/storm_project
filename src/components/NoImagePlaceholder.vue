<template>
  <div class="no-image-placeholder">No Image</div>
</template>
<script setup></script>
<style scoped lang="scss">
.no-image-placeholder {
  width: 100%;
  max-width: 314px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f3f3;
  color: #aaa;
  font-size: 1.2rem;
  border-radius: 8px;
  margin-bottom: 16px;
}

@media (min-width: 600px) {
  .no-image-placeholder {
    height: 303px;
    font-size: 1.3rem;
  }
}

@media (max-width: 599px) {
  .no-image-placeholder {
    height: 120px;
    font-size: 1rem;
  }
}
</style>
