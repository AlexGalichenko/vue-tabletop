<template>
  <md-toolbar id="toolbox" class="md-primary md-dense">
    <div>
      <md-button @click="openHand">Hand</md-button>
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
      window.open(
        `/#/board/${board.id}`,
        board.name,
        `resizable=yes,scrollbars=no,width=800,height=600`
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