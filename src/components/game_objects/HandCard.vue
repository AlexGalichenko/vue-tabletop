<script>
import Card from './Card.vue';
import HasContextMenu from '../mixins/HasContextMenu.js';

import { frontCardStyle, backCardStyle } from '../utils/styles.js';

export default {
  extends: Card,
  mixins: [HasContextMenu],
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