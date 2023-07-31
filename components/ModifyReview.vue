<template>
  <div class="bg-black bg-opacity-50 top-0 left-0 w-screen h-[100vh] fixed flex" @click.self="closeModifyReview">
  <CustomLoader v-if="loading" :loading="loading" :status="status" />
  <div class="bg-green_lightbg flex flex-col md:w-[1000px] h-[80%] md:h-[70%] mx-auto rounded-[28px] self-center overflow-y-auto py-12 px-10">
    <h2 class="rate-title font-semibold text-3xl">Modify your Review</h2>
    <div class="font-light text-grey text-lg">Change of heart? Write them down (or delete it).</div>
    <form>
      <div class="rate-stars flex flex-col md:flex-row pr-3 pt-5 md:items-center">
        <div class="flex flex-row">
          <img class="h-10 w-10 cursor-pointer" v-for="(star, index) in stars" :key="index" @click="toggleRating(index + 1)" :src="getStarIcon(index)" :alt="getStarAlt(index)" @click.prevent />
        </div>
        <div class="rate-meaning ml-1 md:ml-4">
          <div v-if="selectedRating === 0" class="text-sm font-light text-grey">Select your rating</div>
          <div v-if="selectedRating === 1" class="text-sm font-light text-grey">Poor</div>
          <div v-if="selectedRating === 2" class="text-sm font-light text-grey">Fair</div>
          <div v-if="selectedRating === 3" class="text-sm font-light text-grey">Good</div>
          <div v-if="selectedRating === 4" class="text-sm font-light text-grey">Very Good</div>
          <div v-if="selectedRating === 5" class="text-sm font-light text-grey">Excellent</div>
        </div>
      </div>
      <div class="review-part flex flex-col md:flex-row pt-8">
        <div class="reviewer-photo w-20 h-20 hidden md:block rounded-full mr-3 border-4 border-green">
            <img class="w-full h-full rounded-full object-cover" :src="loggedUserProfile[0].profile_img_src" alt="user" />
        </div>
        <div class="review-content flex flex-col gap-5 mt-1">
          <div class="review-title">
            <input v-model="reviewTitle" class="review-title-input w-full md:w-[600px] h-14 rounded-2xl px-6 border-1 focus:outline-green" type="text" placeholder="Review Title" />
          </div>
          <div class="review-text">
            <textarea class="review-text-input w-full md:w-[800px] h-[200px] rounded-2xl px-6 py-3 border-1 focus:outline-green" v-model="reviewContent" type="text" placeholder="Review Description" />
          </div>
          <div class="review-gallery flex flex-wrap md:flex-row">
            <div v-for="(media, index) in mediaItems" :key="index" class="media-items flex items-center justify-center w-[90px] h-[90px] mr-6 mb-6" :class="{'opacity-30' : !pressedDelete, 'cursor-not-allowed' : !pressedDelete, 'cursor-pointer' : pressedDelete}" @mouseover="media.hovered = true" @mouseleave="media.hovered = false">
              <img v-if="media.isImage" class="w-full h-full object-cover rounded-3xl border-2 border-grey" :src="media.url" :alt="'Media Item ' + (index + 1)" />
              <video v-else class="w-full h-full object-cover rounded-3xl border-2 border-grey" :src="media.url" :alt="'Media Item ' + (index + 1)" no-controls />
              <div v-if="media.isVideo && !media.hovered && this.pressedDelete" class="video-icon absolute bg-black bg-opacity-30 w-[90px] h-[90px] p-8 rounded-3xl">
                <img class="w-full h-full" src="~/assets/icons/Video.svg" />
              </div>
              <div v-if="media.hovered && this.pressedDelete" class="absolute bg-black bg-opacity-30 w-[90px] h-[90px] p-8 rounded-3xl" @click="removeMedia(index)">
                <img class="w-full h-full" src="~/assets/icons/Trash.svg" />
              </div>
            </div>
            <div v-if="!pressedDelete">
              <div class="delete-media flex flex-col items-center justify-center w-[90px] h-[90px] p-4 mr-6 mb-6 rounded-3xl border-2 bg-red border-red cursor-pointer" @click="replaceMedia">
                <!-- <img v-if="mediaItems.length < 5" src="~/assets/images/camera-icon.png" alt="camera icon" @click="openFileInput"/> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-24 h-24">
                  <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>
                <div class="mt-1 text-xs text-center text-white uppercase">Delete</div>
                <input ref="fileInput" type="file" accept="image/*, video/*" class="block" @change="handleFileUpload" />
              </div>
            </div>
            <div v-else class="add-media flex flex-col items-center justify-center w-[90px] h-[90px] p-4 mr-6 mb-6 rounded-3xl border-2 border-grey cursor-pointer">
              <label for="media-upload" class="flex flex-col items-center justify-center">
                <img v-if="mediaItems.length < 5" src="~/assets/images/camera-icon.png" alt="camera icon"/>
                <div class="text-xs"> {{ mediaItems.length }} / 5</div>
              </label>
              <input id="media-upload" ref="fileInput" type="file" accept="image/*, video/*" class="block" @change="handleFileUpload" />
            </div>
          </div>

          <div class="review-buttons flex flex-col justify-center md:flex-row md:justify-end">
            <button class="bg-white text-green rounded-3xl flex items-center justify-center font-light px-14 w-full md:w-56 md:h-14 py-3 mr-4" @click="closeModifyReview">
              Cancel
            </button>
            <button class="delete-review bg-red text-white rounded-3xl flex items-center justify-center font-light px-14 w-full mt-4 md:mt-0 md:w-56 md:h-14 py-3 mr-4" @click="deleteReview">
              Delete Review
            </button>
            <button v-if="selectedRating > 0 && reviewTitle !== '' && reviewContent !== ''" class="bg-green text-white rounded-3xl flex items-center justify-center font-light px-14 w-full mt-4 md:mt-0 md:w-60 md:h-14 py-3 mr-4" @click="updateReview">
              Update Review
            </button>

            <button v-else class="bg-[#93cfa9] text-white rounded-3xl flex items-center justify-center font-light px-14 w-full mt-4 md:mt-0 md:w-56 md:h-14 py-3 mr-4" disabled>
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
      },
      reviewId: {
        type: String
      },
    },
    data() {
      return {
        showModifyReview: true,
        stars: [1, 2, 3, 4, 5],
        starIcon: StarIcon,
        starBlankIcon: StarBlankIcon,
        mediaItems: [],
        openInputReviewBox: true,
        pressedDelete: false,

        supabase: useSupabaseClient(),
        selectedRating: this.rating,
        reviewTitle: this.reviewSubject,
        reviewContent: this.mainReview,
        fileLocs: [],
        loading: false,
        status: ''
      };
    },
    mounted() {
      if (this.gallery.length === 0) {
        this.pressedDelete = true;
      }

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

          this.fileLocs.push(file);

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
        this.fileLocs.splice(index, 1);
      },
      closeModifyReview() {
        if(confirm("Are you sure you want to cancel? All changes will not be saved.")) {
          this.$emit('close')
        }
      },
      replaceMedia() {
        this.mediaItems = [];
        this.pressedDelete = true;
      },

      async updateReview(event) {
        event.preventDefault();

        this.status = 'Updating review...';
        this.loading = true;


        let mediaUrls = [];
        let mediaFiles = [];

        // Update Input Fields ONLY (except Media)
        try {
          const {data, error} = await this.supabase
            .from('reviews')
            .update({
              review_subject: this.reviewTitle,
              content: this.reviewContent,
              rating: this.selectedRating,
              is_edited: true,
            })
            .eq('review_id', this.reviewId);

          if (error) {
            throw error;
          }
        } catch(error) {
          console.log(error);
        }

        if (this.fileLocs.length === 0) {
          console.log("No media to upload")
          this.loading = false;
          this.$emit('update');
          this.$emit('close');
          this.$emit('reloadRating')
          return;
        }

        // Delete Media
          try {
            const {data, error} = await this.supabase
              .from('reviews')
              .update({
                review_gallery: [],
              })
              .eq('review_id', this.reviewId);

              let mediaToDelete = [];

              try {
                const { data, error} = await this.supabase.storage
                  .from('reviews-gallery')
                  .list(`${this.reviewId}/`);

                if (error) {
                  throw error;
                }

                mediaToDelete = data.map((file) => `${this.reviewId}/${file.name}`);
                console.log(mediaToDelete);

              } catch(error) {
                console.log(error);
              }

            // Delete listed media from storage
            try {
              for (let i = 0; i < mediaToDelete.length; i++) {
                const { data, error } = await this.supabase.storage
                  .from('reviews-gallery')
                  .remove([mediaToDelete[i]]);

                if (error) {
                  throw error;
                }
              }
            } catch (error) {
              console.log(error);
            }

            // Delete all media from database
            try {
              const { data, error } = await this.supabase
                .from('reviews')
                .update({
                  review_gallery: [],
                })
                .eq('review_id', this.reviewId);

              if (error) {
                throw error;
              }
            } catch (error) {
              console.log(error);
            }


            if (error) {
              throw error;
            }
          } catch(error) {
            console.log(error.message);
          }

        // Upload Media
        try {
          for (let i = 0; i < this.fileLocs.length; i++) {
            const media = this.fileLocs[i];

            const fileExt = media.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${this.reviewId}/${fileName}`;


            const {data, error} = await this.supabase.storage
              .from('reviews-gallery')
              .upload(filePath, media, {
                cacheControl: 1,
                upsert: false,
              })
              if (error) {
                throw error;
              }
          }
          console.log('Uploaded media');
        } catch(error) {
          console.log(error);
        }

        // Get URL media files from supabase bucket
        console.log('Getting media file path/s from bucket');

        try {
          const {data, error} = await this.supabase.storage
          .from('reviews-gallery')
          .list(`${this.reviewId}/`);

          mediaFiles = [];
          mediaFiles = data.map((file) => `${this.reviewId}/${file.name}`);


          try {
            for (let i = 0; i < mediaFiles.length; i++) {
              const media = mediaFiles[i];
              const {data, error} = await this.supabase.storage
              .from('reviews-gallery')
              .getPublicUrl(media);
              console.log(data);
              mediaUrls.push(data.publicUrl);
            }
            if (error) {
              throw error;
            }

          } catch (error) {
            console.log(error);
          }

          // Update review with media URL file path
          console.log('Updating review with media file path');

          try {
            const {data, error} = await this.supabase
            .from('reviews')
            .update(
              {
                review_gallery: mediaUrls,
              }
            )
            .eq('review_id', this.reviewId)

            console.log('Updated review with media file path')
            if (error) {
              throw error;
            }
          } catch(error) {
            console.log(error);
          }
          if (error) {
            throw error;
          }
        } catch(error) {
          console.log(error);
        }
        finally {
          this.loading = false;
          this.$emit('update');
          this.$emit('close');
          this.$emit('reloadRating')
        }
      },

      async deleteReview() {
        this.status = 'Deleting review...';
        this.loading = true;

        if (!confirm("Are you sure you want to delete this review?")) {
          return;
        }

        try {
          const {data, error} = await this.supabase
            .from('reviews')
            .delete()
            .eq('review_id', this.reviewId);

          if (error) {
            throw error;
          }
        } catch(error) {
          console.log(error.message);
        }

        try {
          const {data, error} = await this.supabase.storage
            .from('reviews-gallery')
            .list(`${this.reviewId}/`);

          if (error) {
            throw error;
          }

          const mediaToDelete = data.map((file) => `${this.reviewId}/${file.name}`);

          try {
            for (let i = 0; i < mediaToDelete.length; i++) {
              const { data, error } = await this.supabase.storage
                .from('reviews-gallery')
                .remove([mediaToDelete[i]]);

              if (error) {
                throw error;
              }
            }
          } catch (error) {
            console.log(error);
          }
        } catch(error) {
          console.log(error.message);
        }
        finally {
          this.$emit('update');
          this.$emit('close');
          this.$emit('reloadRating')
          this.loading = false;
        }
      },
    }
  }
</script>

<style scoped>
  input[type="file"] {
    display: none;
  }
</style>
