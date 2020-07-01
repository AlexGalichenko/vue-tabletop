<script>
import Dice from './BaseDice.vue';
import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';

export default {
  extends: Dice,
  mixins: [
    Draggable,
    HasContextMenu
  ],
  computed: {
    style() {
      return {
        'transform': `translate(${this.object.x}px, ${this.object.y}px) rotate(${this.object.rotation}deg)`,
        'background-color': `#${this.object.color}`,
        'z-index': this.object.z
      }
    }
  }
};
</script>