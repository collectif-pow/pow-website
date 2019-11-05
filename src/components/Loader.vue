<template lang="html">
  <div class="page loader">
    <h1 class="title" ref="load">Ça charge...</h1>
  </div>
</template>

<script>
import charming from 'charming'

export default {
  mounted() {
    charming(this.$refs.load)
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    /deep/ span {
      @for $i from 9 to 12 {
        &:nth-child(#{$i + 1}) {
          animation: color 0.6s;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-delay: #{$i * 100}ms;
        }
      }
    }
  }
}
@keyframes color {
  0% {
    color: #ffffff;
  }
  100% {
    color: $accent;
  }
}
</style>
