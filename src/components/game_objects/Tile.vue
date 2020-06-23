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
import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';
import HasPreview from '../mixins/HasPreview.js';
import { frontTileStyle, backTileStyle } from '../utils/styles.js';

export default {
  mixins: [
    Draggable,
    HasContextMenu,
    HasPreview
  ],
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
      return frontTileStyle(this.object)
    },

    backStyle() {
      return backTileStyle(this.object)
    }
  }
};
</script>

<style scoped>
  .dragged {
    opacity: 50%;
  }
</style>