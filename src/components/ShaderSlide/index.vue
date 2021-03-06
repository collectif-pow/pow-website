<template>
  <div class="shader-slide" ref="slider"></div>
</template>

<script>
// Import from source so webpack can do tree shaking
import { Scene } from 'three/src/scenes/Scene.js'
import { WebGLRenderer } from 'three/src/renderers/WebGLRenderer.js'
import { OrthographicCamera } from 'three/src/cameras/OrthographicCamera.js'
import { TextureLoader } from 'three/src/loaders/TextureLoader.js'
import { LinearFilter } from 'three/src/constants.js'
import { RepeatWrapping } from 'three/src/constants.js'
import { ShaderMaterial } from 'three/src/materials/ShaderMaterial.js'
import { PlaneBufferGeometry } from 'three/src/geometries/PlaneGeometry.js'
import { Mesh } from 'three/src/objects/Mesh.js'
import { Vector2 } from 'three/src/math/Vector2.js'

import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

import anime from 'animejs'

export default {
  name: 'shader-slide',
  props: {
    images: {
      required: true,
      type: Array,
      default: () => [],
    },
    displacement: {
      required: true,
      type: String,
    },
    intensity: {
      required: false,
      type: Number,
      default: 1,
    },
    speedIn: {
      required: false,
      type: Number,
      default: 1,
    },
    speedOut: {
      required: false,
      type: Number,
      default: 1,
    },
    ease: {
      required: false,
      type: String,
      default: 'easeOutExpo',
    },
    preserveAspectRatio: {
      required: false,
      type: Boolean,
      default: true,
    },
    interactionVelocity: {
      required: false,
      type: Object,
      default: () => {
        return {
          x: 7,
          y: 1,
        }
      },
    },
    isInteractive: {
      required: false,
      type: Boolean,
      default: false,
    },
    angle: {
      required: false,
      type: Number,
      default: Math.PI / 4,
    },
  },
  data() {
    return {
      currentImage: 0,
      scene: new Scene(),
      renderer: new WebGLRenderer({ antialias: false, alpha: true }),
      mat: null,
      textures: [],
      disp: null,
      nextImage: 0,
      imagesLoaded: [],
      isAnimating: false,
      currentTransition: null,
      position: {},
      rafID: null,
    }
  },
  computed: {
    slider() {
      return this.$refs.slider
    },
    camera() {
      const camera = new OrthographicCamera(
        this.slider.offsetWidth / -2,
        this.slider.offsetWidth / 2,
        this.slider.offsetHeight / 2,
        this.slider.offsetHeight / -2,
        1,
        1000
      )
      camera.position.z = 1
      return camera
    },
  },
  methods: {
    initScene() {
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearColor(0xffffff, 0.0)
      this.renderer.setSize(this.slider.offsetWidth, this.slider.offsetHeight)
      this.$refs.slider.appendChild(this.renderer.domElement)
    },
    render() {
      // if (this.mat) console.log(this.mat.uniforms.dispFactor.value)
      this.renderer.render(this.scene, this.camera)
    },
    transitionIn() {
      this.currentTransition = anime({
        targets: this.mat.uniforms.dispFactor,
        duration: this.speedIn * 1000,
        value: 1,
        easing: this.ease,
        update: this.render,
        complete: this.onAnimationEnd,
        autoplay: false,
      })
      this.currentTransition.play()
    },
    transitionOut() {
      this.currentTransition = anime({
        targets: this.mat.uniforms.dispFactor,
        duration: this.speedOut * 1000,
        value: 0,
        easing: this.ease,
        update: this.render,
        complete: this.onAnimationEnd,
        autoplay: false,
      })
      this.currentTransition.play()
    },
    onAnimationEnd() {
      this.isAnimating = false
      this.$emit('animationEnd')
      this.render()
    },
    previous() {
      if (this.isAnimating || !this.mat) return

      this.isAnimating = true
      this.mat.uniforms.dispFactor.value = 1

      this.currentImage = this.nextImage
      this.nextImage = this.currentImage - 1
      if (this.nextImage < 0) this.nextImage = this.textures.length - 1
      this.mat.uniforms.texture1.value = this.textures[this.nextImage]
      this.mat.uniforms.texture2.value = this.textures[this.currentImage]
      this.transitionOut()
    },
    next() {
      if (this.isAnimating || !this.mat) return

      this.isAnimating = true
      this.mat.uniforms.dispFactor.value = 0

      this.currentImage = this.nextImage
      this.nextImage = this.currentImage + 1
      if (this.nextImage >= this.textures.length) this.nextImage = 0
      this.mat.uniforms.texture1.value = this.textures[this.currentImage]
      this.mat.uniforms.texture2.value = this.textures[this.nextImage]
      this.transitionIn()
    },
    loadTextures() {
      this.images.forEach((image, index) => {
        let textureLoaded = this.insertImage(image, index)
        this.imagesLoaded.push(textureLoaded)
      })

      const loader = new TextureLoader()
      this.disp = loader.load(this.displacement, this.render)
      this.disp.wrapS = RepeatWrapping
      this.disp.wrapT = RepeatWrapping
    },
    initShaderMaterial() {
      const ratio = {
        width: this.preserveAspectRatio
          ? this.slider.offsetWidth
          : this.textures[this.currentImage].image.naturalWidth,
        height: this.preserveAspectRatio
          ? this.slider.offsetHeight
          : this.textures[this.currentImage].image.naturalHeight,
      }
      this.mat = new ShaderMaterial({
        uniforms: {
          intensity1: { type: 'f', value: this.intensity },
          intensity2: { type: 'f', value: this.intensity },
          dispFactor: { type: 'f', value: 0.0 },
          angle1: { type: 'f', value: this.angle },
          angle2: { type: 'f', value: -Math.PI + this.angle },
          texture1: { type: 't', value: this.textures[this.currentImage] },
          texture2: { type: 't', value: this.textures[this.nextImage] },
          disp: { type: 't', value: this.disp },
          resolution: {
            type: 'v2',
            value: new Vector2(ratio.width, ratio.height),
          },
          imageResolution: {
            type: 'v2',
            value: new Vector2(
              this.textures[this.currentImage].image.naturalWidth,
              this.textures[this.currentImage].image.naturalHeight
            ),
          },
          sliderResolution: {
            type: 'v2',
            value: new Vector2(
              this.slider.offsetWidth,
              this.slider.offsetHeight
            ),
          },
          u_rgbPosition: {
            type: 'v2',
            value: new Vector2(window.innerWidth / 2, window.innerHeight / 2),
          },
          u_rgbVelocity: {
            type: 'v2',
            value: new Vector2(1, 1),
          },
        },

        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        opacity: 1.0,
      })

      const geometry = new PlaneBufferGeometry(
        this.slider.offsetWidth,
        this.slider.offsetHeight,
        1
      )
      const object = new Mesh(geometry, this.mat)
      this.scene.add(object)
    },
    init() {
      this.initScene()

      this.loadTextures()
      Promise.all(this.imagesLoaded).then(() => {
        this.initShaderMaterial()
        this.$emit('loaded')
        this.render()
      })
    },
    onResize() {
      const ratio = {
        width: this.preserveAspectRatio
          ? this.slider.offsetWidth
          : this.textures[this.currentImage].image.naturalWidth,
        height: this.preserveAspectRatio
          ? this.slider.offsetHeight
          : this.textures[this.currentImage].image.naturalHeight,
      }
      this.renderer.setSize(this.slider.offsetWidth, this.slider.offsetHeight)
      this.camera.aspect = this.slider.innerWidth / this.slider.innerHeight
      this.camera.updateProjectionMatrix()
      this.mat.uniforms.resolution.value.set(ratio.width, ratio.height)
      this.mat.uniforms.sliderResolution.value.set(
        this.slider.offsetWidth,
        this.slider.offsetHeight
      )
      this.render()
    },
    play() {
      if (this.currentTransition) {
        this.currentTransition.play()
      }
    },
    pause() {
      if (this.currentTransition) {
        this.currentTransition.pause()
      }
    },
    insertImage(path, index = this.textures.length) {
      const loader = new TextureLoader()
      loader.setCrossOrigin('')
      return new Promise(resolve => {
        let texture = loader.load(path, () => {
          this.render()
          resolve()
        })
        texture.magFilter = LinearFilter
        texture.minFilter = LinearFilter
        this.textures.splice(index, 0, texture)
      })
    },
    removeImage(index) {
      if (index !== this.currentImage) {
        this.textures.splice(index, 1)
      }
    },
    goTo(index) {
      if (index >= 0 && index < this.textures.length) {
        this.next(index)
      }
    },
    animate() {
      this.rafID = requestAnimationFrame(this.animate)
      this.render()
    },
    onMouseMove(e) {
      if (this.isInteractive && this.mat) {
        const sliderPosition = this.$refs.slider.getBoundingClientRect()

        this.position = {
          x: e.clientX - sliderPosition.left,
          y: e.clientY - sliderPosition.top,
        }

        this.mat.uniforms.u_rgbPosition.value = new Vector2(
          this.position.x,
          this.position.y
        )
        this.mat.uniforms.u_rgbVelocity.value = new Vector2(
          this.interactionVelocity.x,
          this.interactionVelocity.y
        )
      }
    },
  },
  mounted() {
    this.init()

    window.addEventListener('resize', this.onResize)
    window.addEventListener('mousemove', this.onMouseMove)

    this.animate()
  },
  beforeDestroy() {
    cancelAnimationFrame(this.rafID)
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('mousemove', this.onMouseMove)
  },
}
</script>

<style>
.shader-slide {
  width: 100%;
  height: 100%;
}
</style>
