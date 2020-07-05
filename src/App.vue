<template>
    <router-view />
</template>

<script>
export default {
  components: {}
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
}
.draggable {
  position: absolute;
  touch-action: none;
  will-change: transform, opacity;
}
.dragged {
  opacity: 50%;
  z-index: 1500 !important;
}
</style>