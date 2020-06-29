<template>
  <div 
    :class="objectClass" :style="style"
    @click.right.prevent="showContextMenu"
  >
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
        'chip': true,
        'dragged': this.object.isDragged,
        'pinned': this.object.pinned
      }
    },

    style() {
      return {}
    }
  },
  methods: {
    showContextMenu() {}
  }
};
</script>

<style scoped>
</style>