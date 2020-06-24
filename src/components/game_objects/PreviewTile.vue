<script>
import Tile from './BaseTile.vue';
import { previewFrontTileStyle, previewBackTileStyle } from '../utils/styles.js';

export default {
  extends: Tile,
  computed: {
    frontStyle() {
      return previewFrontTileStyle(this.object)
    },

    backStyle() {
      return previewBackTileStyle(this.object)
    }
  }
};
</script>