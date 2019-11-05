<template>
  <div class="shape">
    <svg
      viewBox="0 0 600 600"
      preserveAspectRatio="none"
      height="100vh"
      width="100vw"
    >
      <defs>
        <linearGradient id="gradient" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stop-color="rgba(196,242,255,1)" />
          <stop offset="1" stop-color="rgba(255,222,240,1)" />
        </linearGradient>
      </defs>
      <g transform="translate(0, 0) rotate(0)">
        <path
          class="inner"
          fill="url(#gradient)"
          d="M192.7,-124.8C237.8,-97,254.4,-17.6,227,31.4C199.5,80.3,127.9,98.7,69.3,116.3C10.7,133.9,-35,150.8,-61.1,135.1C-87.3,119.4,-93.8,71.1,-109.6,19.9C-125.3,-31.3,-150.2,-85.5,-133.5,-106.8C-116.8,-128.1,-58.4,-116.6,7.7,-122.7C73.8,-128.8,147.5,-152.6,192.7,-124.8Z"
        />
        <path
          class="middle"
          stroke="url(#gradient)"
          fill="none"
          transform="scale(1.2)"
          d="M192.7,-124.8C237.8,-97,254.4,-17.6,227,31.4C199.5,80.3,127.9,98.7,69.3,116.3C10.7,133.9,-35,150.8,-61.1,135.1C-87.3,119.4,-93.8,71.1,-109.6,19.9C-125.3,-31.3,-150.2,-85.5,-133.5,-106.8C-116.8,-128.1,-58.4,-116.6,7.7,-122.7C73.8,-128.8,147.5,-152.6,192.7,-124.8Z"
        />
        <path
          class="outer"
          stroke="url(#gradient)"
          fill="none"
          transform="scale(1.4)"
          d="M192.7,-124.8C237.8,-97,254.4,-17.6,227,31.4C199.5,80.3,127.9,98.7,69.3,116.3C10.7,133.9,-35,150.8,-61.1,135.1C-87.3,119.4,-93.8,71.1,-109.6,19.9C-125.3,-31.3,-150.2,-85.5,-133.5,-106.8C-116.8,-128.1,-58.4,-116.6,7.7,-122.7C73.8,-128.8,147.5,-152.6,192.7,-124.8Z"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import anime from 'animejs'
import { SVGPathData } from 'svg-pathdata'

export default {
  props: {
    step: Number,
  },
  data() {
    return {
      paths: [
        'M182.4,-134.5C212.6,-107.6,197,-33.1,180.1,41.2C163.3,115.6,145.2,189.8,93.5,227.5C41.8,265.2,-43.5,266.4,-92.8,228.8C-142.1,191.2,-155.4,114.9,-150.3,57.2C-145.3,-0.5,-121.9,-39.5,-93.8,-66C-65.7,-92.4,-32.8,-106.2,21.6,-123.4C76.1,-140.7,152.2,-161.4,182.4,-134.5Z',
        'M90.5,-72.1C109,-48.9,110.1,-11.8,111,41.8C111.8,95.3,112.5,165.2,83,184C53.4,202.7,-6.5,170.3,-57.1,138.3C-107.6,106.4,-148.9,74.9,-159.2,34.9C-169.5,-5.2,-148.9,-53.7,-117.2,-79.9C-85.5,-106.2,-42.7,-110.1,-3.4,-107.4C36,-104.7,71.9,-95.4,90.5,-72.1Z',
        'M125.6,-69.7C170.5,-44,219.8,8.7,216.4,59.8C213.1,110.9,157.1,160.4,99.9,175.7C42.8,191,-15.5,172.1,-72.9,146.4C-130.4,120.7,-187.1,88.1,-207.5,36.5C-227.9,-15.1,-212.1,-85.8,-171.4,-110.6C-130.8,-135.3,-65.4,-114.2,-12.5,-104.2C40.4,-94.2,80.8,-95.4,125.6,-69.7Z',
        'M111,-66C159.4,-27.8,225,19.3,227.5,69.6C230.1,119.9,169.7,173.5,114.7,176.1C59.7,178.7,10.1,130.3,-53.9,103C-118,75.6,-196.4,69.2,-223.2,28.9C-250,-11.4,-225.1,-85.5,-179.3,-123.1C-133.4,-160.7,-66.7,-161.9,-17.7,-147.7C31.3,-133.6,62.5,-104.2,111,-66Z',
        'M192.7,-124.8C237.8,-97,254.4,-17.6,227,31.4C199.5,80.3,127.9,98.7,69.3,116.3C10.7,133.9,-35,150.8,-61.1,135.1C-87.3,119.4,-93.8,71.1,-109.6,19.9C-125.3,-31.3,-150.2,-85.5,-133.5,-106.8C-116.8,-128.1,-58.4,-116.6,7.7,-122.7C73.8,-128.8,147.5,-152.6,192.7,-124.8Z',
      ],
    }
  },
  watch: {
    step() {
      const currentPath = this.paths[this.step % this.paths.length]
      anime({
        targets: '.shape .inner',
        d: [{ value: currentPath }],
        easing: 'easeOutQuad',
        duration: 6000,
      })
      anime({
        targets: '.shape .middle',
        d: [{ value: currentPath }],
        easing: 'easeOutQuad',
        duration: 6000,
      })
      anime({
        targets: '.shape .outer',
        d: [{ value: currentPath }],
        easing: 'easeOutQuad',
        duration: 6000,
      })
      anime({
        targets: '.shape g',
        transform: this.getTransform(),
        easing: 'easeInOutQuart',
        duration: 800,
      })
    },
  },
  methods: {
    getTransform() {
      let offsetX = Math.random() > 0.5 ? 50 : 550
      offsetX = offsetX + Math.random() * 20
      let offsetY = Math.random() > 0.5 ? 50 : 550
      offsetY = offsetY + Math.random() * 20
      const angle = 90 + Math.random() * 90
      return `translate(${offsetX}, ${offsetY}) rotate(${angle})`
    },
    noisyPath(path, amplitude) {
      const pathData = new SVGPathData(path)
      const noise = amplitude => {
        return command => {
          if (command.type === 32) {
            command.x1 = command.x1 + Math.random() * amplitude
            command.y1 = command.y1 + Math.random() * amplitude
            command.x2 = command.x2 + Math.random() * amplitude
            command.y2 = command.y2 + Math.random() * amplitude
          }
          return command
        }
      }
      pathData.transform(noise(amplitude))
      return pathData.encode()
    },
  },
}
</script>

<style lang="scss" scoped>
.shape {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
