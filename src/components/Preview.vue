<template>
  <div id="preview" v-if="showPreview">
    <Card :object="currentObject"/>
  </div>
</template>

<script>
import Card from './game_objects/PreviewCard.vue';

export default {
  components: {
    Card
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