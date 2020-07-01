<template>
  <div 
    :class="objectClass" :style="style"
    @click.right.prevent="showContextMenu"
  >
    <div class="value">{{object.value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    object: Object
  },
  computed: {
    objectClass() {
      return {
        'dice': true,
        'dragged': this.object.isDragged,
        'pinned': this.object.pinned
      }
    },

    style() {
      return {}
    }
  }
};
</script>

<style scoped>
.dice {
  display: flex;
  width: 100px;
  height: 100px;
  border-radius: 25px;
  font-size: 20px;
  border: black solid 1px;
  justify-content: center;
  align-items: center;
}

.dice > .value {
  font-size: 45px;
}
</style>