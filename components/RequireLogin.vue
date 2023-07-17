<template>
  <div class="flex flex-col h-screen mt-80 mx-52">
    <div class="text-6xl font-semibold">
      Login Required
    </div>
    <div class="text-2xl mt-2 font-light">
       Please log in or create an account to continue.
    </div>
    <div class="mt-10">
      <router-link to="/login">
        <button class="error-404-btn bg-green rounded-3xl flex items-center font-light px-8 py-4">
          <span class="text-white text-base uppercase mr-6">Login</span>
          <img src="~/assets/icons/Arrow-left.svg" />
        </button>
      </router-link>
    </div>
  </div>
</template>
