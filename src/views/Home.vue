<template>
  <body class="pb-80">
    <div class="upper-part h-[586px] gradient-bg flex flex-col justify-center items-center">
      <div class="text-center text-3xl font-bold text-white">
          Hi, Juan! What are you craving lately?
      </div>
      <div class="search-center-box mt-4 flex relative">
        <input type="text" class="search-bar w-[600px] bg-white h-14 rounded-s-3xl pl-4 pr-4 focus:outline-none" placeholder="Search restaurant here" />
        <div class="search-btn relative w-16 h-14 pr-10 rounded-e-3xl pt-4 bg-white items-center">
          <img class="w-5 h-5 bg-white" src="../assets/Search.svg" alt="search" />
        </div>
      </div>
    </div>
  </body>

</template>

<style scoped>
  .gradient-bg {
    background: linear-gradient(0deg, rgba(75, 173, 112, 0.54), rgba(75, 173, 112, 0.54)), url(../assets/images/janice-lin-yUIN4QWKCTw-unsplash.jpg);
    background-size: cover;
    background-position: center;
  }
</style>
