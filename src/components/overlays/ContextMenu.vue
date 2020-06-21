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
            @click="flip"
          >
            <div class="md-list-item-content md-ripple">Flip</div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
    }
  }
};
</script>

<style scoped>
</style>