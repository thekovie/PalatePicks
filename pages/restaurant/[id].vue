<template>
  <div class="min-h-screen pb-80">
    <div class="h-[586px] min-w-screen flex flex-col pl-56 pr-64 justify-center text-white" :style="`background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Restaurant.imageHeader}); background-size: cover; background-position: center;`">
      <div class="resto-title font-bold text-5xl">
        {{ Restaurant.name }}
      </div>
      <div class="resto-ratings flex mt-3">
        <div class="resto-rating text-2xl flex pr-3">
          <img v-for="i in Restaurant.rating" class="star-icon w-25 h-25" src="~/assets/icons/Star.svg" alt="star" :key="i" />
          <img v-for="i in 5 - Restaurant.rating" class="star-icon w-25 h-25" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
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
        <div class="gallery-photos flex overflow-x-auto">
            <div v-for="(media, index) in Restaurant.gallery" :key="index" class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
              <img v-if="reviewFileTypeChecker(media)" class="min-w-[500px] h-full object-cover mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review photo" @click="toggleMediaView(media)"/>
              <video v-else class="min-w-[500px] h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review video" no-controls />
              <div v-if="!reviewFileTypeChecker(media)" class="video-icon absolute bg-black bg-opacity-30 w-[150px] h-[150px] p-14 rounded-3xl" @click="toggleMediaView(media)">
                <img class="w-full h-full" src="~/assets/icons/Video.svg" />
              </div>
              <div v-if="showMediaView" @close="toggleMediaView">
                <ViewMedia @close="toggleMediaView" :media="selectedMedia" :isImage="isImage" />
              </div>
          </div>
        </div>
        <div class="reviews flex flex-row justify-between">
          <div class="left-portion">
            <div class="reviews-title text-3xl font-semibold mt-20 mb-10">
              Reviews
            </div>
            <div class="reviews-list flex flex-col gap-8">
              <InputReviewBox v-if="isReviewBoxOpen" @close="closeReviewBox" :name="restoId"  :isVisible="isReviewBoxOpen" :loggedUserProfile="loggedUserProfile" />
              <ReviewBox v-for="review in filteredRestoReviews" :key="review.reviewId" :username="review.username" :loggedInUser="loggedInUser" :loggedUserProfile="loggedUserProfile" :isRestoOwner="isRestoOwner" :reviewSubject="review.reviewSubject" :mainReview="review.mainReview" :rating="review.rating" :date="review.date" :helpfulCount="review.helpfulCount" :comments="review.comments" :gallery="review.reviewerGallery"/>
            </div>
          </div>
          <div class="review-filters mt-20 flex flex-col w-auto items-end">
            <div class="create-review">
              <div v-show="(loggedInUser !== '')">
                <button v-show="!isRestoOwner" :disabled="isReviewBoxOpen" :isVisible="isReviewBoxOpen" @click="openReviewBox" class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
                <span class="text-white text-base uppercase mr-6">Make a review</span>
                <img src="~/assets/icons/Plus.svg" />
              </button>
              </div>

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
                  <img v-for="i in 5" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                </div>
                <div class="four-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="four-stars" name="four-stars" value="four-stars" />
                  <img v-for="i in 4" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-4" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="three-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="three-stars" name="three-stars" value="three-stars" />
                  <img v-for="i in 3" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-3" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="two-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="two-stars" name="two-stars" value="two-stars" />
                  <img v-for="i in 2" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-2" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="one-star flex mt-2">
                  <input class="mx-8" type="checkbox" id="one-star" name="one-star" value="one-star" />
                  <img v-for="i in 1" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-1" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import reviews from '~/assets/json/reviews.json'
  import UserProfiles from '~/assets/json/UserProfiles.json'
  import Restaurants from '~/assets/json/restaurants.json'


  export default {
    props: {
      loggedInUser: String,
      loggedUserProfile: Object,
    },
  methods: {
      openReviewBox() {
        this.isReviewBoxOpen = true
      },
      closeReviewBox() {
        this.isReviewBoxOpen = false
      },
      toggleMediaView(media) {
        this.showMediaView = !this.showMediaView;
        this.selectedMedia = media;
        if (this.reviewFileTypeChecker(media)) {
          this.isImage = true;
        } else {
          this.isImage = false;
        }
      },
      reviewFileTypeChecker(file) {
        return file.includes('jpg') || file.includes('png') || file.includes('jpeg') || file.includes('gif');
      },
    },
    data() {
      return {
          restoId: useRoute().params.id,
          isReviewBoxOpen: false,
          isRestoOwner: false,
          restaurant: Restaurants,
          showMediaView: false,
          selectedMedia: '',
          restoReviews: reviews,
          filteredRestoReviews: {},
          userProfiles: UserProfiles,

      }
    },
    computed: {
      Restaurant() {
        return this.restaurant.filter((restaurant) => restaurant.name  === this.restoId)[0]
      }
    },
    mounted(){
      this.filteredRestoReviews = this.restoReviews.filter((restoReviews) => restoReviews.restoID === this.restoId)

    //   if(!(this.loggedInUser === '')){

    //     if(this.loggedUserProfile.restaurantName === this.restoId){
    //       this.isRestoOwner = true
    //     }
    // }

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
