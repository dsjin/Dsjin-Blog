<template>
  <div
    class="badge"
    :style="{ backgroundColor: color, color: dark ? 'white' : 'black' }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Badge',
  props: {
    color: {
      type: String,
      default: 'white',
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss">
.badge {
  border-radius: 20px;
  padding: 0.5em 1em 0.5em 1em;
  width: fit-content;
  font-size: 0.5em;
}
</style>
