<template>
  <div class="nav-fixed" :class="{ 'nav-fixed-show': showDetail }">
    <div class="nav-fixed-content">
      <div class="nav-band_logo">
        {{ $static.metadata.siteName }}
      </div>
      <div class="nav-title">
        {{ title }}
      </div>
      <div class="nav-to-top">
        <a href="#" class="nav-to-top_text" @click.prevent="toTop"> To Top </a>
        <a href="#" class="nav-to-top_icon" @click.prevent="toTop">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABJUlEQVRIic2VwUoCQRyHv9/oQQmJXqAN9hW8+ib2FAUe7G3qDQyqm5CHiurQMdDaJ5BOetD5d6g1s90ll1nwu80wfN/AzDBQMdqceByP92f1uisjay4Wvh3HH5mB+8mkI68L4LCMPMUgqcl323E8AljtNIQcQBB5c+fp2AHcJslBCPkaR9/Or0BzPq8FlLPuLHWY27BbAUNnoNNKAgY9h4ZCdwa9oAGZ+kIjw1+Z/I0zHsx0EiQgU9/EEOwaaGHsmePSYc//iRQG/shTtojkBnLlGxFhT0WRzIBB4t3yJVe+FkEMcMtXgyRrST1z9xBhbpAr/k1LBWt366HtbmDWaCxDi1OnA+hE0TTvFpRCvHWiaLoKANTku4Ei7zJ3/NPaIPSnXzmfIPV7/c9EyXEAAAAASUVORK5CYII="
          />
        </a>
      </div>
    </div>
  </div>
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
interface Link {
  title: String
  link: String
}
interface Menu {
  home: Link
  aboutMe: Link
}
interface Data {
  navItem: Menu
  showDetail: Boolean
  observer: any
}
export default Vue.extend({
  name: 'NavbarFixed',
  props: {
    title: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data(): Data {
    return {
      navItem: {
        home: {
          title: 'Home',
          link: '/',
        },
        aboutMe: {
          title: 'About me',
          link: '#',
        },
      },
      showDetail: false,
      observer: null,
    }
  },
  mounted() {
    // document.addEventListener('scroll', event => {
    //   const el = document.querySelector(".post-header")
    //   this.$nextTick(()=>{
    //     if (el) {
    //       this.showDetail = !this.$inViewPort(el)
    //     }
    //   })
    // })
    console.log('yass')
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          this.showDetail = !entry.isIntersecting
        })
      },
      { threshold: [0, 1] }
    )
    this.$nextTick(() => {
      const el = document.querySelector('.post-header')
      if (el) {
        this.observer.observe(el)
      }
    })
  },
  methods: {
    toTop() {
      const body = document.querySelector('body')
      this.$nextTick(() => {
        if (body) {
          body.scrollIntoView({
            behavior: 'smooth',
          })
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.nav-fixed {
  display: flex;
  position: fixed;
  justify-content: center;
  top: 0;
  right: 0;
  left: 0;
  height: 3.25rem;
  background: #112d32;
  color: rgb(202, 220, 223);
  z-index: 10;
  padding-right: 1em;
  padding-left: 1em;
  .nav-fixed-content {
    transition: ease-in-out 0.5s;
    opacity: 0;
    display: flex;
    height: 100%;
    max-width: 1080px;
    width: 100%;
    overflow: hidden;
    .nav-band_logo {
      display: flex;
      align-items: center;
    }
    .nav-title {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
      transform: translateY(-100px);
      margin-left: 1em;
      margin-right: 1em;
      overflow-y: scroll;
    }
    .nav-to-top {
      line-height: 1;
      height: 100%;
      min-width: 4em;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &_icon {
        display: none;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }
  /* box-shadow: 0 1px 1px rgba(0,0,0,0.15), 
              0 2px 2px rgba(0,0,0,0.15), 
              0 4px 4px rgba(0,0,0,0.15), 
              0 8px 8px rgba(0,0,0,0.15); */
}
.nav-fixed-show {
  .nav-fixed-content {
    opacity: 1;
  }
  .nav-title {
    transform: translateY(0) !important;
  }
}
@media (max-width: 768px) {
  .nav-to-top {
    &_text {
      display: none !important;
    }
    &_icon {
      display: block !important;
    }
  }
}
</style>
