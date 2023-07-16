<template>
  <div v-if="checkLoggedUserInfo">
    <div class="Content-Section my-10 mx-40"> <!--Content Section-->

        <div class="Profile-Section flex flex-row items-center"> <!--Profile Section-->

          <div> <!--Avatar-->
            <img src="#" alt="Avatar" class="w-12 h-12 rounded-full object-center object-cover me-3"/>
          </div>

          <div class="basis-3/4">  <!--User-->
            <p class="font-bold text-xl">@{{ loggedUserProfile[0].username }} ({{ loggedUserProfile[0].first_name }} {{ loggedUserProfile[0].last_name }})</p>
            <p>Your Personal Account</p>
          </div>

          <div class="basis-1/4 text-right pe-20"> <!--Go back to personal profile-->
            <NuxtLink class="hover:underline cursor-pointer" :to="`/profile/${loggedUserProfile[0].username}`">Go Back to Personal Profile</NuxtLink>
          </div>

        </div>

        <!--General-->
        <p class="General font-bold text-xl border-b border-green mt-10">General</p>

        <div>
          <div class="flex">
            <div class="basis-3/4">
              <div class="flex"> <!--Name-->
                <div class="basis-1/2 mt-5 me-10">
                  <label>First Name<br></label>
                  <input type="text" v-model="firstName" class="border-green border rounded w-full px-2" @click="clickTextBox">
                </div>
                <div class="basis-1/2 mt-5">
                  <label>Last Name<br></label>
                  <input type="text" v-model="lastName" class="border-green border rounded w-full px-2" @click="clickTextBox">
                </div>
              </div>
              <div class="mt-5"> <!--Username-->
                <label>Username<br></label>
                <input type="text" v-model="username" class="border-green border rounded w-full px-2" @click="clickTextBox">
              </div>
              <div class="mt-5"> <!--School-->
                <label>School/University<br></label>
                <input type="text" v-model="school" class="border-green border rounded w-full px-2" @click="clickTextBox">
              </div>
            </div>
              <div class="flex flex-col place-items-center mt-5 basis-1/4"> <!--Avatar-->
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
          <div class="mt-5"> <!--Bio-->
            <label>Bio<br></label>
            <textarea rows="4" v-model="bio" class="border-green border rounded w-full px-2" @click="clickTextBox"></textarea>
          </div>
          <button class="bg-green text-white px-12 mt-5 py-1 rounded-3xl" @click="updateGeneralInfo">Save Changes</button>
        </div>

        <!--Email-->
        <p class="font-bold text-xl border-b border-green mt-10">Email</p>

        <div class="flex">
          <div class="basis-4/5 mt-5">
            <label>Email<br></label>
            <input type="text" v-model="email" class="border-green border rounded w-full px-2" required @click="clickTextBox"  @input="handleInputChange" >
          </div>

          <div class="mt-10 ms-10 bg-green text-white px-12 rounded-3xl">
            <button class="py-1 sendCode" :disabled="isButtonDisabled" v-on:click="codeSent"> Send Code</button>
          </div>
        </div>


        <div>
          <div class="mr-20 mt-5">
            <label>Code<br></label>
            <input type="text" value="000 - 000" class="border-green border rounded w-full px-2" @click="clickTextBox"  @input="handleInputChange" >
            <p class="opacity-60 text-xs my-2">Insert the 6 digit code sent to your email to confirm the change of email</p>
          </div>

          <button class="bg-green text-white px-12  mt-5 py-1 rounded-3xl" :disabled="isButtonDisabled" @click="updateEmail">Update Email</button>
        </div>

        <!--Password-->
        <p class="font-bold text-xl border-b border-green mt-10">Change Password</p>

        <div>
          <div class="mr-20 mt-5">
            <label>Current Password<br></label>
            <input type="password" v-model="password" class="border-green border rounded w-full px-2" required @click="clickTextBox"  @input="handleInputChange" >
          </div>

          <div class="mr-20 mt-5 flex">
            <div class="basis-1/2 mt-5 me-10">
              <label>New Password<br></label>
              <input type="password" v-model="newPassword" class="border-green border rounded w-full px-2" required @click="clickTextBox"  @input="handleInputChange" >
            </div>

            <div class="basis-1/2 mt-5">
              <label>Confirm New Password<br></label>
              <input type="password" v-model="confirmNewPassword" class="border-green border rounded w-full px-2" required @click="clickTextBox"  @input="handleInputChange" >
            </div>

          </div>

          <button class="bg-green text-white px-8 py-1 mt-5 rounded-3xl" :disabled="isButtonDisabled" @click="saveChanges">Update Password</button>
        </div>
      </div>
  </div>

  <div v-else>
    <RequireLogin/>
  </div>

</template>

<script>
import UserProfiles from '~/assets/json/UserProfiles.json';

export default {
  props: {
    loggedInUser: String,
    loggedUserProfile: Array,
    session: Object
  },
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
    getProfileLink(username) {
      return `/profile/${this.loggedInUser}`;
    },
    async updateGeneralInfo(){
      const supabase = useSupabaseClient();

      const { data, error } = await supabase.auth.updateUser({
        data: {
          bio: this.bio,
          first_name: this.firstName,
          last_name: this.lastName,
          school: this.school,
          username: this.username,
        }
      })
      if (error) throw error;
      alert('Your changes have been successfully saved!')
      this.$emit('retrieveSession')
      this.$router.push('/profile/settings')


    }
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
      newPassword: "",
      confirmNewPassword: "",
      bio: "",
      showUploadModal: false,
      ProfileImage: '',
      isImageDefault: false,
      userProfiles: UserProfiles,
      userProfile: {}
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

        return true
      }else{
        return false
      }


    }
  },
  async mounted(){



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
