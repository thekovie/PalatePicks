<template>
  <Preloader v-if="loading" :loading="loading" />

    <div class="h-screen w-full sm:px-64 px-20 pt-24 flex-wrap">
      <div class="text-6xl font-semibold">
        Create a new password
      </div>
      <div class="text-2xl mt-2 font-light">
        Please enter a new password of at least 6 characters.
      </div>


      <form @submit.prevent="handleSubmit" class="flex flex-col">
        <div class="flex flex-col justify-between">
          <div class="flex flex-col mt-[2rem] max-w-[75%]">
            <div class="text-xl mt-2 font-bold ml-5">New Password</div>
            <input type="password" class="py-3 px-[32px] rounded-[34.5px] border-[1px] border-solid border-green mt-1" v-model="newPassword" required>
          </div>

          <div class="flex flex-col mt-2 max-w-[75%] mb-4">
            <div class="text-xl mt-2 font-bold ml-5">Confirm New Password</div>
            <input type="password" class="py-3 px-[32px] rounded-[34.5px] border-[1px] border-solid border-green mt-1" v-model="confirmNewPassword" required>
          </div>

          <p v-if="newPassword !== confirmNewPassword" class="text-xs text-red">New and confirm password fields do not match! Please ensure that you have entered them correctly.</p>
          <p v-if="newPassword.length < 6" class="text-xs text-red">Please enter a password of at least 6 characters.</p>
        </div>


        <div class="mt-10 flex">
          <NuxtLink to="/login" class="rounded-3xl flex items-center font-light px-8 py-4 border-green border-solid border-[1px] mr-5">
            <span class="text-base text-green uppercase mr-6">Cancel</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4BAD70" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </NuxtLink>

          <button v-if="newPassword === confirmNewPassword && newPassword.length >= 6 && confirmNewPassword.length >= 6" class=" bg-green rounded-3xl flex items-center font-light px-8 py-4">
            <span class="text-white text-base uppercase mr-6">Change Password</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>

          <button v-else class=" bg-[#93cfa9] rounded-3xl flex items-center font-light px-8 py-4" disabled>
            <span class="text-white text-base uppercase mr-6">Change Password</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </button>

        </div>

      </form>




    </div>



</template>



<script>

  export default {
    data(){
      return{
        loading: true,
        newPassword: "",
        confirmNewPassword: ""
      }
    },
    props: {
      loggedInUser: String,
      loggedUserProfile: Array
    },
    emits: ['retrieveSession'],
    methods: {
      async handleSubmit(){
        const supabase = useSupabaseClient();
        this.loading = true
        const{ data, error } = await supabase.auth.updateUser({ password: this.newPassword })

        if(error){
          alert(error)
        }else{
          alert("You have successfully changed your password! Redirecting you to the home page...")
          this.$router.push('/')
        }



      }
    },
    async mounted(){

      const supabase = useSupabaseClient();

      try{
        const { data, error } = await supabase.auth.getSession()

        if(data.session !== null){
          this.loading = false;
        }else{
          this.$router.push('/')
        }

        if(error){
          throw error;
        }

      }catch(error){
        console.log(error)
      }
    },

  }






</script>
