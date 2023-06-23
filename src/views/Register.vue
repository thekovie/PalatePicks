<template>

    <!-- Whole Register Division Container -->
    <div class="flex flex-row bg-green_lightbg min-w-screen min-h-screen">

      <!-- Register Division -->
      <form class="flex flex-grow justify-center align-middle" @submit.prevent="handleSubmit">

        <div class="mt-[50px] mx-[150px] p-0 flex flex-col mb-[40px]">

          <!-- Registration Introduction -->
          <div class="font-bold text-[64px] text-left">Create a new account</div>
          <div class="text-left text-[24px] text-grey mb-[34px]">Join now for free to start making reviews and recommendations!</div>

          <!-- Division for picture, first and last name, and username -->
          <div class="flex flex-row">

            <!-- Profile Picture -->
            <div @click="toggleUploadModal" class="bg-green min-w-[104px] min-h-[104px] max-w-[104px] max-h-[104px] rounded-[100%] p-[2.69px] mr-[22px] cursor-pointer">
              <div class="bg-white w-[100%] h-[100%] rounded-[100%]">

                <div v-if="isImageDefault" class="upload-bg-default w-[60%] h-[60%] rounded-[100%] relative top-[22px] left-[21px]"></div>
                <img v-else :src="image" alt="Choose a picture!" class="w-[100%] h-[100%] rounded-[100%] object-cover object-center">

              </div>
            </div>

            <!-- Upload Picture Modal -->
            <div class="absolute top-0 bottom-0 left-0 right-0" v-if="showUploadModal">
              <UploadPicture @close="toggleUploadModal" @return="getImageSrc($event)"/>
            </div>


            <!-- Container for first name, last name, and username -->
            <div class="flex flex-col w-[100%] justify-between">

              <!-- First and Last Name-->
              <div class="flex flex-row justify-between">
                <input type="text" placeholder="First Name" class="w-[49%]" v-model="firstName" required>
                <input type="text" placeholder="Last Name" class="w-[49%]" v-model="lastName" required>
              </div>

              <!-- Username -->
              <div class="justify-self-stretch">
                <input type="text" placeholder="Username" class="w-[100%]" v-model="userName" required>
              </div>


            </div>


          </div>

          <!-- Email -->
          <input type="text" placeholder="Email" class="mt-[22px]" v-model="email" required>

          <!-- Password -->
          <input type="password" placeholder="Password" class="mt-[22px]" v-model="password" required>

          <!-- School/University -->
          <input type="text" placeholder="School/University" class="mt-[22px]" v-model="school" required>

          <!-- Bio -->
          <textarea v-model="bio" rows="5" class="resize-none mt-[22px] mb-[22px] rounded-[15px] px-[32px] py-[10px] border-solid border-[1px] border-green" placeholder="Tell us something about yourself! (Optional)"></textarea>

          <!-- Register Button -->
          <button class="bg-green rounded-[34.5px] h-[40px] text-white text-[16px] mb-[34px]" >Register</button>


          <!-- Redirect to login page -->
          <div class="text-grey">Already a member? <router-link class="font-bold" :to="{ name: 'Login'}">Login here!</router-link> </div>

        </div>
      </form>


      <!-- Register Picture -->


      <div class="register-bg w-[1100px] min-h-[874px]">ASD</div>




    </div>
</template>

<script>
import UploadPicture from '../components/UploadPicture.vue'

export default {
  components: {
    UploadPicture
  },
  data(){
    return{
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      school: '',
      bio: '',
      showUploadModal: false,
      image: "",
      isImageDefault: true
    }
  },
  methods: {
    handleSubmit(){
      alert('Your accound has been successfully registered!');
    },
    toggleUploadModal(){
      this.showUploadModal = !(this.showUploadModal);
      console.log('Trigger')
    },
    getImageSrc(e){
      this.image = e;
      this.isImageDefault = false;
    }
  },
}
</script>

<style scoped>
  .register-bg {
    background-image: url("../assets/images/register-image.png");
    background-size: cover;
    background-position: center;
  }

  input{
    @apply py-[10px] px-[32px] rounded-[34.5px] h-[40px] border-[1px] border-solid border-green;
  }
  .upload-bg-default{
  background-image: url("../assets/images/camera-icon.png");
  background-position: center;
  background-size: cover;
}
</style>
