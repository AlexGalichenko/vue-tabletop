<template>
  <div :style="style" class="container" />
</template>

<script>
export default {
  props: {
    object: Object
  },
  computed: {
    style() {
      return this.object.isFlipped ? this.backStyle : this.frontStyle;
    },

    frontStyle() {
      return {
        height: `${this.object.height}px`,
        width: `${this.object.width}px`,
        "background-image": `url(${this.object.frontUrl})`,
        "background-size": `100% 100%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px)`
      };
    },

    backStyle() {
      return {};
    }
  }
};
</script>

<style scoped>
</style>