<template>
  <div id="room">
    <Toolbar/>
    <div id="table"
      :style="tableStyle"
      @mousewheel.prevent="changeZoom"
    >
      <component
        v-for="obj in objects"
        class="draggable"
        :key="obj.id"
        :object="obj"
        :is="obj.type"
        :data-id="obj.id"
      />
    </div>

    <SpeedDial
      @showImportDialog="showImportDialog = true"
      @showCreateDialog="showCreateDialog = true"
      @showCreateBoardDialog="showCreateBoardDialog = true"  
    />
    <ImportDialog :showDialog="showImportDialog" @closeDialog="showImportDialog = false" />
    <CreateDialog :showDialog="showCreateDialog" @closeDialog="showCreateDialog = false" />
    <SearchDialog :showDialog="showSearchDialog" @closeDialog="showSearchDialog = false" />
    <CreateBoardDialog :showDialog="showCreateBoardDialog" @closeDialog="showCreateBoardDialog = false" />

    <component :is="$store.state.contextMenu.type" @showSearchDialog="showSearchDialog = true"
    />
    <Preview />
  </div>
</template>

<script>
import interact from 'interactjs';

import Card from './game_objects/TableCard.vue';
import Tile from './game_objects/TableTile.vue';
import Container from './game_objects/TableContainer.vue';
import Counter from './game_objects/TableCounter.vue';
import Chip from './game_objects/TableChip.vue';
import Dice from './game_objects/TableDice.vue';

import SpeedDial from './SpeedDial.vue';
import ImportDialog from './overlays/ImportDialog.vue';
import CreateDialog from './overlays/CreateDialog.vue';
import CreateBoardDialog from './overlays/CreateBoardDialog.vue';
import SearchDialog from './overlays/SearchDialog.vue';
import ContextMenu from './overlays/ContextMenu.vue';
import SearchContextMenu from './overlays/SearchContextMenu.vue';
import Preview from './Preview.vue';
import Toolbar from './Toolbar.vue';

export default {
  components: {
    Card,
    Tile,
    Container,
    Counter,
    Chip,
    Dice,
    SpeedDial,
    ImportDialog,
    CreateDialog,
    CreateBoardDialog,
    SearchDialog,
    ContextMenu,
    SearchContextMenu,
    Preview,
    Toolbar
  },
  computed: {
    objects() {
      return this.$store.getters.tableObjects
    },

    tableStyle() {
      return {
        'transform': `translate(${this.$store.state.table.x}px, ${this.$store.state.table.y}px) scale(${this.$store.state.zoom})`
      }
    }
  },
  data() {
    return {
      showImportDialog: false,
      showCreateDialog: false,
      showSearchDialog: false,
      showContextMenu: false,
      showCreateBoardDialog: false,
      selectedObject: null
    };
  },
  methods: {
    changeZoom(event) {
      this.$store.commit('changeZoom', event.deltaY / 1000)
    }
  },
  mounted() {
    window.scrollTo(0,0);

    this.$store.dispatch('init');

    const vueThis = this;
    
    // interact('#table').draggable({
    //   listeners: {
    //     move(event) {
    //       vueThis.$store.commit('moveTable', { dx: event.dx, dy: event.dy });
    //     }
    //   }
    // });
  }
};
</script>

<style scoped>
#table {
  height: 2000px;
  width: 2000px;
  background-color: darkslategray;
  touch-action: none;
  will-change: transform;
  transform-origin: 0 0;
}

</style>