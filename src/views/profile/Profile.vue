<template>
  <div class="min-h-screen mt-24">
    <div class="profile justify-center flex flex-col items-center"> <!--Profile-->
      <img :src="Profile.profileImgSrc" alt="Avatar" class=" w-48 h-48 rounded-full mt-5 object-center object-cover border-green border-[3px]"/>
      <p class="text-green text-3xl font-bold mt-5">{{ Profile.firstName }} {{ Profile.lastName }}</p>
      <p class="font-medium mt-1 text-xl">@{{ Profile.username }}</p>
      <p class="mt-1 text-lg">{{ Profile.school }}</p>
      <p class="max-w-3xl text-center text-base mt-1">{{ Profile.bio }}</p>
      <button v-if="Profile.username === loggedInUser" class="bg-green text-white px-12 mt-4 py-1 rounded-3xl"><router-link :to="{ name: 'ProfileSettings'}">Edit Profile</router-link></button>
    </div>
    <div class="user-reviews px-20 mt-4">
      <p class="font-bold p-3">View {{ Profile.firstName }}'s Reviews</p>
      <div class="reviews-list flex flex-col gap-8">
        <UserReview class="mb-6" />
      </div>
    </div>
  </div>
</template>

<script>
import UserReview from '../../components/UserReview.vue'
import UserProfiles from '../../json/UserProfiles.json'

export default {

  props: {
    username: String,
    loggedInUser: String,
  },
  data() {
      return {
        isUser: true,
        isUserExisting: true,
        userProfiles: UserProfiles
      }
  },
  computed: {
    Profile(){
      return this.userProfiles.filter((userProfiles) => userProfiles.username === this.username)[0]
    }
  },
  components: {
    UserReview
  }
}
</script>
