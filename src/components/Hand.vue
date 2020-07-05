<script>
import Board from './Board.vue';

export default {
  extends: Board,
  computed: {
    objects() {
      return this.$store.getters.handObjects;
    },
  }
};
</script>