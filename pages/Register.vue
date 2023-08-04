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
          <input type="password" placeholder="Password" class="mt-[22px]" v-model="password" @focus="isPasswordFocused = true" @blur="isPasswordFocused = false" :class="{'focus:outline-red': password.length < 6}" required>
          <div v-show="password.length < 6 && isPasswordFocused" class="text-red text-xs mt-2 ml-1">Password must be at least 6 characters.</div>
          <!-- Confirm Password -->
          <input type="password" placeholder="Confirm Password" class="mt-[22px]" v-model="confirmPass" @focus="isConfirmPassFocused = true" @blur="isConfirmPassFocused = false" :class="{'focus:outline-red': password !== confirmPass}" required>
          <div v-show="password !== confirmPass && isConfirmPassFocused" class="text-red text-xs mt-2 ml-1">Password does not match.</div>
          <!-- School/University -->
          <input type="text" placeholder="School/University (Optional)" class="mt-[22px]" v-model="school" maxlength="100" :class="{'focus:outline-red': school.length === 100}" required>
          <div v-show="school.length === 100" class="text-red text-xs mt-2 ml-1">School/University must be less than or equal to 100 characters.</div>
          <!-- Bio -->
          <textarea v-model="bio" rows="5" class="resize-none mt-[22px] rounded-[15px] px-[32px] py-[10px] border-solid border-[1px] border-green" placeholder="Tell us something about yourself! (Optional)" maxlength="500" :class="{'focus:outline-red': bio.length === 500}" required />
          <div v-show="bio.length === 500" class="text-red text-xs mt-2 ml-1">Bio must be less than or equal to 500 characters.</div>
          <!-- Register Button -->
          <button class="bg-green rounded-[34.5px] h-[40px] text-white text-[16px] mt-[22px] mb-[34px]">Register</button>
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
  emits: ['retrieveSession'],
  data(){
    return{
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      isPasswordFocused: false,
      confirmPass: '',
      isConfirmPassFocused: false,
      school: '',
      bio: '',
      showUploadModal: false,
      image: "https://svzmkssqmtayeyoylwlk.supabase.co/storage/v1/object/public/profile-pictures/default.jpg",
      isImageDefault: true,
      errorMsg: '',
      loading: true,
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

      try{
        const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('email', this.email)


        if(!data.length){
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
            alert("Your account has been successfully registered! Please check your confirmation email to confirm your account. If you do not see the confirmation email, please try to check your spam or junk emails.");
            this.$router.push('/')
          } catch (error) {
            if(error.message === 'duplicate key value violates unique constraint "profiles_username_key"'){
              alert("User registration failed. Username already exists.")
              this.$router.push('/')
            }else{
              alert(error.message);
              this.userName = "";
            }
          }
        }else{
          alert("User registration failed. Email already exists.");
        }


      }catch(error){
        alert(error.message);
      }

      this.loading = false;
    },
  },
  async mounted(){
    const supabase = useSupabaseClient();

    try{
      const { data, error } = await supabase.auth.getSession()

      if(data.session !== null){
        this.$router.push('/')
      }else{
        this.loading = false;
      }

      if(error){
        throw error;
      }

    }catch(error){
      console.log(error)
    }

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
