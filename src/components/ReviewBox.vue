<template>
  <div class="review-box flex flex-col bg-green_lightbg p-10 w-[1000px] rounded-3xl">
    <div class="reviewer-info grid grid-cols-2 items-start">
      <div class="overall-userinfo flex items-center">
        <div class="reviewer-photo w-[104px] h-[104px] rounded-full mr-3 border-4 border-green">
          <img class="w-full h-full rounded-full object-cover" :src="profileImgSrc" alt="user" />
        </div>
        <div class="user-info">
          <div class="user-name text-2xl font-semibold">{{ firstName }} {{ lastName }}</div>
          <div class="username text-sm font-light text-grey hover:underline cursor-pointer"><router-link :to="getProfileLink(username)">@{{ username }}</router-link></div>
          <div class="user-school text-sm font-light text-grey">{{ school }}</div>
        </div>
      </div>
      <div class="flex flex-col justify-end">
        <div class="reviewer-rating text-xl flex justify-end px-3 pt-5">
          <img v-for="i in rating" class="star-icon w-25 h-25" src="../assets/Star.svg" alt="star" :key="i" />
          <img v-for="i in 5 - rating" class="star-icon w-25 h-25" src="../assets/Star-blank.svg" alt="star" :key="i" />
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
      <div v-for="(media, index) in gallery" :key="index"  class="review-photo w-[150px] h-[150px] mr-6 mb-6 flex">
        <img v-if="reviewFileTypeChecker(media)" class="w-full h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review photo" @click="toggleMediaView(media)"/>
        <video v-else class="w-full h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review video" no-controls />
        <div v-if="!reviewFileTypeChecker(media)" class="video-icon absolute bg-black bg-opacity-30 w-[150px] h-[150px] p-14 rounded-3xl" @click="toggleMediaView(media)">
          <img class="w-full h-full" src="../assets/Video.svg" />
        </div>
      </div>
    </div>
    <div class="review-posted-at text-sm font-light text-grey mt-4">
      {{ date }}
    </div>
    <div class="review-footer flex justify-between align-middle mt-5">
      <div class="found-helpful">
          <div class="helpful-count text-2xl font-semibold">{{ helpfulCount.toLocaleString("en-US")}}</div>
          <div class="helpful-text text-sm font-light text-grey">found this review helpful</div>
      </div>
      <div class="right-buttons flex justify-around mr-3">
        <button class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4" @click="toggleFullReview">
          View Comments
        </button>
        <button v-show="username === loggedInUser" class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4" @click="toggleModifyReview">
          Modify Review
        </button>
        <button v-show="isRestoOwner" class="bg-red text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
          Delete Review
        </button>
        <button v-show="!isRestoOwner && !(username === loggedInUser) && !(loggedInUser === '')" class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
          Mark as Helpful
        </button>

        <div v-if="showModifyReview" @close="toggleModifyReview">
          <ModifyReview @close="toggleModifyReview" :reviewSubject="reviewSubject" :reviewerPhotoSrc="reviewerPhotoSrc" :mainReview="mainReview" :rating="rating" :gallery="gallery" :loggedUserProfile="loggedUserProfile"/>
        </div>

        <div v-if="showMediaView" @close="toggleMediaView">
          <ViewMedia @close="toggleMediaView" :media="selectedMedia" :isImage="isImage" />
        </div>

        <div v-if="showFullReview" @close="toggleFullReview">
          <FullReview @close="toggleFullReview" :userProfile="userProfile" :username="username" :loggedInUser="loggedInUser" :loggedUserProfile="loggedUserProfile" :gallery="gallery" :reviewSubject="reviewSubject" :mainReview="mainReview" :rating="rating" :date="date" :helpfulCount="helpfulCount" :comments="comments"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import FullReview from './FullReview.vue'
import ModifyReview from './ModifyReview.vue'
import ViewMedia from './ViewMedia.vue'
import UserProfiles from '../json/UserProfiles.json'

export default {
  components: {
    FullReview, ModifyReview, ViewMedia
  },
  props: {
    isRestoOwner: {
      type: Boolean,
      default: false,
    },
    username: {
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
    },
    loggedInUser: {
      type: String
    },
    loggedUserProfile: {
      type: Object
    }
  },
  data() {
    return{
      showFullReview: false,
      showModifyReview: false,
      showMediaView: false,
      selectedMedia: '',
      isImage: '',
      firstName: "",
      lastName: "",
      profileImgSrc: "",
      school: "",
      userProfiles: UserProfiles,
      userProfile: {},
    }
  },
  methods: {
    toggleFullReview(){
      this.showFullReview = !this.showFullReview;
    },
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
    getProfileLink(username) {
      return `/profile/${username}`;
    }
  },
  mounted(){

    this.userProfile = this.userProfiles.filter((userProfiles) => userProfiles.username === this.username)[0]
    this.school = this.userProfile.school
    this.profileImgSrc = this.userProfile.profileImgSrc
    this.firstName = this.userProfile.firstName
    this.lastName = this.userProfile.lastName

  }
}
</script>
