<template>
  <body class="flex-grow">
    <div class="cover-page h-[586px] flex flex-col pl-56 pr-64 justify-center text-white">
      <div class="resto-title font-bold text-5xl">
        {{ resto }}
      </div>
      <div class="resto-ratings flex flex-row mt-3">
        <div class="resto-rating text-2xl flex pr-3">
          <img class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" />
          <img class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" />
          <img class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" />
          <img class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" />
          <img class="star-icon w-25 h-25" src="../../assets/Star-blank.svg" alt="star" />
        </div>
        <div class="dot text-2xl pr-3">
          ·
        </div>
        <div class="resto-price text-2xl">
          ₱ ₱ ₱
        </div>
      </div>
      <div class="resto-description text-lg font-light mt-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.
      </div>
    </div>
    <div class="body px-20">
      <div class="gallery">
        <div class="gallery-title text-3xl font-semibold mt-20 mb-10">
          Gallery
        </div>
        <div class="gallery-photos flex">
          <div class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
            <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
          </div>
          <div class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
            <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
          </div>
          <div class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
            <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
          </div>
          <div class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
            <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
          </div>
        </div>
        <div class="reviews">
          <div class="reviews-title text-3xl font-semibold mt-20 mb-10">
            Reviews
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  export default {
    props: ['resto', 'description', 'imgHeader'],
  }
</script>

<style scoped>
  .cover-page {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg');
    background-size: cover;
    background-position: center;
  }
</style>
