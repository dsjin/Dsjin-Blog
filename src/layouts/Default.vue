<template>
  <div class="layout">
    <Navbar />
    <div class="content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import * as smoothscroll from 'smoothscroll-polyfill'

export default Vue.extend({
  components: {
    Navbar,
    Footer,
  },
  mounted () {
    smoothscroll.polyfill()
  }
})
</script>

<style lang="scss">
html {
  font-size: 18px;
}

body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.content {
  /* max-width: 1080px; */
  margin: 0 auto;
  /* padding-left: 20px; */
  /* padding-right: 20px; */
  /* padding-top: 3.8rem; */
  min-height: calc(100vh - 3.25rem - 300px);
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 1em;
}

// @media (max-width: 768px) {
//   .container {
//     margin: 10px;
//   }
// }

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}

._flex {
  display: flex;
  &._column {
    flex-direction: column;
  }
  &._row {
    flex-direction: row;
  }
  &._justify_content {
    &_center {
      justify-content: center;
    }
    &_between {
      justify-content: space-between;
    }
    &_around {
      justify-content: space-around;
    }
    &_end {
      justify-content: flex-end;
    }
  }
  &._align_items {
    &_center {
      align-items: center;
    }
    &_end {
      align-items: flex-end;
    }
  }
  &._wrap {
    flex-wrap: wrap;
  }
}
._display {
  &_inline_block {
    display: inline-block;
  }
}
.custom-pager {
  a {
    padding: 0.5em;
    color: white;
    background-color: #3d585d;
    margin-right: 0.25em;
    text-decoration: transparent;
    border-radius: 10px;
  }
  a.active {
    background-color: #112d32;
  }
}
</style>
