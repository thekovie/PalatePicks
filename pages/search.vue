<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="min-h-screen mb-24">
    <div class="upper-part h-96 sm:h-[586px] min-w-screen gradient-bg flex flex-col justify-center items-center">
      <div class="text-center text-2xl sm:text-3xl font-bold text-white">
          <span v-if="loggedUserProfile.length">Hi, {{ loggedUserProfile[0].first_name }}!</span> What are you craving lately?
      </div>
      <div class="search-center-box mt-4 flex">
        <input type="text" class="search-bar sm:w-[600px] bg-white h-14 rounded-s-3xl pl-4 pr-4 focus:outline-none" placeholder="Search restaurant here" />
        <div class="search-btn w-16 h-14 pr-10 rounded-e-3xl pt-4 bg-white items-center">
          <img class="w-5 h-5 bg-white" src="~/assets/icons/Search.svg" alt="search" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      session: Object,
      loggedInUser: String,
      loggedUserProfile: Array
    }
  }
</script>
