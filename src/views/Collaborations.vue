<template>
  <div class="page projects">
    <Shape :step="step" />
    <Nav />
    <div class="content"></div>
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import Shape from '@/components/Shape.vue'

export default {
  name: 'collaborations',
  components: {
    Nav,
    Footer,
    Shape,
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
      projects: state => state.projects,
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
</style>
