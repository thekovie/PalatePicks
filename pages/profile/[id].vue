<template>
  <div class="min-h-screen mt-24">
    <div class="profile justify-center flex flex-col items-center"> <!--Profile-->
      <img src="#" alt="Avatar" class=" w-48 h-48 rounded-full mt-5 object-center object-cover border-green border-[3px]"/>
      <p class="text-green text-3xl font-bold mt-5">{{ Profile.first_name }} {{ Profile.last_name }}</p>
      <p class="font-medium mt-1 text-xl">@{{ Profile.username }}</p>
      <p class="mt-1 text-lg">{{ Profile.school }}</p>
      <p class="max-w-3xl text-center text-base mt-1">{{ Profile.bio }}</p>
      <!-- Add if condition that checks if logged in user is the same as the user in the page -->
      <button v-if="isUserOwnerOfProfile" class="bg-green text-white px-12 mt-4 py-1 rounded-3xl"><router-link to="/profile/settings">Edit Profile</router-link></button>
    </div>
    <div class="user-reviews px-20 mt-4">
      <p class="font-bold p-3">View {{ Profile.first_name }}'s Reviews</p>
      <div class="reviews-list flex flex-col gap-8 mb-24">
        <UserReview v-for="review in filteredReviews" :key="review.reviewId" :username="review.username" :loggedInUser="loggedInUser" :restoName="review.restoID" :reviewSubject="review.reviewSubject" :mainReview="review.mainReview" :rating="review.rating" :date="review.date" :helpfulCount="review.helpfulCount" :comments="review.comments" :gallery="review.reviewerGallery"/>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewList from '~/assets/json/reviews.json'

export default {

  props: {
    // username: String,
    loggedInUser: String,
    loggedUserProfile: Array,
  },
  data() {
      return {
        supabase: useSupabaseClient(),
        username: useRoute().params.id,
        isUserOwnerOfProfile: false,
        reviews: ReviewList,
        Profile: {},
        filteredReviews: {},
      }
  },
  methods: {
    async getProfile(){
      this.Profile = ref([]);

      const { data, error } = await this.supabase
          .from('profiles')
          .select()
          .eq('username', useRoute().params.id)
          .maybeSingle();


        if (error) {
          console.log(error)
        }
        if(data){
          console.log(data);
          this.Profile = data;
          console.log('Profile Loaded')
        }

    }


  },
  async mounted() {
    await this.getProfile()
    console.log(this.Profile)

    if(Object.keys(this.Profile).length === 0){
      throw createError({ statusCode: 404, statusMessage: 'User not found...', fatal: true})
    }else{
      this.filteredReviews = this.reviews.filter((reviews) => reviews.username === this.username)
    }
  },
  beforeUpdate(){
    if(this.loggedUserProfile.length){
        if(this.loggedUserProfile[0].username === this.username){
          this.isUserOwnerOfProfile = true;
        }else{
          this.isUserOwnerOfProfile = false;
        }

      }
  }
}
</script>
