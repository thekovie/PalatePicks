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
    <section class="homepage px-20">
      <div class="top-restaurants">
        <div class="text-3xl font-semibold mt-20 mb-10">
          Top Restaurants
        </div>
        <div class="top-restaurants-list flex flex-wrap">
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
        </div>
      </div>
      <div class="budget-restaurants">
        <div class="text-3xl font-semibold mt-20 mb-10">
          Budget Restaurants
        </div>
        <div class="budget-restaurants-list flex flex-wrap">
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
          <RestoBox imageHeader="../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" name="Happy N' Healthy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus mauris ultrices eros in cursus turpis massa. Condimentum mattis pellentesque id nibh. Pellentesque id nibh tortor id aliquet. Neque ornare aenean euismod elementum. Nulla pharetra diam sit amet nisl suscipit. Nunc sed id semper risus in hendrerit gravida. Nisl suscipit adipiscing bibendum est ultricies integer. Pellentesque habitant morbi tristique senectus." />
        </div>
      </div>
    </section>
  </body>
</template>

<script>
  import RestoBox from '../components/RestoBox.vue'

  export default {
    components: {
      RestoBox
    }
  }
</script>

<style scoped>
  .gradient-bg {
    background: linear-gradient(0deg, rgba(75, 173, 112, 0.54), rgba(75, 173, 112, 0.54)), url(../assets/images/janice-lin-yUIN4QWKCTw-unsplash.jpg);
    background-size: cover;
    background-position: center;
  }
</style>
