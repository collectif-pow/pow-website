<template>
  <div class="page project">
    <Shape :step="step" />
    <Nav />
    <div class="content">
      <div>
        <h1 class="title">
          {{ project.title }}
        </h1>
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
        :paginationEnabled="false"
        loop
        autoplay
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
      slickOptions: {
        autoplay: true,
        slidesToShow: 1,
      },
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
  .title {
    text-align: center;
    margin-bottom: 0;
  }
  .infos {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }
  .featured {
    object-fit: cover;
    width: 60vw;
    height: 45vh;
    @media (max-width: 768px) {
      width: 90vw;
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
    margin: 30px 0;
    @media (max-width: 768px) {
      width: 90vw;
    }
    /deep/ .VueCarousel-navigation-button {
      color: $darker-grey;
      outline: none;
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
  .images {
    object-fit: cover;
    width: 60vw;
    height: 45vh;
    margin: 10px 0;
    @media (max-width: 768px) {
      width: 90vw;
    }
  }
}
</style>
