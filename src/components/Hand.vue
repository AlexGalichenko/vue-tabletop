<template>
  <div :class="handClass">
    <component
      v-for="obj in objects"
      :key="obj.id"
      :object="obj"
      :is="obj.type"
      :data-id="obj.id"
    />
    <md-button
      class="md-primary expand"
      @click="showHand = !showHand"
    >{{showHand ? 'Collapse' : 'Expand'}}</md-button>
  </div>
</template>

<script>
import Card from "./game_objects/HandCard.vue";
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
  }
};
</script>

<style scoped>
.hand {
  position: fixed;
  height: 300px;
  width: 80vw;
  left: 10vw;
  background: rgba(0, 0, 0, 0.1);
  transform: translateZ(0);
  overflow-y: scroll;
  overflow-x: hidden;
}

.hand > * {
  display: inline-block;
}

.hand.expanded {
  bottom: 0vh;
}

.hand.collapsed {
  bottom: -250px;
}

.hand .expand {
  position: absolute;
  top: 2px;
  right: 2px;
}
</style>