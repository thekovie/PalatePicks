<template>
  <body class="min-h-screen pb-80">
    <div class="h-[586px] min-w-screen flex flex-col pl-56 pr-64 justify-center text-white" :style="`background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Restaurant.imageHeader}); background-size: cover; background-position: center;`">
      <div class="resto-title font-bold text-5xl">
        {{ Restaurant.name }}
      </div>
      <div class="resto-ratings flex mt-3">
        <div class="resto-rating text-2xl flex pr-3">
          <img v-for="i in Restaurant.rating" class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" :key="i" />
          <img v-for="i in 5 - Restaurant.rating" class="star-icon w-25 h-25" src="../../assets/Star-blank.svg" alt="star" :key="i" />
        </div>
        <div class="dot text-2xl pr-3">
          ·
        </div>
        <div class="resto-price text-2xl">
          <span v-for="i in Restaurant.price" class="budget-icon text-xl text-green pr-1" :key="i">
            ₱
          </span>
        </div>
      </div>
      <div class="resto-description text-lg font-light mt-3">
        {{ Restaurant.description }}
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
        <div class="reviews flex flex-row justify-between">
          <div class="left-portion">
            <div class="reviews-title text-3xl font-semibold mt-20 mb-10">
              Reviews
            </div>
            <div class="reviews-list flex flex-col gap-8">
              <InputReviewBox v-if="isReviewBoxOpen" @close="closeReviewBox" :name="resto"  :isVisible="isReviewBoxOpen"/>
              <ReviewBox v-for="review in reviews" :key="review.reviewId" :reviewerPhotoSrc="review.reviewerPhotoSrc" :name="review.name" :username="review.username" :school="review.school" :reviewSubject="review.reviewSubject" :mainReview="review.mainReview" :rating="review.rating" :date="review.date" :helpfulCount="review.helpfulCount" :comments="review.comments" :gallery="review.reviewerGallery"/>
            </div>
          </div>
          <div class="review-filters mt-20 flex flex-col w-auto items-end">
            <div class="create-review">
              <button v-show="!isRestoOwner" :disabled="isReviewBoxOpen" :isVisible="isReviewBoxOpen" @click="openReviewBox" class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
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
  import InputReviewBox from '../../components/InputReviewBox.vue'
  import Restaurants from '../../json/restaurants.json'

  export default {
    components: {
      ReviewBox, InputReviewBox
    },
    props: {
      restoId: String,
    },
  methods: {
    openReviewBox() {
      this.isReviewBoxOpen = true
      },
    closeReviewBox() {
      this.isReviewBoxOpen = false
      },
    },
    data() {
      return {
          isReviewBoxOpen: false,
          isRestoOwner: false,
          restaurant: Restaurants,
      }
    },
    computed: {
      Restaurant() {
        return this.restaurant.filter((restaurant) => restaurant.name  === this.restoId)[0]
      }
    }
  }
</script>

<style scoped>
  .cover-page {
    background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
    background-size: cover;
    background-position: center;
  }
</style>
