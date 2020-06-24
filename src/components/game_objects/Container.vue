<template>
  <div
    :style="style"
    :class="objectClass"
    @click.right.prevent="showContextMenu"
  >
  <div class="count">{{count}}</div>
  </div>
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
      return {
        'container': true,
        'dragged': this.object.isDragged,
        'pinned': this.object.pinned
      }
    },

    frontStyle() {
      return {
        'will-change': 'transform',
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'background-image': `url(${this.object.frontUrl})`,
        'background-size': `100% 100%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px)`,
        'z-index': this.object.z
      };
    },

    backStyle() {
      return {
        'will-change': 'transform',
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'background-image': `url(${this.object.frontUrl})`,
        'background-size': `100% 100%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px)`,
        'z-index': this.object.z
      };
    },

    count() {
      return this.object.infinite ? '\u221E' : this.object.objects.length
    }
  }
};
</script>

<style scoped>
  .count {
    width: 25px;
    height: 25px;
    top: 0;
    left: 0;
    background-color: gray;
  }
</style>