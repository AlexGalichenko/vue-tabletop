<template>
  <div
    :style="style"
    :class="objectClass"
    @click.right.prevent="showContextMenu"
  />
</template>

<script>
import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';

export default {
  mixins: [
    Draggable,
    HasContextMenu
  ],
  props: {
    object: Object
  },
  computed: {
    style() {
      return this.object.isFlipped ? this.backStyle : this.frontStyle;
    },

    objectClass() {
      const dragged = this.object.isDragged ? `dragged` : ''
      return `tile ${dragged}`
    },

    frontStyle() {
      return {
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'background-image': `url(${this.object.frontUrl})`,
        'background-size': `100% 100%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px) translateZ(0)`,
      };
    },

    backStyle() {
      return {
        'will-change': 'transform',
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'background-image': `url(${this.object.backUrl})`,
        'background-size': `100% 100%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px) translateZ(0)`
      }
    }
  }
};
</script>

<style scoped>
  .dragged {
    opacity: 50%;
  }
</style>