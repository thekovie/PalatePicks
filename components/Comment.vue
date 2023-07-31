<template>
<!-- User Info Header -->
<div class="flex flex-row justify-between">

  <!-- Div Container of Both Profile Picture and User Info-->
  <div class="flex flex-row">
    <!-- Profile Picture -->
    <div class="bg-green min-w-[75px] min-h-[75px] max-w-[75px] max-h-[75px] rounded-[100%] p-[1.94px]">
        <div class="bg-white w-[100%] h-[100%] rounded-[100%]">
          <img class="w-full h-full rounded-full object-cover" :src="userProfile.profile_img_src" alt="user" />
        </div>
    </div>

    <!-- User Info -->
    <div class="self-center ml-[20px]">
      <div>
        <!-- Name and Establishment Owner Tag (If est. owner)-->
        <div class="flex flex-row w-[100%]">
          <div class="font-bold text-[20px] hover:underline cursor-pointer"><NuxtLink :to="`/profile/${comment.username}`">{{ userProfile.first_name }} {{ userProfile.last_name }}</NuxtLink></div>
          <div v-if="isEstablishmentOwner" class="min-h-[21px] min-w-[173px] text-white text-[12px] text-center self-center py-[2px] bg-green rounded-[41px] ml-[28px]">
            Establishment Owner
          </div>
        </div>

        <!-- Username -->
        <div class="text-grey text-[12px] hover:underline cursor-pointer">
          <NuxtLink :to="`/profile/${comment.username}`">@{{ comment.username}}</NuxtLink>
        </div>

        <!-- School -->
        <div class="text-grey text-[12px]">
          {{ userProfile.school }}
        </div>
      </div>

    </div>



  </div>

  <!-- Date -->
  <div class="text-grey text-[12px]">{{ formattedDate }}</div>

</div>
<!-- Comment Content -->
<div class="mt-[11px] ml-[95px] text-black text-[20px]">{{ comment.content }}</div>

</template>

<script>
export default {
  props: {
    comment: {
      type: Object
    },
    loggedUserProfile: {
      type: Array
    },
    reviewId: {
      type: String
    },
    isRestoOwner: {
      type: Boolean
    },
  },

  data() {
    return {
      isEstablishmentOwner: false,
      userProfile: {},
      username: this.comment.username,
      formattedDate: (new Date(this.comment.created_at)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Manila' }),
    }
  },

  methods: {
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
    async checkEstablishmentOwner() {
      const supabase = useSupabaseClient();

      try {
        const { data, error } = await supabase
        .from('restaurants')
        .select()
        .eq('owner', this.username)
        .eq('name', useRoute().params.id)

        if (data.length > 0) {
          this.isEstablishmentOwner = true
        }
      } catch (error) {
        console.log(error)
      }
    },
  },


  async mounted() {
    await this.getuserInfo();
    await this.checkEstablishmentOwner();
  }


}
</script>

<style>

</style>
