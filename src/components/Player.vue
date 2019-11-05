<template>
  <iframe
    v-if="video.type === 'vimeo'"
    :src="
      'https://player.vimeo.com/video/' +
        video.id +
        '?color=1d1d1d' +
        '&title=0&byline=0&portrait=0'
    "
    frameborder="0"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
  ></iframe>
  <iframe
    v-else
    :src="
      'https://www.youtube-nocookie.com/embed/' +
        video.id +
        '?rel=0&amp;showinfo=0'
    "
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>
</template>

<script>
export default {
  props: {
    video: Object,
  },
}
</script>

<style scoped lang="scss">
iframe {
  margin: 30px 0;
  width: 60vw;
  height: 45vh;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 90vw;
    height: 35vh;
  }
}
</style>
