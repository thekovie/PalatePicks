<template>
<NuxtLink :to="`/restaurant/${name}`">
  <div class=" h-[471px] w-[500px] bg-green_lightbg rounded-3xl m-3">
    <div class="cover-area w-full h-[177px] bg-green rounded-t-3xl">
      <img class="cover-photo w-full h-full rounded-t-3xl center object-cover object-center" :src="imageHeader" alt="restaurant1" />
    </div>
    <div class="resto-info p-6">
      <div class="budget-rate flex">
        <div v-for="i in price" class="budget-icon text-xl text-green pr-1" :key="i">
          ₱
        </div>
      </div>
      <div class="resto-name-rating font-semibold mb-2 flex justify-between">
        <div class="resto-name text-2xl">
          {{ name }}
        </div>
        <div class="rating flex items-center px-3">
          <img v-for="i in rating" class="star-icon w-25 h-25" src="~/assets/icons/Star.svg" alt="star" :key="i" />
          <img v-for="i in 5 - rating" class="star-icon w-25 h-25" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
        </div>
      </div>
      <div class="description text-sm">
        {{ description }}
      </div>
    </div>
  </div>
</NuxtLink>
</template>

<script>
  export default {
    props: {
      imageHeader: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      rating: {
        type: Number
      },
      price: {
        type: Number
      }
    }
  }
</script>

<style scoped>
</style>
