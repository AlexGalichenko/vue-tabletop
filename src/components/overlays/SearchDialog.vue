<template>
  <md-dialog :md-active.sync="showDialog" :md-click-outside-to-close="false" id="search-dialog">
    <md-dialog-title>Search</md-dialog-title>

    <md-dialog-content v-if="showDialog">
      <component v-for="(obj, index) in currentObject.objects" :key="obj.id" :object="obj" :is="obj.type" :index="index" />
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click="$emit('closeDialog')">Close</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import Card from "../game_objects/SearchCard.vue";
import Tile from "../game_objects/SearchTile.vue";
import Container from "../game_objects/SearchContainer.vue";
import Counter from "../game_objects/SearchCounter.vue";

export default {
  components: {
    Card,
    Tile,
    Container,
    Counter
  },
  props: {
    showDialog: Boolean
  },
  computed: {
    currentObject() {
      return this.$store.state.currentObject;
    }
  }
};
</script>

<style scoped>
#search-dialog > .md-dialog-container {
  width: 50%;
}
#search-dialog > .md-dialog-container .md-dialog-content > * {
  display: inline-block;
}
</style>