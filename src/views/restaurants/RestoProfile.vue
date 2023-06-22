<template>
  <body class="min-h-screen pb-80">
    <div class="cover-page h-[586px] min-w-screen flex flex-col pl-56 pr-64 justify-center text-white">
      <div class="resto-title font-bold text-5xl">
        {{ resto }}
      </div>
      <div class="resto-ratings flex mt-3">
        <div class="resto-rating text-2xl flex pr-3">
          <img class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" />
          <img class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" />
          <img class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" />
          <img class="star-icon w-25 h-25" src="../../assets/Star.svg" alt="star" />
          <img class="star-icon w-25 h-25" src="../../assets/Star-blank.svg" alt="star" />
        </div>
        <div class="dot text-2xl pr-3">
          ·
        </div>
        <div class="resto-price text-2xl">
          ₱ ₱ ₱
        </div>
      </div>
      <div class="resto-description text-lg font-light mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis laboriosam magnam delectus aspernatur unde eius at, repellat numquam ratione dolor soluta cum et eveniet quasi sapiente fugiat quia! Reiciendis, beatae optio perferendis cum harum reprehenderit temporibus vitae commodi nostrum rem fugiat quidem ad. Nostrum tempore, architecto accusamus laudantium animi obcaecati, recusandae vitae nemo neque consectetur aliquam cumque perspiciatis deserunt quaerat non debitis provident deleniti aspernatur omnis ex itaque minima labore? Ullam tempora sunt praesentium velit pariatur repudiandae dignissimos iste suscipit!
      </div>
    </div>
    <div class="body px-20">
      <div class="gallery">
        <div class="gallery-title text-3xl font-semibold mt-20 mb-10">
          Gallery
        </div>
        <div class="gallery-photos flex">
          <div class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
            <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
          </div>
          <div class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
            <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
          </div>
          <div class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
            <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
          </div>
          <div class="gallery-photo w-[500px] h-[500px] mr-10 mb-10">
            <img class="w-full h-full rounded-3xl object-cover" src="../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg" alt="restaurant1" />
          </div>
        </div>
        <div class="reviews grid grid-cols-2">
          <div class="left-portion">
            <div class="reviews-title text-3xl font-semibold mt-20 mb-10">
              Reviews
            </div>
            <div class="reviews-list flex flex-col gap-8">
              <InputReviewBox v-if="isReviewBoxOpen" @close="closeReviewBox" :name="resto"  :isVisible="isReviewBoxOpen"/>
              <ReviewBox v-for="review in reviews" :key="review.reviewId" :reviewerPhotoSrc="review.reviewerPhotoSrc" :name="review.name" :username="review.username" :school="review.school" :reviewSubject="review.reviewSubject" :mainReview="review.mainReview" :rating="review.rating" :date="review.date" :helpfulCount="review.helpfulCount" :comments="review.comments"/>
            </div>
          </div>
          <div class="review-filters mt-20 flex flex-col w-auto items-end">
            <div class="create-review">
              <button v-show="!isRestoOwner" :disabled="isReviewBoxOpen" @click="openReviewBox" class="bg-green text-white rounded-3xl flex items-center font-light px-6 py-3 mr-4">
                <span class="text-white text-base uppercase mr-6">Make a review</span>
                <img src="../../assets/Plus.svg" />
              </button>
            </div>
            <div class="filter-area mt-20">
              <div class="filter-title text-3xl font-semibold font mb-6">
                Filter Reviews
              </div>
              <div class="search-review">
                <input class="search-review-input w-[300px] h-[50px] rounded-3xl px-6 border-2 focus:outline-green" type="text" placeholder="Search reviews" />
              </div>
              <div class="star-filter flex flex-col mt-5">
                <div class="five-stars flex">
                  <input class="mx-8" type="checkbox" id="five-stars" name="five-stars" value="five-stars" />
                  <img v-for="i in 5" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                </div>
                <div class="four-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="four-stars" name="four-stars" value="four-stars" />
                  <img v-for="i in 4" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-4" class="star-icon w-25 h-25 mr-2" src="../../assets/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="three-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="three-stars" name="three-stars" value="three-stars" />
                  <img v-for="i in 3" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-3" class="star-icon w-25 h-25 mr-2" src="../../assets/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="two-stars flex mt-2">
                  <input class="mx-8" type="checkbox" id="two-stars" name="two-stars" value="two-stars" />
                  <img v-for="i in 2" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-2" class="star-icon w-25 h-25 mr-2" src="../../assets/Star-blank.svg" alt="star" :key="i" />
                </div>
                <div class="one-star flex mt-2">
                  <input class="mx-8" type="checkbox" id="one-star" name="one-star" value="one-star" />
                  <img v-for="i in 1" class="star-icon w-25 h-25 mr-2" src="../../assets/Star.svg" alt="star" :key="i" />
                  <img v-for="i in 5-1" class="star-icon w-25 h-25 mr-2" src="../../assets/Star-blank.svg" alt="star" :key="i" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  import ReviewBox from '../../components/ReviewBox.vue'
  import InputReviewBox from '../../components/InputReviewBox.vue'

  export default {
    components: {
      ReviewBox, InputReviewBox
    },
    props: {
      resto: {
        type: String,
        default: 'Resto Name',
      },
    },
  methods: {
    openReviewBox() {
      this.isReviewBoxOpen = true
      },
    closeReviewBox() {
      this.isReviewBoxOpen = false
      },
    },
    data() {
      return {
          isReviewBoxOpen: false,
          isRestoOwner: false,

          reviews: [
          {
            reviewId: 1,
            reviewerPhotoSrc: "../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg",
            name: "Juan Dela Cruz",
            username: "@juandelacruz",
            school: "De La Salle University",
            reviewSubject: "Expensive, but worth it!",
            mainReview: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa illum inventore esse et eos itaque molestias eligendi ut, exercitationem voluptas vel ex quasi dicta! Voluptate odio modi, ullam cum doloremque blanditiis! Neque ducimus in sed, dignissimos distinctio labore laboriosam soluta? Qui dolorem quae, ullam laboriosam ipsum atque dolore explicabo vitae amet sunt nulla commodi quo quasi ipsa blanditiis. Adipisci, eos. Veniam labore omnis ut, nostrum illo totam id velit asperiores exercitationem ab dignissimos rerum porro.",
            rating: 5,
            date: "06-11-2023 16:15",
            helpfulCount: 1734,
            comments: [
              {
                name: "John Doe",
                username: "@imarealperson",
                profilePicSrc: "",
                school: '',
                isEstablishmentOwner: true,
                date: "06-30-2023 09:25",
                comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
                commentID: 1,
                replies: []
              },
              {
                name: "Juan Perez",
                username: "@definitelynotaplaceholder",
                profilePicSrc: "",
                school: "De La Salle University",
                isEstablishmentOwner: false,
                date: "01-23-2023 18:21",
                comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at lobortis leo. Nulla vel ultrices sapien. Cras tincidunt odio sit amet mattis accumsan. Quisque pulvinar justo dictum commodo rhoncus. Praesent neque nulla, venenatis eget eleifend a, vehicula nec lacus. In at luctus diam, vel varius purus. Integer condimentum purus eget.",
                commentID: 2,
                replies: [
                  {
                    name: "John Doe",
                    username: "@imarealperson",
                    profilePicSrc: "",
                    school: '',
                    isEstablishmentOwner: true,
                    date: "06-30-2023 09:25",
                    comment: "Nulla ut risus nibh. Aenean purus nisi, vestibulum id sem at, commodo auctor mi. Maecenas a sapien nec lacus porttitor ultricies ut at elit. Aliquam eget nulla diam."
                  },
                ]
              },
              {
                name: "Vera Hughes",
                username: "@hughes_vera",
                profilePicSrc: "",
                school: "Adamson University",
                isEstablishmentOwner: false,
                date: "12-25-2021 19:47",
                comment: "Etiam ac neque quis tortor vestibulum dapibus. Sed orci nunc, pulvinar id lacus ac, viverra venenatis sem. Nullam tincidunt diam non mi pretium, vulputate blandit dui laoreet. Vestibulum nisl felis, convallis quis pharetra eget, accumsan sit amet.",
                commentID: 3,
                replies: [
                {
                    name: "Antonio López",
                    username: "@anexistingperson",
                    profilePicSrc: "",
                    school: '',
                    isEstablishmentOwner: true,
                    date: "02-20-2022 00:12",
                    comment: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... Neque porro quisquam est qui dolorem ipsum quia dolor sit amet."
                  }
                ]



              }



            ]
          },
          {
            reviewId: 2,
            reviewerPhotoSrc: "../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg",
            name: "Juan Perez",
            username: "@juanperez",
            school: "De La Salle University",
            reviewSubject: "Good food!",
            mainReview: "Aenean aliquet libero vitae vehicula euismod. Nullam maximus dignissim sapien quis fringilla. In rhoncus vestibulum leo, vel accumsan mauris blandit vitae. Aenean vitae tortor eget ipsum feugiat posuere eget in justo. Aliquam auctor, elit eu tempor lacinia, elit tellus dictum mi, id hendrerit turpis ex.",
            rating: 4,
            date: "02-20-2023 14:13",
            helpfulCount: 215,
            comments: []
          },
          {
            reviewId: 3,
            reviewerPhotoSrc: "../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg",
            name: "Eric Widget",
            username: "@ericwidget",
            school: "Adamson University",
            reviewSubject: "Would definitely add this to my recos!",
            mainReview: "Aliquam turpis enim, varius sed viverra vel, tristique vitae metus. Aenean vitae lectus finibus, facilisis erat ac, tempor orci. Vestibulum malesuada nec nisl quis laoreet. Proin efficitur quis augue at elementum. Sed eget massa tincidunt elit maximus mollis. Ut bibendum justo et scelerisque facilisis. Nullam sed odio bibendum magna lacinia elementum. Nulla facilisi. Fusce consequat mi at quam aliquet laoreet. Curabitur rutrum vel neque in.",
            rating: 5,
            date: "09-25-2021 19:56",
            helpfulCount: 2123,
            comments: []

          },
          {
            reviewId: 4,
            reviewerPhotoSrc: "../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg",
            name: "Rita la Cantaora",
            username: "@rita1234",
            school: "Arellano University",
            reviewSubject: "Kinda okay if you're looking for affordable food",
            mainReview: "Vestibulum ac arcu condimentum, fringilla neque sed, laoreet lorem. Etiam porta massa at odio dictum, sed gravida tellus cursus. Curabitur quis imperdiet lacus. Proin ultrices, nibh at dictum consequat, erat quam accumsan risus, at dictum nulla ante ac mauris. Aenean eget magna pulvinar, ultrices nunc at, ultrices lacus. Proin fringilla, magna tincidunt tincidunt convallis, dolor ligula aliquet nibh, a iaculis dolor lacus sed felis. Duis cursus fringilla ultricies. Nulla in eleifend dolor. Proin nec orci.",
            rating: 3,
            date: "01-12-2020 02:26",
            helpfulCount: 59,
            comments: []
          },
          {
            reviewId: 5,
            reviewerPhotoSrc: "../../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg",
            name: "Chaplain Mondover",
            username: "@church_dweller",
            school: "De La Salle University",
            reviewSubject: "A restaurant I'll always go back to ",
            mainReview: "Integer mattis augue ut ex porttitor pulvinar. Suspendisse vel iaculis dui, id tristique lectus. Phasellus viverra elit id ligula rutrum vestibulum. Nunc et posuere enim, consequat pulvinar ipsum. Donec pulvinar urna in lacinia ornare. Nullam lacinia nulla at pellentesque tincidunt. Proin varius sapien eu turpis pulvinar vestibulum. In finibus justo et massa semper condimentum. In vel libero nibh. Vestibulum viverra ac justo quis commodo. Mauris.",
            rating: 5,
            date: "11-25-2019 12:34",
            helpfulCount: 1432,
            comments: []
          },



          ]
      }
  }
  }
</script>

<style scoped>
  .cover-page {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../../public/images/janice-lin-yUIN4QWKCTw-unsplash.jpg');
    background-size: cover;
    background-position: center;
  }
</style>
