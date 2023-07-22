<template>
    <Preloader v-if="loading" :loading="loading" />
    <!-- Whole Register Division Container -->
    <div class="flex flex-col-reverse sm:flex-row bg-green_lightbg min-w-screen min-h-screen">
      <!-- Register Division -->
      <form class="flex flex-grow justify-center align-middle" @submit.prevent="userRegister">
        <div class="mt-[50px] mx-8 sm:mx-40 p-0 flex flex-col mb-[40px]">
          <!-- Registration Introduction -->
          <div class="font-bold text-3xl sm:text-4xl text-left">Create a new account</div>
          <div class="text-left sm:text-md text-grey mt-2 mb-4 sm:mb-10">Join now for free to start making reviews and recommendations!</div>
          <!-- Division for picture, first and last name, and username -->
          <div class="flex flex-row">
            <!-- Container for first name, last name, and username -->
            <div class="flex flex-col w-[100%] justify-between">
              <!-- First and Last Name-->
              <div class="flex flex-col sm:flex-row sm:justify-between">
                <input type="text" placeholder="First Name" class="w-full mt-[22px]" v-model="firstName" required>
                <input type="text" placeholder="Last Name" class="w-full sm:ml-2 mt-[22px]" v-model="lastName" required>
              </div>
              <!-- Username -->
              <div class="justify-self-stretch mt-[22px]">
                <input type="text" placeholder="Username" class="w-[100%]" v-model="userName" required>
              </div>
            </div>
          </div>
          <!-- Email -->
          <input type="text" placeholder="Email" class="mt-[22px]" v-model="email" required>
          <!-- Password -->
          <input type="password" placeholder="Password" class="mt-[22px]" v-model="password" required>
          <!-- Confirm Password -->
          <input type="password" placeholder="Confirm Password" class="mt-[22px]" v-model="confirmPass" required>
          <!-- School/University -->
          <input type="text" placeholder="School/University" class="mt-[22px]" v-model="school" required>
          <!-- Bio -->
          <textarea v-model="bio" rows="5" class="resize-none mt-[22px] mb-[22px] rounded-[15px] px-[32px] py-[10px] border-solid border-[1px] border-green" placeholder="Tell us something about yourself! (Optional)"></textarea>
          <!-- Register Button -->
          <button class="bg-green rounded-[34.5px] h-[40px] text-white text-[16px] mb-[34px]">Register</button>
          <!-- Redirect to login page -->
          <div class="text-grey">Already a member? <NuxtLink class="font-bold" to="/login">Login here!</NuxtLink> </div>
        </div>
      </form>
      <!-- Register Picture -->
      <div class="register-bg lg:w-6/12 min-h-fit"></div>
    </div>
</template>

<script>
export default {
  props: {
    loggedInUser: String,
    loggedUserProfile: Array
  },
  data(){
    return{
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPass: '',
      school: '',
      bio: '',
      showUploadModal: false,
      image: "https://svzmkssqmtayeyoylwlk.supabase.co/storage/v1/object/public/profile-pictures/default.jpg",
      isImageDefault: true,
      errorMsg: '',
      loading: false,
    }
  },
  methods: {
    async userRegister() {
      this.loading = true;
      const supabase = useSupabaseClient();

      if (this.password !== this.confirmPass) {
        this.errorMsg = "Password does not match!";
        alert(this.errorMsg);
        this.password = "";
        this.confirmPass = "";
        setTimeout(() => {
          this.errorMsg = "";
        }, 3000);
        this.loading = false;
        return;
      }

      try {
        const { user, data, session, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: {
              first_name: this.firstName,
              last_name: this.lastName,
              username: this.userName,
              school: this.school,
              bio: this.bio,
              profile_img_src: this.image,
            },
            emailRedirectTo: 'https://palatepicks.vercel.app/welcome'
          }
        });
        if (error) throw error;
        alert("Your account has been successfully registered! Check your email to confirm your account.");
      } catch (error) {
        alert(error.message);
      }
      this.loading = false;
    },
  }
}
</script>

<style scoped>
  .register-bg {
    background-image: url("~/assets/images/register-image.png");
    background-size: cover;
    background-position: center;
  }

  input{
    @apply py-[10px] px-[32px] rounded-[34.5px] h-[40px] border-[1px] border-solid border-green;
  }
  .upload-bg-default{
  background-image: url("~/assets/images/camera-icon.png");
  background-position: center;
  background-size: cover;
}
</style>
