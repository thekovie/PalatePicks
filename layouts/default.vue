<template>
  <div class="header sticky top-0 flex flex-wrap justify-between items-center bg-white text-green flex-row p-5 border-b min-w-screen border-solid z-10">
    <div class="left flex flex-row items-center">
      <NuxtLink class="logo font-cursive normal-case font-bold text-3xl justify-start" to="/">PalatePicks</NuxtLink>
      <div class="nav-menu uppercase ml-6 space-x-9">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/explore">Explore </NuxtLink>
      </div>
    </div>
    <div v-if="isLoggedIn">
      <NavUserProfile  :session="dataSession" :loggedUserProfile="loggedUserProfile" @logout="logout"/>
    </div>
    <div v-else>
      <NavUser />
    </div>


  </div>

  <NuxtPage :loggedInUser="loggedInUser" :session="dataSession" :loggedUserProfile="loggedUserProfile" @retrieveSession="retrieveSession" />

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

<script>

export default {
   data() {
      return {
        isLoggedIn: false,
        loggedInUser: "",
        loggedUserProfile: [],
        dataSession: {}
      }
    },
    methods: {
      async logout() {
        const supabase = useSupabaseClient();
        const { error } = await supabase.auth.signOut()

        this.dataSession = {};
        this.loggedUserProfile = []

      },
      async retrieveSession(){
        const supabase = useSupabaseClient();

        try{
          const { data, error } = await supabase.auth.getSession();

          console.log('RETRIEVED DATA SESSION')
          console.log(data)

          if(data.session !== null){
            this.isLoggedIn = true;
            this.dataSession = data;
            console.log(this.dataSession);
            console.log("IS LOGGED IN")
            console.log(this.isLoggedIn)

            this.getProfile(this.dataSession)

          }else{
            this.dataSession = {};
            this.isLoggedIn = false;
            this.loggedUserProfile = [];
          }


        }catch(error){
          alert(error.message)
        }

      },
      async getProfile(session){
        const supabase = useSupabaseClient();

        try{
          const { data, error } = await supabase.from('profiles').select().eq('username', '' + session.session.user.user_metadata.username)

          console.log('PROFILE')
          console.log(data)
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

    }
}


</script>
