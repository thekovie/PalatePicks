<template>
  <div class="nav-user-profile">
    <button
      :class="['center', 'bg-green_light', 'px-4', 'py-2', { 'rounded-3xl': !rounded, 'rounded-t-3xl': rounded }, 'flex', 'dropdown-button']"
      @click="toggleDropdown"
    >
      <img src="../assets/images/user.jpg" alt="Avatar" class="center w-6 h-6 rounded-full mr-3"/>
      <span> Hi, Kovie!</span>
    </button>
    <div class="bg-green_light px-2 rounded-b-3xl text-black dropdown-menu" :class="{ 'show': isDropdownOpen }">
      <button class="table-cell px-1 py-2">View Profile</button>
      <button class="table-cell px-1 py-2">Edit Profile</button>
      <button class="table-cell px-1 py-2 text-red">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      rounded: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.rounded = !this.rounded;
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  },
};
</script>

<style scoped>
.nav-user-profile {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-button {
  cursor: pointer;
}
</style>
