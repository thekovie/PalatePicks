<template>

<!-- Backdrop -->
  <div class="bg-black bg-opacity-50 top-0 left-0 w-screen h-[100vh] fixed flex z-30" @click.self="closeFullReview">


    <!-- Main Review Div Container-->
    <div class="bg-green_lightbg flex flex-col w-[1200px] h-[85%] mx-auto rounded-[28px] self-center overflow-y-auto py-[60px] px-20">

        <!-- Review Header -->
        <div class="flex flex-row justify-between">


          <!-- Whole User Info -->
          <div class="flex">
              <!-- Profile Picture-->
              <div class="bg-green min-w-[104px] min-h-[104px] max-w-[104px] max-h-[104px] rounded-[100%] p-[2.69px]">
                <img class="w-full h-full rounded-full object-cover" :src="userProfile.profile_img_src" alt="user" />
              </div>

              <!-- User Info-->
              <div class="ml-[17px]">
                <p class="font-bold text-[28px] hover:underline cursor-pointer"><NuxtLink :to="getProfileLink(username)">{{ userProfile.first_name }} {{ userProfile.last_name }}</NuxtLink></p>
                <p class="text-grey text-[16px] hover:underline cursor-pointer"> <NuxtLink :to="getProfileLink(username)">@{{ userProfile.username }}</NuxtLink></p>
                <p class="text-grey text-[16px]">{{ userProfile.school }}</p>
                <div class="flex flex-row relative left-[-3px]">
                  <img v-for="i in rating" class="star-icon w-25 h-25" src="~/assets/icons/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5 - rating" class="star-icon w-25 h-25" src="~/assets/icons/Star-blank.svg" alt="star" :key="i" />
                </div>

              </div>
          </div>

          <!-- Date -->
          <div class="text-[20px] text-grey">
            {{  formattedDate }}
            <span v-if="isEdited" class="italic text-grey">Edited</span>
          </div>

        </div>


        <!-- Review Title -->
        <div class="font-bold text-[33px] mt-6">{{ reviewSubject }}</div>
        <!-- User Main Review -->
        <div class="text-[20px] mt-4">{{ mainReview }}</div>

        <!-- User Gallery Review -->
        <div class="flex mt-[50px]">
          <div v-for="(media, index) in gallery" :key="index"  class="review-photo w-[150px] h-[150px] mr-6 mb-6 flex relative">
            <div class="w-full">
              <img v-if="reviewFileTypeChecker(media)" class="w-full h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review photo" @click="toggleMediaView(media)"/>
              <video v-else class="w-full h-full object-cover flex mr-3 rounded-3xl cursor-pointer hover:filter hover:brightness-75" :src="media" alt="review video" no-controls />
            </div>
            <div v-if="!reviewFileTypeChecker(media)" class="video-icon absolute inset-0 bg-black bg-opacity-30 w-[150px] h-[150px] p-14 rounded-3xl" @click="toggleMediaView(media)">
              <img class="w-full h-full" src="~/assets/icons/Video.svg" />
            </div>



          </div>
        </div>

        <!-- Comment Section Header -->
        <div class="font-bold text-[33px] mt-[70px]">Comments</div>


        <!-- Write Comment Section -->
        <div v-if="(loggedUserProfile.length)" class="flex flex-row mt-[16px]">

          <!-- Profile Picture-->
          <div class="bg-green min-w-[71px] min-h-[71px] max-w-[71px] max-h-[71px] rounded-[100%] p-[1.94px] mr-[21px]">
            <img class="w-full h-full rounded-full object-cover" :src="loggedUserProfile[0].profile_img_src" alt="user" />
          </div>

          <!-- Write Comment Text Area-->
          <div class="flex flex-col">
            <textarea v-model="commentField" class="resize-y border-green border-[1px] rounded-[15px] w-[852px] px-[25px] py-[20px] mr-[18px]" placeholder="Write a comment..." maxlength="500" :class="{'focus:outline-red': commentField.length === 500}" required />
            <div v-show="commentField.length === 500" class="text-red text-xs mt-2 ml-1">Comment must be less than or equal to 500 characters.</div>
          </div>

          <!-- Send button -->
          <div class="bg-green min-h-[48px] min-w-[48px] max-h-[48px] max-w-[48px] rounded-full justify-self-end mt-[15px] flex cursor-pointer" @click="pushComment">
            <img class="self-center mx-auto relative left-[-1px] top-[2px]" src="~/assets/icons/Navigation-01.svg" />
          </div>
        </div>


        <div v-if="showMediaView" @close="toggleMediaView">
          <ViewMedia @close="toggleMediaView" :media="selectedMedia" :isImage="isImage" />
        </div>


        <!-- Comment Border -->
        <div class="w-[100%] min-h-[2px] max-h-[2px] bg-[#d9d9d9] mt-[20px] mb-[47.5px]"></div>

        <!-- Comments are shown if there are comments (obviously)-->
        <div v-if="comments.length > 0">
          <div v-for="comment in comments" :key="comment.commentID" class="flex flex-col">
            <Comment :comment="comment" :loggedUserProfile="loggedUserProfile" :reviewId="reviewId" :isRestoOwner="isRestoOwner"/>

            <!-- Comment Border-->
            <div class="w-[100%] min-h-[2px] max-h-[2px] bg-[#d9d9d9] mt-[82px] mb-[47.5px]"></div>
          </div>
        </div>
        <div v-else class="text-[20px] mt-[50px]">No comments yet.</div>


    </div>



  </div>

</template>

<script>
export default {
  props: {
      userProfile: {
        type: Object
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
      isEdited: {
        type: Boolean
      },
      helpfulCount: {
        type: Number
      },
      gallery: {
        type: Array
      },
      loggedUserProfile: {
        type: Object
      },
      isRestoOwner: {
        type: Boolean
      },
      reviewId: {
        type: String
      },
    },

  data(){
    return {
      isUserLoggedIn: true,
      showMediaView: false,
      selectedMedia: '',
      isImage: '',
      commentField: '',
      comments: {},
      formattedDate: (new Date(this.date)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Manila' })
    }
  },

  methods: {
      closeFullReview(){
        this.$emit('close');
        this.$emit('update');
      },
      getProfileLink(username) {
        return `/profile/${username}`;
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
      async getComments() {
        try {
          const supabase = useSupabaseClient();

          const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('review_ref', this.reviewId)
            .order('created_at', { ascending: true });

          if (error) {
            throw error;
          }
          this.comments = data;

        } catch(error) {
          console.log(error);
        }
      },

      async pushComment() {
        try {
          const supabase = useSupabaseClient();

          const { data, error } = await supabase
            .from('comments')
            .insert([
              {
                review_ref: this.reviewId,
                username: this.loggedUserProfile[0].username,
                content: this.commentField,
              }
            ]);

          if (error) {
            throw error;
          }
          alert('Comment posted!')
          this.commentField = '';
          this.getComments();

        } catch(error) {
          console.log(error);
        }

        // Update to TRUE if the owner commented on the review
        if (this.isRestoOwner) {
          try {
            const supabase = useSupabaseClient();

            const {data, error} = await supabase
              .from('reviews')
              .update({
                owner_replied: true,
              })
              .eq('review_id', this.reviewId);

            if (error) {
              throw error;
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
    },

  async mounted() {
    await this.getComments();
  },
}
</script>

<style scoped>


::placeholder{
  font-size: 20px;
  color: #c0c0c0;
}

::-webkit-scrollbar {
  width: 7px;
  background: transparent;
}


::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 20px;
}

</style>
