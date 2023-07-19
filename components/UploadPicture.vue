<template>
  <!-- Upload Picture Parent Container and Backdrop-->
  <div class="bg-[#000000]/50 top-0 w-[100%] h-[100%] fixed" @click.self="closeModal">

    <!-- Child Container -->
    <div class="bg-white w-[600px] h-[600px] mt-[50px] mx-auto rounded-[10px] p-[40px] flex flex-col">

      <!-- Upload Picture Caption-->
      <div class="font-bold text-[48px]">Upload your avatar</div>
      <div class="text-[#c0c0c0] text-[24px]">Choose how you want to be shown!</div>

      <div class="bg-green min-h-[280px] min-w-[280px] max-h-[280px] max-w-[280px] rounded-[100%] mx-auto my-[20px] p-[6px]">
        <div class="bg-white w-[100%] h-[100%] rounded-[100%]">

          <div v-if="isImageDefault" class="upload-bg-default w-[60%] h-[60%] rounded-[100%] relative top-[56px] left-[56px]"></div>
          <img v-else :src="image" alt="Choose a picture!" class="w-[100%] h-[100%] rounded-[100%] object-cover object-center">

        </div>
      </div>

      <!-- Choose file to upload -->
      <label for="image-upload" class="cursor-pointer font-bold text-black mb-[15px] w-[100px] border-[#c0c0c0] border-[1px] text-center rounded-[5px] p-1">
        Choose file
      </label>
      <input id="image-upload" type="file" accept="image/png, image/jpeg, image/jpg" @change="uploadImage">

      <!-- Finish avatar creation -->
      <button class="bg-green rounded-[34.5px] h-[40px] text-white text-[16px] mb-[34px] text-center py-[10px] cursor-pointer" @click="submitAvatar"> Submit </button>
    </div>
  </div>
</template>

<script>
export default {
    props: ['loggedUserProfile'],
    data(){
      return {
        isImageDefault: true,
        image: "",
        supabase: useSupabaseClient(),
        uploading: false,
        rawFilePath: '',
      }
    },
    methods: {
      closeModal(){
        this.$emit('close');
        this.$emit('return', this.image);
      },

      submitAvatar(){
        if(this.isImageDefault){
          alert('Please upload an avatar before submitting.');
        } else{
          this.$emit('close');
          this.$emit('return', this.image)
          this.$emit('returnFilePath', this.rawFilePath);
          console.log('AFTER DOWNLOAD, HERE IS RAW FILE NAME: ', this.rawFilePath);
          this.isImageDefault = true;
        }
      },
      async deleteImage(profileFileName){



        try{
          const { data, error } = await this.supabase
          .storage
          .from('profile-pictures')
          .remove([profileFileName])

        }catch(error){
          alert(error.message)
        }
      },
      async uploadImage(e) {
        const file = e.target.files[0];
        let getFile = '';


          if(this.loggedUserProfile[0].profile_img_src !== 'https://svzmkssqmtayeyoylwlk.supabase.co/storage/v1/object/public/profile-pictures/default.jpg'){
            console.log("EXECUTED")
            let profileFileName = this.loggedUserProfile[0].profile_img_src
            let result = profileFileName.substring(83)
            console.log("IMAGE TO BE DELETED" + result)
            await this.deleteImage(result)
        }





        // Update/Upload Image
        try {
          this.uploading = true;

          if (!file) {
            throw new Error('You must select an image to upload.')
          }
          const fileExt = file.name.split('.').pop()
          const fileName = `${this.loggedUserProfile[0].id}.${fileExt}`
          const filePath = `${fileName}`

          const {error: uploadError} = await this.supabase.storage
            .from('profile-pictures')
            .upload(filePath, file)

          if (uploadError) {
            throw uploadError
          }

          getFile = filePath;

          console.log(getFile);
        } catch(error) {
          alert(error.message)
        } finally {
          this.uploading = false
        }

        try {
          const {data, error} = await this.supabase.storage
            .from('profile-pictures')
            .download(getFile)

          if (error) {
            throw error
          }

          const url = URL.createObjectURL(data)
          this.image = url;
          this.isImageDefault = false;
        } catch (error) {
          console.error('Error downloading image: ', error.message)
        }

        this.rawFilePath = getFile;
      },
    }
}
</script>

<style>

input[type="file"] {
  display: none;
}
.custom-file-upload {
    border: 1px;
    background-color: #4BAD70;
    border-radius: 34.5px;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

.upload-bg-default{
  background-image: url("../assets/images/camera-icon.png");
  background-position: center;
  background-size: cover;
}
</style>
