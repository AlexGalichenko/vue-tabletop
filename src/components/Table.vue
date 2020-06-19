<template>
  <div>
    <component v-for="obj in objects" class="draggable" :key="obj.id" :object="obj" :is="obj.type" />
  </div>
</template>

<script>
import Card from "./game_objects/Card.vue";
import Tile from "./game_objects/Tile.vue";
import Container from "./game_objects/Container.vue";
import Counter from "./game_objects/Counter.vue";

export default {
  components: {
    Card,
    Tile,
    Container,
    Counter
  },
  computed: {
    objects() {
      return this.$store.state.objects;
    }
  },
  methods: {},
  mounted() {
    this.$store.dispatch("init");
  }
};
</script>

<style scoped>
  .draggable {
    touch-action: none;
  }
</style>