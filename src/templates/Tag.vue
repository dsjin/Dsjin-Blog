<template>
  <Layout>
    <div class="container">
      <h1>{{ $context.name }}</h1>
      <div class="_flex _column">
        <template v-for="(item, index) in $page.relatedPost.edges">
          <article-posts :key="index" :info="item.node" />
        </template>
      </div>
      <Pager :info="$page.relatedPost.pageInfo" class="custom-pager" />
    </div>
  </Layout>
</template>

<page-query>
query Post ($id: ID, $page: Int) {
  relatedPost: allGhostPost(
    sortBy: "published_at",
    order: DESC,
    perPage: 5,
    filter: {
      tags: {contains: [$id]}
    },
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
          id
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
  name: 'Tag',
  components: {
    ArticlePosts,
  },
})
</script>

<style></style>
