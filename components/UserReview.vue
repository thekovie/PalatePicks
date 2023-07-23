<template>
<div class="review-box flex flex-col bg-green_lightbg p-10 w-[1000px] rounded-3xl">
    <div class="review-info flex flex-col items-start">
      <div class="restaurant name text-3xl font-bold hover:underline cursor-pointer">
        <NuxtLink :to="`/restaurant/${restoName}`">{{ restoName }}</NuxtLink>
      </div>
      <div class="reviewer-rating text-xl flex pr-3 mt-2 mb-4">
          <img v-for="i in rating" class="star-icon w-25 h-25" src="~/assets/icons/Star.svg" alt="star" :key="i" />
          <img v-for="i in 5 - rating" class="star-icon w-25 h-25" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
      </div>
    </div>
    <div class="review-title text-2xl font-semibold my-3">
      {{ reviewSubject }}
    </div>
    <div class="review-content text-lg font-light">
      {{ mainReview }}
    </div>
    <div class="review-gallery flex mt-8">
      <div v-for="(media, index) in gallery" :key="index"  class="review-photo w-[150px] h-[150px] mr-6 mb-6 flex">
        <img v-if="reviewFileTypeChecker(media)" class="w-full h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review photo" @click="toggleMediaView(media)"/>
        <video v-else class="w-full h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review video" no-controls />
        <div v-if="!reviewFileTypeChecker(media)" class="video-icon absolute bg-black bg-opacity-30 w-[150px] h-[150px] p-14 rounded-3xl" @click="toggleMediaView(media)">
          <img class="w-full h-full" src="~/assets/icons/Video.svg" />
        </div>
      </div>
    </div>
    <div class="review-posted-at text-sm font-light text-grey mt-4">
      Posted at {{ formattedDate }}
    </div>
    <div class="review-footer flex justify-between align-middle mt-5">
      <div class="found-helpful">
          <div class="helpful-count text-2xl font-semibold">{{ helpfulCount.toLocaleString("en-US")}}</div>
          <div class="helpful-text text-sm font-light text-grey">found this review helpful</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
    loggedUserProfile: Object,
    restoName: String,
    reviewSubject: String,
    mainReview: String,
    gallery: Array,
    rating: Number,
    date: String,
    helpfulCount: Number,
    comments: Array,
  },
  data() {
      return {
        isReviewBoxOpen: false,
        isRestoOwner: false,
        selectedMedia: '',
        showMediaView: false,
        showModifyReview: false,
        formattedDate: (new Date(this.date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Manila' }),
      }
    },
  methods: {
    toggleModifyReview(){
      this.showModifyReview = !this.showModifyReview;
    },
    toggleMediaView(media) {
      this.showMediaView = !this.showMediaView;
      this.selectedMedia = media;
      if (this.reviewFileTypeChecker(media)) {
        this.isImage = true;
      } else {
        this.isImage = false;
      }
    },
    reviewFileTypeChecker(file) {
      return file.includes('jpg') || file.includes('png') || file.includes('jpeg') || file.includes('gif');
    },
  },
}
</script>
