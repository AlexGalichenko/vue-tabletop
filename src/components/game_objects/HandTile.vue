<script>
import Tile from './BaseTile.vue';
import HasContextMenu from '../mixins/HasContextMenu.js';
import HasPreview from '../mixins/HasPreview.js';

import { frontTileStyle, backTileStyle } from '../utils/styles.js';

export default {
  extends: Tile,
  mixins: [
    HasContextMenu,
    HasPreview
  ],
  computed: {
    frontStyle() {
      return frontTileStyle(this.object)
    },

    backStyle() {
      return backTileStyle(this.object)
    }
  }
};
</script>