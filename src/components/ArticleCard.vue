<template>
  <div class="artical-card">
    <div class="img-section">
      <g-image :src="info.coverImage ? info.coverImage : '/default.png'" />
    </div>
    <div class="info-section">
      <div
        v-for="(tag, index) in info.tags"
        :key="index"
        class="_flex badge-container"
      >
        <badge class="mr-1">
          {{ tag.name }}
        </badge>
      </div>
      <div class="mt-1">
        <a :href="`/post/${info.slug}`" class="title">
          {{ info.title }}
        </a>
        <div class="article-content">
          {{ info.description }}
        </div>
      </div>
      <div class="_flex author">
        <div class="img">
          <template v-if="info.authors[0].profile_image">
            <g-image :src="info.authors[0].profile_image" />
          </template>
        </div>
        <div class="_flex _column">
          <p class="cm">{{ info.authors[0].name }}</p>
          <p class="cm date">{{ info.date }}</p>
        </div>
      </div>
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
      required: true,
    },
  },
})
</script>

<style lang="scss">
.artical-card {
  width: calc(33.33% - 1em);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1em;
  margin-right: 1em;
  color: white;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  & .img-section {
    height: 200px;
  }
  & .info-section {
    padding: 1em;
    background-color: #3d585d;
    height: 100%;
    & .title {
      font-size: 1.2em;
      font-weight: 700;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      text-decoration: none;
      color: inherit;
    }
    & .article-content {
      font-size: 0.8em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-height: 1.4em;
      max-height: calc(1.4em * 3);
      min-height: calc(1.4em * 3);
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      margin-top: 1em;
      font-weight: 300;
    }
    & .badge {
      margin-left: 1em;
      margin-right: 1em;
      font-weight: 300;
    }
    & .author {
      font-weight: 300;
      margin-left: 0.5em;
      margin-right: 0.5em;
      margin-top: 1em;
      & .date {
        font-size: 0.8em;
      }
      & .img {
        width: 50px;
        height: 50px;
        background-color: antiquewhite;
        border-radius: 60px;
        margin-right: 0.5em;
        overflow: hidden;
      }
    }
  }
}
@media (max-width: 768px) {
  .artical-card {
    width: 101%;
    margin-right: 0;
  }
}
</style>
