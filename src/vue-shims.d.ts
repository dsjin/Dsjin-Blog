declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

import vue from "vue"
declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    metaInfo?: any
  }
}

declare module "vue/types/vue" {
  interface Vue {
    $inViewPort: (element: Element) => Boolean
  }
}
