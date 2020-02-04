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
      <carousel
        v-if="project.gallery.length"
        :per-page="1"
        navigationEnabled
        :navigationPrevLabel="left"
        :navigationNextLabel="right"
        :paginationEnabled="false"
        loop
        autoplay
        autoplayHoverPause
        class="carousel"
      >
        <slide v-for="i in project.gallery" :key="i.ID">
          <img class="images" :src="i.url" />
        </slide>
      </carousel>
      <Player v-if="project.video && project.video.id" :video="project.video" />
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Carousel, Slide } from 'vue-carousel'

import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Shape from '@/components/Shape.vue'
import Player from '@/components/Player.vue'

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
    Carousel,
    Slide,
    Player,
  },
  data() {
    return {
      step: 0,
      left,
      right,
    }
  },
  mounted() {
    console.log(left)
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
    next() {
      this.$refs.slick.next()
    },

    prev() {
      this.$refs.slick.prev()
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
  .carousel {
    width: 60vw;
    margin: 40px 0 20px 0;
    @media (max-width: 768px) {
      width: 100vw;
    }
    /deep/ .chevron {
      fill: $darker-grey-transparent;
      @media (max-width: 768px) {
        fill: $accent;
      }
    }
    /deep/ .VueCarousel-navigation-button {
      outline: none;
      @media (max-width: 768px) {
        top: 90%;
      }
    }
    /deep/ .VueCarousel-navigation-prev {
      @media (max-width: 768px) {
        left: 80px;
      }
    }
    /deep/ .VueCarousel-navigation-next {
      @media (max-width: 768px) {
        right: 80px;
      }
    }
  }
  .images {
    object-fit: cover;
    width: 60vw;
    height: 80vh;
    margin: 10px 0;
    @media (max-width: 768px) {
      width: 100vw;
    }
  }
}
</style>
