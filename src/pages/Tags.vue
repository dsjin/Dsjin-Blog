<template>
  <layout>
    <div class="container">
      <h1>All Tags</h1>
      <ul>
        <li v-for="(item, index) in $page.tags.edges" :key="index">
          <a :href="`/tag/${item.node.slug}`">
            {{ item.node.name }}
          </a>
        </li>
      </ul>
    </div>
  </layout>
</template>

<page-query>
{
  tags: allGhostTag {
    edges {
      node {
        id
        slug
        name
      }
    }
  }
}
</page-query>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Tag'
})
</script>

<style lang="scss" scoped>
  a {
    color: black
  }
</style>
