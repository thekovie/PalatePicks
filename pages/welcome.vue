<template>
  <Preloader v-if="loading" :loading="loading" class="z-50"/>
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
              <img :src="localImage" alt="Choose a picture!" class="w-[100%] h-[100%] rounded-[100%] object-cover bg-white object-center">
            </div>
          </div>
          <div class="mt-3">
            <div>
              <label for="image-upload" class="cursor-pointer font-bold text-black mb-[15px] w-[100px] border-[#c0c0c0] border-[1px] text-center rounded-[5px] p-1">
                Choose Image
              </label>
              <input id="image-upload" type="file" accept="image/png, image/jpeg, image/jpg" @change="chooseFile">
            </div>

            <button class="cursor-pointer bg-green text-white mb-[15px] w-[100px] border-[#c0c0c0] border-[1px] text-center rounded-[5px] p-1" @click="addProfilePicture">Save Avatar</button>

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
        fileLoc: null,
        localImage: "https://svzmkssqmtayeyoylwlk.supabase.co/storage/v1/object/public/profile-pictures/default.jpg",
        avatarName: "",
        supabase: useSupabaseClient(),
        loading: true
      }
    },
    methods: {
      toggleUploadModal() {
        this.showUploadModal = !this.showUploadModal
      },
      chooseFile(event){
        const file = event.target.files[0];

        this.fileLoc = file;
        this.localImage = URL.createObjectURL(file);

        const fileExt = this.fileLoc.name.split('.').pop();


        this.avatarName = `${Math.random()}.${fileExt}`;

        console.log(this.avatarName)


    },
    async addProfilePicture(){
      this.loading = true;
      let imageName = "";
      let imageUrl = "";

      const supabase = useSupabaseClient();


        // UPLOAD PICTURE
        try{

          const { data, error } = await this.supabase.storage
          .from('profile-pictures')
          .upload(`${this.loggedUserProfile[0].id}/avatar`, this.fileLoc, {
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






      const { data, error } = await supabase.auth.updateUser({
        data: {
          profile_img_src: imageUrl
        }
      })


      try{
        const { error } = await supabase
        .from('profiles')
        .update({ profile_img_src: imageUrl })
        .eq('id', this.loggedUserProfile[0].id)

      }catch(error){
        console.log(error)
      }


      if (error) throw error;
      this.loading = false;
      alert('Your changes have been successfully saved!')
      this.$emit('retrieveSession')
      this.$router.push('/')



    },

    },
    computed: {
      checkIfNewUser() {
        this.loading = true
        if (this.loggedUserProfile.length) {
          if (this.loggedUserProfile[0].profile_img_src === 'https://svzmkssqmtayeyoylwlk.supabase.co/storage/v1/object/public/profile-pictures/default.jpg') {
            this.loading = false
            return true;
          } else {
            this.$router.push('/')
          }
        } else {
          return false;
        }
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>

</style>
