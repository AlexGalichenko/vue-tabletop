<template>
  <div 
    :class="objectClass" :style="style"
    @click.right.prevent="showContextMenu"
  >
    <div @click="decreaseCount" class="minus">-</div>
    <div class="value">{{object.count}}</div>
    <div @click="increaseCount" class="plus">+</div>
  </div>
</template>

<script>
import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';

export default {
  props: {
    object: Object
  },
  mixins: [
    Draggable,
    HasContextMenu
  ],
  computed: {
    objectClass() {
      return {
        'counter': true,
        'dragged': this.object.isDragged,
        'pinned': this.object.pinned
      }
    },

    style() {
      return {
        'will-change': 'transform',
        'transform': `translate(${this.object.x}px, ${this.object.y}px) translateZ(0)`
      }
    },
  },
  methods: {
    increaseCount() {
      this.$store.dispatch('increaseCount', this.object.id);
    },
    decreaseCount() {
      this.$store.dispatch('decreaseCount', this.object.id);
    }
  }
};
</script>

<style scoped>
  .counter {
    background-color: gray;
    width: 151px;
    height: 51px;
    border-radius: 25px;
    font-size: 20px;
    border: black solid 1px;
  }
  .counter .value,
  .counter .minus,
  .counter .plus {
    display: table-cell;
    position: relative;
    text-align: center;
    vertical-align: middle;
    height: 49px;
    width: 49px;
  }
  .counter .minus,
  .counter .plus {
    cursor: pointer;
  }
  .counter .minus:hover,
  .counter .plus:hover {
    background-color: dimgray;
  }
  .counter .minus {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  .counter .plus {
    border-bottom-right-radius: 25px;
    border-top-right-radius: 25px;
  }
</style>