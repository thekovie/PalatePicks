<template>
  <div class="review-box flex flex-col bg-green_lightbg p-10 w-[1000px] rounded-3xl">
    <div class="reviewer-info grid grid-cols-2 items-start">
      <div class="overall-userinfo flex items-center">
        <div class="reviewer-photo w-[104px] h-[104px] rounded-full mr-3 border-4 border-green">
          <img class="w-full h-full rounded-full object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="user" />
        </div>
        <div class="user-info">
          <div class="user-name text-2xl font-semibold">Juan Dela Cruz</div>
          <div class="username text-sm font-light text-grey">@juandelacruz</div>
          <div class="user-school text-sm font-light text-grey">De La Salle University</div>
        </div>
      </div>
      <div class="flex flex-col justify-end">
        <div class="reviewer-rating text-xl flex justify-end px-3 pt-5">
          <img v-for="i in 5" class="star-icon w-25 h-25" src="../assets/Star.svg" alt="star" :key="i" />
        </div>
      </div>
    </div>
    <div class="review-title text-2xl font-semibold my-3">
      Expensive, but worth it!
    </div>
    <div class="review-content text-lg font-light">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa illum inventore esse et eos itaque molestias eligendi ut, exercitationem voluptas vel ex quasi dicta! Voluptate odio modi, ullam cum doloremque blanditiis! Neque ducimus in sed, dignissimos distinctio labore laboriosam soluta? Qui dolorem quae, ullam laboriosam ipsum atque dolore explicabo vitae amet sunt nulla commodi quo quasi ipsa blanditiis. Adipisci, eos. Veniam labore omnis ut, nostrum illo totam id velit asperiores exercitationem ab dignissimos rerum porro.
    </div>
    <div class="review-gallery flex mt-8">
      <div v-for="i in 5" class="review-photo w-[150px] h-[150px] mr-6 mb-6">
        <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
      </div>
    </div>
    <div class="review-posted-at text-sm font-light text-grey mt-4">
      06-11-2023 16:15
    </div>
    <div class="review-footer flex justify-between align-middle mt-5">
      <div class="found-helpful">
          <div class="helpful-count text-2xl font-semibold">1,734</div>
          <div class="helpful-text text-sm font-light text-grey">found this review helpful</div>
      </div>
      <div class="right-buttons flex justify-around mr-3">
        <button class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
          View Comments
        </button>
        <button v-show="isReviewOwner" class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
          Modify Review
        </button>
        <button v-show="isRestoOwner" class="bg-red text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
          Delete Review
        </button>
        <button v-show="!isRestoOwner && !isReviewOwner" class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
          Mark as Helpful
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isRestoOwner: {
      type: Boolean,
      default: false,
    },
    isReviewOwner: {
      type: Boolean,
      default: false,
    }
  },
};
</script>
