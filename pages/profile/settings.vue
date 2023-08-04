<template>
  <Preloader v-if="loading" :loading="loading" />
  <div v-if="checkLoggedUserInfo" class="min-h-screen">
    <div class="Content-Section my-10 mx-40"> <!--Content Section-->

        <div class="Profile-Section flex flex-row items-center"> <!--Profile Section-->

          <div> <!--Avatar-->
            <img :src="loggedUserProfile[0].profile_img_src" alt="Avatar" class="w-12 h-12 rounded-full object-center object-cover me-3"/>
          </div>

          <div class="basis-3/4">  <!--User-->
            <p class="font-bold text-xl">@{{ loggedUserProfile[0].username }} ({{ loggedUserProfile[0].first_name }} {{ loggedUserProfile[0].last_name }})</p>
            <p>Your Personal Account</p>
          </div>

          <div class="basis-1/4 flex text-right pe-20"> <!--Go back to personal profile-->

            <NuxtLink class="hover:underline cursor-pointer flex" :to="`/profile/${loggedUserProfile[0].username}`">
              <span class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
              </span>Go Back to Personal Profile</NuxtLink>
          </div>

        </div>

        <!--General-->
        <p class="General font-bold text-xl border-b border-green mt-10 pb-1">General</p>

        <div>
          <div class="flex">
            <div class="basis-3/4">
              <div class="flex"> <!--Name-->
                <div class="basis-1/2 mt-5 me-10">
                  <label>First Name<br></label>
                  <input type="text" v-model="firstName" class="border-green border rounded w-full px-2">
                </div>
                <div class="basis-1/2 mt-5">
                  <label>Last Name<br></label>
                  <input type="text" v-model="lastName" class="border-green border rounded w-full px-2">
                </div>
              </div>
              <div class="mt-5"> <!--School-->
                <label>School/University<br></label>
                <input type="text" v-model="school" class="border-green border rounded w-full px-2" maxlength="100" :class="{'focus:outline-red': school.length === 100}" required>
                <div v-show="school.length === 100" class="text-red text-xs mt-1">
                  You have reached the maximum number of characters allowed for your school/university. (100 characters only)
                </div>
              </div>
              <div class="mt-5"> <!--Bio-->
                <label>Bio<br></label>
                <textarea rows="4" v-model="bio" class="border-green border rounded w-full px-2" maxlength="500" :class="{'focus:outline-red': bio.length === 500}" />
                <div v-show="bio.length === 500" class="text-red text-xs">
                  You have reached the maximum number of characters allowed for your bio. (500 characters only)
                </div>
              </div>
            </div>
              <div class="flex flex-col place-items-center mt-5 basis-1/4"> <!--Avatar-->
                <div class="bg-green min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] rounded-[100%] p-[3px] m-[10px] cursor-pointer">
                    <div class="bg-white w-[100%] h-[100%] rounded-[100%]">
                      <img :src="localImage" alt="Choose a picture!" class="w-[100%] h-[100%] rounded-[100%] object-cover object-center">
                    </div>
                  </div>
                  <div>
                    <label for="image-upload" class="cursor-pointer bg-green text-white px-12 mt-6 py-1 rounded-3xl">
                      Choose Image
                    </label>
                    <input id="image-upload" type="file" accept="image/png, image/jpeg, image/jpg" @change="chooseFile">
                  </div>
                  <!-- <button @click="chooseFile" class="">Change Avatar</button> -->
                  <div class="absolute top-0 bottom-0 left-0 right-0 z-50" v-if="showUploadModal"> <!-- Upload Picture Modal -->
                    <UploadPicture @close="toggleUploadModal" @return="getImageSrc($event)" :loggedUserProfile="loggedUserProfile" @returnFilePath="getRawPath"/>
                  </div>
              </div>
          </div>

          <button class="bg-green text-white px-12 mt-5 py-1 rounded-3xl" @click="updateGeneralInfo">Save Changes</button>
        </div>

        <!--Email-->
        <p class="font-bold text-xl border-b border-green mt-10 pb-1">Email</p>

        <div class="flex flex-col">
          <div class="basis-4/5 mt-5">
            <label>Email</label>
            <input type="email" v-model="email" class="border-green border rounded w-full px-2" required >
          </div>

        </div>


        <div>


          <p class="opacity-60 text-xs my-2">A confirmation link will be sent to both your old and new email addresses to confirm your email update.</p>
          <button v-if="email.length" class="bg-green text-white px-12  mt-5 py-1 rounded-3xl" @click="updateEmail">Update Email</button>
          <button v-else class="bg-[#93cfa9] text-white px-12  mt-5 py-1 rounded-3xl" disabled>Update Email</button>
        </div>

        <!--Password-->
        <p class="font-bold text-xl border-b border-green mt-10 pb-1">Change Password</p>

        <div>
          <div class="mr-20 mt-5">
            <label>Current Password<br></label>
            <input type="password" v-model="currentPassword" class="border-green border rounded w-full px-2" required>

          </div>

          <div class="mr-20 mt-4 flex">
            <div class="basis-1/2 me-10 flex flex-col">
              <label>New Password </label>
              <input type="password" id="newpassword" v-model="newPassword" class="border-green border rounded w-full px-2" :class="{'focus:outline-red' : newPassword.length < 6}" required>
              <div v-show="newPassword.length < 6" class="text-red text-xs mt-1">
                Your password must be at least 6 characters long.
              </div>
            </div>

            <div class="basis-1/2 flex flex-col">
              <label>Confirm New Password</label>
              <input type="password" v-model="confirmNewPassword" class="border-green border rounded w-full px-2" @focus="isConfirmPasswordFocused = true" @blur="isConfirmPasswordFocused = false" required>
              <p v-if="newPassword !== confirmNewPassword && isConfirmPasswordFocused" class="text-xs my-2 text-red">New and confirm password fields do not match!</p>
            </div>

          </div>



          <button v-if="newPassword === confirmNewPassword" class="bg-green text-white px-8 py-1 mt-5 rounded-3xl" @click="updatePassword">Update Password</button>
          <button v-else class="bg-[#93cfa9] text-white px-8 py-1 mt-5 rounded-3xl" disabled>Update Password</button>
        </div>
      </div>
  </div>

  <div v-else>
    <RequireLogin/>
  </div>

