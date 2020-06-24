<script>
import Tile from './HandTile.vue';
import HasSearchContextMenu from '../mixins/HasSearchContextMenu.js';

export default {
  extends: Tile,
  props: {
    index: Number
  },
  mixins: [HasSearchContextMenu]
};
</script>