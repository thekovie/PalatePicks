<template>
  <div class="min-h-screen mt-24">
    <div class="profile justify-center flex flex-col items-center"> <!--Profile-->
      <img :src="Profile.profileImgSrc" alt="Avatar" class=" w-48 h-48 rounded-full mt-5 object-center object-cover border-green border-[3px]"/>
      <p class="text-green text-3xl font-bold mt-5">{{ Profile.firstName }} {{ Profile.lastName }}</p>
      <p class="font-medium mt-1 text-xl">@{{ Profile.username }}</p>
      <p class="mt-1 text-lg">{{ Profile.school }}</p>
      <p class="max-w-3xl text-center text-base mt-1">{{ Profile.bio }}</p>
      <button v-if="Profile.username === loggedInUser" class="bg-green text-white px-12 mt-4 py-1 rounded-3xl"><router-link to="/profile/settings">Edit Profile</router-link></button>
    </div>
    <div class="user-reviews px-20 mt-4">
      <p class="font-bold p-3">View {{ Profile.firstName }}'s Reviews</p>
      <div class="reviews-list flex flex-col gap-8 mb-24">
        <UserReview v-for="review in filteredReviews" :key="review.reviewId" :username="review.username" :loggedInUser="loggedInUser" :restoName="review.restoID" :reviewSubject="review.reviewSubject" :mainReview="review.mainReview" :rating="review.rating" :date="review.date" :helpfulCount="review.helpfulCount" :comments="review.comments" :gallery="review.reviewerGallery"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfiles from '~/assets/json/UserProfiles.json'
import ReviewList from '~/assets/json/reviews.json'

export default {

  props: {
    // username: String,
    loggedInUser: String,
  },
  data() {
      return {
        username: useRoute().params.id,
        isUser: true,
        isUserExisting: true,
        userProfiles: UserProfiles,
        reviews: ReviewList,

        filteredReviews: {},
      }
  },
  computed: {
    Profile() {
      return this.userProfiles.filter((userProfiles) => userProfiles.username === this.username)[0]
    },
  },
  mounted() {
    this.filteredReviews = this.reviews.filter((reviews) => reviews.username === this.username)
  },
}
</script>
