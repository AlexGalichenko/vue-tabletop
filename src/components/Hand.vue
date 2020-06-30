<template>
  <div :class="handClass">
    <component
      v-for="obj in objects"
      :key="obj.id"
      :object="obj"
      :is="obj.type"
      :data-id="obj.id"
    />
    <component :is="$store.state.contextMenu.type"/>
  </div>
</template>

<script>
import Card from './game_objects/HandCard.vue';
import Tile from './game_objects/HandTile.vue';
import Container from './game_objects/HandContainer.vue';
import Counter from './game_objects/BaseCounter.vue';
import ContextMenu from './overlays/ContextMenu.vue';

export default {
  components: {
    Card,
    Tile,
    Container,
    Counter,
    ContextMenu
  },
  data() {
    return {
      showHand: false
    };
  },
  computed: {
    objects() {
      return this.$store.getters.handObjects;
    },
    handClass() {
      return `hand ${this.showHand ? 'expanded' : 'collapsed'}`;
    }
  },
  mounted() {
    this.$store.dispatch('init');
  }
};
</script>

<style>
body {
  overflow: scroll;
}
.hand {
  background-color: darkslategray;
}

.hand > * {
  display: inline-block;
}
</style>