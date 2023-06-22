<template>
    <!-- Explore Page Main Div Container -->
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
  import RestoBox from '../../components/RestoBox.vue'
  export default {
    components: {
      RestoBox
    },
    data(){
      return {
        establishments: [
          {
            name: 'Happy N\' Healthy',
            imageHeader: 'src/assets/images/happy-n-healthy.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            rating: 4,
            price: 3
          },
          {
            name: 'GoodMunch',
            imageHeader: 'src/assets/images/good-munch.jpg',
            description: 'Sed scelerisque risus blandit lacus dapibus molestie. Proin vel urna in nibh aliquet elementum. Phasellus efficitur, diam ac scelerisque fermentum, justo tellus semper lorem, imperdiet tincidunt lacus diam ac mi. Praesent viverra orci placerat, vulputate tellus et, facilisis quam. In rhoncus placerat metus, nec dapibus sapien commodo congue. Integer quis congue ligula. Phasellus ut accumsan enim. Duis placerat augue et consectetur tristique. Sed viverra at urna non euismod. Donec euismod tristique turpis, vel viverra erat.',
            rating: 5,
            price: 2
          },
          {
            name: 'Ate Rica\'s Bacsilog',
            imageHeader: 'src/assets/images/bacsilog.jpg',
            description: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam dignissim sem sem. Duis pharetra ante id mollis scelerisque. Nam cursus lacus quis diam rutrum semper a sed est. Aliquam erat volutpat. Nulla enim lectus, scelerisque et porttitor placerat, porta ut arcu. Vivamus sed massa vel arcu convallis malesuada vel et libero. Praesent elementum viverra dapibus.',
            rating: 4,
            price: 2
          },
          {
            name: 'Ichiro',
            imageHeader: 'src/assets/images/ichiro.jpg',
            description: 'Integer at eleifend felis. Aliquam in ipsum ut enim eleifend iaculis a ac orci. Suspendisse potenti. Vivamus dapibus auctor enim vitae placerat. Mauris ornare metus ut efficitur sollicitudin. Integer egestas enim non felis scelerisque, a viverra velit dignissim. Nunc nec urna eu neque interdum pharetra at vel eros. Phasellus eu velit eu lectus malesuada volutpat.',
            rating: 4,
            price: 3
          },
          {
            name: 'Tapa King',
            imageHeader: "src/assets/images/tapaking.jpg",
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            rating: 5,
            price: 3
          },
          {
            name: 'Angrydobo',
            imageHeader: 'src/assets/images/angrydobo2.jpg',
            description: 'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris porta ultricies orci, vel elementum purus viverra a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut odio eros, molestie non orci non, venenatis dapibus ex. Phasellus facilisis lacus ex, ac sodales ex tincidunt in. Curabitur mattis dolor non convallis suscipit. Suspendisse mattis ipsum ligula, sed bibendum.',
            rating: 4,
            price: 2
          },

        ]
      }
    }
  }
</script>

<style scoped>
  .gradient-bg {
    background: url("../../assets/images/wp10322952-restaurant-food-wallpapers.jpg");
    position: relative;
    background-size: cover;
    background-position: center;
  }


</style>
