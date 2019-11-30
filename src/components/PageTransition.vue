<template>
  <div :style="{ top, left }" />
</template>

<script>
import anime from 'animejs'
const duration = 450

export default {
  data() {
    return {
      top: '0vh',
      left: '-100vw',
    }
  },
  methods: {
    beforeLeave(el) {
      el.style.opacity = 0
      // reset values before enter animation
      this.top = '0vh'
      this.left = '-100vw'
    },
    leave(el, done) {
      anime({
        targets: this,
        left: '0vw',
        round: 1,
        easing: 'easeInOutQuart',
        duration: duration,
        complete: () => done && done(),
      })
    },
    beforeEnter(el) {
      // sets the opacity to 0 of the entering element
      el.style.opacity = 0
      // scroll to the top of the #app (and html for ie11) container
      anime({
        targets: ['#app', 'html'],
        scrollTop: 0,
        easing: 'linear',
        duration: 0,
      })
    },
    enter(el, done) {
      const tl = anime.timeline()
      tl.add({
        targets: this,
        top: '100vh',
        round: 1,
        easing: 'easeInOutQuart',
        duration: duration,
        complete: () => done && done(),
      }).add({
        targets: el,
        opacity: 1,
        easing: 'linear',
        duration: duration * 1.7,
        offset: `-=${duration * 1.2}`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';

div {
  position: fixed;
  top: 0;
  left: -100vw;
  z-index: 1;
  overflow: hidden;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: #1d1d1d;
}
</style>
