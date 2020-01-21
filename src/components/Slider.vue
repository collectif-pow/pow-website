<template>
  <div class="slider">
    <div class="slides">
      <router-link
        :to="`/project/${s.id}`"
        class="slide"
        v-for="s in slides"
        :style="`background-image: ${getBgImage(s)}`"
        :key="s.id"
        v-ov="{
          callback: toggleVisible,
          threshold: 1,
          throttle: 300,
        }"
      >
        <div class="layer"></div>
        <h3 v-html="s.title" />
        <div class="text" v-html="s.tagline" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: Array,
  },
  methods: {
    getBgImage(s) {
      return `url(${s.featured_image.url}`
    },
    toggleVisible(isVisible, entry) {
      entry.target.classList[isVisible ? 'add' : 'remove']('visible')
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables';

.slider {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .slides {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 80vw;
    height: 100%;
    @media (max-width: 768px) {
      justify-content: flex-start;
      align-items: center;
      width: 100vw;
    }
    .slide {
      position: relative;
      flex: 1;
      min-height: 35vh;
      margin: 10px;
      padding: 10px;
      background-position: center;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      @include long-transition;
      opacity: 0;
      transform: translateY(20px);
      @media (max-width: 768px) {
        width: 100%;
        margin: 0 0 10px 0;
      }
      @for $i from 0 to 3 {
        &:nth-child(#{$i + 1}) {
          transition-delay: #{$i * 100}ms;
        }
      }
      &.visible {
        opacity: 1;
        transform: translateY(0);
      }
      h3 {
        margin: 0;
        text-transform: uppercase;
        font-size: 1.5em;
        color: #ffffff;
      }
      .text {
        color: #dedede;
        /deep/ p {
          margin: 0;
        }
      }
      .layer {
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.1);
        @include short-transition;
      }
      &:hover .layer {
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
