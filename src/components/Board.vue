<template>
  <div class="room">
    <div id="board"
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

    <component :is="$store.state.contextMenu.type" @showSearchDialog="showSearchDialog = true"/>
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
    Dice,
    ContextMenu,
    SearchContextMenu,
    Preview,
  },
  computed: {
    objects() {
      return this.$store.getters.boardObjects(this.$route.params.id);
    },

    boardData() {
      return this.$store.getters.boardData(this.$route.params.id)
    },

    tableStyle() {
      return {
        'height': `${this.boardData ? this.boardData.height : 600}px`,
        'width': `${this.boardData ? this.boardData.width : 800}px`,
        'transform': `scale(${this.$store.state.zoom})`
      }
    }
  },
  data() {
    return {
      selectedObject: null
    };
  },
  methods: {
    changeZoom(event) {
      this.$store.commit('changeZoom', event.deltaY / 1000)
    }
  },
  mounted() {
    this.$store.dispatch('init');
  }
};
</script>

<style scoped>
#board {
  background-color: darkslategray;
  touch-action: none;
  will-change: transform;
  transform-origin: 0 0;
}

</style>