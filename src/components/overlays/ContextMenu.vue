<template>
  <div
    v-if="showContextMenu"
    class="md-menu-content-bottom-start md-menu-content-big md-menu-content md-theme-default"
    x-placement="bottom-start"
    :style="menuStyle"
    @mouseleave="hideContextMenu"
  >
    <div class="md-menu-content-container md-scrollbar md-theme-default">
      <ul class="md-list md-theme-default">
        <li class="md-list-item md-menu-item md-theme-demo-light">
          <button
            type="button"
            class="md-list-item-button md-list-item-container md-button-clean"
            @click="take"
          >
            <div class="md-list-item-content md-ripple">Take</div>
          </button>
        </li>
        <li class="md-list-item md-menu-item md-theme-demo-light">
          <button
            type="button"
            class="md-list-item-button md-list-item-container md-button-clean"
            @click="play"
          >
            <div class="md-list-item-content md-ripple">Play</div>
          </button>
        </li>
        <li class="md-list-item md-menu-item md-theme-demo-light">
          <button
            type="button"
            class="md-list-item-button md-list-item-container md-button-clean"
            @click="flip"
          >
            <div class="md-list-item-content md-ripple">Flip</div>
          </button>
        </li>
        <li class="md-list-item md-menu-item md-theme-demo-light">
          <button
            type="button"
            class="md-list-item-button md-list-item-container md-button-clean"
            @click="shuffle"
          >
            <div class="md-list-item-content md-ripple">Shuffle</div>
          </button>
        </li>
        <!-- Deal Buttons -->
        <li class="md-list-item md-menu-item md-theme-demo-light">
          <button
            type="button"
            class="md-list-item-button md-list-item-container md-button-clean"
            @click="dealAll"
          >
            <div class="md-list-item-content md-ripple">Deal: All</div>
          </button>
        </li>
        <li
          v-for="player in players"
          :key="player"
          class="md-list-item md-menu-item md-theme-demo-light"
        >
          <button
            type="button"
            class="md-list-item-button md-list-item-container md-button-clean"
            @click="deal(player)"
          >
            <div class="md-list-item-content md-ripple">Deal: {{player}}</div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    players() {
      return this.$store.state.players;
    },
    currentObject() {
      return this.$store.state.currentObject;
    },
    showContextMenu() {
      return this.$store.state.contextMenu.show;
    },
    menuStyle() {
      return {
        position: "absolute",
        top: `${this.$store.state.contextMenu.y - 10}px`,
        left: `${this.$store.state.contextMenu.x - 10}px`
      };
    }
  },
  methods: {
    hideContextMenu() {
      this.$store.commit("hideContextMenu");
    },

    take(event) {
      this.$store.dispatch("takeFromContainer", this.currentObject.id);
    },

    flip(event) {
      this.$store.dispatch("flip", this.currentObject.id);
    },

    shuffle(event) {
      this.$store.dispatch("shuffle", this.currentObject.id);
    },

    deal(player) {
      this.$store.dispatch("deal", { objectId: this.currentObject.id, player });
    },

    dealAll() {},

    play() {
      this.$store.dispatch("play", {
        objectId: this.currentObject.id,
        position: {
          x: 150 - this.$parent.table.x,
          y: 150 - this.$parent.table.y
        }
      });
    }
  }
};
</script>

<style scoped>
</style>