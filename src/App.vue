<template>
  <div class="header sticky top-0 flex flex-wrap justify-between items-center bg-white text-green flex-row p-5 border-b min-w-screen border-solid">
    <div class="left flex flex-row items-center">
      <router-link class="logo font-cursive normal-case font-bold text-3xl justify-start" to="/">PalatePicks</router-link>
      <div class="nav-menu ml-6 space-x-9">
        <router-link to="/">Home</router-link>
        <router-link :to="{ name: 'Explore'}">Explore  </router-link>
      </div>
    </div>
    <NavUser></NavUser>
  </div>

  <router-view />

  <div class="footer w-screen flex justify-between bg-green h-32 bottom-0 items-center p-8 pr-20 pl-20 text-white">
    <div class="left justify-start">
      <div class="logo font-cursive normal-case font-bold text-3xl">PalatePicks</div>
      <div class="font-light">Fueling Student Appetites, One Bite at a Time</div>
    </div>
    <div class="right text-right text-xs justify-end">
      <p>© CCAPDEV - S13 Group 3</p>
      <p>2401 Taft Ave, Malate, Manila,</p>
      <p>1004 Metro Manila,</p>
      <p>Philippines</p>
    </div>
  </div>
</template>

<script>
 import NavUser from './components/NavUser.vue'

  export default {
    components: {
      NavUser
    }
  }
</script>

<style scoped>
  .header {
    text-transform: uppercase;
  }
</style>
