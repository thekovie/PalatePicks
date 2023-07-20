<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="min-h-screen mb-24">
    <div class="mx-40 my-10">
      <h1 class="text-2xl font-bold">Search results for</h1>
      <p class="text-lg">"{{ search }}"</p>

      <div class="mt-5 flex flex-wrap">
        <RestoBox v-for="establishment in establishments" :key="establishment.id" :imageHeader="establishment.imageHeader" :name="establishment.name" :description="establishment.description" :rating="establishment.rating" :price="establishment.price" />
      </div>
      <div v-if="empty" class="flex flex-col items-center mt-20">
          <img class="w-20 h-20" src="~/assets/icons/green-search.svg" alt="search" />
          <p class="font-bold mt-5 text-xl">Sorry! No results found.</p>
          <NuxtLink to="/">
            <button class="back-button bg-green text-white rounded-3xl flex items-center font-light px-6 py-4 my-5">GO BACK TO HOME <img src="~/assets/icons/Arrow-left.svg" class="ms-5"/></button>
          </NuxtLink>
      </div>
      <div v-else class="flex flex-col items-end">
        <NuxtLink to="/">
          <button class="back-button bg-green text-white rounded-3xl flex items-center font-light px-6 py-4 my-5">GO BACK TO HOME <img src="~/assets/icons/Arrow-left.svg" class="ms-5"/></button>
        </NuxtLink>
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
        empty: false,
        loading: true,
      }
    },
    async mounted(){
      await this.getRestaurant()
      console.log(this.establishments)

      if(Object.keys(this.establishments).length === 0){
        this.empty = true;
      }

    }
  }
</script>
