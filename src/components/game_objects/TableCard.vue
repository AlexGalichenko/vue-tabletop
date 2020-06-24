<script>
import BaseCard from './BaseCard.vue';

import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';
import HasPreview from '../mixins/HasPreview.js';
import { tableFrontCardStyle, tableBackCardStyle } from '../utils/styles.js';

export default {
  extends: BaseCard,
  mixins: [
    Draggable,
    HasContextMenu,
    HasPreview
  ],
  computed: {
    frontStyle() {
      return tableFrontCardStyle(this.object)
    },

    backStyle() {
      return tableBackCardStyle(this.object)
    }
  }
};
</script>

<style scoped>
</style>