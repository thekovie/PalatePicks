<template>
  <div class="error flex flex-col h-screen mt-80 mx-52">
    <div class="error-404-title text-6xl font-semibold">
      {{ error.statusCode }}
    </div>
    <div class="error-subtitle text-2xl mt-2 font-light">
       {{ error.message }}
    </div>
    <div class="error-btn mt-10">
      <router-link to="/">
        <button class="error-404-btn bg-green rounded-3xl flex items-center font-light px-8 py-4">
          <span class="text-white text-base uppercase mr-6">Go back to home</span>
          <img src="~/assets/icons/Arrow-left.svg" />
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
