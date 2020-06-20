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
      return this.object.isFlipped ? this.backStyle : this.frontStyle
    },

    objectClass() {
      const dragged = this.object.isDragged ? `dragged` : '';
      return `card ${dragged}`
    },

    frontStyle() {
      return {
        'will-change': 'transform',
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'background-image': `url(${this.object.frontUrl})`,
        'background-size': `${this.object.columns * 100}% ${this.object.rows * 100}%`,
        'background-position': `${((this.object.column - 1) / (this.object.columns - 1)) * 100}% ${((this.object.row - 1) / (this.object.rows - 1)) * 100}%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px)`
      }
    },

    backStyle() {
      return {
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'background-image': `url(${this.object.frontUrl})`,
        'background-size': `${this.object.columns * 100}% ${this.object.rows * 100}%`,
        'background-position': `${((this.object.column - 1) / (this.object.columns - 1)) * 100}% ${((this.object.row - 1) / (this.object.rows - 1)) * 100}%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px)`
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