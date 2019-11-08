<template>
  <div class="member" :class="index % 2 ? 'right' : 'left'">
    <div
      class="picture"
      :style="{
        'background-image': `url(${member.picture.sizes.large})`,
      }"
    ></div>
    <div class="infos">
      <h2 class="name">
        <span>{{ member.forename }}</span
        ><br /><span>{{ member.name }}</span>
      </h2>
      <p class="bio" v-html="member.bio"></p>
      <a
        class="website"
        :href="member.website"
        target="_blank"
        v-if="member.website"
        >{{ member.website.split('//')[1] }}</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    member: Object,
    index: Number,
  },
}
</script>

<style scoped lang="scss">
@import '../assets/_variables';

.member {
  position: relative;
  display: flex;
  align-self: flex-start;
  width: 100%;
  padding: 30px;
  text-align: right;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  &::after {
    content: '';
    position: absolute;
    display: block;
    background: $darker-grey-transparent;
    width: 80%;
    height: 1px;
    margin: 40px auto 5px;
    bottom: 0;
  }
  &.right {
    flex-direction: row-reverse;
    align-self: flex-end;
    text-align: left;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  .infos,
  .picture {
    padding: 10px;
  }
  .infos {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    @media (max-width: 768px) {
      flex: 1;
    }
    .bio {
      max-width: 700px;
    }
  }
  &.right {
    .infos {
      align-items: flex-start;
    }
  }
  .picture {
    flex: 1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 350px;
    max-width: 400px;
    margin: auto 30px;
    @media (max-width: 768px) {
      flex: unset;
      margin: 0;
    }
  }
}
</style>
