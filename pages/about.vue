<template>
  <div class="flex flex-col min-h-screen px-4 md:px-24 pb-24 mt-20">
    <div class="flex items-center">
      <img src="/PalatePicks.svg" alt="PalatePicks Logo" class="w-16 h-16">
      <span class="title font-medium text-4xl ml-3 text-green">About <span class="font-cursive">PalatePicks</span></span>
    </div>
    <div class="mission flex flex-col mt-10">
      <span class="subtitle font-bold text-2xl">Our Mission</span>
      <span class="text-lg mt-5"><span class="font-cursive text-green">PalatePicks</span> is a web application that aims to help students find the best food establishments around the Taft area and soon all over Metro Manila. It is a platform where students can share their experiences and reviews about the food establishments they have visited. <span class="font-cursive text-green">PalatePicks</span> also aims to help food establishments improve their services by providing them with feedback from their customers.</span>
    </div>
    <div class="disclaimer mt-28 flex flex-col border-t border-grey border-1">
      <span class="subtitle font-bold text-2xl mt-8">Disclaimer</span>
      <span class="text-lg mt-5"><span class="font-cursive text-green">PalatePicks</span> is a web application for CCAPDEV class at De La Salle University that is created solely for educational purposes and serves as a simulated platform designed as part of a school project. <span class="underline">All reviews, ratings, and opinions displayed on the website are entirely fictional and do not reflect the real experiences or sentiments of any individuals or establishments</span>.</span>
    </div>
    <div class="development mt-16 flex flex-col md:flex-row md:justify-around gap-2">
      <div class="development flex flex-col">
        <span class="subtitle font-bold text-2xl">Development</span>
        <span class="text-lg mt-5">This web application is developed by <span class="font-cursive text-green">CCAPDEV S13 Group 3</span> composed of the following members:</span>
        <div class="members mt-1 flex flex-col">
          <span class="text-lg">John Kovie Niño</span>
          <span class="text-lg">Wesly Samson</span>
          <span class="text-lg">Rafael Antonio Austria</span>
          <span class="text-lg">Reign Elaiza Larraquel</span>
        </div>
      </div>
      <div class="main-stack flex flex-col">
        <span class="subtitle font-bold text-2xl">Main Stack</span>
        <span class="text-lg mt-5">The following technologies were used in the development of this web application:</span>
        <div class="stack mt-1 flex flex-col font-monospace">
          <span class="text-md">NuxtJS</span>
          <span class="text-sm font-sans">Web Framework</span>
          <span class="text-md mt-2">Tailwind CSS</span>
          <span class="text-sm font-sans">CSS Framework</span>
          <span class="text-md mt-2">Supabase</span>
          <span class="text-sm font-sans">Database</span>
        </div>
      </div>
      <div class="npm-packages flex flex-col">
        <span class="subtitle font-bold text-2xl">NPM Packages</span>
        <span class="text-lg mt-5">The following NPM packages were used in the development of this web application:</span>
        <div class="packages mt-1 flex flex-col font-light font-monospace">
          <span class="text-md">@nuxt/devtools</span>
          <span class="text-md">@nuxtjs/supabase</span>
          <span class="text-md">@types/node</span>
          <span class="text-md">autoprefixer</span>
          <span class="text-md">nuxt</span>
          <span class="text-md">postcss</span>
          <span class="text-md">tailwindcss</span>
        </div>
      </div>
    </div>
    <div class="open-source flex flex-col">
      <span class="subtitle font-bold text-2xl">Open Source</span>
      <span class="text-lg mt-5">This web application is open source and is available on <a class="text-grey hover:underline" href="https://github.com/thekovie/PalatePicks">GitHub</a>.</span>
    </div>
  </div>
</template>

<script>
  export default {
    setup() {
      useSeoMeta({
        title: 'About Us | PalatePicks',
        ogTitle: 'About Us | PalatePicks',
        description: 'Learn more about PalatePicks',
        ogDescription: 'Learn more about PalatePicks',
        image: 'https://i.imgur.com/14qTVqA.png',
        ogImage: 'https://i.imgur.com/14qTVqA.png',
        url: 'https://palatepicks.vercel.app/about',
        keywords: 'food, restaurant, review, food review, restaurant review, foodie, foodie review, foodie restaurant review, foodie review, foodie restaurant review, foodie restaurant, foodie restaurant review, foodie restaurant review',
      });
    }
  }
</script>

<style scoped>

</style>
