<template>
  <body class="min-h-screen">
    <div class="cover-page h-[586px] min-w-screen flex flex-col pl-56 pr-64 justify-center text-white">
      <div class="resto-title font-bold text-5xl">
        {{ resto }}
      </div>
      <div class="resto-ratings flex mt-3">
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laboriosam magnam delectus aspernatur unde eius at, repellat numquam ratione dolor soluta cum et eveniet quasi sapiente fugiat quia! Reiciendis, beatae optio perferendis cum harum reprehenderit temporibus vitae commodi nostrum rem fugiat quidem ad. Nostrum tempore, architecto accusamus laudantium animi obcaecati, recusandae vitae nemo neque consectetur aliquam cumque perspiciatis deserunt quaerat non debitis provident deleniti aspernatur omnis ex itaque minima labore? Ullam tempora sunt praesentium velit pariatur repudiandae dignissimos iste suscipit!
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
        <div class="reviews grid grid-cols-2">
          <div class="left-portion">
            <div class="reviews-title text-3xl font-semibold mt-20 mb-10">
              Reviews
            </div>
            <div class="reviews-list flex flex-col gap-8">
              <ReviewBox />
              <ReviewBox />
              <ReviewBox />
              <ReviewBox />
              <ReviewBox />
            </div>
          </div>
          <div class="review-filters mt-20 flex flex-col w-auto items-end">
            <div class="create-review">
              <button class="create-review-btn bg-green rounded-3xl flex items-center font-light px-8 py-4">
                <span class="text-white text-base uppercase mr-6">Make a review</span>
                <img src="../../assets/Plus.svg" />
              </button>
            </div>
            <div class="filter-area mt-20">
              <div class="filter-title text-3xl font-semibold font mb-6">
                Filter Reviews
              </div>
              <div class="search-review">
                <input class="search-review-input w-[300px] h-[50px] rounded-3xl px-6 border-2 focus:outline-green" type="text" placeholder="Search reviews" />
              </div>
              <div class="star-filter flex flex-col mt-5">
                <div class="five-stars flex">
                  <input class="mx-8" type="checkbox" id="five-stars" name="five-stars" value="five-stars" />
                  <img v-for="i in 5" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                </div>
                <div class="four-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="four-stars" name="four-stars" value="four-stars" />
                  <img v-for="i in 4" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-4" class="star-icon w-25 h-25 mr-2" src="../../assets/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="three-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="three-stars" name="three-stars" value="three-stars" />
                  <img v-for="i in 3" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-3" class="star-icon w-25 h-25 mr-2" src="../../assets/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="two-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="two-stars" name="two-stars" value="two-stars" />
                  <img v-for="i in 2" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-2" class="star-icon w-25 h-25 mr-2" src="../../assets/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="one-star flex mt-2">
                  <input class="mx-8" type="checkbox" id="one-star" name="one-star" value="one-star" />
                  <img v-for="i in 1" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-1" class="star-icon w-25 h-25 mr-2" src="../../assets/Star-blank.svg" alt="star" :key="i" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  import ReviewBox from '../../components/ReviewBox.vue'
  export default {
    components: {
      ReviewBox
    },
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
