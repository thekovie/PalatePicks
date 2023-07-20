<template>
<div class="bg-black bg-opacity-50 top-0 left-0 w-screen h-[100vh] fixed flex" @click.self="closeModifyReview">
  <div class="bg-green_lightbg flex flex-col w-[1000px] h-[70%] mx-auto rounded-[28px] self-center overflow-y-auto py-12 px-10">
    <h2 class="rate-title font-semibold text-3xl">Modify your Review</h2>
    <div class="font-light text-grey text-lg">Change of heart? Write them down (or delete it).</div>
    <form>
      <div class="rate-stars flex pr-3 pt-5 items-center">
        <img class="h-10 w-10 cursor-pointer" v-for="(star, index) in stars" :key="index" @click="toggleRating(index + 1)" :src="getStarIcon(index)" :alt="getStarAlt(index)" @click.prevent />
        <div class="rate-meaning ml-4">
          <div v-if="selectedRating === 0" class="text-sm font-light text-grey">Select your rating</div>
          <div v-if="selectedRating === 1" class="text-sm font-light text-grey">Poor</div>
          <div v-if="selectedRating === 2" class="text-sm font-light text-grey">Fair</div>
          <div v-if="selectedRating === 3" class="text-sm font-light text-grey">Good</div>
          <div v-if="selectedRating === 4" class="text-sm font-light text-grey">Very Good</div>
          <div v-if="selectedRating === 5" class="text-sm font-light text-grey">Excellent</div>
        </div>
      </div>
      <div class="review-part flex pt-8">
        <div class="reviewer-photo w-20 h-20 rounded-full mr-3 border-4 border-green">
            <img class="w-full h-full rounded-full object-cover" :src="loggedUserProfile[0].profile_img_src" alt="user" />
        </div>
        <div class="review-content flex flex-col gap-5 mt-1">
          <div class="review-title">
            <input :value="reviewSubject" class="review-title-input w-[600px] h-14 rounded-2xl px-6 border-1 focus:outline-green" type="text" placeholder="Review Title" />
          </div>
          <div class="review-text">
            <textarea class="review-text-input w-[800px] h-[200px] rounded-2xl px-6 py-3 border-1 focus:outline-green" type="text" placeholder="Review Description">{{ mainReview }}</textarea>
          </div>
          <div class="review-gallery flex">
            <div v-for="(media, index) in mediaItems" :key="index" class="media-items flex items-center justify-center w-[90px] h-[90px] mr-6 mb-6 cursor-pointer" @mouseover="media.hovered = true" @mouseleave="media.hovered = false">
              <img v-if="media.isImage" class="w-full h-full object-cover rounded-3xl border-2 border-grey" :src="media.url" :alt="'Media Item ' + (index + 1)" />
              <video v-else class="w-full h-full object-cover rounded-3xl border-2 border-grey" :src="media.url" :alt="'Media Item ' + (index + 1)" no-controls />
              <div v-if="media.isVideo && !media.hovered" class="video-icon absolute bg-black bg-opacity-30 w-[90px] h-[90px] p-8 rounded-3xl">
                <img class="w-full h-full" src="~/assets/icons/Video.svg" />
              </div>
              <div v-if="media.hovered" class="absolute bg-black bg-opacity-30 w-[90px] h-[90px] p-8 rounded-3xl" @click="removeMedia(index)">
                <img class="w-full h-full" src="~/assets/icons/Trash.svg" />
              </div>
            </div>
            <div class="add-media flex flex-col items-center justify-center w-[90px] h-[90px] p-4 mr-6 mb-6 rounded-3xl border-2 border-grey cursor-pointer">
              <img v-if="mediaItems.length < 5" src="~/assets/images/camera-icon.png" alt="camera icon" @click="openFileInput"/>
              <div class=" text-xs"> {{ mediaItems.length }} / 5</div>
              <input ref="fileInput" type="file" accept="image/*, video/*" class="block" @change="handleFileUpload" />
            </div>
          </div>
          <div class="review-buttons flex justify-end">
            <button class="bg-white text-green rounded-3xl flex items-center font-light px-14 py-3 mr-4" @click="closeModifyReview">
              Cancel
            </button>
            <button class="delete-review bg-red text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
              Delete Review
            </button>
            <button class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
              Update Review
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
  import StarIcon from '~/assets/icons/Star.svg'
  import StarBlankIcon from '~/assets/icons/Star-blank.svg'
  export default {

    props: {
      loggedUserProfile: {
        type: Object
      },
      name: {
        type: String
      },
      username: {
        type: String
      },
      school: {
        type: String
      },
      reviewSubject: {
        type: String
      },
      mainReview: {
        type: String
      },
      rating: {
        type: Number
      },
      date: {
        type: String
      },
      helpfulCount: {
        type: Number
      },
      comments: {
        type: Array
      },
      gallery: {
        type: Array
      }
    },
    data() {
      return {
        showModifyReview: true,
        selectedRating: this.rating,
        stars: [1, 2, 3, 4, 5],
        starIcon: StarIcon,
        starBlankIcon: StarBlankIcon,
        mediaItems: [],
        openInputReviewBox: true,
      };
    },
    mounted() {
      this.gallery.forEach((source) => {
        const isImage = source.endsWith('.jpg') || source.endsWith('.jpeg') || source.endsWith('.png') || source.endsWith('.gif');
        const isVideo = source.endsWith('.mp4') || source.endsWith('.mov') || source.endsWith('.avi');

        this.mediaItems.push({
          url: source,
          hovered: false,
          isImage,
          isVideo,
          label: isImage ? 'Image' : isVideo ? 'Video' : 'Unknown'
        });
      });
    },


    methods: {
      toggleRating(starCount) {
        if (this.selectedRating === starCount) {
          this.selectedRating = 0;
        } else {
          this.selectedRating = starCount;
        }
      },
      getStarIcon(index) {
        return this.selectedRating >= index + 1 ? this.starIcon : this.starBlankIcon;
      },
      getStarAlt(index) {
        return this.selectedRating >= index + 1 ? "Filled Star" : "Outline Star";
      },
      openFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const isImage = file.type.startsWith('image/');
          const isVideo = file.type.startsWith('video/');

          this.mediaItems.push ({
            url: URL.createObjectURL(file),
            hovered: false,
            isImage,
            isVideo,
            label: isImage ? 'Image' : isVideo ? 'Video' : 'Unknown'
          });
        }
      },
      removeMedia(index) {
        this.mediaItems.splice(index, 1);
      },
      closeModifyReview() {
        this.$emit('close')
      },
    }
  }
</script>
