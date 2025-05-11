<template>
  <nav class="navbar">
    <div class="logo-group">
      <span class="logo-icon">
        <img
          src="../assets/Vector.png"
          alt="vector image"
          width="46.63"
          height="43.99"
        />
      </span>
      <span class="logo-text">STORM</span>
    </div>
    <div class="search-group">
      <input
        type="text"
        class="search-input"
        placeholder="Search"
        v-model="search"
      />
      <button class="search-btn">Search</button>
    </div>
    <div class="navbar-right">
      <span class="icon-btn">
        <!-- Settings icon SVG -->
        <svg
          width="22"
          height="22"
          fill="none"
          stroke="#6366f1"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09A1.65 1.65 0 0 0 9 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09c.2.63.77 1.1 1.51 1.1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
          />
        </svg>
      </span>
      <span class="icon-btn">
        <!-- Notification icon SVG -->
        <svg
          width="22"
          height="22"
          fill="none"
          stroke="#6366f1"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </span>
      <span class="user-group">
        <span class="icon-btn user-icon">
          <!-- User icon SVG -->
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="#6366f1"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a8.38 8.38 0 0 1 13 0" />
          </svg>
        </span>
        <span class="username">Adriana Arias</span>
      </span>
    </div>
  </nav>
</template>
<script setup>
import { inject } from "vue";
const search = inject("search");
</script>
<style scoped lang="scss">
.navbar {
  width: 1186px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 80px;
  left: 128px;
  background: #fff;
  box-sizing: border-box;
  padding: 0;
}
.logo-group {
  display: flex;
  align-items: center;
  width: 210px;
  height: 44px;
  .logo-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
  .logo-text {
    font-size: 40px;
    font-weight: 500;
    color: #222;
    letter-spacing: 1px;
    line-height: 44px;
    height: 31.83px;
    width: 154.94px;
    left: 54.59px;
  }
}
.search-group {
  display: flex;
  align-items: center;
  width: 373px;
  height: 44px;
  gap: 16px;
  .search-input {
    width: 260px;
    height: 44px;
    border: 1px solid #ececec;
    border-radius: 6px;
    padding: 0 16px;
    font-size: 16px;
    outline: none;
    background: #fff;
    transition: border 0.2s;
    &:focus {
      border-color: #b3b3ff;
    }
  }
  .search-btn {
    width: 97px;
    height: 44px;
    background: #605dec;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #4f46e5;
    }
  }
}
.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
  .icon-btn {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: none;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #f3f4f6;
    }
    svg {
      display: block;
    }
  }
  .user-group {
    display: flex;
    align-items: center;
    width: 152px;
    height: 44px;
    .user-icon {
      background: #f3f4f6;
    }
    .username {
      color: #6366f1;
      font-weight: 400;
      font-size: 15px;
      margin-left: 8px;
      line-height: 44px;
    }
  }
}
@media (max-width: 900px) {
  .navbar {
    width: 100vw;
    left: 0;
    top: 0;
    position: fixed;
    z-index: 100;
    padding: 0 8px;
  }
  .logo-group,
  .search-group,
  .navbar-right {
    width: auto;
    min-width: 0;
  }
  .search-group {
    width: 100%;
    max-width: 300px;
  }
}
</style>
