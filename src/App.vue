<template>
  <div id="app">
    <div class="container">
      <Loader v-if="loading" />
      <transition
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        mode="out-in"
        v-else
      >
        <router-view :key="$route.path" ref="page" />
      </transition>
      <PageTransition ref="transition" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Loader from '@/components/Loader.vue'
import PageTransition from '@/components/PageTransition.vue'

export default {
  components: {
    Loader,
    PageTransition,
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
    }),
  },
  methods: {
    beforeLeave(el) {
      this.$refs.transition.beforeLeave && this.$refs.transition.beforeLeave(el)
    },
    leave(el, done) {
      this.$refs.transition.leave && this.$refs.transition.leave(el, done)
    },
    afterLeave(el) {
      this.$refs.transition.afterLeave && this.$refs.transition.afterLeave(el)
    },
    beforeEnter(el) {
      this.$refs.transition.beforeEnter && this.$refs.transition.beforeEnter(el)
    },
    enter(el, done) {
      this.$refs.transition.enter && this.$refs.transition.enter(el, done)
    },
    afterEnter(el) {
      this.$refs.transition.afterEnter && this.$refs.transition.afterEnter(el)
    },
  },
}
</script>

<style lang="scss">
@import './assets/_variables';

#app {
  position: relative;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  .container {
    position: relative;
    background-color: $bg;
  }
}
</style>
