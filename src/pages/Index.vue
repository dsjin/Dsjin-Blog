<template>
  <Layout>
    <div class="c-header">
      <div class="container">
        <h1>Blog</h1>
        <p>Share more, Learn more!</p>
      </div>
    </div>
    <div class="container">
      <template v-if="$page.featurePost.edges.length !== 0">
        <feature-article-card :info="$page.featurePost.edges[0].node" />
      </template>
      <div
        class="latest_title _flex _row _justify_content_between _align_items_center"
      >
        <h1>New Arrviral</h1>
        <a
          href="/latest-posts"
          class="more-button btn btn-primary _display_inline_block"
        >
          MORE POSTS
        </a>
      </div>
      <div class="_flex _row _wrap _justify_content_between">
        <template v-for="(item, index) in $page.posts.edges">
          <article-card :key="index" :info="item.node" />
        </template>
      </div>
    </div>
  </Layout>
</template>

<page-query>
{
  featurePost: allGhostPost(
      sortBy: "published_at",
      order: DESC,
      limit: 1,
      filter: {
        featured: {eq: true}
      }
  ) {
    edges {
      node {
        title
        description: excerpt
        date: published_at (format: "'YY/MM/DD")
        slug
        tags {
          name
        }
        id
        coverImage: feature_image
        featured
        authors {
          name
          profile_image
        }
      }
    }
  },
  posts: allGhostPost(
      sortBy: "published_at",
      order: DESC,
      limit: 6
  ) {
    edges {
      node {
        title
        description: excerpt
        date: published_at (format: "'YY/MM/DD")
        slug
        id
        coverImage: feature_image
        featured
        tags {
          name
        }
        authors {
          name
          profile_image
        }
      }
    }
  }
}
</page-query>

<script lang="ts">
import ArticleCard from '../components/ArticleCard.vue'
import Vue from 'vue'
export default Vue.extend({
  metaInfo: {
    title: 'Home',
  },
  components: {
    ArticleCard,
  },
})
</script>

<style lang="scss">
.latest_title {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: white;
}
.btn {
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 15px;
  font-size: 0.75em;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
  text-decoration: transparent;
  &-primary {
    background-color: #122140;
    color: white;
    &:hover {
      background-color: #1b435f;
    }
  }
}
.home-links a {
  margin-right: 1rem;
}
.c-header {
  position: relative;
  height: 300px;
  width: 100%;
  background-color: #112d32;
  margin-top: -10px;
  color: white;
  overflow: hidden;
  h1,
  p {
    margin: 0;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-image: url('/bg.svg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
