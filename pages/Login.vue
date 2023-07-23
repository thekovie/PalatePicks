<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="flex flex-col lg:flex-row min-w-screen min-h-screen ">

    <!-- Login Image -->
    <div class="bg-green_light -z-50">
      <div class="login-bg -z-40 lg:min-w-[911.62px] lg:min-h-[691px] rounded-[100px] rotate-[-27deg] relative left-[-230px] top-[-135px]"></div>
    </div>

    <!-- Login Information Side -->

    <div class="bg-green_light min-h-screen w-screen px-4 lg:px-32">

      <!-- Login Division Container -->
      <div class="flex flex-col mx-auto max-w-fill">

        <!-- Login Introduction -->
        <div class="font-bold text-4xl lg:text-6xl mt-10 lg:mt-[110px]">Welcome!</div>
        <div class="text-xl mt-4 text-grey">To continue, please sign in to your account</div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="flex flex-col align-middle">
          <input type="text" placeholder="Email" class="py-[10px] px-[32px] rounded-[34.5px] lg:h-[69px] border-[1px] border-solid border-green mt-[22px]" v-model="email" required>
          <input type="password" placeholder="Password" class="py-[10px] px-[32px] rounded-[34.5px] lg:h-[69px] border-[1px] border-solid border-green mt-[22px]" v-model="password" required>

          <!-- Remember me and forgot password option -->
          <div class="flex flex-row mt-1 items-center align-middle">
            <span class="text-grey flex lg:mt-4 lg:ml-2 lg:text-lg">Forgot Password?</span>
            <NuxtLink to="/forgot-password" class="text-grey font-bold cursor-pointer hover:underline flex lg:mt-4 lg:ml-2 lg:text-lg">Click here</NuxtLink>
          </div>

          <!-- Login Button -->
          <button class="login-button bg-green rounded-[34.5px] lg:h-[69px] text-white text-xl p-2 lg:text-[24px] my-[32px]" @click="login" >Login</button>

          <div class="text-grey lg:text-[20px] mb-[180px]">New to PalatePicks? <router-link class="font-bold" to="/register">Sign up here!</router-link></div>

        </form>


      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    userProfiles: Object,
    loggedInUser: String,
    loggedUserProfile: Object
  },
  emits: ['retrieveSession'],
  data(){
    return {
      userName: '',
      password: '',
      email: '',
      rememberMe: false,
      userProfile: {},
      loading: true,
    }
  },
  methods: {
    handleSubmit(){
      console.log('Login Initiated');

    },
    async login(){
      this.loading = true;
      const supabase = useSupabaseClient();

      try{
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });

        if (error) throw error;
        this.$router.push('/')

      }catch(error){
        alert(error.message);
      }

      this.loading = false;
    },
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

  }

}
</script>

<style scoped>
  .login-bg {
    background-image: url("../assets/images/login-image.jpg");
    background-size: cover;
    background-position: center;
  }

  ::placeholder{
    color: #c0c0c0;
  }
</style>
