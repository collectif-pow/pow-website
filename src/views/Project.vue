<template>
  <div class="page project">
    <Shape :step="step" />
    <Nav />
    <div class="content">
      <div>
        <h1 class="title" v-html="project.title" />
        <div class="infos">
          <h2>
            {{ project.tagline }}
          </h2>
          <span>
            {{ project.date }}
          </span>
        </div>
      </div>
      <img class="featured" :src="project.featured_image.url" />
      <div class="description" v-html="project.description"></div>
      <div class="slideshow" @click="next()">
        <shader-slide
          :images="images()"
          :displacement="displacement"
          :intensity="0.2"
          :speedIn="1.4"
          :speedOut="1.4"
          isInteractive
          ref="slideshow"
        ></shader-slide>
        <div class="controls">
          <span v-html="left" class="left" @click="prev()" />
          <span v-html="right" class="right" @click="next()" />
        </div>
      </div>
      <Player v-if="project.video && project.video.id" :video="project.video" />
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Shape from '@/components/Shape.vue'
import Player from '@/components/Player.vue'
import ShaderSlide from '@/components/ShaderSlide/index.vue'

import displacement from '@/assets/displacement.png'

const left = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    class="chevron"
>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
`

const right = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    class="chevron"
>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
`

export default {
  name: 'projects',
  components: {
    Nav,
    Footer,
    Shape,
    ShaderSlide,
    Player,
  },
  data() {
    return {
      step: 0,
      left,
      right,
      displacement,
    }
  },
  mounted() {
    setTimeout(() => {
      this.incStep()
    }, 1000)
    this.wobble()
  },
  computed: {
    ...mapState({
      project(state) {
        return state.projects.find(
          p => p.id === parseInt(this.$route.params.id, 10)
        )
      },
    }),
  },
  methods: {
    incStep() {
      clearInterval(this.interval)
      this.step++
      this.wobble()
    },
    wobble() {
      this.interval = setInterval(() => {
        this.step++
      }, 8000)
    },
    images() {
      return this.project.gallery.map(g => g.url)
    },
    next() {
      if (this.$refs.slideshow) this.$refs.slideshow.next()
    },
    prev() {
      if (this.$refs.slideshow) this.$refs.slideshow.previous()
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1;
  margin-bottom: 30px;
  overflow: hidden;
  .title {
    text-align: center;
    margin-bottom: 0;
    margin-top: 80px;
  }
  .infos {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    @media (max-width: 768px) {
      padding: 0 10px;
      width: 100vw;
      flex-direction: column;
      text-align: center;
      margin-bottom: 20px;
    }
  }
  .featured {
    object-fit: cover;
    width: 60vw;
    height: 45vh;
    @media (max-width: 768px) {
      width: 100vw;
    }
  }
  .description {
    width: 60vw;
    @media (max-width: 768px) {
      width: 90vw;
    }
  }
  .slideshow {
    position: relative;
    width: 60vw;
    height: 80vh;
    margin: 40px 0 20px 0;
    cursor: pointer;
    user-select: none;
    touch-action: none;
    -ms-touch-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    @media (max-width: 768px) {
      width: 100vw;
    }
    .controls {
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: space-between;
      bottom: 50%;
      transform: translateY(50%);
      z-index: 1;
      @media (max-width: 768px) {
        bottom: 0;
        transform: translateY(0);
      }
      .left {
        position: relative;
        left: -60px;
        @media (max-width: 768px) {
          left: 0;
        }
      }
      .right {
        position: relative;
        right: -60px;
        @media (max-width: 768px) {
          right: 0;
        }
      }
      .left,
      .right {
        cursor: pointer;
        @media (max-width: 768px) {
          padding: 20px 0;
        }
        /deep/ svg {
          fill: $darker-grey-transparent;
          @media (max-width: 768px) {
            fill: $accent;
          }
        }
      }
    }
  }
}
</style>
