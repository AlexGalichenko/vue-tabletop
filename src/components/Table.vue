<template>
  <div>
    <div id="table">
      <component v-for="obj in objects" class="draggable" :key="obj.id" :object="obj" :is="obj.type" />
    </div>
    <SpeedDial/>
  </div>

</template>

<script>
import Card from './game_objects/Card.vue';
import Tile from './game_objects/Tile.vue';
import Container from './game_objects/Container.vue';
import Counter from './game_objects/Counter.vue';

import SpeedDial from './SpeedDial.vue';

export default {
  components: {
    Card,
    Tile,
    Container,
    Counter,
    SpeedDial
  },
  computed: {
    objects() {
      return this.$store.state.objects;
    }
  },
  methods: {

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
    touch-action: none;
  }
</style>