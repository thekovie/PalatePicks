<template>
  <div class="review-box flex flex-col bg-green_lightbg p-10 w-[1000px] rounded-3xl">
    <div class="reviewer-info grid grid-cols-2 items-start">
      <div class="overall-userinfo flex items-center">
        <div class="reviewer-photo w-[104px] h-[104px] rounded-full mr-3 border-4 border-green">
          <img class="w-full h-full rounded-full object-cover" :src="reviewerPhotoSrc" alt="user" />
        </div>
        <div class="user-info">
          <div class="user-name text-2xl font-semibold">{{ name }}</div>
          <div class="username text-sm font-light text-grey">{{ username }}</div>
          <div class="user-school text-sm font-light text-grey">{{ school }}</div>
        </div>
      </div>
      <div class="flex flex-col justify-end">
        <div class="reviewer-rating text-xl flex justify-end px-3 pt-5">
          <img v-for="i in rating" class="star-icon w-25 h-25" src="../assets/Star.svg" alt="star" :key="i" />
        </div>
      </div>
    </div>
    <div class="review-title text-2xl font-semibold my-3">
      {{ reviewSubject }}
    </div>
    <div class="review-content text-lg font-light">
      {{ mainReview }}
    </div>
    <div class="review-gallery flex mt-8">
      <div v-for="i in 5" class="review-photo w-[150px] h-[150px] mr-6 mb-6">
        <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
      </div>
    </div>
    <div class="review-posted-at text-sm font-light text-grey mt-4">
      {{ date }}
    </div>
    <div class="review-footer flex justify-between align-middle mt-5">
      <div class="found-helpful">
          <div class="helpful-count text-2xl font-semibold">{{ helpfulCount }}</div>
          <div class="helpful-text text-sm font-light text-grey">found this review helpful</div>
      </div>
      <div class="right-buttons flex justify-around mr-3">
        <button class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4" @click="toggleFullReview">
          View Comments
        </button>
        <button class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3">
          Mark as Helpful
        </button>

        <div v-if="showFullReview" @close="toggleFullReview">
          <FullReview @close="toggleFullReview" :reviewerPhotoSrc="reviewerPhotoSrc" :name="name" :username="username" :school="school" :reviewSubject="reviewSubject" :mainReview="mainReview" :rating="rating" :date="date" :helpfulCount="helpfulCount" :comments="comments"/>
        </div>
      </div>
    </div>
  </div>
</template>




<script>

import FullReview from './FullReview.vue'

export default {
  components: {
    FullReview
  },
  props: {
      reviewerPhotoSrc: {
        type: String
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
      }
    },
  data(){
    return{
      showFullReview: false
    }
  },
  methods: {
    toggleFullReview(){
      this.showFullReview = !this.showFullReview;
    }
  },
}
</script>
