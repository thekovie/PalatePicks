<template>
  <div class="input-reviewbox flex flex-col bg-green_lightbg p-10 w-[1000px] rounded-3xl">
    <h2 class="rate-title font-semibold text-3xl">Create a Review</h2>
    <div class=" font-light text-grey text-lg">You're now reviewing {{ name }}</div>
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
            <img class="w-full h-full rounded-full object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="user" />
        </div>
        <div class="review-content flex flex-col gap-5 mt-1">
          <div class="review-title">
            <input class="review-title-input w-[600px] h-14 rounded-2xl px-6 border-1 focus:outline-green" type="text" placeholder="Review Title" />
          </div>
          <div class="review-text">
            <textarea class="review-text-input w-[800px] h-[200px] rounded-2xl px-6 py-3 border-1 focus:outline-green" type="text" placeholder="Review Description" />
          </div>
          <div class="review-gallery flex">
            <div v-for="(media, index) in mediaItems" :key="index" class="media-items flex items-center justify-center w-[90px] h-[90px] p-4 mr-6 mb-6 rounded-3xl border-2 border-grey cursor-pointer" @mouseover="media.hovered = true" @mouseleave="media.hovered = false">
              <img :src="media.url" :alt="'Media Item ' (index + 1)" />
              <div v-if="media.hovered" class="delete-icon" @click="removeMedia(index)">
                <img src="../assets/Trash.svg" />
              </div>
            </div>
            <div class="add-media flex items-center justify-center w-[90px] h-[90px] p-4 mr-6 mb-6 rounded-3xl border-2 border-grey cursor-pointer">
              <img v-if="mediaItems.length < 5" src="../assets/images/camera-icon.png" alt="camera icon" @click="openFileInput"/>
              <input ref="fileInput" type="file" accept="image/*, video/*" class="block" @change="handleFileUpload" />
            </div>
          </div>
          <div class="review-buttons flex justify-end">
            <button class="bg-white text-green rounded-3xl flex items-center font-light px-14 py-3 mr-4" @click="closeReviewBox">
              Cancel
            </button>
            <button class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import StarIcon from '../assets/Star.svg'
import StarBlankIcon from '../assets/Star-blank.svg'

export default {
  props: {
    name: {
      type: String,
      default: 'Resto Name',
    },
  },
  data() {
    return {
      selectedRating: 0,
      stars: [1, 2, 3, 4, 5],
      starIcon: StarIcon,
      starBlankIcon: StarBlankIcon,
      mediaItems: [],
      openInputReviewBox: true,
    };
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

        this.mediaItems.push ({
          url: URL.createObjectURL(file),
          hovered: false
        });
      }
    },
    removeMedia(index) {
      this.mediaItems.splice(index, 1);
    },
    closeReviewBox() {
      this.openInputReviewBox = false;
    }
  },
}
</script>

<style scoped>
.delete-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
    cursor: pointer;
}
</style>


