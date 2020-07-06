<template>
  <md-toolbar id="toolbox" class="md-primary md-dense">
    <div>
      <md-button @click="openHand"><i class="fas fa-hand-paper" /></md-button>
    </div>
    <div v-for="board in boards" :key="board.id">
      <md-button @click="openBoard(board)">{{board.name}}</md-button>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  components: {},
  computed: {
    boards() {
      return this.$store.state.boards
    }
  },
  methods: {
    openBoard(board) {
      const height = Math.min(+board.height + 1, window.innerHeight);
      const width = Math.min(+board.width + 1, window.innerWidth);
      const boardWindow = window.open(
        `/#/board/${board.id}`,
        board.name,
        `resizable=yes,scrollbars=no,width=${width},height=${height}`
      );
    },
    openHand() {
      const handWindow = window.open('/#/hand', 'Hand', 'width=800,height=600');
      this.$store.commit('setHandWindow', handWindow);
    }
  }
};
</script>

<style scoped>
#toolbox {
  position: fixed;
}
</style>