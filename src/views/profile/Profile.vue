<template>
<div class="justify-center flex flex-col items-center"> <!--Profile-->

  <img src="../../assets/images/user.jpg" alt="Avatar" class="w-44 h-44 rounded-full"/>
  <p class="text-green text-xl font-bold mt-5">Kovie Niño</p>
  <p class="font-bold mt-1">@tofudubu</p>
  <p class="mt-1">De La Salle University</p>

  <div class="max-w-3xl text-center mt-1">

    <p class="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis elit et purus gravida tristique. Mauris vitae mattis ante. Vestibulum condimentum, justo a bibendum lacinia.</p>

  </div>

  <button class="bg-green text-white px-12 mt-4 mb-4 py-1 rounded-3xl" v-if="isUser"><router-link :to="{ name: 'ProfileSettings'}">Edit Profile</router-link></button>
</div>
<!--Component Here-->
</template>

<script>
export default {
  data() {
      return {
        isUser: true,
      }
    },
}
</script>
