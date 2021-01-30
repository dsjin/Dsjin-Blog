<template>
  <div class="article-container _flex _column _wrap">
    <div class="article-card _flex _column">
      <div class="img-section">
        <g-image :src="info.coverImage ? info.coverImage : '/default.png'" />
      </div>
      <div class="info-section _flex _column">
        <div
          v-for="(tag, index) in info.tags"
          :key="index"
          class="_flex _wrap badge-container"
        >
          <badge class="mt-1">
            {{ tag.name }}
          </badge>
        </div>
        <div class="main-content mt-1">
          <h1 class="title">
            <a :href="`/post/${info.slug}`">
              {{ info.title }}
            </a>
          </h1>
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
.article-card {
  // width: calc(33.33% - 1em);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1em;
  color: white;
  height: 100%;
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
      a {
        text-decoration: none;
        color: inherit;
      }
    }
    & .main-content {
      flex-grow: 1
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
      min-height: calc(1.6em * 3);
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      margin-top: 1em;
      font-weight: 300;
    }
    & .badge {
      margin-left: 0.3em;
      margin-right: 0.3em;
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
        flex-shrink: 0;
      }
    }
  }
}
.article-container {
  flex: 0 0 100%
}
@media (min-width: 768px) {
  // .article-card {
  //   // width: 101%;
  //   // margin-right: 0;
  // }
  .article-container {
    flex: 0 0 calc(33.333333% - 1em)
  }
}
</style>
