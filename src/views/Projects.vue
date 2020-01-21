<template>
  <div class="page projects">
    <Shape :step="step" />
    <Nav />
    <div class="content">
      <h1 class="title">
        Projets
      </h1>
      <Slider :slides="projects" />
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Shape from '@/components/Shape.vue'
import Slider from '@/components/Slider.vue'

export default {
  name: 'projects',
  components: {
    Nav,
    Footer,
    Shape,
    Slider,
  },
  data() {
    return {
      step: 0,
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
      projects: state => state.projects.filter(p => !p.collaboration),
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
  }
}
</style>
