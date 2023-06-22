<template>
  <div class="nav-user-profile">
    <button
      :class="['center', 'bg-green_light', 'px-4', 'py-2', { 'rounded-3xl': !rounded, 'rounded-t-3xl': rounded }, 'flex', 'dropdown-button', { 'active': isDropdownOpen }]"
      v-on:click="toggleDropdown"
      ref="dropdownButton"
    >
      <img src="../assets/images/user.jpg" alt="Avatar" class="center w-6 h-6 rounded-full mr-3"/>
      <span> Hi, Kovie!</span>
    </button>
    <div
      class="bg-green_light px-3 rounded-b-2xl text-black dropdown-menu"
      :class="{ 'show': isDropdownOpen }"
      ref="dropdownMenu"
    >
      <router-link class="block text-sm px-2 py-2" to="/" @click="closeDropdown('click')">View Profile</router-link>
      <router-link class="block text-sm px-2 py-2" :to="{ name:'ProfileSettings'}" @click="closeDropdown('click')">Edit Profile</router-link>
      <router-link class="block text-sm px-2 py-2 text-red" to="/" @click="closeDropdown('click')">Logout</router-link>
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
    },
    closeDropdown(event) {
      if (
        !this.$refs.dropdownButton.contains(event.target) &&
        !this.$refs.dropdownMenu.contains(event.target)
      ) {
        this.isDropdownOpen = false;
        this.rounded = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown);
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
