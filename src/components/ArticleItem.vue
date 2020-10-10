<template>
  <div class="_flex article-item">
    <div class="img-section">
      <g-image
        :src="info.coverImage ? info.coverImage : '/default.png'"
        loading="lazy"
      />
    </div>
    <div class="_flex _column _justify_content_around info-section">
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
  name: 'FeatureArticleCard',
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style lang="scss">
.article-item {
  position: relative;
  min-height: 300px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #3d585d;
  flex-direction: row;
  margin-bottom: 1em;
  & .info-section {
    width: 70%;
    background-color: #3d585d;
    padding: 5px;
    color: white;
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
      height: calc(1.4em * 3);
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      margin-top: 1em;
      font-weight: 300;
    }
    & .badge-container {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      font-weight: 300;
    }
    & .author {
      font-weight: 300;
      margin-left: 0.5em;
      margin-right: 0.5em;
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
        img {
          width: 100%;
        }
      }
    }
  }
  & .img-section {
    width: 30%;
    background-color: white;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
@media (max-width: 768px) {
  .article-item {
    flex-direction: column;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & .info-section {
      width: calc(100% - 2em);
      padding: 1em;
    }
    & .img-section {
      width: 100%;
      height: 200px;
    }
    & .author {
      margin-top: 1em;
    }
  }
}
.cm {
  margin: 0;
}
</style>
