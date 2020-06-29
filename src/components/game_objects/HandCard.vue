<script>
import Card from './BaseCard.vue';
import HasContextMenu from '../mixins/HasContextMenu.js';
import HasPreview from '../mixins/HasPreview.js';

import { frontCardStyle, backCardStyle } from '../utils/styles.js';

export default {
  extends: Card,
  mixins: [
    HasContextMenu,
    HasPreview
  ],
  computed: {
    frontStyle() {
      return frontCardStyle(this.object)
    },

    backStyle() {
      return backCardStyle(this.object)
    }
  }
};
</script>