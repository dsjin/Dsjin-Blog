<template>
  <div
    class="related-card"
  >
    <div class="img-section">
      <g-image
        :src="info.coverImage ? info.coverImage : '/default.png'"
        loading="lazy"
      />
    </div>
    <div class="info-section">
      <a :href="`/post/${info.slug}`" class="title">
        {{ info.title }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'ArticleCard',
  props: {
    info: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss">
  .related-card {
    width: calc(33.33% - 1em);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 1em;
    margin-right: 1em;
    color: white;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover
    }
    & .img-section {
      height: 200px;
    }
    & .info-section {
      padding: 1em;
      background-color: #3D585D;
      & .title {
        font-size: 1.2em;
        font-weight: 700;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        color: inherit;
        text-decoration: transparent;
      }
      & .badge{
        margin-left: 1em;
        margin-right: 1em;
        font-weight: 300;
      }
    }
  }
  @media (max-width: 768px) { 
    .related-card {
      width: 101%;
      margin-right: 0;
    }
  }
</style>