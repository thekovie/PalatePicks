<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="min-h-screen mb-24">
    <div class="upper-part h-96 sm:h-[586px] min-w-screen gradient-bg flex flex-col justify-center items-center">
      <div class="text-center text-2xl sm:text-3xl font-bold text-white">
          <span v-if="loggedUserProfile.length">Hi, {{ loggedUserProfile[0].first_name }}!</span> What are you craving lately?
      </div>
      <div class="search-center-box mt-4 flex">
        <input type="text" class="search-bar sm:w-[600px] bg-white h-14 rounded-s-3xl pl-4 pr-4 focus:outline-none" placeholder="Search restaurant here" />
        <div class="search-btn w-16 h-14 pr-10 rounded-e-3xl pt-4 bg-white items-center">
          <img class="w-5 h-5 bg-white" src="~/assets/icons/Search.svg" alt="search" />
        </div>
      </div>
    </div>
    <section class="homepage px-1 sm:px-20">
      <div class="top-restaurants">
        <div class="text-3xl font-semibold mt-20 mb-10 text-center sm:text-left">
          Top Restaurants
        </div>
        <div class="top-restaurants-list flex flex-col sm:flex-wrap sm:flex-row">
          <RestoBox v-for="establishment in establishments" :key="establishment.id" :imageHeader="establishment.imageHeader" :name="establishment.name" :description="establishment.description" :rating="establishment.rating" :price="establishment.price" :restaurant="establishments" />
        </div>
      </div>
      <div class="budget-restaurants">
        <div @click="this.$emit('stop')" class="text-3xl font-semibold mt-20 mb-10 text-center sm:text-left">
          Budget Restaurants
        </div>
        <div class="budget-restaurants-list flex flex-col sm:flex-wrap sm:flex-row">
          <RestoBox v-for="establishment in establishments" :key="establishment.id" :imageHeader="establishment.imageHeader" :name="establishment.name" :description="establishment.description" :rating="establishment.rating" :price="establishment.price" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  // import Restaurants from '~/assets/json/restaurants.json'

  export default {
    async beforeMount() {
      this.$emit('retrieveSession');
    },

    async mounted() {
      await this.fetchRestaurants();
    },

    props: {
      loggedInUser: String,
      loggedUserProfile: Array
    },
    emits: ["retrieveSession", "stop"],
    data() {
      return {
        firstName: '',
        establishments: {}
      }
    },

    methods: {
      async fetchRestaurants() {
        this.loading = true;
        const supabase = useSupabaseClient();
        const { data, error } = await supabase
          .from('restaurants')
          .select()
        if (error) {
          console.log(error)
        } else {
          this.establishments = data
          console.log(data)
        }
        this.loading = false;
      }
    }
  }
</script>

<style scoped>
  .gradient-bg {
    background: linear-gradient(0deg, rgba(75, 173, 112, 0.54), rgba(75, 173, 112, 0.54)), url(~/assets/images/janice-lin-yUIN4QWKCTw-unsplash.jpg);
    background-size: cover;
    background-position: center;
  }
</style>
