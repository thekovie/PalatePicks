<template>
  <div v-if="isVisible" class="input-reviewbox flex flex-col bg-green_lightbg p-10 w-[1000px] rounded-3xl shadow-xl shadow-green">
    <CustomLoader v-if="loading" :loading="loading" :status="status" />
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
            <img class="w-full h-full rounded-full object-cover" :src="loggedUserProfile[0].profile_img_src" alt="user" />
        </div>
        <div class="review-content flex flex-col gap-5 mt-1">
          <div class="review-title">
            <input class="review-title-input w-[600px] h-14 rounded-2xl px-6 border-1 focus:outline-green" v-model="reviewTitle" type="text" placeholder="Review Title" />
          </div>
          <div class="review-text">
            <textarea class="review-text-input w-[800px] h-[200px] rounded-2xl px-6 py-3 border-1 focus:outline-green" v-model="reviewContent" type="text" placeholder="Review Description" />
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
            <button class="bg-white text-green rounded-3xl flex items-center font-light px-14 py-3 mr-4" @click="closeReviewBox">
              Cancel
            </button>
            <button class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4" @click="handleSubmit($event)">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import StarIcon from '~/assets/icons/Star.svg'
import StarBlankIcon from '~/assets/icons/Star-blank.svg'

export default {
  props: {
    name: {
      type: String,
      default: 'Resto Name',
    },
    isVisible: {
      type: Boolean,
      required: true,
    },
    loggedUserProfile: {
      type: Object,
    },
  },
  data() {
    return {
      supabase: useSupabaseClient(),
      stars: [1, 2, 3, 4, 5],
      starIcon: StarIcon,
      starBlankIcon: StarBlankIcon,
      mediaItems: [],
      openInputReviewBox: true,

      reviewTitle: '',
      reviewContent: '',
      selectedRating: 0,
      fileLocs: [],
      loading: false,
      status: 'Posting...',
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
    closeReviewBox() {
      this.$emit('close');
    },

    async handleSubmit(event) {
      event.preventDefault();
      let reviewId = '';
      let mediaUrls = [];
      let mediaFiles = [];

      // Upload review except media
      this.loading = true;
      try {
        const {data, error} = await this.supabase
        .from('reviews')
        .insert(
          {
            review_subject: this.reviewTitle,
            content: this.reviewContent,
            rating: this.selectedRating,
            resto_name: this.name,
            reviewer_username: this.loggedUserProfile[0].username,
          }
        )
        if (error) {
          throw error;
        }
      } catch(error) {
        console.log(error);
      }

      // Skip if no media
      if (this.fileLocs.length === 0) {
        this.loading = false;
        this.$emit('close');
        this.$emit('update');
        return;
      }

      // Get Review ID and Upload Media
      console.log('Getting review ID')
      try {
        const {data, error} = await this.supabase
        .from('reviews')
        .select('review_id')
        .eq('reviewer_username', this.loggedUserProfile[0].username)
        .eq('resto_name', this.name)

        console.log(data);
        console.log(data[0].review_id);
        reviewId = data[0].review_id;

        console.log('Uploading media');
        console.log(this.fileLocs)
        // Upload media
        for (let i = 0; i < this.fileLocs.length; i++) {
          const media = this.fileLocs[i];
          // console.log(media);
          const fileExt = media.name.split('.').pop();
          const fileName = `${i}.${fileExt}`;
          const filePath = `${reviewId}/${fileName}`;


          const {data, error} = await this.supabase.storage
            .from('reviews-gallery')
            .upload(filePath, media, {
              cacheControl: 3600,
              upsert: false,
            })
        }
        console.log('Uploaded media');
        if (error) {
          throw error;
        }
      } catch(error) {
        console.log(error);
      }

      // Get URL media files from supabase bucket
      console.log('Getting media file path/s from bucket');

      try {
        const {data, error} = await this.supabase.storage
        .from('reviews-gallery')
        .list(`${reviewId}/`);

        mediaFiles = data.map((file) => `${reviewId}/${file.name}`);


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
          .eq('review_id', reviewId)

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
        location.reload(true);
      }
    },
  },
}
</script>

<style scoped>
</style>


