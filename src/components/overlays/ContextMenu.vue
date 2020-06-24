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
        <li :class="liClass" v-show="container">
          <button type="button" :class="buttonClass" @click="$emit('showSearchDialog')">
            <div :class="divClass">Search</div>
          </button>
        </li>
        <li :class="liClass" v-show="container">
          <button type="button" :class="buttonClass" @click="take">
            <div :class="divClass">Take</div>
          </button>
        </li>
        <li :class="liClass" v-show="onHand">
          <button type="button" :class="buttonClass" @click="play">
            <div :class="divClass">Play</div>
          </button>
        </li>
        <li :class="liClass" v-show="['Card', 'Tile'].includes(currentObject.type)">
          <button type="button" :class="buttonClass" @click="flip">
            <div :class="divClass">Flip</div>
          </button>
        </li>
        <li :class="liClass">
          <button type="button" :class="buttonClass" @click="pin">
            <div :class="divClass">{{currentObject.pinned ? "Unpin": "Pin"}}</div>
          </button>
        </li>
        <li :class="liClass" v-show="container">
          <button type="button" :class="buttonClass" @click="shuffle">
            <div :class="divClass">Shuffle</div>
          </button>
        </li>
        <li :class="liClass">
          <button type="button" :class="buttonClass" @click="deleteObject">
            <div :class="divClass">Delete</div>
          </button>
        </li>
        <!-- Deal Buttons -->
        <li :class="liClass" v-show="container">
          <button type="button" :class="buttonClass" @click="dealAll">
            <div :class="divClass">Deal: All</div>
          </button>
        </li>
        <li v-for="player in players" :key="player" :class="liClass" v-show="['Card', 'Tile', 'Container'].includes(currentObject.type)">
          <button type="button" :class="buttonClass" @click="deal(player)">
            <div :class="divClass">Deal: {{player}}</div>
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
    container() {
      return this.currentObject.type === 'Container'
    },
    onHand() {
      return this.currentObject.owner && this.currentObject.owner !== ''
    },
    players() {
      return this.$store.state.players;
    },
    currentObject() {
      return this.$store.state.currentObject;
    }
  },
  methods: {
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
      if (this.currentObject.type === 'Container') {
        this.$store.dispatch("dealFromContainer", { objectId: this.currentObject.id, player });
      } else {
        this.$store.dispatch("deal", { objectId: this.currentObject.id, player });
      }
    },

    dealAll() {
      this.players.forEach(player => {
        this.$store.dispatch("dealFromContainer", { objectId: this.currentObject.id, player });
      })
    },

    play() {
      this.$store.dispatch("play", {
        objectId: this.currentObject.id,
        position: {
          x: 150 - this.$parent.table.x,
          y: 150 - this.$parent.table.y
        }
      });
    },

    pin() {
      this.$store.dispatch("pin", this.currentObject.id);
    },

    deleteObject() {
      this.$store.dispatch("deleteObject", this.currentObject.id);
    }
  }
};
</script>