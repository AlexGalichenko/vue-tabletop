<script>
import Chip from './BaseChip.vue';
import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';

export default {
  extends: Chip,
  mixins: [
    Draggable,
    HasContextMenu
  ],
  computed: {
    style() {
      return {
        'background-color': `#${this.object.color}`,
        'border': '1px solid black',
        'height': `${this.object.height}px`,
        'width': `${this.object.width}px`,
        'transform': `translate(${this.object.x}px, ${this.object.y}px) rotate(${this.object.rotation}deg)`,
        'z-index': this.object.z
      }
    }
  }
};
</script>