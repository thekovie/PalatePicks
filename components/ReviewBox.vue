<template>
  <div class="review-box flex flex-col bg-green_lightbg p-10 sm:w-[1000px] rounded-3xl">
    <div class="reviewer-info flex flex-col items-center sm:grid sm:grid-cols-2 sm:items-start">
      <div class="overall-userinfo flex flex-col sm:flex-row items-center">
        <div class="reviewer-photo w-[104px] h-[104px] rounded-full mr-3 border-4 border-green">
          <img class="w-full h-full rounded-full object-cover" :src="profileImgSrc" alt="user" />
        </div>
        <div class="user-info text-center sm:text-left">
          <div class="user-name text-2xl font-semibold hover:underline cursor-pointer"><NuxtLink :to="getProfileLink(username)">{{ firstName }} {{ lastName }}</NuxtLink></div>
          <div class="username text-sm font-light text-grey hover:underline cursor-pointer"><NuxtLink :to="getProfileLink(username)">@{{ username }}</NuxtLink></div>
          <div class="user-school text-sm font-light text-grey">{{ school }}</div>
        </div>
      </div>
      <div class="flex flex-col justify-end">
        <div class="reviewer-rating text-xl flex justify-end pr-3 pt-5">
          <img v-for="i in rating" class="star-icon w-25 h-25" src="~/assets/icons/Star.svg" alt="star" :key="i" />
          <img v-for="i in 5 - rating" class="star-icon w-25 h-25" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
        </div>
      </div>
    </div>
    <div class="review-title text-xl sm:text-2xl font-semibold my-3">
      {{ reviewSubject }}
    </div>
    <div class="review-content text-md sm:text-lg font-light">
      {{ mainReview }}
    </div>
    <div class="review-gallery flex flex-wrap md:flex-row mt-8">
      <div v-for="(media, index) in gallery" :key="index"  class="review-photo h-32 w-32 md:w-[150px] md:h-[150px] mr-6 mb-6 flex">
        <div class="w-full">
          <img v-if="reviewFileTypeChecker(media)" class="w-full h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review photo" @click="toggleMediaView(media)"/>
          <video v-else class="w-full h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review video" no-controls />
        </div>
        <div v-if="!reviewFileTypeChecker(media)" class="video-icon absolute bg-black bg-opacity-30 w-[150px] h-[150px] p-14 cursor-pointer rounded-3xl" @click="toggleMediaView(media)">
          <img class="w-full h-full" src="~/assets/icons/Video.svg" />
        </div>
      </div>
    </div>
    <div v-if="didOwnerReply" class="owner-replied mt-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="green" class="w-6 h-6 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
      <div class="reply-status">
        <span class="font-light text-grey text-md">{{ this.restoId }} replied to this review!</span>
      </div>
    </div>
    <div class="review-posted-at text-sm font-light text-grey" :class="{ 'mt-4' : !didOwnerReply, 'mt-6': didOwnerReply}">
      Posted at {{ formattedDate }}
      <span v-if="isEdited" class="italic text-grey">Edited</span>
    </div>
    <div class="review-footer flex flex-col sm:flex-row justify-between align-middle mt-5">
      <div class="found-helpful">
          <div class="helpful-count text-2xl font-semibold">{{ updatedHelpfulCount }}</div>
          <div class="helpful-text text-sm font-light text-grey">found this review helpful</div>
      </div>
      <div class="right-buttons flex mt-4 flex-col justify-center md:flex-row md:mt-0 md:justify-around mr-3">
        <button class="bg-green text-white text-sm rounded-3xl items-center font-light px-6 py-3 h-12 sm:mr-4" @click="openFullReview">
          View Comments
        </button>

        <div v-if="loggedUserProfile.length">
          <button v-if="username === loggedUserProfile[0].username" class="bg-green text-white rounded-3xl w-full items-center mt-2 md:mt-0 text-sm h-12 font-light px-6 py-4 md:mr-4" @click="toggleModifyReview">
            Modify Review
          </button>
        </div>


        <div v-if="loggedUserProfile.length">
          <button v-if="!isRestoOwner && (username !== loggedUserProfile[0].username)" :class="markButtonClass" @click="markAsHelpful" :disabled="isMarkButtonDisabled">
            Mark as Helpful
          </button>
        </div>

        <div v-if="showModifyReview" @close="toggleModifyReview">
          <ModifyReview @close="toggleModifyReview" @update="this.$emit('update')" @reloadRating="this.$emit('refreshRating')" :reviewSubject="reviewSubject" :mainReview="mainReview" :rating="rating" :gallery="gallery" :loggedUserProfile="loggedUserProfile" :reviewId="reviewId"/>
        </div>

        <div v-if="showMediaView" @close="closeMediaView">
          <ViewMedia @close="closeMediaView" :media="selectedMedia" :isImage="isImage" />
        </div>

        <div v-if="showFullReview" @close="toggleFullReview">
          <FullReview @close="closeFullReview" :userProfile="userProfile" :username="username" :isRestoOwner="isRestoOwner" :loggedUserProfile="loggedUserProfile" :gallery="gallery" :reviewSubject="reviewSubject" :mainReview="mainReview" :rating="rating" :date="date" :helpfulCount="helpfulCount" :reviewId="reviewId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    isRestoOwner: {
      type: Boolean,
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
    loggedUserProfile: {
      type: Object
    },
    restoId: {
      type: String
    },
    reviewId: {
      type: String
    },
    isEdited: {
      type: Boolean
    },
    didOwnerReply: {
      type: Boolean
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
      userProfile: {},
      markButtonClass: "bg-green text-white rounded-3xl items-center text-sm font-light px-6 py-3 w-full h-12 mt-2 md:mt-0 md:mr-4",
      markedButtonClass: "bg-[#93cfa9] text-white rounded-3xl items-center text-sm font-light px-6 py-3 w-full h-12 mt-2 md:mt-0 md:mr-4",
      unmarkedButtonClass: "bg-green text-white rounded-3xl items-center font-light text-sm px-6 py-3 w-full h-12 mt-2 md:mt-0 md:mr-4",
      isReviewMarkedByUser: false,
      isButtonMarked: false,
      isMarkButtonDisabled: false,
      updatedHelpfulCount: 0,
      formattedDate: (new Date(this.date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Manila' })

    }
  },
  methods: {
    openFullReview(){
      this.showFullReview = true;
    },
    closeFullReview(){
      this.showFullReview = false;
      this.$emit('update');
    },
    toggleModifyReview(){
      this.showModifyReview = !this.showModifyReview;
    },
    closeMediaView() {
      this.showMediaView = false;
    },
    toggleMediaView(media) {
      this.showMediaView = true
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
    },

    async getuserInfo() {
      const supabase = useSupabaseClient();

      try {
        const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('username', this.username)

        this.userProfile = data[0]
      } catch (error) {
        console.log(error)
      }
    },
    async markAsHelpful(){

        this.isMarkButtonDisabled = true;
        const supabase = useSupabaseClient();

        // CHECK IF A STRING IS IN AN ARRAY
        try{
          const { data, error } = await supabase
            .from('reviews')
            .select()
            .eq('review_id', this.reviewId)


          if (error) {
            throw new Error(error.message);
          }

          if (data.length > 0) {
            let listOfUsersLiked = data[0].users_liked;

            // If review wasn't marked by user yet
            if(!this.isReviewMarkedByUser){

              this.updatedHelpfulCount = data[0].helpful_count + 1;


              listOfUsersLiked.push(this.loggedUserProfile[0].username);



              try{
                const { error } = await supabase
                  .from('reviews')
                  .update({ users_liked: listOfUsersLiked, helpful_count: this.updatedHelpfulCount})
                  .eq('review_id', this.reviewId)

                  this.markButtonClass = this.markedButtonClass;
                  this.isReviewMarkedByUser = true;
                  this.isButtonMarked = true;

              }catch(error){
                console.log(error)
              }
            }else{
              let index = listOfUsersLiked.indexOf(this.loggedUserProfile[0].username);
              listOfUsersLiked.splice(index, 1);

              this.updatedHelpfulCount = data[0].helpful_count - 1;

              try{
                const { error } = await supabase
                  .from('reviews')
                  .update({ users_liked: listOfUsersLiked, helpful_count: this.updatedHelpfulCount})
                  .eq('review_id', this.reviewId)

                  this.markButtonClass = this.unmarkedButtonClass;
                  this.isReviewMarkedByUser = false;

              }catch(error){
                console.log(error)
              }

            }


          } else {
            console.log('No rows found with the matching string.');
          }



        }catch(error){
          console.log(error)
        }

        this.isMarkButtonDisabled = false;
      }

  },
  async beforeUpdate(){

  },
  async mounted() {
    await this.getuserInfo()

    this.school = this.userProfile.school
    this.profileImgSrc = this.userProfile.profile_img_src
    this.firstName = this.userProfile.first_name
    this.lastName = this.userProfile.last_name

    const supabase = useSupabaseClient();

    try{
      const { data, error } = await supabase
              .from('reviews')
              .select()
              .eq('review_id', this.reviewId)

      this.updatedHelpfulCount = data[0].helpful_count;

      if(this.loggedUserProfile.length){
          if(!this.isRestoOwner && (this.username !== this.loggedUserProfile[0].username)){

          if(data[0].users_liked.includes(this.loggedUserProfile[0].username)){
            this.markButtonClass = this.markedButtonClass;
            this.isReviewMarkedByUser = true;
            this.isButtonMarked = true;

          }
        }
      }
    }catch(error){
      console.log(error);
    }

  },
}
</script>
