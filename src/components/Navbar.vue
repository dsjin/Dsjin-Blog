<template>
  <nav class="nav">
    <div class="nav-container">
      <div class="nav-band_logo">
        {{ $static.metadata.siteName }}
      </div>
      <div class="nav-menu">
        <template v-for="(item, key) in navItem">
          <a :key="key" :href="item.link" class="nav-menu_item">
            {{item.title}}
          </a>
        </template>
      </div>
    </div>
  </nav>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script lang="ts">
import Vue from 'vue'
interface Link{
  title: String,
  link: String
}
interface Menu{
  home: Link,
  aboutMe: Link
}
interface Data{
  navItem: Menu
}
export default Vue.extend({
  name: 'Navbar',
  data () : Data{
    return {
      navItem: {
        home: {
          title: 'Home',
          link: '/'
        },
        aboutMe: {
          title: 'About me',
          link: '#'
        }
      }
    }
  }
})
</script>

<style scoped>
.nav{
  position: relative;
  display: flex;
  justify-content: center;
  right: 0;
  left: 0;
  height: 3.25rem;
  background: #112D32;
  color: rgb(202, 220, 223);
  z-index: 20;
  /* box-shadow: 0 1px 1px rgba(0,0,0,0.15), 
              0 2px 2px rgba(0,0,0,0.15), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.15); */
}
.nav-container{
  display: flex;
  justify-content: space-between;
  height: 100%;
  max-width: 1080px;
  width: 100%
}

@media (max-width: 768px) { 
  .nav-container {
    padding-left: 10px;
    padding-right: 10px;
  }
}

.nav-band_logo{
  display: flex;
  align-items: center
}
.nav-menu{
  display: flex;
  align-items: center
}
.nav-menu_item {
  text-decoration: none;
  color: inherit
}
.nav-menu_item:not(:last-child){
  margin-right: 20px;
}
.nav-menu{
  display: flex
}
</style>