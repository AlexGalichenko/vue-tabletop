<template>
  <div>
    <div id="table">
      <component 
        v-for="obj in objects" class="draggable"
        :key="obj.id"
        :object="obj"
        :is="obj.type"
      />
    </div>
    <SpeedDial @showImportDialog="showImportDialog = true"/>
    <ImportDialog :showDialog="showImportDialog" @closeDialog="showImportDialog = false"/>
    <ContextMenu :object="selectedObject"/>
  </div>
</template>

<script>
import Card from './game_objects/Card.vue';
import Tile from './game_objects/Tile.vue';
import Container from './game_objects/Container.vue';
import Counter from './game_objects/Counter.vue';

import SpeedDial from './SpeedDial.vue';
import ImportDialog from './overlays/ImportDialog.vue';
import ContextMenu from './overlays/ContextMenu.vue'; 

export default {
  components: {
    Card,
    Tile,
    Container,
    Counter,
    SpeedDial,
    ImportDialog,
    ContextMenu
  },
  computed: {
    objects() {
      return this.$store.state.objects;
    }
  },
  data() {
    return {
      showImportDialog: false,
      showContextMenu: false,
      selectedObject: null,
    }
  },
  methods: {
    showContex(object) {
      this.selectedObject = object;
    }
  },
  mounted() {
    this.$store.dispatch("init");
  }
};
</script>

<style scoped>
  #table {
    height: 2000px;
    width: 3000px;
    background-color: black;
  }
  .draggable {
    position: absolute;
    touch-action: none;
  }
</style>