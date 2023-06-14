<template>
  <div id="header">
    <h1 class="logo">PalatePicks</h1>
    <router-link to="/">Home</router-link>
    <router-link :to="{ name: 'Explore'}">Explore  </router-link>
    <router-link :to="{ name: 'Register'}">Login / Register</router-link>
  </div>

  <router-view />

  <div id="footer">
    <p>Footer</p>
  </div>
</template>

<style scoped>
  #header {
    text-transform: uppercase;
  }

  .logo {
    font-family: 'Comfortaa', cursive;
    text-transform: none;
  }
</style>
