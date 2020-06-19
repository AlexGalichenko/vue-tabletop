<template>
  <div :style="style" class="card"/>
</template>

<script>
import interact from "interactjs";

export default {
  props: {
    object: Object
  },
  computed: {
    style() {
      return this.object.isFlipped ? this.backStyle : this.frontStyle
    },

    frontStyle() {
      return {
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'background-image': `url(${this.object.frontUrl})`,
        'background-size': `${this.object.columns * 100}% ${this.object.rows * 100}%`,
        'background-position': `${((this.object.column - 1) / (this.object.columns - 1)) * 100}% ${((this.object.row - 1) / (this.object.rows - 1)) * 100}%`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px)`
      }
    },

    backStyle() {
      return {}
    }
  },
  mounted() {
    interact(this.$refs.interactElement).draggable({
      ignoreFrom: ".pinned",
      inertia: {
        resistance: 60
      },
      restrict: {
        restriction: "parent",
        endOnly: false,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      listeners: {
        move: function(event) {
          console.log(event);
          // self.
        }
      }
    });
  }
};
</script>

<style scoped>
</style>