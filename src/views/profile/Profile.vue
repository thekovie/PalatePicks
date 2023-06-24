<template>


    <div class="profile justify-center flex flex-col items-center"> <!--Profile-->
    <img :src="Profile.profileImgSrc" alt="Avatar" class="w-44 h-44 rounded-full mt-5 object-center object-cover border-green border-[3px]"/>
    <p class="text-green text-xl font-bold mt-5"></p>
    <p class="font-bold mt-1">@{{ Profile.username }}</p>
    <p class="mt-1">{{ Profile.school }}</p>
    <p class="max-w-3xl text-center mt-1">{{ Profile.bio }}</p>
    <button class="bg-green text-white px-12 mt-4 mb-4 py-1 rounded-3xl" v-if="isUser"><router-link :to="{ name: 'ProfileSettings'}">Edit Profile</router-link></button>

    </div>

    <div class="user-reviews px-20">
      <p class="font-bold p-3">View Kovie's Reviews</p>

      <div class="reviews-list flex flex-col gap-8">
        <UserReview class="mb-6" />
      </div>

    </div>






</template>

<script>
import UserReview from '../../components/UserReview.vue'
import UserProfiles from '../../json/UserProfiles.json'

export default {

  props: {
    username: String,
  },
  data() {
      return {
        isUser: true,
        isUserExisting: true,
        userProfiles: UserProfiles,
      }
  },
  computed: {
    Profile(){
      return this.userProfiles.filter((userProfiles) => userProfiles.username === this.username)[0]
    }
  },
  components: {
    UserReview
  },
  methods: {
    doesUserExist(){
      if(this.userProfiles.filter((userProfiles) => userProfiles.username === this.username)[0] === {}){
        this.isUserExisting = false;
        console.log("ENTER")
      }
    }
  }
}
</script>
