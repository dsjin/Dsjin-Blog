<template>
  <footer class="footer _flex _column _justify_content_end">
    <div class="container _flex _column _justify_content_center inner">
      <p>
        Made With 💗 By DSJIN © 2020 | icons by
        <a href="https://icons8.com/">icons8</a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Footer',
})
</script>

<style lang="scss">
.footer {
  width: 100%;
  height: 40vh;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url('/footer-bg.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }
  a {
    color: white;
  }
  & .inner {
    height: 40%;
    width: calc(100% - 2em);
    color: white;
    font-weight: 300;
    p {
      z-index: 1;
    }
  }
  // @media (max-width: 768px) {
  //   & .container {
  //     width: calc(100% - 20px);
  //   }
  // }
}
</style>
