<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="min-h-screen pb-80">
    <div class="h-[250px] md:h-[586px] min-w-screen flex flex-col pl-4 md:pl-56 md:pr-64 justify-center text-white" :style="`background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Restaurant.imageHeader}); background-size: cover; background-position: center;`">
      <div class="resto-title font-bold text-3xl md:text-5xl">
        {{ Restaurant.name }}
      </div>
      <div class="resto-ratings flex mt-3">
        <div class="resto-rating text-2xl flex pr-3">
          <img v-for="i in Restaurant.rating" class="star-icon w-25 h-25" src="~/assets/icons/Star.svg" alt="star" :key="i" />
         <img v-for="i in 5 - rating" class="star-icon w-25 h-25" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />

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
      <div class="resto-description md:text-lg font-light mt-3">
        {{ Restaurant.description }}
      </div>
    </div>
    <div class="body px-4 md:px-20">
      <div class="gallery">
        <div class="gallery-title text-3xl font-semibold mt-20 mb-10">
          Gallery
        </div>
        <div class="gallery-photos flex overflow-x-auto">
            <div v-for="(media, index) in Restaurant.gallery" :key="index" class="gallery-photo w-80 h-80 md:w-[500px] md:h-[500px] mr-10 mb-10">
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
        <div class="reviews flex flex-col-reverse md:flex-row justify-between">
          <div class="left-portion">
            <div class="reviews-title text-3xl font-semibold mt-20 mb-10">
              Reviews
            </div>
            <div class="reviews-list flex flex-col gap-8">
              <InputReviewBox @update="getReviews" v-if="isReviewBoxOpen" @close="closeReviewBox" :name="restoId"  :isVisible="isReviewBoxOpen" :loggedUserProfile="loggedUserProfile" />
              <ReviewBox @update="getReviews" v-if="(restoReviews.length)" v-for="review in restoReviews" :key="review" @refreshRating="getRestaurant" :username="review.reviewer_username" :loggedUserProfile="loggedUserProfile" :isRestoOwner="isRestoOwner" :reviewSubject="review.review_subject" :mainReview="review.content" :rating="review.rating" :date="review.created_at" :helpfulCount="review.helpful_count" :comments="review.comments" :reviewId="review.review_id" :gallery="review.review_gallery" :isEdited="review.is_edited"/>
              <div v-else class="no-reviews text-xl font-light text-grey mt-8">
                <span v-show="!isReviewBoxOpen">No reviews yet. Be the first to review this restaurant!</span>
              </div>
            </div>
          </div>
          <div class="review-filters mt-20 flex flex-col w-auto sm:items-end">
            <div class="create-review">
              <div v-if="!hasReviewed">
                <button v-if="!isRestoOwner" :disabled="isReviewBoxOpen" :isVisible="isReviewBoxOpen" @click="openReviewBox" class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
                  <span class="text-white text-base uppercase mr-6">Make a review</span>
                  <img src="~/assets/icons/Plus.svg" />
                </button>
              </div>
            </div>
            <div class="filter-area flex flex-col mt-20">
              <div class="filter-title text-3xl font-semibold font mb-6">
                Filter Reviews
              </div>
              <div class="search-review relative">
                <input class="search-review-input block w-full h-[50px] rounded-3xl pl-6 pr-16 border-2 focus:outline-green" type="text" placeholder="Search reviews" />
                <button class="search-review-button absolute top-0 right-0 h-[50px] text-white rounded-r-3xl flex items-center  border-black px-6 py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </div>
              <div class="filter flex flex-col mt-5 border-t-2 pt-4 border-grey">
                <div class="new-to-old flex">
                  <input class="mx-8" type="radio" id="new-to-old" name="new-to-old" value="new-to-old" />
                  <label class="text-lg font-light" for="new-to-old">Newest to Oldest</label>
                </div>
                <div class="old-to-new flex mt-2 pb-4 border-b-2 border-grey">
                  <input class="mx-8" type="radio" id="old-to-new" name="old-to-new" value="old-to-new" />
                  <label class="text-lg font-light" for="old-to-new">Oldest to Newest</label>
                </div>
                <div class="five-stars flex mt-4">
                  <input class="mx-8" type="radio" id="five-stars" name="five-stars" value="five-stars" />
                  <img v-for="i in 5" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                </div>
                <div class="four-stars flex mt-2">
                  <input class="mx-8" type="radio" id="four-stars" name="four-stars" value="four-stars" />
                  <img v-for="i in 4" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-4" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="three-stars flex mt-2">
                  <input class="mx-8" type="radio" id="three-stars" name="three-stars" value="three-stars" />
                  <img v-for="i in 3" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-3" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="two-stars flex mt-2">
                  <input class="mx-8" type="radio" id="two-stars" name="two-stars" value="two-stars" />
                  <img v-for="i in 2" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-2" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="one-star flex mt-2">
                  <input class="mx-8" type="radio" id="one-star" name="one-star" value="one-star" />
                  <img v-for="i in 1" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-1" class="star-icon w-25 h-25 mr-2" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>
              </div>
              <div class="reset-filters">
                <button class="back-button bg-green text-white rounded-3xl text-center w-full font-light my-5 h-[45px]">
                  RESET FILTERS
                </button>
              </div>
            </div>
          </div>
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
    },
    methods: {
      openReviewBox() {
        if (!this.loggedUserProfile.length) {
          this.$router.push('/login')
        } else {
          this.isReviewBoxOpen = true
        }
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
      async getRestaurant(){
        this.loading = true;
        this.Restaurant = ref([]);

        const { data, error } = await this.supabase
          .from('restaurants')
          .select()
          .eq('name', useRoute().params.id)
          .maybeSingle();


        if (error) {
          console.log(error)
        }
        if(data){
          console.log(data);
          this.Restaurant = data;
          this.rating = data.rating
          console.log('AAAAA')
        }

        this.loading = false;
      },

      reviewFileTypeChecker(file) {
        return file.includes('jpg') || file.includes('png') || file.includes('jpeg') || file.includes('gif');
      },

      async getReviews() {
        this.loading = true;
        this.restoReviews = ref([]);

        try {
          const { data, error } = await this.supabase
          .from('reviews')
          .select()
          .eq('resto_name', this.restoId);

          if (data) {
            this.restoReviews = data;
          }

          if (error) {
            throw error
          }
        } catch(error) {
          console.log(error)
        } finally {
          this.loading = false;
        }
      },

      async didUserReview() {
        this.loading = true;
        this.hasReviewed = false;

        try {
          const { data, error } = await this.supabase
          .from('reviews')
          .select()
          .eq('resto_name', this.restoId)
          .eq('reviewer_username', this.loggedUserProfile[0].username);

          this.query = data;

          if (data.length > 0) {
            this.hasReviewed = true;
          }

          if (error) {
            throw error
          }
        } catch(error) {
          console.log(error)
        } finally {
          this.loading = false;
        }
      },
    },
    data() {
      return {
          supabase: useSupabaseClient(),
          restoId: useRoute().params.id,
          isReviewBoxOpen: false,
          isRestoOwner: false,
          showMediaView: false,
          selectedMedia: '',
          restoReviews: {},
          Restaurant: {},
          rating: 0,
          loading: true,
          hasReviewed: false,
          query: {},
      }
    },
    computed: {

    },
    async mounted(){
      await this.getRestaurant()
      await this.getReviews()
      await this.didUserReview()

      console.log(this.Restaurant)
      console.log(`This user has reviewed this restaurant: ${this.hasReviewed}`)
      console.log(this.query)

      // If no restaurant object is found (no keys)
      if(Object.keys(this.Restaurant).length === 0){
        throw createError({ statusCode: 404, statusMessage: 'Restaurant not found...', fatal: true})
      } else {

        // Checks if current logged in user is restaurant owner
        if(this.loggedUserProfile.length){
          if(this.Restaurant.owner === this.loggedUserProfile[0].username){
            this.isRestoOwner = true
          }
        }
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
