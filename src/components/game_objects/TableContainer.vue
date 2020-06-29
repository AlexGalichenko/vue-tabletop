<script>
import Container from './BaseContainer.vue';
import Draggable from '../mixins/Draggable.js';
import HasContextMenu from '../mixins/HasContextMenu.js';

import { tableFrontContainerStyle, tableBackContainerStyle } from '../utils/styles.js';

export default {
  extends: Container,
  mixins: [Draggable, HasContextMenu],
  computed: {
    frontStyle() {
      return tableFrontContainerStyle(this.object);
    },

    backStyle() {
      return tableBackContainerStyle(this.object);
    }
  }

};
</script>