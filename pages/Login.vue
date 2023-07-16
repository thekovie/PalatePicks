<template>
  <div class="flex flex-col lg:flex-row min-w-screen min-h-screen ">

    <!-- Login Image -->
    <div class="bg-green_light -z-50">
      <div class="login-bg -z-40 lg:min-w-[911.62px] lg:min-h-[691px] rounded-[100px] rotate-[-27deg] relative left-[-230px] top-[-135px]"></div>
    </div>

    <!-- Login Information Side -->

    <div class="bg-green_light w-screen px-4 lg:px-32">

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
          <div class="flex flex-row justify-between mt-[33px]">
            <div class="flex flex-row">
              <input type="checkbox" class="checkbox-properties border-0 lg:w-[24px] lg:h-[24px] rounded-[5px] ml-[5px] mr-[13px] relative md:top-[3px]" v-model="rememberMe">
              <p class="remember-me text-grey lg:text-[20px]">Remember me</p>
            </div>

            <div class="text-grey flex lg:mt-4 lg:ml-8 lg:text-[20px]">Forgot password?</div>

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
  data(){
    return {
      userName: '',
      password: '',
      email: '',
      rememberMe: false,
      userProfile: {}
    }
  },
  methods: {
    handleSubmit(){
      console.log('Login Initiated');

    },
    async login(){
      const supabase = useSupabaseClient();

      try{
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });

        if (error) throw error;

        alert("You have successfully signed in! Redirecting you to the homepage...");
        this.$router.push('/')

      }catch(error){
        alert(error.message);
      }

    },
  },

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
