<template>
  <Layout>
    <nav-fixed :title="$page.post.title" />
    <div
      class="post-header"
      :style="`background-image:url(${
        $page.post.feature_image ? $page.post.feature_image : '/bg-white.svg'
      })`"
    >
      <div class="container">
        <div class="post-header-inner _flex _column _justify_content_end">
          <h1>
            {{ $page.post.title }}
          </h1>
          <div class="_flex badge-container">
            <badge
              v-for="(item, index) in $page.post.tags"
              :key="index"
              class="mr-1"
            >
              {{ item.name }}
            </badge>
          </div>
          <div class="_flex author">
            <div class="img">
              <template v-if="$page.post.authors[0].profile_image">
                <g-image :src="$page.post.authors[0].profile_image" />
              </template>
            </div>
            <div class="_flex _column">
              <p class="cm">{{ $page.post.authors[0].name }}</p>
              <p class="cm date">{{ $page.post.date }}</p>
            </div>
          </div>
          <div id="expand-arrow" class="_flex _justify_content_center mt-1">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAA20lEQVRoge3XOQ7CMBRF0WyCCPa/E6iYGlywnEuBXWChj5N4FO9KkVLE9j9ylWlSSimllFLqbwOOwA2YW88SB8zAHTilfHzhnesJ4xHOz3ZOWbADHn7BEzhUmHPpTPu1C5thViOMDapjNiOMjaphsiGMDYtjsiOMjYthiiGMA7JjiiOMg7JhqiGMAzdjqiOMg1djmiGMARZjmiOMQZIx3SCMgX5iukOElmC6RYRSMN0jQhZmGEToG2Y4RIjPvzkXvXfz15lUdAtj3UScv5mrf8a6CaWUUkoppbrtBWnjz9Xa11cNAAAAAElFTkSuQmCC"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="post-content container">
      <div v-html="content" />
    </div>
    <template v-if="relatedPost && relatedPost.edges.length > 0">
      <div class="post-related mt-5 container">
        <div class="_flex _align_items_center mb-1">
          <h2 class="mt-0 mb-0">More In</h2>
          <badge color="#112D32" dark class="ml-1">{{
            $page.post.tags[0].name
          }}</badge>
        </div>
        <div class="_flex _row _wrap">
          <template v-for="(item, index) in relatedPost.edges">
            <related-card :key="index" :info="item.node" />
          </template>
        </div>
      </div>
    </template>
    <div class="container _flex _column _align_items_center">
      <span
        class="mb-1"
      >
        Share on :
      </span>
      <div class="_flex">
        <share-network
          network="facebook"
          :url="postUrl"
          :title="$page.post.meta_title"
          :description="$page.post.meta_description"
          class="mr-1"
        >
          Facebook
        </share-network>
        <share-network
          network="twitter"
          :url="postUrl"
          :title="$page.post.meta_title"
          :description="$page.post.meta_description"
        >
          Twitter
        </share-network>
      </div>
    </div>
    <div class="container mt-2">
      <disqus :shortname="shortName" :identifier="$page.post.path" />
    </div>
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
  post: ghostPost (path: $path) {
    id
    title
    feature_image
    content: html
    authors {
      name
      profile_image
    }
    meta_title
    meta_description
    date: published_at (format: "'YY/MM/DD")
    date_full_format: published_at
    tags {
      name
      slug
    }
    path
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteUrl
  }
}
</static-query>

<script lang="ts">
import Vue from 'vue'
import Layout from '../layouts/Default.vue'
import RelatedCard from '../components/RelatedCard.vue'
import Badge from '../components/Badge.vue'
import NavFixed from '../components/NavbarFixed.vue'
interface Data {
  relatedPost: null
  content: String
}
export default Vue.extend({
  name: 'Post',
  components: {
    RelatedCard,
    Badge,
    NavFixed,
  },
  data(): Data {
    return {
      relatedPost: null,
      content: '',
    }
  },
  computed: {
    postUrl(): String {
      let siteUrl = (this as any).$static.metadata.siteUrl
      let postPath = (this as any).$page.post.path
      return `${siteUrl}${postPath}`
    },
    shortName(): String {
      return process.env.GRIDSOME_DISQUS_SHORTNAME
        ? process.env.GRIDSOME_DISQUS_SHORTNAME
        : ''
    },
  },
  watch: {
    async '$page.post'() {
      this.initHtml()
      await this.initReleatedPost()
    },
  },
  async mounted() {
    await this.initHtml()
    await this.initReleatedPost()
    this.$nextTick(() => {
      ;(this as any).$prismjs.highlightAll()
    })
  },
  methods: {
    initHtml() {
      function createElementFromHTML(htmlString: string) {
        var div = document.createElement('div')
        div.innerHTML = htmlString.trim()
        return div
      }
      const htmlDom = createElementFromHTML((this as any).$page.post.content)
      htmlDom.querySelectorAll('img').forEach((imageEl: HTMLImageElement) => {
        if (!imageEl.getAttribute('loading')) {
          imageEl.setAttribute('loading', 'lazy')
        }
        if (!imageEl.getAttribute('width')) {
          imageEl.setAttribute('width', '100%')
        }
        if (!imageEl.getAttribute('height')) {
          imageEl.setAttribute('height', '100%')
        }
      })
      this.content = htmlDom.outerHTML
      this.$nextTick(() => {
        ;(this as any).$prismjs.highlightAll()
      })
    },
    async initReleatedPost() {
      try {
        const {
          data: { relatedPost },
        } = await (this as any).$fetch(
          `/tag/${(this as any).$page.post.tags[0].slug}`
        )
        this.relatedPost = { ...relatedPost }
        ;(this.relatedPost as any).edges = (this
          .relatedPost as any).edges.filter(
          (item: any) => item.node.id !== (this as any).$page.post.id
        )
        ;(this.relatedPost as any).edges = (this
          .relatedPost as any).edges.splice(0, 3)
      } catch (error) {
        console.log(error)
      }
    },
  },
  metaInfo() {
    return {
      title: (this as any).$page.post.title,
      meta: [
        { key: 'og:type', property: 'og:type', content: 'article' },
        {
          key: 'og:title',
          property: 'og:title',
          content: (this as any).$page.post.meta_title,
        },
        {
          key: 'description',
          name: 'description',
          content: (this as any).$page.post.meta_description,
        },
        {
          key: 'og:image',
          property: 'og:image',
          content: (this as any).$page.post.feature_image,
        },
        { key: 'og:url', property: 'og:url', content: this.postUrl },
        {
          key: 'article:published_time',
          property: 'article:published_time',
          content: (this as any).$page.post.date_full_format,
        },
      ],
    }
  },
})
</script>

<style lang="scss">
$facebook-color: #3b5998;
$twitter-color: #00acee;

@keyframes updown {
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}
hr {
  padding: 0;
  height: 1px;
  border: 0;
  width: 70%;
  border-top: 1px solid black;
}
.post-header {
  position: relative;
  z-index: 20;
  height: 30em;
  background-color: rgba(89, 113, 117, 0.6);
  color: white;
  padding-bottom: 2em;
  background-blend-mode: multiply;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  & #expand-arrow {
    display: none;
  }
  & .container {
    height: 100%;
  }
  & .badge-container {
    margin-bottom: 1.5rem;
  }
  & .post-header-inner {
    height: inherit;
    & .author {
      & .img {
        width: 50px;
        height: 50px;
        background-color: antiquewhite;
        border-radius: 60px;
        margin-right: 0.5em;
        overflow: hidden;
        & img {
          width: 100%;
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .post-header {
    height: calc(100vh - 4.8rem);
    padding: 10px;
    padding-bottom: 20px;
    & #expand-arrow {
      display: flex;
      img {
        transition: ease-in-out;
        animation: updown 2s infinite;
      }
    }
    .container {
      margin: 0;
    }
    & .post-header-inner {
      h1 {
        font-size: 2em;
      }
      & .badge-container {
        margin-bottom: 1.5rem;
      }
      & .author {
        p {
          font-size: 1em;
        }
        & .img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
}
.kg-card {
  border: 1px solid #112d3267;
  border-radius: 10px;
  overflow: hidden;
}
.post-content {
  img {
    width: 100%;
    height: 100%;
  }
  figure {
    margin: 0.8em 0 2.3em;
    figcaption {
      text-align: center;
    }
    &.kg-image-card {
      figcaption {
        margin-top: .5em;
        margin-bottom: .5em;
      }
    }
    .kg-gallery-container {
      display: flex;
      flex-direction: column;
      .kg-gallery-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .kg-gallery-image:not(:first-of-type) {
          margin: 0 0 0 0.75em;
        }
      }
    }
  }
}
@mixin share-network {
  padding: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 10px;
  cursor: pointer;
}
.share-network {
  &-facebook {
    @include share-network;
    background-color: $facebook-color;
    color: white
  }
  &-twitter {
    @include share-network;
    background-color: $twitter-color;
    color: white
  }
}
table {
  width: 100%;
  td, th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #112d32;
    color: white;
  }
}
</style>
