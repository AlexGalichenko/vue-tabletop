<template>
  <div id="room">
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
    />
    <ImportDialog :showDialog="showImportDialog" @closeDialog="showImportDialog = false" />
    <CreateDialog :showDialog="showCreateDialog" @closeDialog="showCreateDialog = false" />
    <SearchDialog :showDialog="showSearchDialog" @closeDialog="showSearchDialog = false" />

      <component
      :is="$store.state.contextMenu.type"
      @showSearchDialog="showSearchDialog = true"
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
import SearchDialog from './overlays/SearchDialog.vue';
import ContextMenu from './overlays/ContextMenu.vue';
import SearchContextMenu from './overlays/SearchContextMenu.vue';
import Preview from './Preview.vue';

export default {
  components: {
    Card,
    Tile,
    Container,
    Counter,
    Chip,
    SpeedDial,
    ImportDialog,
    CreateDialog,
    SearchDialog,
    ContextMenu,
    SearchContextMenu,
    Preview,
    Dice
  },
  computed: {
    objects() {
      return this.$store.getters.tableObjects;
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
      selectedObject: null,

      table: {
        x: 0,
        y: 0
      }
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
    interact('.container:not(.infinite)').dropzone({
      accept: ':not(.hand) > *',
      overlap: 0.1, //% of element
      ondragenter: function(event) {
        event.target.classList.add('drop-target');
        event.relatedTarget.classList.add('drop-relatedTarget');
      },
      ondragleave: function(event) {
        event.relatedTarget.classList.remove('drop-relatedTarget');
        event.target.classList.remove('drop-target');
      },
      ondrop: function(event) {
        event.relatedTarget.classList.remove('drop-relatedTarget');
        event.target.classList.remove('drop-target');

        const objectId = event.relatedTarget.getAttribute('data-id');
        const containerId = event.target.getAttribute('data-id');

        vueThis.$store.dispatch('putObjectToContainer', {
          objectId,
          containerId
        });
      }
    });

    interact('#table').draggable({
      inertia: {
        resistance: 60
      },
      restrict: {
        endOnly: false,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      listeners: {
        move(event) {
          vueThis.$store.commit('moveTable', { dx: event.dx, dy: event.dy });
        }
      }
    });
  }
};
</script>

<style>
body {
  overflow: hidden;
}
#table {
  height: 4000px;
  width: 4000px;
  background-color: darkslategray;
  touch-action: none;
  will-change: transform;
  transform-origin: 0 0;
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