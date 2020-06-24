<template>
  <div :style="style" :class="objectClass" @click.right.prevent="showContextMenu">
    <div class="count">{{count}}</div>
  </div>
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
        'container': true,
        'dragged': this.object.isDragged,
        'pinned': this.object.pinned
      }
    },

    count() {
      return this.object.infinite ? '\u221E' : this.object.objects.length
    }
  },
  methods: {
    showContextMenu() {}
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