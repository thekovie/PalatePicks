<template>
  <Preloader v-if="loading" :loading="loading" />
  <div class="min-h-screen mb-24">
    <h1>Search results for</h1>
    <p>"{{ id }}"</p>
    <div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      session: Object,
      loggedInUser: String,
      loggedUserProfile: Array
    }
  }
  const { id } = useRoute().params
</script>
