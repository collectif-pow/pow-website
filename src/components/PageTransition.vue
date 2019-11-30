<template>
  <div :style="{ transform: `translate3D(${x}, ${y}, 0)` }" />
</template>

<script>
import anime from 'animejs'
const duration = 450

export default {
  data() {
    return {
      x: '-100vw',
      y: '0vh',
    }
  },
  methods: {
    beforeLeave(el) {
      el.style.opacity = 0
      // reset values before enter animation
      this.x = '-100vw'
      this.y = '0vh'
    },
    leave(el, done) {
      anime({
        targets: this,
        x: '0vw',
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
        y: '100vh',
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
  z-index: 1;
  overflow: hidden;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: translate3d(-100vw, 0vh, 0);
  will-change: transform;
  background-color: #1d1d1d;
}
</style>
