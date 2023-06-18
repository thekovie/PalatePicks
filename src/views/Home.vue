<template>
  <div class="pb-80">
    <div class="upper-part h-[586px] gradient-bg flex flex-col justify-center items-center">
      <div class="text-center text-3xl font-bold text-white">
          Hi, Juan! What are you craving lately?
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

  export default {
    components: {
      RestoBox
    },
    data() {
      return {
        establishments: [
          {
            name: 'Happy N\' Healthy',
            imageHeader: '../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            rating: 4,
            price: 3
          },
          {
            name: 'Restaurant 2',
            imageHeader: '../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            rating: 5,
            price: 2
          },
          {
            name: 'Restaurant 3',
            imageHeader: '../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            rating: 3,
            price: 1
          },
          {
            name: 'Restaurant 4',
            imageHeader: '../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            rating: 1,
            price: 3
          },
          {
            name: 'Restaurant 5',
            imageHeader: '../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            rating: 4,
            price: 2
          },
          {
            name: 'Restaurant 6',
            imageHeader: '../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            rating: 2,
            price: 3
          },
          {
            name: 'Restaurant 7',
            imageHeader: '../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            rating: 1,
            price: 2
          },
          {
            name: 'Restaurant 8',
            imageHeader: '../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa volutpat aliquam fringilla non.',
            rating: 4,
            price: 3
          }
        ]
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
