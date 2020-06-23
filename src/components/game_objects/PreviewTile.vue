<script>
import Tile from './Tile.vue';
import { previewFrontTileStyle, previewBackTileStyle } from '../utils/styles.js';

export default {
  extends: Tile,
  mixins: [],
  computed: {
    objectClass() {
      return {
        'tile': true
      }
    },

    frontStyle() {
      return previewFrontTileStyle(this.object)
    },

    backStyle() {
      return previewBackTileStyle(this.object)
    }
  }
};
</script>