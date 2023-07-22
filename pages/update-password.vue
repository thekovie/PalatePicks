<template>
  <div class="flex">
    <div class="flex flex-col h-screen mt-32 mx-[384px]">
      <div class="text-6xl font-semibold">
        Find your account
      </div>
      <div class="text-2xl mt-2 font-light">
        Please enter your email address to reset your password. A link will be sent to the email you've provided with instructions on how to reset your password.
      </div>


      <form @submit.prevent="handleSubmit" class="flex flex-col align-middle">
          <input type="text" placeholder="Email" class="py-4 px-[32px] rounded-[34.5px] border-[1px] border-solid border-green mt-[2rem]" v-model="email" required>
      </form>

      <div class="mt-10">
        <router-link to="/login">
          <button class="error-404-btn bg-green rounded-3xl flex items-center font-light px-8 py-4">
            <span class="text-white text-base uppercase mr-6">Login</span>
            <img src="~/assets/icons/Arrow-left.svg" />
          </button>
        </router-link>
      </div>
    </div>

  </div>

</template>



<script>

  export default {
    methods: {
      handleSubmit(){
        // Do nothing
      }
    }




  }

</script>
