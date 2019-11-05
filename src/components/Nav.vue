<template>
  <div class="nav">
    <div class="menu-icon" @click="showMenu">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="nav--list">
      <router-link to="/">ACCUEIL</router-link>
      <router-link to="/projects">PROJETS</router-link>
      <!-- <router-link to="/collaborations">COLLABORATIONS</router-link> -->
      <router-link to="/members">MEMBRES</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showMenu: () => {
      const icon = document.querySelector('.menu-icon')
      const bars = document.querySelectorAll('.menu-icon span')
      const menu = document.querySelector('.nav--list')
      const navBar = document.querySelector('.nav')
      navBar.classList.toggle('white')
      menu.classList.toggle('showing')
      icon.classList.toggle('fixed')
      Array.from(bars).forEach(b => b.classList.toggle('open'))
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';
// general styling
.nav {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  background-color: $darker-grey;
  height: 100vh;
  .menu-icon {
    position: fixed;
    z-index: 2;
    display: block;
    width: 36px;
    height: 28px;
    margin: 30px 30px 0 -30px;
    span {
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      background: $darker-grey;
      border-radius: 2px;
      left: 0;
      transform-origin: right center;
      @include short-transition(0.1s);
      &.open {
        background-color: $bg;
      }
      &:nth-child(1) {
        top: 0px;
        &.open {
          transform: rotate(-45deg);
          left: 6px;
        }
      }
      &:nth-child(2) {
        width: 75%;
        right: 0;
        left: unset;
        top: 12px;
        &.open {
          width: 0%;
          opacity: 0;
        }
      }
      &:nth-child(3) {
        top: 25px;
        &.open {
          transform: rotate(45deg);
          top: 25px;
          left: 6px;
        }
      }
    }
  }
  .nav--list {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    padding: 20vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    background-color: $darker-grey;
    visibility: hidden;
    opacity: 0;
    @include long-transition;
    a {
      line-height: 0.8;
      font-size: 3em;
      text-decoration: none;
      color: #ffffff;
      opacity: 0;
      transform: translateX(-20px);
      @include short-transition;
      &.router-link-exact-active {
        text-decoration: line-through;
      }
      @media (max-width: 768px) {
        font-size: 2em;
      }
    }
    &.showing {
      visibility: visible;
      opacity: 1;
      a {
        opacity: 1;
        transform: translateX(0);
        &:nth-child(1) {
          @include short-transition(0.2s);
        }
        &:nth-child(2) {
          @include short-transition(0.3s);
        }
        &:nth-child(3) {
          @include short-transition(0.4s);
        }
        &:nth-child(4) {
          @include short-transition(0.5s);
        }
      }
    }
  }
}
</style>
