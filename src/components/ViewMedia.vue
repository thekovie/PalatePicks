<template>
<div class="bg-black bg-opacity-50 top-0 left-0 w-screen h-[100vh] fixed flex justify-center items-center z-10" @click.self="closeMediaView">
  <div class="view-media w-5/12 h-full p-8">
    <img v-if="isImage" class="w-full h-full object-cover" :src="media" alt="review photo" />
    <video v-else class="w-full h-full" :src="media" alt="review video" controls autoplay />
  </div>
</div>
</template>

<script>
export default {
  props: {
    media : {
      type: String,
    },
    isImage: {
      type: Boolean,
    }
  },
  methods: {
    closeMediaView() {
      this.$emit('close');
    },
  },
  mounted(){
    console.log("MOUNTED")
  }
};
</script>
