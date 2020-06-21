<template>
  <div id="room">
    <div id="table" :style="tableStyle">
      <component
        v-for="obj in objects"
        class="draggable"
        :key="obj.id"
        :object="obj"
        :is="obj.type"
        :data-id="obj.id"
      />
    </div>
    <SpeedDial @showImportDialog="showImportDialog = true" />
    <ImportDialog :showDialog="showImportDialog" @closeDialog="showImportDialog = false" />
    <ContextMenu :object="selectedObject" />
  </div>
</template>

<script>
import interact from "interactjs";

import Card from "./game_objects/Card.vue";
import Tile from "./game_objects/Tile.vue";
import Container from "./game_objects/Container.vue";
import Counter from "./game_objects/Counter.vue";

import SpeedDial from "./SpeedDial.vue";
import ImportDialog from "./overlays/ImportDialog.vue";
import ContextMenu from "./overlays/ContextMenu.vue";

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
    },

    tableStyle() {
      return {
        'will-change': 'transform',
        'transform': `translate(${this.table.x}px, ${this.table.y}px)`
      }
    }
  },
  data() {
    return {
      showImportDialog: false,
      showContextMenu: false,
      selectedObject: null,

      table: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    showContex(object) {
      this.selectedObject = object;
    }
  },
  mounted() {
    this.$store.dispatch('init');

    const vueThis = this;
    interact('.container:not(.infinite)').dropzone({
      accept: ":not(.hand) > *",
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
          vueThis.table.x += event.dx;
          vueThis.table.y += event.dy;
        }
      }
    });
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
.dragged {
  opacity: 50%;
}
</style>