<template>


<div class="ml-[px]">
  <!-- User Info Header -->
  <div class="flex flex-row justify-between">

    <!-- Div Container of Both Profile Picture and User Info-->
    <div class="flex flex-row">
      <!-- Profile Picture -->
      <div class="bg-green min-w-[75px] min-h-[75px] max-w-[75px] max-h-[75px] rounded-[100%] p-[1.94px]">
          <div class="bg-white w-[100%] h-[100%] rounded-[100%]"></div>
      </div>

      <!-- User Info -->
      <div class="self-center ml-[20px]">
        <div>
          <!-- Name and Establishment Owner Tag (If est. owner)-->
          <div class="flex flex-row w-[100%]">
            <div class="font-bold text-[20px] "> {{ comment.name }} </div>
            <div v-if="comment.isEstablishmentOwner" class="min-h-[21px] min-w-[173px] text-white text-[12px] text-center self-center py-[2px] bg-green rounded-[41px] ml-[28px]">
              Establishment Owner
            </div>
          </div>

          <!-- Username -->
          <div class="text-grey text-[12px]">
            {{ comment.username}}
          </div>

          <!-- School -->
          <div v-if="comment.school" class="text-grey text-[12px]">
            {{ comment.school }}
          </div>
        </div>

      </div>



    </div>

    <!-- Date -->
    <div class="text-grey text-[12px]">{{ comment.date }}</div>


  </div>

  <!-- Comment Content -->
  <div class="mt-[11px] ml-[95px] text-black text-[20px]">{{ comment.comment }}</div>


</div>




</template>

<script>
export default {
  props: {
    comment: {
      type: Object
    },
    leftmargin: {
      type: Number
    }
  }

}
</script>

<style>

</style>
