<template>
  <Layout>
    <div class="container">
      <h1>Latest Posts</h1>
      <div class="_flex _column">
        <template v-for="(item, index) in $page.posts.edges">
          <article-posts :key="index" :info="item.node" />
        </template>
      </div>
      <Pager :info="$page.posts.pageInfo" class="custom-pager" />
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  posts: allGhostPost(
    sortBy: "published_at",
    order: DESC,
    perPage: 5,
    page: $page
  ) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        title
        description: excerpt
        date: published_at (format: "'YY/MM/DD'")
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
import Vue from 'vue'
import ArticlePosts from '../components/ArticleItem.vue'
export default Vue.extend({
  name: 'LatestPosts',
  components: {
    ArticlePosts
  },
  mounted () {
    console.log((this as any).$page.posts)
  },
  metaInfo: {
    title: 'LatestPosts'
  }
})
</script>

<style lang="scss">
</style>
