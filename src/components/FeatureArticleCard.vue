<template>
  <div class="_flex feature-card">
    <div class="_flex _column _justify_content_around info-section">
      <div
        v-for="(tag, index) in info.tags"
        :key="index"
        class="_flex _wrap badge-container"
      >
        <badge class="mt-1">
          {{ tag.name }}
        </badge>
      </div>
      <div class="mt-2">
        <h1 class="title">
          <a :href="`/post/${info.slug}`">
            {{ info.title }}
          </a>
        </h1>
        <div class="article-content">
          {{ info.description }}
        </div>
      </div>
      <div class="_flex author mt-2">
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
    <div class="img-section">
      <g-image :src="info.coverImage ? info.coverImage : '/default.png'" />
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
.feature-card {
  position: relative;
  min-height: 300px;
  width: 60%;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #3d585d;
  margin: 0 auto;
  margin-top: -200px;
  flex-direction: row;
  & .info-section {
    width: 45%;
    background-color: #3d585d;
    padding: 1em;
    color: white;
    & .title {
      a {
        text-decoration: none;
        color: inherit;
      }
      font-size: 1.2em;
      font-weight: 700;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      margin-top: 0;
      margin-bottom: 0;
    }
    & .article-content {
      font-size: 0.8em;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-height: 1.6em;
      max-height: calc(1.6em * 3);
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      margin-top: 1em;
      font-weight: 300;
    }
    & .badge-container {
      // margin-left: 0.5rem;
      // margin-right: 0.5rem;
      font-weight: 300;
      & .badge {
        margin-left: 0.3rem;
        margin-right: 0.3rem;
      }
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
        flex-shrink: 0;
        overflow: hidden;
        & img {
          width: 100%;
        }
      }
    }
  }
  & .img-section {
    width: 55%;
    background-color: white;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
@media (max-width: 768px) {
  .feature-card {
    flex-direction: column;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    & .info-section {
      width: calc(100% - 2em);
      order: 2;
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
