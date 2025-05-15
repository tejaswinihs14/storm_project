<template>
  <div class="no-image-placeholder">
    <div class="placeholder-content">
      <span class="placeholder-text">No Image Available</span>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.no-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 8px;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.placeholder-text {
  color: #808080;
  font-size: 14px;
  font-weight: 500;
  font-family: "Inter", sans-serif;
}

@media (max-width: 599px) {
  .no-image-placeholder {
    height: 120px;
  }

  .placeholder-content {
    gap: 8px;
  }

  .placeholder-text {
    font-size: 12px;
  }
}
</style>
