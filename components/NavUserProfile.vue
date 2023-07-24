<template>
  <div class="nav-user-profile container mx-auto">
    <div class="relative">
      <button
        :class="['center', 'bg-green_light', 'px-4', 'py-2', { 'rounded-3xl': !rounded, 'rounded-t-3xl': rounded }, 'flex', 'dropdown-button', { 'active': isDropdownOpen }]"
        v-on:click="toggleDropdown"
        ref="dropdownButton"
      >
        <img :src="loggedUserProfile[0].profile_img_src" alt="Avatar" class="center w-6 h-6 rounded-full mr-3 object-center object-cover"/>
        <span>Hi, {{ loggedUserProfile[0].first_name }}!</span>
      </button>
      <div
        :style="dropdownStyle"
        :class="['bg-green_light', 'px-3', 'rounded-b-2xl', 'text-black', 'dropdown-menu', { 'show': isDropdownOpen }]"
        ref="dropdownMenu"
      >
        <NuxtLink :to="`/profile/${loggedUserProfile[0].username}`" class="menu-item px-2 py-2" @click="closeDropdown('click')">View Profile<br></NuxtLink>
        <NuxtLink to="/profile/settings" class="menu-item px-2 py-2" @click="closeDropdown('click')">Edit Profile<br></NuxtLink>
        <NuxtLink to="/" class="menu-item px-2 py-2 text-red" @click="closeDropdownAndLogout('click')">Logout<br></NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    session: Object,
    loggedUserProfile: Array,
  },
  data() {
    return {
      isDropdownOpen: false,
      rounded: false,
    };
  },
  computed: {
    dropdownStyle() {
      if (this.isDropdownOpen) {
        return {
          width: `${this.$refs.dropdownButton.offsetWidth}px`,
          left: `calc(100% - ${this.$refs.dropdownButton.offsetWidth}px)`,
        };
      }
      return {};
    },
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
    closeDropdownAndLogout(event) {
      if (
        !this.$refs.dropdownButton.contains(event.target) &&
        !this.$refs.dropdownMenu.contains(event.target)
      ) {
        this.isDropdownOpen = false;
        this.rounded = false;
      }

      this.$emit('logout');
    },
  },
  async mounted() {
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
  padding-bottom: 10px;
}

.menu-item {
  display: block;
  padding-top: 3px;
  padding-bottom: 3px;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-button {
  cursor: pointer;
}

</style>
