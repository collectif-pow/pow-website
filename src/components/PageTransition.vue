<template>
  <div ref="layer" />
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
      anime({
        targets: this.$refs.layer,
        translateX: '-100vw',
        translateY: '0vh',
        duration: 0,
      })
    },
    leave(el, done) {
      anime({
        targets: this.$refs.layer,
        translateX: '0vw',
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
        targets: this.$refs.layer,
        translateY: '100vh',
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
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transform: translateX(-100vw) translateY(0vh);
  will-change: transform;
  background-color: #1d1d1d;
}
</style>
