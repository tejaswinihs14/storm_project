<template>
  <nav class="navbar">
    <div class="logo-group">
      <span>
        <img src="../assets/Vector.png" alt="vector image" class="logo-icon" />
      </span>
      <span>
        <img src="../assets/Group.svg" alt="storm image" class="logo-text"
      /></span>
    </div>
    <div class="search-group">
      <input
        type="text"
        class="search-input"
        placeholder="Search"
        v-model="searchInput"
      />
      <button class="search-btn" @click="doSearch">Search</button>
    </div>
    <div class="navbar-right">
      <span class="icon-wrapper">
        <!-- Settings icon SVG -->
        <img src="../assets/Gear.png" alt="settings Icon" class="icon-btn" />
      </span>
      <span class="icon-wrapper">
        <!-- Notification icon SVG -->
        <img
          src="../assets/Notifications.png"
          alt="Notifications icon"
          class="icon-btn"
        />
      </span>
      <span class="user-group">
        <span class="icon-wrapper icon-btn">
          <!-- User icon SVG -->
          <img src="../assets/icon.png" alt="person icon" class="user-icon" />
        </span>
        <span class="username icon-btn">Adriana Arias</span>
      </span>
    </div>
  </nav>
</template>
<script setup>
import { inject } from "vue";
const searchInput = inject("searchInput");
const doSearch = inject("doSearch");
</script>
<style scoped lang="scss">
.navbar {
  width: 1186px;
  height: 44px;
  margin-top: 80px;
  margin-left: 128px;
  margin-right: 126px;
  /* margin-bottom: 900px;s */
  display: flex;
  /* /* align-items: center; */
  justify-content: space-between;
  /* position: absolute; */
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
    width: 46.63px;
    height: 43.99px;
    /* margin-right: 10px;
    display: flex;
    align-items: center; */
  }
  .logo-text {
    /* font-size: 40px;
    font-weight: 500; */
    color: #1a1a1a;
    /* letter-spacing: 1px; */
    /* line-height: 44px; */
    height: 31.83px;
    width: 154.93px;
    /* left: 54.59px; */
  }
}
.search-group {
  display: flex;
  align-items: center;
  width: 373px;
  height: 44px;
  gap: 16px;
  margin-left: 317px;
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
    gap: 4px;
    border-radius: 4px;
    padding-top: 12px;
    padding-right: 24px;
    padding-bottom: 12px;
    padding-left: 24px;
    background: #605dec;
    color: #fff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background: #344293;
    }
  }
}
.navbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 30px;
  .icon-wrapper {
    width: 44px;
    height: 44px;
  }
  .icon-btn {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: none;
    cursor: pointer;
  }
  .user-group {
    display: flex;
    align-items: center;
    width: 152px;
    height: 44px;
    gap: 8px;
    .user-icon {
      width: 18px;
      height: 18px;
    }
    .username {
      color: #605dec;
      font-family: Inter;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 2%;
      vertical-align: middle;
      width: 108px;
      height: 44px;
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
