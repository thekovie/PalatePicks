<!-- <script>
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
  //   methods: {
  //     logout() {
  //       this.loggedInUser = '';
  //       this.loggedUserProfile = {};
  //     },
  //     login(username){
  //       this.loggedInUser = username;
  //       this.loggedUserProfile = this.userProfiles.filter((userProfiles) => userProfiles.username === this.loggedInUser)[0]
  //     }
  //   },
  //   mounted(){

  //     // Get Profile of Logged in user
  //     // this.loggedUserProfile = this.userProfiles.filter((userProfiles) => userProfiles.username === this.loggedInUser)[0]
  //   }
}


</script> -->

<template>
  <div class="header sticky top-0 flex flex-wrap justify-between items-center bg-white text-green flex-row p-5 border-b min-w-screen border-solid z-10">
    HAHAHAHAHAHAHA
  </div>
  <slot></slot>
  <div>

  </div>
</template>
