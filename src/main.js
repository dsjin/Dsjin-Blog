// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '@/layouts/Default'
import FeatureArticleCard from '@/components/FeatureArticleCard'
import Badge from '@/components/Badge'
import Prism from 'prismjs'
import config from '../gridsome.config'
import { Pager } from 'gridsome'
import VueDisqus from 'vue-disqus'

export default function (Vue, { router, head, isClient}) {
  // OG Meta Default Setting
  let copyRightNotice = `\u00a9 ${
    config.author
  }, ${new Date().getFullYear()}. All rights reserved`
  head.meta.push(
    {
        key: 'keywords',
        name: 'keywords',
        content: config.keywords.join(', ')
    },
    {
      name: 'author',
      content: config.author
    },
    {
      key: 'description',
      name: 'description',
      content: config.siteDescription
    },
    { name: 'copyright', content: copyRightNotice },
    { key:"og:type",  property: "og:type", content: 'article' },
    { key:"og:description",  property: "og:description", content: config.siteDescription },
    // { key:"og:image", property: "og:image", content: '' },
    { property: "og:site_name", content: config.siteName }
  );
  // Set default layout as a global component
  Vue.use(VueDisqus)
  Vue.component('Layout', DefaultLayout)
  Vue.component('FeatureArticleCard', FeatureArticleCard)
  Vue.component('Badge', Badge)
  Vue.component('Pager', Pager)
  Vue.prototype.$prismjs = Prism
  Vue.prototype.$inViewPort = (element) => {
    var bb = element.getBoundingClientRect()
    return !(bb.top > innerHeight || bb.bottom < 0)
  }
}
