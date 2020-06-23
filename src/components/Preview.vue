<template>
  <div id="preview" v-if="showPreview">
    <component 
      :object="currentObject"
      :is="currentObject.type"
    />
  </div>
</template>

<script>
import Card from './game_objects/PreviewCard.vue';
import Tile from './game_objects/PreviewTile.vue';

export default {
  components: {
    Card,
    Tile
  },
  computed: {
    currentObject() {
      return this.$store.state.currentObject
    },
    showPreview() {
      return this.$store.state.showPreview
    }
  }
};
</script>

<style scoped>
#preview {
  position: fixed;
  top: 0;
  left: 0;
}
</style>