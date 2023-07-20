<template>
  <div v-if="checkIfNewUser" class="min-h-screen mx-4 sm:mt-32 sm:mx-60 md:mx-10">
    <div class="side-to-side flex flex-col sm:flex-row justify-center">
      <div class="left-side flex flex-col border-grey border-b sm:border-r sm:border-b-0 border-grey-300 pr-10 py-20">
        <div class="welcome-title text-3xl font-bold">
          <span v-if="loggedUserProfile.length">Welcome, {{ loggedUserProfile[0].first_name }}!</span>
        </div>
        <div class="sub-title text-md sm:text-xl font-light mt-2">
          Before we get started, let's set up your profile picture.<br>You may also modify your profile later on.
        </div>
        <div class="skip-setup text-sm hover:underline sm:text-md font-light text-green_dark mt-10">
          <NuxtLink to="/">I want to skip for now</NuxtLink>
        </div>
      </div>
      <div class="right side flex flex-col sm:p-10">
        <div class=" font-bold text-center text-xl mt-10 sm:mt-0">Let's Add a Profile Picture!</div>
        <div class="mt-5 flex flex-col items-center">
          <div class="bg-green min-w-[250px] min-h-[250px] max-w-[250px] max-h-[250px] rounded-[100%] p-[3px] m-[10px] cursor-pointer">
            <div class="bg-white w-full h-full rounded-[100%]">
              <!-- <div v-if="isImageDefault" class="default-user-img w-[100%] h-[100%] rounded-[100%] relative mx-auto top-[28px]"></div> -->
              <img :src="ProfileImage" alt="Choose a picture!" class="w-[100%] h-[100%] rounded-[100%] object-cover bg-white object-center">
            </div>
          </div>
          <button v-if="(image === '')" @click="toggleUploadModal" class="mt-10 bg-green text-white px-12 py-1 rounded-3xl">Upload Avatar</button>
          <button v-else @click="updateImage" class="mt-10 bg-green text-white px-12 py-1 rounded-3xl">Save Avatar</button>
          <div class="absolute top-0 bottom-0 left-0 right-0" v-if="showUploadModal"> <!-- Upload Picture Modal -->
            <UploadPicture @close="toggleUploadModal" @return="getImageSrc" @returnFilePath="getRawPath" :loggedUserProfile="loggedUserProfile"/>
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
    data() {
      return {
        showUploadModal: false,
        image: "",
        isImageDefault: true,
        ProfileImage: "https://svzmkssqmtayeyoylwlk.supabase.co/storage/v1/object/public/profile-pictures/default.jpg",
        rawFilePath: '',
      }
    },
    methods: {
      toggleUploadModal() {
        this.showUploadModal = !this.showUploadModal
      },
      getImageSrc(image) {
        this.image = image
        this.isImageDefault = false
        this.ProfileImage = this.image
      },
      async getRawPath(path) {
        const supabase = useSupabaseClient();
        this.rawFilePath = path

        console.log('What I got from the modal:' + this.rawFilePath)

        // Get Image from Storage
        const {data, error} = await supabase.storage
          .from('profile-pictures')
          .getPublicUrl(this.rawFilePath)

        if (error) {
          console.log(error)
        } else {
          this.image = data.publicUrl
          console.log(this.image)
        }
      },
      async updateImage() {
        const supabase = useSupabaseClient();

        // Update User Profile Image
        const {data, error} = await supabase.auth.updateUser({
          data: {
            profile_img_src: this.image
          }
        })
        if (error) {
          console.log(error)
        } else {
          alert("Profile picture has been updated!")
          this.$router.push('/')
        }
      }
    },
    computed: {
      checkIfNewUser() {
        if (this.loggedUserProfile.length) {
          if (this.loggedUserProfile[0].profile_img_src === 'https://svzmkssqmtayeyoylwlk.supabase.co/storage/v1/object/public/profile-pictures/default.jpg') {
            return true;
          } else {
            this.$router.push('/')
          }
        } else {
          this.$router.push('/')
          return false;
        }
      }
    }
  }
</script>

<style scoped>

</style>
