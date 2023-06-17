<template>
<div class=" h-[471px] w-[500px] bg-green_lightbg rounded-3xl m-3">
  <div class="cover-area w-full h-[177px] bg-green rounded-t-3xl">
    <img class="cover-photo w-full h-full rounded-t-3xl center object-cover object-center" :src="imageHeader" alt="restaurant1" />
  </div>
  <div class="resto-info p-6">
    <div class="budget-rate flex">
      <img class="peso-icon w-4 h-4 mr-1" src="../assets/Peso.svg" alt="Peso" />
      <img class="peso-icon w-4 h-4 mr-1" src="../assets/Peso.svg" alt="Peso" />
      <img class="peso-icon w-4 h-4 mr-1" src="../assets/Peso.svg" alt="Peso" />
    </div>
    <div class="resto-name-rating font-semibold mt-1 mb-2 flex justify-between">
      <a class="resto-name text-2xl" href="#">
        {{ name }}
      </a>
      <div class="rating flex items-center px-3">
        <img class="star-icon w-25 h-25" src="../assets/Star.svg" alt="star" />
        <img class="star-icon w-25 h-25" src="../assets/Star.svg" alt="star" />
        <img class="star-icon w-25 h-25" src="../assets/Star.svg" alt="star" />
        <img class="star-icon w-25 h-25" src="../assets/Star.svg" alt="star" />
        <img class="star-icon w-25 h-25" src="../assets/Star-blank.svg" alt="star" />
      </div>
    </div>
    <div class="description text-sm">
      {{ description }}
    </div>
  </div>
</div>
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
      }
    }
  }
</script>

<style scoped>
</style>
