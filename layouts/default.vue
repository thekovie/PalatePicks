<script>
import UserProfiles from '~/assets/json/UserProfiles.json'

export default {
  data() {
      return {
        isLoggedIn: false,
        loggedInUser: "",
        userProfiles: UserProfiles,
        loggedUserProfile: {},
      }
    },
    methods: {
      logout() {
        this.loggedInUser = '';
        this.loggedUserProfile = {};
      },
      login(username){
        this.loggedInUser = username;
        this.loggedUserProfile = this.userProfiles.filter((userProfiles) => userProfiles.username === this.loggedInUser)[0]
      }
    },
    mounted(){
      // Get Profile of Logged in user
      this.loggedUserProfile = this.userProfiles.filter((userProfiles) => userProfiles.username === this.loggedInUser)[0]
    }
}


</script>

<template>
  <div class="header sticky top-0 flex flex-wrap justify-between items-center bg-white text-green flex-row p-5 border-b min-w-screen border-solid z-10">
    <div class="left flex flex-row items-center">
      <NuxtLink class="logo font-cursive normal-case font-bold text-3xl justify-start" to="/">PalatePicks</NuxtLink>
      <div class="nav-menu uppercase ml-6 space-x-9">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/explore">Explore </NuxtLink>
      </div>
    </div>
    <NavUser v-if="(loggedInUser === '')" />
    <NavUserProfile v-else :loggedUserProfile="loggedUserProfile" @logout="logout"/>
  </div>

  <NuxtPage :loggedInUser="loggedInUser" :loggedUserProfile="loggedUserProfile" :userProfiles="userProfiles" @login="login" />

  <div class="footer min-w-screen flex justify-between bg-green h-32 bottom-0 items-center p-8 pr-20 pl-20 text-white">
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
