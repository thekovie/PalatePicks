<template>
<div class="profile justify-center flex flex-col items-center"> <!--Profile-->

  <img src="../../assets/images/user.jpg" alt="Avatar" class="w-44 h-44 rounded-full mt-5"/>
  <p class="text-green text-xl font-bold mt-5">Kovie Niño</p>
  <p class="font-bold mt-1">@tofudubu</p>
  <p class="mt-1">De La Salle University</p>
  <p class="max-w-3xl text-center mt-1">A tech enthusiast by day, and a culinary adventurer by night. From coding to cooking, I blend my passion for software technology with my insatiable appetite for trying new flavors. As a student, I've embarked on a mouthwatering mission to visit and review every restaurant in town.</p>
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
import UserReview from '../../components/UserReview.vue';
export default {
  data() {
      return {
        isUser: true,
      }
    },
    components: {
    UserReview
  }
}
</script>
