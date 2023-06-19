<template>

    <!-- Login Image -->
    <div class="bg-green_light -z-50">
      <div class="login-bg -z-40 min-w-[911.62px] min-h-[691px] rounded-[100px] rotate-[-27deg] relative left-[-230px] top-[-135px]"></div>
    </div>

    <!-- Login Information Side -->
    <div class="bg-green_light w-screen">
      <div class="flex flex-col mr-[88px]">

        <!-- Login Introduction -->
        <div class="font-bold text-[64px] mt-[110px]">Welcome!</div>
        <div class="text-[24px] text-grey">To continue, please sign in to your account</div>

        <!-- Login Form -->
        <form @submit.prevent="handleSubmit" class="flex flex-col">
          <input type="text" placeholder="Username" class="py-[10px] px-[32px] rounded-[34.5px] h-[69px] border-[1px] border-solid border-green mt-[22px]" v-model="userName" required>
          <input type="password" placeholder="Password" class="py-[10px] px-[32px] rounded-[34.5px] h-[69px] border-[1px] border-solid border-green mt-[22px]" v-model="password" required>

          <!-- Remember me and forgot password option -->
          <div class="flex flex-row justify-between mt-[33px]">
            <div class="flex flex-row">
              <input type="checkbox" class="checkbox-properties border-0 w-[24px] h-[24px] rounded-[5px] ml-[5px] mr-[13px] relative top-[3px]" v-model="rememberMe">
              <p class="remember-me text-grey text-[20px]">Remember me</p>
            </div>

            <div class="text-grey text-[20px]">Forgot password?</div>

          </div>

          <!-- Login Button -->
          <button class="login-button bg-green rounded-[34.5px] h-[69px] text-white text-[24px] my-[32px]" >Login</button>


          <!-- Redirect to sign up/register page -->
          <div class="text-grey text-[20px] mb-[180px]">New to PalatePicks? <router-link class="font-bold" :to="{ name: 'Register'}">Sign up here!</router-link></div>

        </form>


      </div>
    </div>

  </div>
</template>
