<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="header sticky top-0 flex flex-wrap justify-between items-center bg-white text-green flex-row p-5 border-b min-w-screen border-solid z-10">
    <div class="left flex flex-row items-center">
      <NuxtLink class="logo font-cursive normal-case font-bold text-3xl justify-start" to="/">PalatePicks</NuxtLink>
      <div class="nav-menu uppercase ml-6 space-x-9">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/explore">Explore </NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
      </div>
    </div>
    <div v-if="isLoggedIn">
      <NavUserProfile :session="dataSession" :loggedUserProfile="loggedUserProfile" @logout="logout"/>
    </div>
    <div v-else>
      <NavUser />
    </div>


  </div>

  <NuxtPage :loggedInUser="loggedInUser" :loggedUserProfile="loggedUserProfile" @retrieveSession="retrieveSession"  />

  <div class="footer min-w-screen flex flex-col sm:flex-row sm:justify-between bg-green h-full sm:h-32 bottom-0 sm:items-center p-8 sm:px-20 text-white">
    <div class="left justify-start">
      <div class="logo font-cursive normal-case font-bold text-3xl">PalatePicks</div>
      <div class="font-light">Fueling Student Appetites, One Bite at a Time</div>
    </div>
    <div class="right mt-10 sm:mt-0 sm:text-right text-xs sm:justify-end">
      <p>© CCAPDEV - S13 Group 3</p>
      <p>2401 Taft Ave, Malate, Manila,</p>
      <p>1004 Metro Manila,</p>
      <p>Philippines</p>
    </div>
  </div>
</template>

<script>

export default {
   data() {
      return {
        isLoggedIn: false,
        loggedInUser: "",
        loggedUserProfile: [],
        dataSession: {},
        loading: false
      }
    },
    methods: {
      async logout() {
        this.loading = true
        const supabase = useSupabaseClient();
        const { error } = await supabase.auth.signOut()

        this.dataSession = {};
        this.loggedUserProfile = []
        this.isLoggedIn = false;

        location.reload(true)



      },
      async retrieveSession(){
        this.loading = true
        const supabase = useSupabaseClient();

        try{
          const { data, error } = await supabase.auth.getSession()

          if(data.session !== null){
            this.isLoggedIn = true;
            this.dataSession = data;

            this.getProfile(this.dataSession)

          }else{
            this.dataSession = {};
            this.isLoggedIn = false;
            this.loggedUserProfile = [];
          }


        }catch(error){
          alert(error.message)
        }
        this.loading = false
      },
      async getProfile(session){
        const supabase = useSupabaseClient();

        try{
          const { data, error } = await supabase.from('profiles').select().eq('id', '' + session.session.user.id)
          this.loggedUserProfile = data;
        }catch(error){
          alert(error.message)
        }

      }
    },
    async mounted(){
      // Retrieve User Session if it still exists
      this.retrieveSession();
    },
    beforeUpdate(){
      if(this.loggedUserProfile.length){
        this.isLoggedIn = true
      }else{
        this.isLoggedIn = false
      }
    },
    toggleLoading(){
      this.loading = !this.loading
    }
}


</script>
