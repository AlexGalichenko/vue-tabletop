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
            <div :class="divClass">
              Search
              <i class="fas fa-search" />
            </div>
          </button>
        </li>
        <li :class="liClass" v-show="container">
          <button type="button" :class="buttonClass" @click="take">
            <div :class="divClass">
              Take
              <i class="fas fa-sign-out-alt" />
            </div>
          </button>
        </li>
        <!--TODO replace with TO BOARD functionality -->
        <li :class="liClass" v-show="onHand">
          <button type="button" :class="buttonClass" @click="play">
            <div :class="divClass">
              Play
              <i class="fas fa-hand-paper" />
            </div>
          </button>
        </li>
        <li :class="liClass" v-show="['Card', 'Tile'].includes(currentObject.type)">
          <button type="button" :class="buttonClass" @click="flip">
            <div :class="divClass">
              Flip
              <i class="fas fa-sync" />
            </div>
          </button>
        </li>
        <li :class="liClass" v-show="['Card', 'Tile', 'Container'].includes(currentObject.type)">
          <button type="button" :class="buttonClass" @click="rotateRight">
            <div :class="divClass">
              Rotate
              <i class="fas fa-arrow-right" />
            </div>
          </button>
        </li>
        <li :class="liClass" v-show="['Card', 'Tile', 'Container'].includes(currentObject.type)">
          <button type="button" :class="buttonClass" @click="rotateLeft">
            <div :class="divClass">
              Rotate
              <i class="fas fa-arrow-left" />
            </div>
          </button>
        </li>
        <li :class="liClass" v-show="['Dice'].includes(currentObject.type)">
          <button type="button" :class="buttonClass" @click="roll">
            <div :class="divClass">
              Roll
              <i class="fas fa-dice" />
            </div>
          </button>
        </li>
        <li :class="liClass">
          <button type="button" :class="buttonClass" @click="pin">
            <div :class="divClass">
              {{currentObject.pinned ? "Unpin": "Pin"}}
              <i class="fas fa-thumbtack" />
            </div>
          </button>
        </li>
        <li :class="liClass" v-show="container">
          <button type="button" :class="buttonClass" @click="shuffle">
            <div :class="divClass">
              Shuffle
              <i class="fas fa-random" />
            </div>
          </button>
        </li>
        <li :class="liClass">
          <button type="button" :class="buttonClass" @click="copy">
            <div :class="divClass">
              Copy
              <i class="fas fa-copy" />
            </div>
          </button>
        </li>
        <li :class="liClass">
          <button type="button" :class="buttonClass" @click="deleteObject">
            <div :class="divClass">
              Delete
              <i class="fas fa-trash" />
            </div>
          </button>
        </li>
        <!-- Deal Buttons -->
        <li :class="liClass" v-show="container">
          <button type="button" :class="buttonClass" @click="dealAll">
            <div :class="divClass">
              Deal: All
              <i class="fas fa-hand-rock" />
            </div>
          </button>
        </li>
        <li
          v-for="player in players"
          :key="player"
          :class="liClass"
          v-show="['Card', 'Tile', 'Container'].includes(currentObject.type)"
        >
          <button type="button" :class="buttonClass" @click="deal(player)">
            <div :class="divClass">
              Deal: {{player}}
              <i class="fas fa-hand-rock" />
            </div>
          </button>
        </li>
        <li
          v-for="board in boards"
          :key="board.id"
          :class="liClass"
        >
          <button type="button" :class="buttonClass" @click="toBoard(board)">
            <div :class="divClass">
              To Board: {{board.name}}
              <i class="fas fa-external-link-square-alt" />
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
    container() {
      return this.currentObject.type === 'Container';
    },
    onHand() {
      return this.currentObject.owner && this.currentObject.owner !== '';
    },
    players() {
      return this.$store.state.players;
    },
    boards() {
      return [
        {
          id: '',
          name: 'Main'
        },
        ...this.$store.state.boards
      ];
    },
    currentObject() {
      return this.$store.state.currentObject;
    }
  },
  methods: {
    take(event) {
      this.$store.dispatch('takeFromContainer', this.currentObject.id);
    },

    flip(event) {
      this.$store.dispatch('flip', this.currentObject.id);
    },

    shuffle(event) {
      this.$store.dispatch('shuffle', this.currentObject.id);
    },

    deal(player) {
      if (this.currentObject.type === 'Container') {
        this.$store.dispatch('dealFromContainer', {
          objectId: this.currentObject.id,
          player
        });
      } else {
        this.$store.dispatch('deal', {
          objectId: this.currentObject.id,
          player
        });
      }
    },

    dealAll() {
      this.players.forEach(player => {
        this.$store.dispatch('dealFromContainer', {
          objectId: this.currentObject.id,
          player
        });
      });
    },

    play() {
      this.$store.dispatch('play', {
        objectId: this.currentObject.id,
        position: {
          x:
            (window.mainScroll.x + window.mainDimension.width / 2 - window.mainTable.x) /
            window.mainZoom,
          y:
            (window.mainScroll.y + window.mainDimension.height / 2 - window.mainTable.y) /
            window.mainZoom
        }
      });
    },

    pin() {
      this.$store.dispatch('pin', this.currentObject.id);
    },

    deleteObject() {
      this.$store.dispatch('deleteObject', this.currentObject.id);
    },

    rotateRight() {
      this.$store.dispatch('rotateRight', this.currentObject.id);
    },

    rotateLeft() {
      this.$store.dispatch('rotateLeft', this.currentObject.id);
    },

    copy() {
      this.$store.dispatch('copy', this.currentObject.id);
    },

    roll() {
      this.$store.dispatch('roll', this.currentObject.id);
    },

    toBoard(board) {
      this.$store.dispatch('toBoard', {
        objectId: this.currentObject.id,
        board
      });
    }
  }
};
</script>