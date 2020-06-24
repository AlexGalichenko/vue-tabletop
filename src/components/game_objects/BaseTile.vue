<template>
  <div
    :style="style"
    :class="objectClass"
    @click.right.prevent="showContextMenu"
    @mousedown.alt.prevent.exact="showPreview"
    @mouseup.prevent="hidePreview"
  />
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

    objectClass() {
      return {
        'tile': true,
        'dragged': this.object.isDragged,
        'pinned': this.object.pinned
      }
    },

    frontStyle() {
      return tableFrontTileStyle(this.object)
    },

    backStyle() {
      return tableBackTileStyle(this.object)
    }
  },
  methods: {
    showContextMenu() {},
    showPreview() {},
    hidePreview() {}
  }
};
</script>

<style scoped>
</style>