</template>

<script>

export default {
  setup() {
    useSeoMeta({
      title: `Settings | PalatePicks`,
      ogTitle: `Settings | PalatePicks`,
      description: `Profile Settings`,
      ogDescription: 'Profile Settings',
      image: 'https://i.imgur.com/14qTVqA.png',
      ogImage: 'https://i.imgur.com/14qTVqA.png',
      url: `https://palatepicks.vercel.app/profile/settings`,
      keywords: 'food, restaurant, review, food review, restaurant review, foodie, foodie review, foodie restaurant review, foodie review, foodie restaurant review, foodie restaurant, foodie restaurant review, foodie restaurant review',
    })
  },

  props: {
    loggedInUser: String,
    loggedUserProfile: Array,
  },
  emits: ["retrieveSession"],
  methods: {
    saveChanges(){
      alert('Your changes have been successfully saved!');
    },
    codeSent(){
      alert('Code has been sent to your email!');
    },
    maskPasswordValue(password) {
      return password.replace(/./g, '*');
    },
    maskPassword(event, property) {
      this[property] = event.target.value;
    },
    handleInputChange(value) {
      this.inputValue = value;
    },
    toggleUploadModal(){
      this.showUploadModal = !(this.showUploadModal);
      console.log('Trigger')
    },
    getImageSrc(e){
      this.ProfileImage = e;
      this.isImageDefault = false;
    },
    chooseFile(event){
      const file = event.target.files[0];

      this.fileLoc = file;
      this.localImage = URL.createObjectURL(file);

      const fileExt = this.fileLoc.name.split('.').pop();


      this.avatarName = `${Math.random()}.${fileExt}`;


    },
    async updateGeneralInfo(){
      this.loading = true;
      let imageName = "";
      let imageUrl = "";

      const supabase = useSupabaseClient();


        if(this.fileLoc){
            // LIST
          try{
              const { data, error } = await this.supabase.storage
              .from('profile-pictures')
              .list(`${this.loggedUserProfile[0].id}/`)

              imageName = data[0].name;

              console.log('GHJADWGHJAWGJHAWDJHGADW')
              console.log(imageName)

              if(error){
                  throw error;
              }


          }catch(error){
            console.log(error)
          }

          // DELETE PICTURE
          try{
            const { data, error } = await this.supabase.storage
            .from('profile-pictures')
            .remove(`${this.loggedUserProfile[0].id}/${imageName}`)

            if(error){
              throw error;
            }

          }catch(error){
            console.log(error)
          }


          // UPLOAD PICTURE
          try{
            const { data, error } = await this.supabase.storage
            .from('profile-pictures')
            .upload(`${this.loggedUserProfile[0].id}/${this.avatarName}`, this.fileLoc, {
              cacheControl: 0,
              upsert: false,
            })




          }catch(error){
            console.log(error)
          }


          try{
            const { data, error } = await this.supabase.storage
            .from('profile-pictures')
            .list(`${this.loggedUserProfile[0].id}/`)

            imageName = data[0].name;

            console.log('GHJADWGHJAWGJHAWDJHGADW')
            console.log(imageName)

            try{

              const{data, error} = await this.supabase.storage
              .from('profile-pictures')
              .getPublicUrl(`${this.loggedUserProfile[0].id}/${imageName}`)


              if(error){
                throw error;
              }
            }catch(error){
              console.log(error)
            }


          }catch(error){
            console.log(error)
          }



          try{
              const { data, error } = await this.supabase.storage
              .from('profile-pictures')
              .getPublicUrl(`${this.loggedUserProfile[0].id}/${imageName}`)

              if(error){
                throw error;
              }

              imageUrl = data.publicUrl;

          }catch(error){
            console.log(error)
          }
        }



      if(this.fileLoc){
          const { data, error } = await supabase.auth.updateUser({
          data: {
            bio: this.bio,
            first_name: this.firstName,
            last_name: this.lastName,
            school: this.school,
            profile_img_src: imageUrl
          }
        })

        if (error) throw error;


      }else{
        const { data, error } = await supabase.auth.updateUser({
          data: {
            bio: this.bio,
            first_name: this.firstName,
            last_name: this.lastName,
            school: this.school
          }
        })

        if (error) throw error;

      }


      this.loading = false;
      alert('Your changes have been successfully saved!')
      this.$emit('retrieveSession')
      this.$router.push('/profile/settings')



    },
    async updateEmail(){
      this.loading = true;
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.auth.updateUser({email: this.email})
      if (error) throw error;

      this.loading = false;

      alert('A confirmation link has been sent to both your old and new email addresses. Please confirm to update your email.')
    },
    async updatePassword(){
      this.loading = true;
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.rpc('verify_user_password', {password: this.currentPassword })

      if (error) throw error;

      if(data){
        await this.changePassword()
      }else{
        this.loading = false;
        alert('The current password you have entered is incorrect/invalid. Please ensure that the current password you entered is correct.')
      }

    },
    async changePassword(){
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.auth.updateUser({password: this.newPassword})
      if (error) throw error;
      this.loading = false;
      alert('Your password has been successfully changed!')

    },

  },
  data() {
    return {
      inputValue: " ",
      firstName: "",
      lastName: "",
      username: "",
      school: "",
      email: "",
      password: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      isConfirmPasswordFocused: false,
      bio: "",
      showUploadModal: false,
      ProfileImage: '',
      isImageDefault: false,
      userProfile: {},
      loading: true,
      fileLoc: null,
      localImage: "",
      avatarName: "",
      supabase: useSupabaseClient(),
      finalImageUrl: "",
      fileLoc: null,
    };
  },
  computed: {
    checkLoggedUserInfo(){
      // General Information
      if(this.loggedUserProfile.length){
        this.username = this.loggedUserProfile[0].username
        this.firstName = this.loggedUserProfile[0].first_name
        this.lastName = this.loggedUserProfile[0].last_name
        this.school = this.loggedUserProfile[0].school
        this.bio = this.loggedUserProfile[0].bio
        this.email = this.loggedUserProfile[0].email
        this.ProfileImage = this.loggedUserProfile[0].profile_img_src
        this.localImage = this.loggedUserProfile[0].profile_img_src

        this.loading = false;
        return true
      }else{
        this.loading = false;
        return false
      }


    }
  },
  async mounted(){

    this.loading = false;

  },
  beforeUpdate(){





  }
}
</script>

<style scoped>
input[type="text"],
input[type="password"],
textarea {
  outline-color: green;
}

</style>
