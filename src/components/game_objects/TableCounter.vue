<script>
import Counter from './BaseCounter.vue';
import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';

export default {
  extends: Counter,
  mixins: [
    Draggable,
    HasContextMenu
  ],
  computed: {
    style() {
      return {
        'transform': `translate(${this.object.x}px, ${this.object.y}px) translateZ(0)`
      }
    }
  },
  methods: {
    increaseCount() {
      this.$store.dispatch('increaseCount', this.object.id);
    },
    decreaseCount() {
      this.$store.dispatch('decreaseCount', this.object.id);
    }
  }
};
</script>