<template>
  <!-- Explore Page Main Div Container -->
  <Preloader v-if="loading" :loading="loading" />
  <div class="flex flex-col min-h-screen">

    <!-- Introduction Div -->
    <div class="gradient-bg h-[708px] min-w-screen -z-50 py-[273px]">
      <div class="text-white font-bold text-6xl z-50 w-[670px] text-center mx-auto">Find food with ease, for the busy you.</div>
      <div class="bg-black/60 absolute top-0 left-0 w-[100%] h-[100%] -z-50">
    </div>

  </div>

  <!-- Content Div Container -->
  <div class="px-[55px] mb-[94px]">
    <!-- Explore foods caption-->
    <div class="font-bold text-5xl my-[44px] pb-7 border-b-[1.5px] border-b-[#d9d9d9]">Explore Foods and Restaurants </div>

    <!-- Restaurants Div Container-->
    <div class="flex flex-wrap">
      <RestoBox v-for="establishment in establishments" :key="establishment.id" :imageHeader="establishment.imageHeader" :name="establishment.name" :description="establishment.description" :rating="establishment.rating" :price="establishment.price" />
    </div>
  </div>

</div>
</template>

<script>
import RestoBox from '/components/RestoBox.vue';

export default {
  components: {
    RestoBox,
  },
  emits: ['retrieveSession'],
  props: {
    loggedInUser: String,
    loggedUserProfile: Array,
    session: Object
  },
  data() {
    return {
      establishments: [],
      loading: true
    };
  },
  async created() {
    await this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      this.loading = true;
      const supabase = useSupabaseClient();
      try {
        const { data, error } = await supabase.from('restaurants').select();
        if (error) {
          console.error(error);
        } else {
          this.establishments = data.sort((a, b) => a.name.localeCompare(b.name));
        }
      } catch (error) {
        console.error(error);
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
  .gradient-bg {
    background: url("~/assets/images/wp10322952-restaurant-food-wallpapers.jpg");
    position: relative;
    background-size: cover;
    background-position: center;
  }
</style>
