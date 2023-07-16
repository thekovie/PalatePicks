<template>
  <div class="min-h-screen mx-4 sm:mt-32 sm:mx-60 md:mx-10">
    <div class="side-to-side flex flex-col sm:flex-row justify-center">
      <div class="left-side flex flex-col border-grey border-b sm:border-r sm:border-b-0 border-grey-300 pr-10 py-20">
        <div class="welcome-title text-3xl font-bold">
          <span v-if="loggedUserProfile.length">Welcome, {{ loggedUserProfile[0].first_name }}!</span>
        </div>
        <div class="sub-title text-md sm:text-xl font-light mt-2">
          Before we get started, let's set up your profile.<br>You may also modify your profile later on.
        </div>
      </div>
      <div class="right side flex flex-col sm:p-10">
        <div class=" font-bold text-lg mt-10 sm:mt-0">Let's Add a Profile Picture!</div>
        <div class="mt-5 flex flex-col items-center">
          <div class="bg-green min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] rounded-[100%] p-[3px] m-[10px] cursor-pointer">
            <div class="bg-white w-[100%] h-[100%] rounded-[100%]">
              <div v-if="isImageDefault" class="upload-bg-default w-[60%] h-[60%] rounded-[100%] relative mx-auto top-[28px]"></div>
              <img v-else :src="ProfileImage" alt="Choose a picture!" class="w-[100%] h-[100%] rounded-[100%] object-cover object-center">
            </div>
          </div>
          <button @click="toggleUploadModal" class="mt-10 bg-green text-white px-12 py-1 rounded-3xl">Change Avatar</button>
          <div class="absolute top-0 bottom-0 left-0 right-0" v-if="showUploadModal"> <!-- Upload Picture Modal -->
            <UploadPicture @close="toggleUploadModal" @return="getImageSrc($event)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    async beforeMount() {
      this.$emit('retrieveSession');
    },
    props: {
      session: Object,
      loggedInUser: String,
      loggedUserProfile: Array
    },
  }
</script>

<style scoped>

</style>
