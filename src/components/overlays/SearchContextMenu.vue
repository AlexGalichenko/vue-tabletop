<template>
  <div
    v-if="showContextMenu"
    :class="menuClass"
    x-placement="bottom-start"
    id="context-menu"
    :style="menuStyle"
    @mouseleave="hideContextMenu"
  >
    <div class="md-menu-content-container md-scrollbar md-theme-default">
      <ul class="md-list md-theme-default">
        <li :class="liClass">
          <button type="button" :class="buttonClass" @click="take">
            <div :class="divClass">
              Take
              <i class="fas fa-sign-out-alt" />
            </div>
          </button>
        </li>
        <li v-for="player in players" :key="player" :class="liClass">
          <button type="button" :class="buttonClass" @click="deal(player)">
            <div :class="divClass">
              Deal: {{player}}
              <i class="fas fa-hand-rock" />
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ContextMenu from './BaseContextMenu.vue';

export default {
  extends: ContextMenu,
  computed: {
    players() {
      return this.$store.state.players;
    },
    currentObject() {
      return this.$store.state.searchCurrentObject;
    }
  },
  methods: {
    take(event) {
      this.$store.dispatch('takeFromContainerById', {
        containerId: this.currentObject.object.id,
        index: this.currentObject.index
      });
      this.$parent.showSearchDialog = false;
      this.hideContextMenu();
    },

    deal(player) {
      this.$store.dispatch('dealFromContainerById', {
        containerId: this.currentObject.object.id,
        index: this.currentObject.index,
        player
      });
      this.$parent.showSearchDialog = false;
      this.hideContextMenu();
    }
  }
};
</script>