<template>
  <div class="min-h-screen mb-24">
    <div class="upper-part h-[586px] min-w-screen gradient-bg flex flex-col justify-center items-center">
      <div class="text-center text-3xl font-bold text-white">
          <span v-show="!(loggedInUser === '')">Hi, {{ firstName }}!</span> What are you craving lately?
      </div>
      <div class="search-center-box mt-4 flex">
        <input type="text" class="search-bar w-[600px] bg-white h-14 rounded-s-3xl pl-4 pr-4 focus:outline-none" placeholder="Search restaurant here" />
        <div class="search-btn w-16 h-14 pr-10 rounded-e-3xl pt-4 bg-white items-center">
          <img class="w-5 h-5 bg-white" src="../assets/Search.svg" alt="search" />
        </div>
      </div>
    </div>
    <section class="homepage px-20">
      <div class="top-restaurants">
        <div class="text-3xl font-semibold mt-20 mb-10">
          Top Restaurants
        </div>
        <div class="top-restaurants-list flex flex-wrap">
          <RestoBox v-for="establishment in establishments" :key="establishment.id" :imageHeader="establishment.imageHeader" :name="establishment.name" :description="establishment.description" :rating="establishment.rating" :price="establishment.price" />
        </div>
      </div>
      <div class="budget-restaurants">
        <div class="text-3xl font-semibold mt-20 mb-10">
          Budget Restaurants
        </div>
        <div class="budget-restaurants-list flex flex-wrap">
          <RestoBox v-for="establishment in establishments" :key="establishment.id" :imageHeader="establishment.imageHeader" :name="establishment.name" :description="establishment.description" :rating="establishment.rating" :price="establishment.price" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import RestoBox from '../components/RestoBox.vue'
  import Restaurants from '../json/restaurants.json'

  export default {
    components: {
      RestoBox
    },
    mounted() {
      if (this.loggedInUser !== '') {
        this.firstName = this.loggedUserProfile.firstName
      }
    },
    props: {
      loggedInUser: String,
      loggedUserProfile: Object
    },

    data() {
      return {
        establishments: Restaurants,
        firstName: '',
      }
    }
  }
</script>

<style scoped>
  .gradient-bg {
    background: linear-gradient(0deg, rgba(75, 173, 112, 0.54), rgba(75, 173, 112, 0.54)), url(../assets/images/janice-lin-yUIN4QWKCTw-unsplash.jpg);
    background-size: cover;
    background-position: center;
  }
</style>
