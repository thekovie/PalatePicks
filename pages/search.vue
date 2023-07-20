<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="min-h-screen mb-24">
    <div class="mx-40 my-10">
      <h1 class="text-2xl font-bold">Search results for</h1>
      <p class="text-lg">"{{ search }}"</p>
      <NuxtLink to="/">
        <button class="back-button bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 my-5">Back to Home</button>
      </NuxtLink>
      <div class="mt-5 flex flex-wrap">
        <RestoBox v-for="establishment in establishments" :key="establishment.id" :imageHeader="establishment.imageHeader" :name="establishment.name" :description="establishment.description" :rating="establishment.rating" :price="establishment.price" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      async getRestaurant(){
        this.loading = true;
        this.establishments = ref([]);

        const { data, error } = await this.supabase
          .from('restaurants')
          .select()
          .ilike('name', `%${this.search}%`)

          if (error) {
            console.log(error)
          }
          if(data){
            console.log(data);
            this.establishments = data;
            console.log('Found data')
          }

          this.loading = false;
      }
    },
    data() {
      return {
        supabase: useSupabaseClient(),
        search: useRoute().query.search,
        establishments: {},
        loading: true,
      }
    },
    async mounted(){
      await this.getRestaurant()
      console.log(this.establishments)
    }
  }
</script>
