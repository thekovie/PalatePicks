<template>
  <div class="fixed w-full h-screen z-50 overflow-hidden flex flex-col justify-center bg-white items-center" v-if="loading">
    <div class="h-50 w-50 animate-pulse bg-green-300 rounded-full flex justify-center items-center" >
      <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle class="spinner_qM83" cx="4" cy="12" r="3" fill="green"/>
        <circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3" fill="green"/>
        <circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" fill="green"/>
      </svg>
    </div>
    <div class="text-2xl font-semibold mt-4 text-green">{{ this.status }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true,
      },
      status: {
        type: String,
        default: 'Loading...',
      }
    },
  }
</script>

<style scoped>
  .spinner_qM83 {
    animation:spinner_8HQG 1.05s infinite
    }
  .spinner_oXPr {
    animation-delay:.1s
  }
  .spinner_ZTLf{animation-delay:.2s}
  @keyframes spinner_8HQG{0%,57.14%{animation-timing-function:cubic-bezier(0.33,.66,.66,1);transform:translate(0)}28.57%{animation-timing-function:cubic-bezier(0.33,0,.66,.33);transform:translateY(-6px)}100%{transform:translate(0)}}
</style>
