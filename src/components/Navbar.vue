<template>
  <nav class="navbar">
    <div class="logo-group">
      <span>
        <img src="../assets/Vector.png" alt="vector image" class="logo-icon" />
      </span>
      <span>
        <img src="../assets/Group.svg" alt="storm image" class="logo-text"
      /></span>
      <!-- Hamburger for mobile -->
      <button class="hamburger-menu" @click="toggleMenu" aria-label="Open menu">
        <img src="../assets/menu.png" alt="menu" />
      </button>
      <div
        v-if="isMenuOpen"
        class="mobile-menu-dropdown"
        @click.self="closeMenu"
      >
        <button class="dropdown-item">
          <img
            src="../assets/Gear.png"
            alt="Settings Icon"
            class="dropdown-icon"
          />
          <span>Settings</span>
        </button>
        <button class="dropdown-item">
          <img
            src="../assets/Notifications.png"
            alt="Notifications Icon"
            class="dropdown-icon"
          />
          <span>Notifications</span>
        </button>
        <button class="dropdown-item">
          <img
            src="../assets/icon.png"
            alt="person icon"
            class="dropdown-icon"
          />
          <span>Adriana Arias</span>
        </button>
      </div>
    </div>
    <div class="search-group">
      <div class="search-input-wrapper">
        <img src="../assets/search.png" alt="search icon" class="search-icon" />
        <input
          type="text"
          class="search-input"
          placeholder="Search"
          v-model="searchInput"
          @keyup.enter="doSearch"
        />
      </div>
      <button class="search-btn" @click="doSearch">Search</button>
    </div>
    <div class="navbar-right">
      <span class="icon-wrapper">
        <img src="../assets/Gear.png" alt="settings Icon" class="icon-btn" />
      </span>
      <span class="icon-wrapper">
        <img
          src="../assets/Notifications.png"
          alt="Notifications icon"
          class="icon-btn"
        />
      </span>
      <span class="user-group">
        <span class="icon-wrapper icon-btn">
          <img src="../assets/icon.png" alt="person icon" class="user-icon" />
        </span>
        <span class="username icon-btn">Adriana Arias</span>
      </span>
    </div>
  </nav>
</template>

<script setup>
import { ref, inject, onMounted, onBeforeUnmount } from "vue";
const searchInput = inject("searchInput");
const doSearch = inject("doSearch");
const isMenuOpen = ref(false);

// Toggle hamburger-menu
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
function closeMenu() {
  isMenuOpen.value = false;
}

// Close dropdown on outside click
function handleClickOutside(event) {
  if (
    !event.target.closest(".hamburger-menu") &&
    !event.target.closest(".mobile-menu-dropdown")
  ) {
    isMenuOpen.value = false;
  }
}
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
// MOBILE-FIRST STYLES (default)
.navbar {
  width: 100vw;
  min-width: 0;
  padding: 0;

  background: #fff;
  box-shadow: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.logo-group {
  margin-top: 40px;
  margin-left: 24px;
  display: flex;
  align-items: center;
  height: 44px;
}
.logo-icon {
  width: 46px;
  height: 44px;
}
.logo-text {
  color: #1a1a1a;
  height: 32px;
  width: 155px;
  margin-left: 8px;
}
.hamburger-menu {
  display: block;
  background: none;
  border: none;
  margin-left: auto;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 28px;
    height: 28px;
  }
}
.search-group {
  width: 340px;
  height: 44px;
  margin: 16px auto 0 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
}
.search-input-wrapper {
  position: relative;
  width: 229px;
  height: 44px;
  display: flex;
  align-items: center;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
  opacity: 0.7;
}
.search-input {
  width: 100%;
  height: 44px;
  padding-left: 40px;
  border: 1px solid #ececec;
  border-radius: 6px;
  font-size: 15px;
  outline: none;
  background: #fff;
  transition: border 0.2s;
  color: #000;
  font-family: inherit;
  &:focus {
    border-color: #b3b3ff;
  }
}
.search-btn {
  width: 97px;
  height: 44px;
  text-align: center;
  margin-right: 4px;
  border-radius: 4px;
  padding: 12px 24px;
  gap: 4px;
  background: #605dec;
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.02em;
  transition: background 0.2s;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: #344293;
  }
}
.navbar-right {
  display: none;
}

/* Small Mobile: below 340px */
@media screen and (max-width: 339px) {
  .search-group {
    width: calc(100% - 48px);
    margin: 16px 24px 0;
    gap: 8px;
  }

  .search-input-wrapper {
    width: calc(100% - 105px);
    min-width: 0;
  }

  .search-input {
    font-size: 14px;
    padding-left: 36px;
  }

  .search-icon {
    width: 18px;
    height: 18px;
    left: 10px;
  }

  .search-btn {
    width: 97px;
    padding: 12px 16px;
    font-size: 13px;
  }
}

// DESKTOP STYLES
@media (min-width: 600px) {
  .navbar {
    width: 1186px;
    height: 44px;
    margin-top: 80px;
    margin-left: 128px;
    margin-right: 126px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-sizing: border-box;
    padding: 0;
    position: relative;
  }
  .logo-group {
    padding: 0;
    width: 210px;
    height: 44px;
    margin: 0;
  }
  .logo-icon {
    width: 46.63px;
    height: 43.99px;
  }
  .logo-text {
    height: 31.83px;
    width: 154.93px;
    margin-left: 0;
  }
  .hamburger-menu {
    display: none;
  }
  .search-group {
    width: 373px;
    height: 44px;
    gap: 16px;
    margin: 0;
    padding: 0;
    max-width: none;
  }
  .search-input-wrapper {
    width: 100%;
    height: 44px;
  }
  .search-input {
    width: 260px;
    height: 44px;
    padding: 0 16px 0 40px;
    font-size: 16px;
  }
  .search-btn {
    width: 97px;
    height: 44px;
    font-size: 16px;
    padding: 12px 24px;
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
}
.mobile-menu-dropdown {
  position: absolute;
  top: 60px;
  right: 16px;
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 8px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  z-index: 1001;
  min-width: 180px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 8px 0;
}
.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 20px;
  background: none;
  border: none;
  font-size: 15px;
  color: #605dec;
  cursor: pointer;
  transition: background 0.2s;
  &:hover,
  &:focus {
    background: #f2f2ff;
  }
}
.dropdown-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;
}
.dropdown-icon[alt="person icon"] {
  width: 12px;
  height: 12px;
  margin: 0px 6px;
}
</style>
