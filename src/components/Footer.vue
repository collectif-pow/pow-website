<template>
  <footer>
    <a href="mailto:coucou@pow.cool">coucou@pow.cool</a>
    <a href="https://drangies.fr" target="_blank">made by drangies.fr</a>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../assets/_variables';

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    color: $darker-grey;
  }
}
</style>
