<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="min-h-screen mt-24">
    <div class="profile justify-center flex flex-col items-center"> <!--Profile-->
      <img :src="Profile.profile_img_src" alt="Avatar" class=" w-48 h-48 rounded-full mt-5 object-center object-cover border-green border-[3px]"/>
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
        <UserReview v-if="reviews.length" v-for="review in reviews" :key="review" :username="review.username" :loggedUserProfile="loggedUserProfile" :restoName="review.resto_name" :reviewSubject="review.review_subject" :mainReview="review.content" :rating="review.rating" :date="review.created_at" :isEdited="review.is_edited" :helpfulCount="review.helpful_count" :gallery="review.review_gallery"/>
        <div v-else class="flex flex-col ml-3 mt-24 justify-center text-center">
          <p class="text-lg font-light text-grey mt-4">{{ Profile.first_name }} doesn't have reviews yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  setup() {
    useSeoMeta({
      title: `@${useRoute().params.id} | PalatePicks`,
      ogTitle: `@${useRoute().params.id} | PalatePicks`,
      description: `View ${useRoute().params.id}'s profile on PalatePicks`,
      ogDescription: `View ${useRoute().params.id}'s profile on PalatePicks`,
      image: 'https://i.imgur.com/14qTVqA.png',
      ogImage: 'https://i.imgur.com/14qTVqA.png',
      url: `https://palatepicks.vercel.app/profile/${useRoute().params.id}`,
      keywords: 'food, restaurant, review, food review, restaurant review, foodie, foodie review, foodie restaurant review, foodie review, foodie restaurant review, foodie restaurant, foodie restaurant review, foodie restaurant review',
    })
  },

  props: {
    loggedInUser: String,
    loggedUserProfile: Array,
  },
  emits: ['retrieveSession'],
  data() {
      return {
        supabase: useSupabaseClient(),
        username: useRoute().params.id,
        isUserOwnerOfProfile: false,
        reviews: {},
        Profile: {},
        loading: true,
      }
  },
  methods: {
    async getProfile(){
      this.loading = true;
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
          this.Profile = data;
        }
        this.loading = false;
    },

    async getUserReviews() {
      this.loading = true;
      this.reviews = ref([]);

      const { data, error } = await this.supabase
          .from('reviews')
          .select()
          .eq('reviewer_username', useRoute().params.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.log(error)
        }
        if(data){
          this.reviews = data;
        }
        this.loading = false;
    }


  },
  async mounted() {
    await this.getProfile()
    await this.getUserReviews()

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
