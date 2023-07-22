<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="flex">
    <div class="mx-auto h-screen w-full sm:px-64 px-4 pt-24 flex-wrap items-center">
      <div class="text-6xl font-semibold">
        Find your account
      </div>
      <div class="text-2xl mt-2 font-light">
        Please enter your email address to reset your password. A link will be sent to the email you've provided with instructions on how to reset your password.
      </div>


      <form @submit.prevent="handleSubmit" class="flex flex-col">
          <input type="text" placeholder="Email" class="py-4 px-[32px] rounded-[34.5px] border-[1px] border-solid border-green mt-[2rem]" v-model="email" required>


        <div class="mt-10 flex justify-end">
          <NuxtLink to="/login" class="rounded-3xl flex items-center font-light px-8 py-4 border-green border-solid border-[1px] mr-5">
            <span class="text-base text-green uppercase mr-6">Cancel</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4BAD70" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </NuxtLink>

          <button class=" bg-green rounded-3xl flex items-center font-light px-8 py-4">
            <span class="text-white text-base uppercase mr-6">Send Confirmation Link</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>

      </form>




    </div>


  </div>

</template>



<script>

  export default {
    data(){
      return{
        email: "",
        loading: true

      }
    },
    props: {
      loggedInUser: String,
      loggedUserProfile: Array
    },
    emits: ['retrieveSession'],
    methods: {
      async handleSubmit(){
        try{
          this.loading = true

          const supabase = useSupabaseClient();

          // Check if email exists in database
          try{
            const { data, error } = await supabase
              .from('profiles')
              .select()
              .eq('email', this.email)
              .maybeSingle()


              if(data){
                const {error} = await supabase.auth.resetPasswordForEmail(this.email, {
                  redirectTo: 'http://localhost:3000/update-password',
                })

                if(error){
                  alert(error)
                  console.log(error)
                  this.$router.push('/')
                }

                alert("A confirmation link has been sent to your email. Please check your email to reset your password");
                this.email = ""
                this.loading = false


              }else{
                alert("The email you have provided is not connected to any user. Please ensure that the email you've provided is connected to an account in PalatePicks.");
                this.email = ""
                this.loading = false;
              }


            if(error){
              throw error;
            }

          }catch(error){
            console.log(error)
          }






        }catch(error){
          console.log(error)
        }

      }
    },
    async mounted(){

      const supabase = useSupabaseClient();

      try{
        const { data, error } = await supabase.auth.getSession()

        if(data.session !== null){
          this.$router.push('/')
        }else{
          this.loading = false;
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
