<script>
import Tile from './BaseTile.vue';

import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';
import HasPreview from '../mixins/HasPreview.js';

import { tableFrontTileStyle, tableBackTileStyle } from '../utils/styles.js';

export default {
  extends: Tile,
  mixins: [
    Draggable,
    HasContextMenu,
    HasPreview
  ],
  computed: {
    frontStyle() {
      return tableFrontTileStyle(this.object)
    },

    backStyle() {
      return tableBackTileStyle(this.object)
    }
  }
};
</script>